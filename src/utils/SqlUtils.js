const Connection = require('../Connection');

class SqlUtils {

    constructor() {}

    GET(table, callBackSuccess, callBackFail) {
        Connection.acquire(con => {
            con.query('select * from ' + table, (error, result) => {
                this._genericMainQuery(con, error, result, callBackSuccess, callBackFail);
            })
        });
    }

    GETBY(table, filter, callBackSuccess, callBackFail) {
        Connection.acquire((con) => {
            con.query('select * from ' + table + ' where id = ' + filter, (error, result) => {
                this._genericMainQuery(con, error, result, callBackSuccess, callBackFail);
            })
        });
    }

    DELETE(table, filter, callBackSuccess, callBackFail) {
        Connection.acquire((con) => {
            con.query('delete from ' + table + ' where id = ?', [filter], (error, result) => {
                this._genericMainQuery(con, error, result, callBackSuccess, callBackFail);
            })
        });
    }

    POST(table, data, callBackSuccess, callBackFail) {
        Connection.acquire((con) => {
            con.query('insert into ' + table + ' set ?', [data], (error, result) => {
                this._genericMainQuery(con, error, result, callBackSuccess, callBackFail);
            })
        });
    }

    PUT(table, data, callBackSuccess, callBackFail) {
        Connection.acquire((con) => {
            con.query('update ' + this.table + ' set ? where id = ? ', [data, data.id], (error, result) => {
                this._genericMainQuery(con, error, result, callBackSuccess, callBackFail);
            })
        });
    }
    
    QUERY(query, data, callBackSuccess, callBackFail) {
        db.acquire((error, con) => {

            if (data === undefined) {
                con.query(query, (error, result) => {
                    this._genericMainQuery(con, error, result, callBackSuccess, callBackFail);
                })
            } else {
                con.query(query, data, (error, result) => {
                    this._genericMainQuery(con, error, result, callBackSuccess, callBackFail);
                })
            }
        })
    }
    
    _genericMainQuery(con, error, result, callBackSuccess, callBackFail) {
        if (!error) {
            con.release();
            callBackSuccess(result)
        } else {
            callBackFail(error)
        }
    }

    requestFail(res, error, messageOfFail) {
        const msg = {
            status: 400,
            message: (messageOfFail !== undefined) ? messageOfFail : 'Falha ao realizar o processo',
            erro: error
        }
        res.send(msg);
    }
}

module.exports = SqlUtils;