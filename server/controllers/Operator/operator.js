const db = require('../../db/db');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const saltRounds = 10;
var opid = 0;
var astid = 0;
var stgid = 0;
var rutid = 0;

//register operator
exports.createOperator = (req, res) => {
  let opid = 0;
  let tblOperator = req.body;
  opid = opid + 1;
  var OperId = `OP${opid}`;
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
  var query = 'SELECT * FROM tblOperator WHERE OperEmail=?';
  db.query(query, [tblOperator.OperEmail], (err, results) => {
    if (!err) {
      if (results.length > 0) {
        res.status(201).json({ status: 201, data: 'User already exist' });
      } else {
        res.send({ data: 'User doesnt exist' });
      }
    } else {
      res.send(err);
    }
  });
};

//create asset
exports.createAsset = (req, res) => {
  let tblasset = req.body;
  astid = astid + 1;
  let AstId = `A${astid}`;
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

//Create Stage
exports.createStage = (req, res) => {
  let tblstagemaster = req.body;
  stgid = stgid + 1;
  let StageID = `S${stgid}`;
  let CreatedDate = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
  var query =
    'INSERT INTO tblStageMaster (StageID, StageName, CreatedDate) values(?, ?, ?)';
  db.query(
    query,
    [StageID, tblstagemaster.StageName, CreatedDate],
    (err, results) => {
      if (!err) {
        return res
          .status(200)
          .json({ status: 201, data: 'stage created successfully' });
      } else {
        return res.status(500).json(err);
      }
    }
  );
};

//validate Stage by StageName
exports.validateStage = (req, res) => {
  const tblstagemaster = req.body;
  var query = 'SELECT * FROM tblStageMaster WHERE StageName = ?';
  db.query(query, [tblstagemaster.StageName], (err, results) => {
    if (!err) {
      if (results.length > 0) {
        res.status(201).json({
          status: 201,
          data: `${tblstagemaster.StageName} already exist`,
        });
      } else {
        res.send({ data: 'User doesnt exist' });
      }
    } else {
      res.send(err);
    }
  });
};

//create Route
exports.createRoute = (req, res) => {
  let tblroutemaster = req.body;
  rutid = rutid + 1;
  let RouteID = `R${rutid}`;
  let CreatedDate = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
  var query =
    'INSERT INTO tblRouteMaster (RouteID, RouteName, RouteEffDate, RouteSStage, RouteEStage, CreatedDate) values(?, ?, ?, ?, ?, ?)';
  db.query(
    query,
    [
      RouteID,
      tblroutemaster.RouteName,
      tblroutemaster.RouteEffDate,
      tblroutemaster.RouteSStage,
      tblroutemaster.RouteEStage,
      CreatedDate,
    ],
    (err, results) => {
      if (!err) {
        return res
          .status(200)
          .json({ status: 201, data: 'route created successfully' });
      } else {
        return res.status(500).json(err);
      }
    }
  );
};
