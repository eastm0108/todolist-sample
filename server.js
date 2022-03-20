const http = require('http');
const { v4: uuidv4 } = require('uuid');
const errorHandle = require('./errorHandle');

const todos = [];

const requestListener = (req, res) => {
    const headers = {
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
        'Content-Type': 'application/json',
    };
    const url = req.url;
    const method = req.method;
    let body = '';

    req.on('data', (chunk) => {
        body += chunk;
    });

    if (url === '/todos' && method === 'GET') {
        res.writeHead(200, headers);
        res.write(
            JSON.stringify({
                status: 'success',
                data: todos,
            })
        );
        res.end();
    } else if (url === '/todos' && method === 'POST') {
        req.on('end', () => {
            try {
                const title = JSON.parse(body).title;
                if (title === undefined) {
                    errorHandle(res);
                } else {
                    const todo = {
                        title,
                        id: uuidv4(),
                    };
                    todos.push(todo);

                    res.writeHead(200, headers);
                    res.write(
                        JSON.stringify({
                            status: 'success',
                            data: todos,
                        })
                    );
                    res.end();
                }
            } catch (error) {
                errorHandle(res);
            }
        });
    } else if (url === '/todos' && method === 'DELETE') {
        todos.length = 0;
        res.writeHead(200, headers);
        res.write(
            JSON.stringify({
                status: 'success',
                message: '刪除成功',
            })
        );
        res.end();
    } else if (url.startsWith('/todos/') && method === 'DELETE') {
        const id = url.split('/').pop();
        const index = todos.findIndex((element) => element.id === id);

        if (index === -1) {
            errorHandle(res);
        } else {
            todos.splice(index, 1);
            res.writeHead(200, headers);
            res.write(
                JSON.stringify({
                    status: 'success',
                    data: todos,
                })
            );
            res.end();
        }
    } else if (url.startsWith('/todos/') && method === 'PATCH') {
        req.on('end', () => {
            try {
                const title = JSON.parse(body).title;
                const id = url.split('/').pop();
                const index = todos.findIndex((element) => element.id === id);

                if (index === -1 || title === undefined) {
                    errorHandle(res);
                } else {
                    todos[index].title = title;

                    res.writeHead(200, headers);
                    res.write(
                        JSON.stringify({
                            status: 'success',
                            data: todos[index],
                        })
                    );
                    res.end();
                }
            } catch (error) {
                errorHandle(res);
            }
        });
    } else if (method === 'OPTIONS') {
        res.writeHead(200, headers);
        res.end();
    } else {
        res.writeHead(404, headers);
        res.write(
            JSON.stringify({
                status: 'false',
                message: 'not found',
            })
        );
        res.end();
    }
};

const server = http.createServer(requestListener);
server.listen(process.env.PORT || 8080);
