const http = require('http');
const { v4: uuidv4 } = require('uuid');
const { errorHandle, successHandle } = require('./responseHandle');
const { HEADERS, REQUEST_METHOD, HTTP_STATUS, ERROR_MESSAGE, FIND_INDEX_RESULT } = require('./constants');
const { DEFAULT_PORT } = require('./config');

const todos = [];

const requestListener = (req, res) => {
    const url = req.url;
    const method = req.method;
    let body = '';

    req.on('data', (chunk) => {
        body += chunk;
    });

    if (url === '/todos' && method === REQUEST_METHOD.GET) {
        successHandle(res, todos);
    } else if (url === '/todos' && method === REQUEST_METHOD.POST) {
        req.on('end', () => {
            try {
                const title = JSON.parse(body).title;

                if (title) {
                    todos.push({ title, id: uuidv4() });
                    successHandle(res, todos);
                } else {
                    errorHandle(res, HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGE.DATA_ERROR);
                }
            } catch (error) {
                errorHandle(res, HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGE.CREATE_ERROR);
            }
        });
    } else if (url === '/todos' && method === REQUEST_METHOD.DELETE) {
        todos.length = 0;
        successHandle(res, todos);
    } else if (url.startsWith('/todos/') && method === REQUEST_METHOD.DELETE) {
        const id = url?.split('/')?.pop();
        const index = todos.findIndex((element) => element.id === id);

        if (index === FIND_INDEX_RESULT.NOT_FOUND) {
            errorHandle(res, HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGE.NOT_FOUND_ID);
        } else {
            todos.splice(index, 1);
            successHandle(res, todos);
        }
    } else if (url.startsWith('/todos/') && method === REQUEST_METHOD.PATCH) {
        req.on('end', () => {
            try {
                const title = JSON.parse(body).title;
                const id = url?.split('/')?.pop();
                const index = todos.findIndex((element) => element.id === id);

                if (index === FIND_INDEX_RESULT.NOT_FOUND || title === undefined) {
                    errorHandle(res, HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGE.NOT_FOUND_ID_OR_DATA_ERROR);
                } else {
                    todos[index].title = title;
                    successHandle(res, todos);
                }
            } catch (error) {
                errorHandle(res, HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGE.UPDATE_ERROR);
            }
        });
    } else if (method === REQUEST_METHOD.OPTIONS) {
        res.writeHead(HTTP_STATUS.SUCCESS, HEADERS);
        res.end();
    } else {
        errorHandle(res, HTTP_STATUS.NOT_FOUND, ERROR_MESSAGE.NOT_FOUND_ROUTE);
    }
};

const server = http.createServer(requestListener);
server.listen(process.env.PORT || DEFAULT_PORT);
