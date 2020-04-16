const router = require('express').Router();
const passport = require('passport');
const EmployeeController = require('../controller/employee.controller');

const employeeController = new EmployeeController();

router.post('/login', employeeController.login);
router.post('/register', employeeController.register);
router.get('/getEmployeeDetails', passport.authenticate('jwt', { session: true }), employeeController.getEmployeeDetails);
router.post('/leaveApply', employeeController.leaveApply);
router.delete('/deleteLeave', employeeController.deleteLeave);

module.exports = router;