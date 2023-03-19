const db = require('../../db/db');
const moment = require('moment');
var id = 0;

// CREATE A NEW USER IN USERTABLE
exports.register = (req, res) => {
  id = id + 1;
  var UserId = `U${id}`;
  var UStatus = 'I';
  var Flag = 'U';
  var UCreatedDate = moment().format('YYYY-MM-DD hh:mm:ss');
  let tblCommuter = req.body;
  query =
    'INSERT INTO tblCommuter (UserId, Umobile, UDoB, UStatus, Flag, UCreatedDate) VALUES(?, ?, ?, ?, ?, ?)';
  db.query(
    query,
    [UserId, tblCommuter.Mobile, tblCommuter.Dob, UStatus, Flag, UCreatedDate],
    (err, result) => {
      if (!err) {
        insertTblOtp(UserId, tblCommuter.Mobile, Flag);
        return res
          .status(200)
          .json({ message: 'user created', data: `${UserId}` });
      } else {
        return res.status(500).json(err);
      }
    }
  );
};

//INSERT OTP INTO OTPTABLE
const insertTblOtp = (id, mobile, flag) => {
  var otp = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
  var createdtime = moment().format('YYYY-MM-DD hh:mm:ss');
  query =
    'INSERT INTO tblOtp (id, mobile, flag, otp, createdtime) VALUES(?, ?, ?, ?, ?)';
  db.query(query, [id, mobile, flag, otp, createdtime], (err, result) => {
    if (!err) {
      // sendSMS(otp);
      return console.log('inserted into tblotp');
    } else {
      return console.log(err);
    }
  });
};

// CALL SMS API
// const sendSMS = (Eotp) => {
//   const client = new twilio(
//     'AC4a9df1bac3df96fc0e86a29f95592576',
//     '22c765466032d111c2a9a370ad154996'
//   );

//   return client.messages
//     .create({
//       body: `${Eotp}`,
//       from: '+12764962602',
//       to: '+917892067697',
//     })
//     .then((message) => {
//       console.log(message, 'Message Sent');
//     })
//     .catch((err) => {
//       console.log(err, 'Message NOT Sent');
//     });
// };

// USER PROFILE DETAILS
exports.profile = (req, res) => {
  const id = req.body.id;
  let query =
    'SELECT Uname, Ugender, Umobile, Uemail, UDoB, UAddr1, UAddr2, Ucity, UPinCode, Uaadhar FROM tblCommuter Where UserId = ?';
  db.query(query, [id], (err, results) => {
    if (!err) {
      res.send(results);
    } else {
      res.send(err);
    }
  });
};

// EDIT PROFILE
exports.editprofile = (req, res) => {
  let data = req.body;
  let query = 'UPDATE tblCommuter SET Uname = ?, Ugender = ?, Uemail = ?, UAddr1 = ?, UAddr2 = ?, Ucity = ?, UPinCode = ?, Uaadhar = ? WHERE UserId = ?';
  db.query(query, [data.Uname, data.Ugender, data.Uemail, data.UAddr1, data.UAddr2, data.Ucity, data.UPinCode, data.Uaadhar, data.id], (err, results) => {
    if (!err) {
      return res.status(200).json({ message: 'Profile Updated' });
    } else {
      return res.status(400).json({ err });
    }
  });
};
