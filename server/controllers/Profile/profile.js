const db = require('../../db/db');

// USER PROFILE DETAILS
exports.Profile = (req, res) => {
	let profdata = req.body;
	const flag = profdata.flag;
	if (flag === 'U') {
		let uid = profdata.id;
		let query =
			'SELECT Uname, Ugender, Umobile, Uemail, UDoB, UAddr1, UAddr2, Ucity, UPinCode, Uaadhar FROM tblCommuter Where UserId = ?';
		db.query(query, [uid], (err, results) => {
			if (!err) {
				res.send(results[0]);
			} else {
				res.send(err);
			}
		});
	}
	// EMPLOYEE PROFILE DEATAILS
	else if (flag === 'E') {
		{
			let eid = profdata.id;
			let query =
				'SELECT EmpName, EmpMobile, EmpAddr1, EmpAddr2, EmpCity, EmpPinCode, EmpAadhar FROM tblEmployee Where EmpId = ?';
			db.query(query, [eid], (err, results) => {
				if (!err) {
					res.send(results[0]);
				} else {
					res.send(err);
				}
			});
		}
	}
};
