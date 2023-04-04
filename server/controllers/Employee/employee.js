const db = require('../../db/db');
// const twilio = require('twilio');
const moment = require('moment');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

// CREATE A NEW EMPLOYEE
exports.create = (req, res) => {
	let tblEmployee = req.body;
	const OperID = tblEmployee.operId;
	var query1 = `SELECT Num,EmpId FROM tblEmployee WHERE EmpId LIKE '%${OperID}%' ORDER BY Num DESC LIMIT 1`;
	db.query(query1, (err, result) => {
		if (!err) {
			if (result.length > 0) {
				let emp = parseInt(result[0].Num);
				let empid = emp + 1;
				var EmpId = `${OperID}EMP${empid}`;
				var EStatus = 'I';
				var EmpCreatedDate = moment().format('YYYY-MM-DD hh:mm:ss');
				bcrypt.hash(tblEmployee.EmpPassword, saltRounds, (err, hash) => {
					if (!err) {
						var query =
							'INSERT INTO tblEmployee (Num, EmpId, EmpName, EmpIntId, EmpDOB, EmpType, EmpMobile, EmpAadhar, EmpPassword, EmpAddr1, EmpAddr2, EmpCity, EmpPincode, EStatus,  EmpCreatedDate) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
						db.query(
							query,
							[
								empid,
								EmpId,
								tblEmployee.EmpName,
								tblEmployee.EmpIntId,
								tblEmployee.EmpDOB,
								tblEmployee.EmpType,
								tblEmployee.EmpMobile,
								tblEmployee.EmpAadhar,
								hash,
								tblEmployee.EmpAddr1,
								tblEmployee.EmpAddr2,
								tblEmployee.EmpCity,
								tblEmployee.EmpPincode,
								EStatus,
								EmpCreatedDate,
							],
							(err, results) => {
								if (!err) {
									return res.status(200).json({
										status: 201,
										data: 'Employee created successfully',
									});
								} else {
									return res.status(500).json(err);
								}
							}
						);
						return;
					} else {
						console.log(err);
					}
				});
			} else {
				let empid = result.length;
				empid = empid + 1;
				let EmpId = `${OperID}EMP${empid}`;
				let EStatus = 'I';
				let EmpCreatedDate = moment().format('YYYY-MM-DD hh:mm:ss');
				bcrypt.hash(tblEmployee.EmpPassword, saltRounds, (err, hash) => {
					if (!err) {
						var query =
							'INSERT INTO tblEmployee (Num, EmpId, EmpName, EmpIntId, EmpDOB, EmpType, EmpMobile, EmpAadhar, EmpPassword, EmpAddr1, EmpAddr2, EmpCity, EmpPincode, EStatus,  EmpCreatedDate) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
						db.query(
							query,
							[
								empid,
								EmpId,
								tblEmployee.EmpName,
								tblEmployee.EmpIntId,
								tblEmployee.EmpDOB,
								tblEmployee.EmpType,
								tblEmployee.EmpMobile,
								tblEmployee.EmpAadhar,
								hash,
								tblEmployee.EmpAddr1,
								tblEmployee.EmpAddr2,
								tblEmployee.EmpCity,
								tblEmployee.EmpPincode,
								EStatus,
								EmpCreatedDate,
							],
							(err, results) => {
								if (!err) {
									return res.status(200).json({
										status: 201,
										data: 'Employee created successfully',
									});
								} else {
									return res.status(500).json(err);
								}
							}
						);
					} else {
						console.log(err);
					}
				});
			}
		} else {
			console.log(err);
		}
	});
};
