const { Pool } = require('pg');

var config = {
    user: 'postgres', 
    database: 'postgres', 
    password: 12345, 
    host: 'localhost', 
    port: 5432, 
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000
};

module.exports = {
	/**
     * @param {string} query
     * @param {array} params
     */
	execute: (query, params) => new Promise((resolve, reject) => {
		try {
            const pool = new Pool(config);

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
	})
};
