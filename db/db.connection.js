const { Pool } = require('pg');
const mysql = require('mysql');

var postgreSqlConfig = {
    user: 'postgres', 
    database: 'postgres', 
    password: 12345, 
    host: 'localhost', 
    port: 5432, 
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000
};

var mySqlConfig = {
    connectionLimit : 100,
    host     : '127.0.0.1',
    user     : '',
    password : '',
    database : 'hyperapp',
    debug    :  false
};

module.exports = {
	/**
     * @param {string} query
     * @param {array} params
     */
	executePgSql: (query, params) => new Promise((resolve, reject) => {
		try {
            const pool = new Pool(postgreSqlConfig);

            pool.on('error', function (err, client) {
                console.error('idle client error', err.message, err.stack);
            });

            pool.query(query, params, function(err, res) {
                pool.end();
                try {
                    if(err) {
                        return reject(err);
                    } return resolve(res);
                } catch (error) {
                    return reject(error);
                }
            });
		} catch (error) {
			reject(error);
		}
    }),
    
    executeMysql = (query, params) => new Promise((resolve, reject) => {
        try {
			const connection = mysql.createConnection({
				host: '',
				user: '',
				password: '',
				database: '',
				typeCast: (field, useDefaultTypeCasting) => {
					try {
						if (field.type === 'BIT' && field.length === 1) {
							const bytes = field.buffer();
							return bytes[0] === 1;
						}
						return useDefaultTypeCasting();
					} catch (error) {
						console.log('Casting failed ', error);
					}
				},
			});
			connection.config.queryFormat = function (q, values) {
				try {
					if (!values) return q;
					if (q.indexOf(':') === -1) {
						return mysql.format(q, values);
					}
					const finalQuery = q.replace(/:(\w+)/g, (txt, key) => {
						if (values.hasOwnProperty(key)) {
							return this.escape(values[key]);
						}
						return txt;
					});
					return finalQuery;
				} catch (_) {
					return q;
				}
			};
			connection.connect();
			connection.query(query, params, (error, data) => {
				try {
					connection.end();
					if (error) {
						return reject(error);
					}
					return resolve(data);
				} catch (e) {
					return reject(e);
				}
			});
		} catch (error) {
			reject(error);
		}
    })
};
