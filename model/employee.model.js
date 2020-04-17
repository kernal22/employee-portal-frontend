const db = require('../db/db.connection');

class EmployeeModelClass {
    async getEmployeeDetails(emp_id) {
        return new Promise(async (resolve, reject) => {
            try {
                const sql = `select * from employee_details where emp_id = $1`;
                const result = await db.executePgSql(sql, [emp_id]);
                if(result.rows.length > 0) {
                    return resolve(result.rows[0]);
                } return resolve(null);

            } catch (error) {
                return reject(error);
            }
        })
    }

    async getEmployee(empid) {
        return new Promise(async (resolve, reject) => {
            try {
                const sql = `select emp_id from employee_details where emp_id = $1`;
                const result = await db.executePgSql(sql, [empid]);
                if(result.rows.length > 0) {
                    return resolve(result.rows[0]);
                } return resolve(null);
            } catch (error) {
                return reject(error);
            }
        })
    }

    async getEmployeeLoginCred(emp_id) {
        return new Promise(async (resolve, reject) => {
            try {
                const sql = 'select * from employee_login_details where emp_id = $1';
                const result = await db.executePgSql(sql, [emp_id]);
                if(result.rows.length > 0) {
                    return resolve(result.rows[0]);
                } return resolve(null);

            } catch (error) {
                return reject(error);
            }
        })
    }

    async getUserLoginCred(username) {
        return new Promise(async (resolve, reject) => {
            try {
                const sql = 'select * from user_details where username = ?';
                const result = await db.executeMysql(sql, [username]);
                if(result.length > 0) {
                    return resolve(result[0]);
                } return resolve(null);
            } catch (error) {
                return reject(error);
            }
        });
    }

    async insertEmployeeDetails(empData) {
        return new Promise(async (resolve, reject) => {
            try {
                const sql = 'insert into employee_details (emp_id, emp_name, emp_email) values ($1, $2, $3)';
                const result = await db.executePgSql(sql, [empData.emp_id, empData.emp_name, empData.emp_email]);
                if(result.rowCount) {
                    return resolve(true);
                } return resolve(null);

            } catch (error) {
                return reject(error);
            }
        })
    }

    async saveEmployeeCred(empCredData) {
        return new Promise(async (resolve, reject) => {
            try {
                const sql = 'insert into employee_login_details (emp_id, emp_password) values ($1, $2)';
                const result = await db.executePgSql(sql, [empCredData.emp_id, empCredData.emp_password]);
                if(result.rowCount) {
                    return resolve(true);
                } return resolve(null);
            } catch (error) {
                return reject(error);
            }
        })
    }

    async insertLeaveDeatails(leaveData) {
        return new Promise(async (resolve, reject) => {
            try {
                const sql = 'insert into employee_leave_details (emp_id, leave_type, startdate, enddate, reason, no_of_days) values ($1, $2, $3, $4, $5, $6)';
                const result = await db.executePgSql(sql, [leaveData.emp_id, leaveData.leave_type_id, leaveData.start_date, leaveData.end_date, leaveData.reason, leaveData.no_of_days]);
                if(result.rowCount) {
                    return resolve(true);
                } return resolve(null);

            } catch (error) {
                console.log(error);
                return reject(error);
            }
        })
    }

    async deleteLeaveDeatails(id, emp_id) {
        return new Promise(async (resolve, reject) => {
            try {
                const sql = 'delete from employee_leave_details where id = $1 and emp_id = $2';
                const result = await db.executePgSql(sql, [id, emp_id]);
                if(result.rowCount) {
                    return resolve(true);
                } return resolve(null);
            } catch (error) {
                return reject(error);
            }
        })
    }
}

module.exports = EmployeeModelClass