const HEADERS = {
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
    'Content-Type': 'application/json',
};

const HTTP_STATUS = {
    SUCCESS: 200,
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
};

const REQUEST_METHOD = {
    GET: 'GET',
    POST: 'POST',
    DELETE: 'DELETE',
    PATCH: 'PATCH',
    OPTIONS: 'OPTIONS',
};

const ERROR_MESSAGE = {
    NOT_FOUND_ROUTE: '查無此頁面',
    DATA_ERROR: '資料錯誤',
    CREATE_ERROR: '建立失敗',
    UPDATE_ERROR: '更新失敗',
    NOT_FOUND_ID: '查無此 ID',
    NOT_FOUND_ID_OR_DATA_ERROR: '查無此 ID 或是資料錯誤',
};

const FIND_INDEX_RESULT = {
    NOT_FOUND: -1,
};

module.exports = {
    HEADERS,
    HTTP_STATUS,
    REQUEST_METHOD,
    ERROR_MESSAGE,
    FIND_INDEX_RESULT,
};
