const { HEADERS, HTTP_STATUS } = require('./constants');

function errorHandle(res, statusCode, message) {
    res.writeHead(statusCode, HEADERS);
    res.write(
        JSON.stringify({
            status: 'false',
            message,
        })
    );
    res.end();
}

function successHandle(res, todos) {
    res.writeHead(HTTP_STATUS.SUCCESS, HEADERS);
    res.write(
        JSON.stringify({
            status: 'success',
            data: todos,
        })
    );
    res.end();
}

module.exports = {
    errorHandle,
    successHandle,
};
