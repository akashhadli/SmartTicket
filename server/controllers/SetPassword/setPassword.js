const db = require('../../db/db');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

//SET OR RESET USER PASSWORD
exports.setPassword = (req, res) => {
  let tblCommuter = req.body;
  let id = tblCommuter.UserId;
  bcrypt.hash(tblCommuter.UPassword, saltRounds, (err, hash) => {
    if (!err) {
      query = 'UPDATE tblCommuter SET UPassword = ? WHERE UserId = ?';
      db.query(query, [hash, id], (err, results) => {
        if (!err) {
          if (results.affectedRows == 0) {
            return res.status(404).json({ message: 'User ID not Found' });
          }
          updtPassInAuth(hash, id);
          return res.status(200).json({ message: 'Password Set' });
        } else {
          return res.status(500).json(err);
        }
      });
    } else {
      console.log(err);
    }
  });
};

//UPDATE PASSWORD IN AUTHTABLE
const updtPassInAuth = (password, id) => {
  var query = 'UPDATE tblAuth SET Password = ? WHERE AuthId = ?';
  db.query(query, [password, id], (err, results) => {
    if (!err) {
      if (results.affectedRows == 0) {
        console.log('User not found');
      } else {
        console.log('Password set in auth');
      }
    }
  });
};
