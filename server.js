const http = require('http');
var express = require('express');
const passport = require('passport');
const cors = require('cors');
const jwtStrategy = require('./middleware/passport-jwt');

const employeeRoutes = require('./routes/employee-api.routes'); 

const app = express();

app.server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());

app.use(passport.initialize());
jwtStrategy();

app.use('/employee', employeeRoutes);



//error handler middleware
app.use((err, req, res, next) => {
    const errorStr = JSON.stringify({ message: err.message, stack: err.stack });
    console.log(errorStr);
    res.status(err.status || 500).send({
        error: {
          status: err.status || 500,
          message: err.message || 'Internal Server Error',
        },
      });
});

//server listening to defined PORT
const PORT = 2233;
app.server.listen(PORT, () => {
    console.log(`server running on PORT: ${PORT}`);
});

module.exports = app;