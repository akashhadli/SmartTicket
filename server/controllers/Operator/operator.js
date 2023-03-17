const db = require('../../db/db');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const saltRounds = 10;
var id = 0;

//register operator
exports.createOperator = (req, res) => {
  let tblOperator = req.body;
  id = id + 1;
  var OperId = `OP${id}`;
  var OperStatus = 'I';
  let CreatedDate = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
  bcrypt.hash(tblOperator.OperPassword, saltRounds, (err, hash) => {
    if (!err) {
      let query =
        'INSERT INTO tblOperator (OperId, OperName, OperEmail, OperPhone, OperGSTIN, OperAddr1, OperAddr2, OperPassword, OperCity, OperPincode, OperStatus, OperContactName, OperContactMobile, OperContactEmail, OperCreatedDate) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      db.query(
        query,
        [
          OperId,
          tblOperator.OperName,
          tblOperator.OperEmail,
          tblOperator.OperPhone,
          tblOperator.OperGSTIN,
          tblOperator.OperAddr1,
          tblOperator.OperAddr2,
          hash,
          tblOperator.OperCity,
          tblOperator.OperPincode,
          OperStatus,
          tblOperator.OperContactName,
          tblOperator.OperPhone,
          tblOperator.OperContactEmail,
          CreatedDate,
        ],
        (err, results) => {
          if (!err) {
            return res.status(200).json({ status: 201, data: results });
          } else {
            return res.status(500).json({ data: err });
          }
        }
      );
    } else {
      console.log(err);
    }
  });
};

//get all operators
exports.getAllOperators = (req, res) => {
  let query = "SELECT * FROM tblOperator WHERE OperStatus = 'I'";
  db.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json({ status: 201, data: results });
    } else {
      return res.status(500).json({ status: 500, data: err });
    }
  });
};

//get operators by id
exports.getOperators = (req, res) => {
  const { OperId } = req.params;
  var query = `SELECT * FROM tblOperator WHERE OperId = '${OperId}'`;
  db.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json({ status: 201, data: results });
    } else {
      return res.status(500).json({ status: 500, data: err });
    }
  });
};

//validate Operators by email
exports.validateOperator = (req, res) => {
  const tblOperator = req.body;
  var query =
    'SELECT * FROM tblOperator WHERE OperEmail=? or OperContactEmail=?';
  db.query(
    query,
    [tblOperator.OperEmail, tblOperator.OperContactEmail],
    (err, results) => {
      if (!err) {
        if (results.length > 0) {
          res.status(201).json({ status: 201, data: 'User already exist' });
        } else {
          res.send({ data: 'User doesnt exist' });
        }
      } else {
        res.send(err);
      }
    }
  );
};

//create asset
exports.createAsset = (req, res) => {
  let tblasset = req.body;
  id = id + 1;
  let AstId = `A${id}`;
  let CreatedDate = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
  var query =
    'INSERT INTO tblAsset (AstId, AstRegNo, AstName, AstModel, AstChasNo, AstEngNo, AstPermitNo, AstInsurExp, AstPermitExp, AstCreatedDate) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(
    query,
    [
      AstId,
      tblasset.astRegNo,
      tblasset.astName,
      tblasset.astModel,
      tblasset.astChasNo,
      tblasset.astEngNo,
      tblasset.astPermitNo,
      tblasset.astInsurExp,
      tblasset.astPermitExp,
      CreatedDate,
    ],
    (err, results) => {
      if (!err) {
        return res
          .status(200)
          .json({ status: 201, data: 'Asset created successfully' });
      } else {
        return res.status(500).json(err);
      }
    }
  );
};
