function errorHandle(res) {
    const headers = {
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
        'Content-Type': 'application/json',
    };

    res.writeHead(400, headers);
    res.write(
        JSON.stringify({
            status: 'false',
            message: '資料錯誤或是格式錯誤',
        })
    );
    res.end();
}

module.exports = errorHandle;
