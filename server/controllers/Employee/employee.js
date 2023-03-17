const db = require('../../db/db');
const moment = require('moment');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
var id = 0;

// CREATE A NEW EMPLOYEE
exports.create = (req, res) => {
  id = id + 1;
  var EmpId = `OPxEMP${id}`;
  var EStatus = 'I';
  var Flag = 'E';
  var EmpCreatedDate = moment().format('YYYY-MM-DD hh:mm:ss');
  let tblemployee = req.body;
  bcrypt.hash(tblemployee.EmpPassword, saltRounds, (err, hash) => {
    if (!err) {
      query =
        'INSERT INTO tblemployee (EmpId, EmpName, EmpIntId, EmpDOB, EmpType, EmpMobile, EmpAadhar, EmpPassword, EmpAddr1, EmpAddr2, EmpCity, EmpPincode, EStatus, Flag, EmpCreatedDate) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      db.query(
        query,
        [
          EmpId,
          tblemployee.EmpName,
          tblemployee.EmpIntId,
          tblemployee.EmpDOB,
          tblemployee.EmpType,
          tblemployee.EmpMobile,
          tblemployee.EmpAadhar,
          hash,
          tblemployee.EmpAddr1,
          tblemployee.EmpAddr2,
          tblemployee.EmpCity,
          tblemployee.EmpPincode,
          EStatus,
          Flag,
          EmpCreatedDate,
        ],
        (err, results) => {
          if (!err) {
            return res
              .status(200)
              .json({ message: 'Employee created successfully' });
          } else {
            return res.status(500).json(err);
          }
        }
      );
    } else {
      console.log(err);
    }
  });
};
