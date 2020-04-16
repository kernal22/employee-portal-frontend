const EmployeeModelClass = require('../model/employee.model');
const EmployeeBizClass = require('../biz/employee.biz');

class EmployeeClass {

    async login(req, res) {
        try {
            const reqBody = req.body;
            if(!reqBody.empid || !reqBody.password) {
                throw new Error('Employee ID or Password is missing');
            }
            const empBiz = new EmployeeBizClass();
            const response = await empBiz.login(reqBody);
            if(!response) {
                return res.json({ status: false, err: 'unauthorized' });
            }
            return res.json({status: true, token: response});
        } catch (error) {
             throw new Error(error);  
        }
    }

    async register(req, res) {
        try {
            const reqBody = req.body;
            if(!reqBody.emp_id && !reqBody.emp_password && !reqBody.emp_name && !req.emp_email) {
                return res.json({status: false, err: 'Data is not valid'});
            }

            const empBiz = new EmployeeBizClass();
            const response = await empBiz.register(reqBody);
            if(!response) {
                return res.json({ status: false, err: 'Internal Server Error' });
            }
            return res.json({status: true, msg: 'Details Saved'});
        } catch (error) {
             throw new Error(error);  
        }
    }

    async getEmployeeDetails(req, res) {
        try {
            const emp_id = req.user.id;
            if(!emp_id) {
                throw new Error('Emp Id missing');
            }
            const emp = new EmployeeModelClass();
            const data = await emp.getEmployeeDetails(emp_id);
    
            res.send({status: true, data});   
        } catch (error) {
            return res.json({status: false, err: error});
        }
    }

    async leaveApply(req, res) {
        try {
            const reqBody = req.body;
            if(! reqBody) {
                return res.json({status: false, err: 'Data is not valid'});
            }
            const empBiz = new EmployeeBizClass();
            const result = await empBiz.leaveApply(reqBody);
            if(result) {
                return res.send({status: true, data: "Leave applies successfully"}); 
            } return res.send({status: false, data: "Error occured"}); 
        } catch (error) {
            return res.json({status: false, err: error});
        }
    }

    async deleteLeave(req, res) {
        try {
            const lid = req.body.lid;
            const emp_id = req.user.id;
            
            if(!lid || !emp_id) {
                return res.json({status: false, err: 'Data is missing'});
            }
            const empBiz = new EmployeeBizClass();
            const result = await empBiz.deleteLeave(lid, emp_id);
            if(result) {
                return res.send({status: true, data: "Leave deleted successfully"}); 
            } return res.send({status: false, data: "Error occured"}); 
        } catch (error) {
            return res.json({status: false, err: error});
        }
    }
}

module.exports = EmployeeClass