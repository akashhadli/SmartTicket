const express = require('express');
const db = require('./db/db');
const app = express();
const cors = require('cors');
const port = 8004;

const loginRoute = require('./routes/Login/login');
const adminRoute = require('./routes/Admin/admin');
const findRoute = require('./routes/Find/find');
const userRoute = require('./routes/User/user');
const employeeRoute = require('./routes/Employee/employee');
const operatorRoute = require('./routes/Operator/operator');
const faqsRoute = require('./routes/FAQs/FAQs');
const otpRoute = require('./routes/OTP/otp');
const setPassRoute = require('./routes/SetPassword/setPassword');
const chngPassRoute = require('./routes/ChngPassword/chngPassword');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/login', loginRoute);
app.use('/admin', adminRoute);
app.use('/user', userRoute);
app.use('/employee', employeeRoute);
app.use('/operator', operatorRoute);
app.use('/faqs', faqsRoute);
app.use('/find', findRoute);
app.use('/otp', otpRoute);
app.use('/set', setPassRoute);
app.use('/chng', chngPassRoute);

app.listen(port, () => {
	console.log(`server listening on ${port}`);
});
