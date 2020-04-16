// const moment = require('moment');
const moment = require('moment-business-days');

const validService = require('../service/validate.service');
const jwtHelper = require('../helper/jwt');

const EmployeeModelClass = require('../model/employee.model');

const empModel = new EmployeeModelClass();

class EmployeeBizClass {
    async login(reqBody) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await empModel.getEmployeeLoginCred(reqBody.empid);
                if(! user) {
                    return resolve(false);
                }
                const authenticated =  validService.comparePassword(reqBody.password, user.emp_password);
                if(!authenticated) {
                    return resolve(false)
                }
                const token = jwtHelper.issue({ id: user.emp_id }, '1d');
                return resolve(token);
            } catch (error) {
                return reject(error);
            }
        });
    }

    async register(reqBody) {
        return new Promise(async (resolve, reject) => {
            try {
                const encryptedPass = validService.encryptPassword(reqBody.emp_password);
                const empDetails = {
                    emp_id: reqBody.emp_id,
                    emp_name: reqBody.emp_name,
                    emp_email: reqBody.emp_email
                };
                const userCred = {
                    emp_id: reqBody.emp_id,
                    emp_password: encryptedPass
                }
                const [empDetailResult, empCredDetails] = await Promise.all([empModel.insertEmployeeDetails(empDetails), empModel.saveEmployeeCred(userCred)])
                if(empCredDetails && empDetailResult) {
                  return resolve(true);
                } return resolve(false);
            } catch (error) {
                return reject(error);
            }
        });
    }

    leaveApply(reqBody) {
        return new Promise(async (resolve, reject) => {
            try {
                moment.updateLocale('us', {
                    workingWeekdays: [1, 2, 3, 4, 5]
                 });

                 const no_of_days = moment(reqBody.enddate, 'DD-MM-YYYY').businessDiff(moment(reqBody.startdate,'DD-MM-YYYY'));

                const leaveData = {
                    emp_id: reqBody.emp_id,
                    leave_type_id: reqBody.leavetypeid,
                    start_date: reqBody.startdate,
                    end_date: reqBody.enddate,
                    reason: reqBody.reason,
                    no_of_days: no_of_days
                };
                const insertResult = await empModel.insertLeaveDeatails(leaveData);
                if(insertResult) {
                    return resolve(true);
                } return resolve(false);
            } catch (error) {
                // console.log(error);
                return reject(error);
            }
        });
    }

    async deleteLeave(lid, emp_id) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await empModel.deleteLeaveDeatails(lid, emp_id);
                if(result) return resolve(true);
                return resolve(false);
            } catch (error) {
                return reject(error);
            }
        });
    }
}

module.exports = EmployeeBizClass