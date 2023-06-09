const db = require('../../db/db');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const axios = require('axios');
const qr = require('qr-image');
const saltRounds = 10;

//read last row from tblOperator by id
exports.getOperator = (req, res) => {
	var query = 'SELECT Num FROM tblOperator ORDER BY Num DESC LIMIT 1';
	db.query(query, (err, results) => {
		if (!err) {
			if (results.length > 0) {
				return res.status(200).json({ status: 201, data: results[0].Num });
			} else {
				return res.status(200).json({ status: 201, data: '0' });
			}
		} else {
			return res.status(500).json({ status: 500, data: err });
		}
	});
};

//register operator
exports.createOperator = (req, res) => {
	let tblOperator = req.body;
	let opid = parseInt(tblOperator.OperId);
	opid = opid + 1;
	var OperId = `OP${opid}`;
	var OperStatus = 'I';
	let CreatedDate = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
	bcrypt.hash(tblOperator.OperPassword, saltRounds, (err, hash) => {
		if (!err) {
			let query =
				'INSERT INTO tblOperator (Num, OperId, OperName, OperShortName, OperEmail, OperPhone, OperGSTIN, OperAddr1, OperAddr2, OperPassword, OperCity, OperPincode, OperStatus, OperContactName, OperContactMobile, OperContactEmail, OperCreatedDate) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
			db.query(
				query,
				[
					opid,
					OperId,
					tblOperator.OperName,
					tblOperator.OperShortName,
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

//Create Asset
exports.createAsset = (req, res) => {
	let tblAsset = req.body;
	const OperID = tblAsset.operId;
	var query1 = `SELECT Num,AstId FROM tblAsset WHERE AstId LIKE '%${OperID}%' ORDER BY Num DESC LIMIT 1`;
	db.query(query1, (err, result) => {
		if (!err) {
			if (result.length > 0) {
				var ast = parseInt(result[0].Num);
				let astid = ast + 1;
				let AstId = `${OperID}A${astid}`;
				let CreatedDate = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
				var query =
					'INSERT INTO tblAsset (Num, AstId, AstRegNo, AstName, AstModel, AstChasNo, AstEngNo, AstPermitNo, AstInsurExp, AstPermitExp, AstCreatedDate) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
				db.query(
					query,
					[
						astid,
						AstId,
						tblAsset.astRegNo,
						tblAsset.astName,
						tblAsset.astModel,
						tblAsset.astChasNo,
						tblAsset.astEngNo,
						tblAsset.astPermitNo,
						tblAsset.astInsurExp,
						tblAsset.astPermitExp,
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
			} else {
				let astid = result.length;
				astid = astid + 1;
				let AstId = `${OperID}A${astid}`;
				let CreatedDate = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
				var query =
					'INSERT INTO tblAsset (Num, AstId, AstRegNo, AstName, AstModel, AstChasNo, AstEngNo, AstPermitNo, AstInsurExp, AstPermitExp, AstCreatedDate) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
				db.query(
					query,
					[
						astid,
						AstId,
						tblAsset.astRegNo,
						tblAsset.astName,
						tblAsset.astModel,
						tblAsset.astChasNo,
						tblAsset.astEngNo,
						tblAsset.astPermitNo,
						tblAsset.astInsurExp,
						tblAsset.astPermitExp,
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
			}
		} else {
			console.log(err);
		}
	});
};

//create asset qrcode
exports.createQrcodeAsset = async (req, res) => {
	const data = req.body.data;
	//Qrcode using Qr-image
	const qrCode = qr.image(data, { type: 'png' });
	const qrCodeData = qr.imageSync(data, { type: 'png' }); // Get the QR code image data as a buffer
	res.send(qrCodeData.toString('base64')); // Send the QR code image data as the response

	// Create Qr code using Qr-code monkey
	// const apiKey =
	//   'zvfmiFY-JUvF_E6g23kOpylC7CmlnmAseIDk7rJairlJQhvw0kGW6Y1P6_1TQTUl';
	// const apiUrl = 'https://api.qrcode-monkey.com/qr/custom';
	// axios
	//   .post(
	//     apiUrl,
	//     {
	//       data: data,

	//       config:{
	//          "body": "circle",
	//          "eyeBall": "ball14",
	//           "logo":"https://iili.io/HOJjSwb.md.png",
	//        },
	//       "size":400,
	//       "download": true,
	//       "file": 'jpg',
	//     },
	//     {
	//       headers: {
	//         'X-QRCode-Monkey-API-Key': apiKey,
	//         'Content-Type': 'application/json',
	//       },
	//     }
	//   )
	//   .then((response) => {
	//     const qrcode = response.data;
	//     res.status(200).json({ status: 201, data: qrcode }); // The URL to the generated QR code image
	//   })
	//   .catch((error) => {
	//     console.error(error);
	//     res.sendStatus(500);
	//   });
};

//read asset by operator id
exports.readAsset = (req, res) => {
	let tblAsset = req.body;
	let operID = tblAsset.operId;
	let query = `SELECT AstId,AstRegNo,AstName,AstInsurExp,AstPermitExp,AStatus FROM tblAsset WHERE  AstId LIKE '%${operID}%'`;
	db.query(query, (err, result) => {
		if (!err) {
			res.status(200).json({ status: 201, data: result });
			return;
		} else {
			res.status(500).json({ message: 'asset not found to operator' });
		}
	});
};
//get asset by id
exports.getAssetById = (req, res) => {
	const { AstId } = req.params;
	var query = `SELECT * FROM tblAsset WHERE AstId = '${AstId}'`;
	db.query(query, (err, results) => {
		if (!err) {
			return res.status(200).json({ status: 201, data: results });
		} else {
			return res.status(500).json({ status: 500, data: err });
		}
	});
};

//soft delete from tblAsset by id
exports.deleteAsset = (req, res) => {
	const { AstId } = req.params;
	var AStatus = 'I';
	var query = 'UPDATE tblAsset SET AStatus = ? WHERE AstId = ? ';
	db.query(query, [AStatus, AstId], (err, results) => {
		if (!err) {
			if (results.affectedRows === 0) {
				return res.status(404).json({ message: 'Asset does not found' });
			}
			res.status(201).json({ status: 201, data: 'Asset deleted successfully' });
			return;
		} else {
			return res.status(500).json(err);
		}
	});
};

//update in tblAsset by id
exports.updateAsset = (req, res) => {
	const { AstId } = req.params;
	let tblAsset = req.body;
	let AstModifyDate = moment().format('YYYY-MM-DD hh:mm:ss');
	let query = `UPDATE tblAsset SET AstRegNo=?, AstName=?, AstModel=?, AstChasNo=?, AstEngNo=?, AstPermitNo=?, AstInsurExp=?, AstPermitExp=?, AstModifyDate=?, AStatus=? WHERE AstId  = '${AstId}'`;
	db.query(
		query,
		[
			tblAsset.astRegNo,
			tblAsset.astName,
			tblAsset.astModel,
			tblAsset.astChasNo,
			tblAsset.astEngNo,
			tblAsset.astPermitNo,
			tblAsset.astInsurExp,
			tblAsset.astPermitExp,
			AstModifyDate,
			tblAsset.astatus,
		],
		(err, result) => {
			if (!err) {
				if (result.affectedRows === 0) {
					return res.status(404).json({ message: 'Asset does not found' });
				}
				res
					.status(201)
					.json({ status: 201, data: 'Asset update successfully' });
				return;
			} else {
				return res.status(500).json(err);
			}
		}
	);
};

//Create Stage
exports.createStage = (req, res) => {
	var tblStageMaster = req.body;
	var operID = tblStageMaster.operId;
	var query1 = `SELECT Num,StageID FROM tblStageMaster WHERE StageID LIKE '%${operID}%' ORDER BY Num DESC LIMIT 1`;
	db.query(query1, (err, result) => {
		if (!err) {
			if (result.length > 0) {
				var stg = parseInt(result[0].Num);
				let stgid = stg + 1;
				let StageID = `${operID}S${stgid}`;
				let CreatedDate = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');

				var query =
					'INSERT INTO tblStageMaster (Num, StageID, StageName, CreatedDate) values(?, ?, ?, ?)';
				db.query(
					query,
					[stgid, StageID, tblStageMaster.StageName, CreatedDate],
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
			} else {
				let stgid = result.length;
				stgid = stgid + 1;
				let StageID = `${operID}S${stgid}`;
				let CreatedDate = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
				var query =
					'INSERT INTO tblStageMaster (Num, StageID, StageName, CreatedDate) values(?, ?, ?, ?)';
				db.query(
					query,
					[stgid, StageID, tblStageMaster.StageName, CreatedDate],
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
			}
		} else {
			console.log(err);
		}
	});
};

//validate Stage by StageName
exports.validateStage = (req, res) => {
	const tblStageMaster = req.body;
	const operID = tblStageMaster.operId;
	var query = `SELECT * FROM tblStageMaster WHERE StageName = ? AND StageID LIKE '%${operID}%`;
	db.query(query, [tblStageMaster.StageName], (err, results) => {
		if (!err) {
			if (results.length > 0) {
				res.status(201).json({
					status: 201,
					data: `${tblStageMaster.StageName} already exist`,
				});
			} else {
				res.send({ data: 'User doesnt exist' });
			}
		} else {
			res.send(err);
		}
	});
};

//read Stage
exports.readStage = (req, res) => {
	var tblStageMaster = req.body;
	var operID = tblStageMaster.operId;
	var query1 = `SELECT StageID,StageName FROM tblStageMaster WHERE StageID LIKE '%${operID}%'`;
	db.query(query1, (err, result) => {
		if (!err) {
			if (result.length > 0) {
				res.status(200).json({ status: 201, data: result });
				return;
			} else {
				res.status(200).json({ status: 201, data: 'Stage Not Found' });
			}
		} else {
			console.log(err);
		}
	});
};
// read stage for table
exports.readStageTbl = (req, res) => {
	var tblStageMaster = req.body;
	var operID = tblStageMaster.operId;
	var query1 = `SELECT * FROM tblStageMaster WHERE StageID LIKE '%${operID}%'`;
	db.query(query1, (err, result) => {
		if (!err) {
			if (result.length > 0) {
				res.status(200).json({ status: 201, data: result });
				return;
			} else {
				res.status(200).json({ status: 201, data: 'Stage Not Found' });
			}
		} else {
			console.log(err);
		}
	});
};

//get stage by id
exports.getStageById = (req, res) => {
	const { StageID } = req.params;
	var query = `SELECT * FROM tblStageMaster WHERE StageID = '${StageID}'`;
	db.query(query, (err, results) => {
		if (!err) {
			return res.status(200).json({ status: 201, data: results });
		} else {
			return res.status(500).json({ status: 500, data: err });
		}
	});
};
//soft delete from tblStage by id
exports.deleteStage = (req, res) => {
	const { StageID } = req.params;
	var StageStatus = 'I';
	var query = 'UPDATE tblStageMaster SET StageStatus = ? WHERE StageID = ? ';
	db.query(query, [StageStatus, StageID], (err, results) => {
		if (!err) {
			if (results.affectedRows === 0) {
				return res.status(404).json({ message: 'Stage does not found' });
			}
			res.status(201).json({ status: 201, data: 'Stage deleted successfully' });
			return;
		} else {
			return res.status(500).json(err);
		}
	});
};

//update in tblAsset by id
exports.updateStage = (req, res) => {
	const { StageID } = req.params;
	let tblStageMaster = req.body;
	let ModifyDate = moment().format('YYYY-MM-DD hh:mm:ss');
	let query = `UPDATE tblStageMaster SET StageName=?, ModifyDate=?, StageStatus=? WHERE StageID  = '${StageID}'`;
	db.query(
		query,
		[tblStageMaster.StageName, ModifyDate, tblStageMaster.stgstatus],
		(err, result) => {
			if (!err) {
				if (result.affectedRows === 0) {
					return res.status(404).json({ message: 'Stage does not found' });
				}
				res
					.status(201)
					.json({ status: 201, data: 'Stage update successfully' });
				return;
			} else {
				return res.status(500).json(err);
			}
		}
	);
};

//create Route
exports.createRoute = (req, res) => {
	let tblRouteMaster = req.body;
	const OperId = tblRouteMaster.operId;
	var query1 = `SELECT Num,RouteID FROM tblRouteMaster WHERE RouteID LIKE '%${OperId}%' ORDER BY Num DESC LIMIT 1`;
	db.query(query1, (err, result) => {
		if (!err) {
			if (result.length > 0) {
				var rut = parseInt(result[0].Num);
				var rutid = rut + 1;
				let RouteID = `${OperId}R${rutid}`;
				let CreatedDate = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
				var query =
					'INSERT INTO tblRouteMaster (Num, RouteID, RouteName, RouteEffDate, RouteSStage, RouteEStage, CreatedDate) values(?, ?, ?, ?, ?, ?, ?)';
				db.query(
					query,
					[
						rutid,
						RouteID,
						tblRouteMaster.RouteName,
						tblRouteMaster.RouteEffDate,
						tblRouteMaster.RouteSStage,
						tblRouteMaster.RouteEStage,
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
			} else {
				rutid = result.length;
				rutid = rutid + 1;
				let RouteID = `${OperId}R${rutid}`;
				let CreatedDate = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
				var query =
					'INSERT INTO tblRouteMaster (Num, RouteID, RouteName, RouteEffDate, RouteSStage, RouteEStage, CreatedDate) values(?, ?, ?, ?, ?, ?, ?)';
				db.query(
					query,
					[
						rutid,
						RouteID,
						tblRouteMaster.RouteName,
						tblRouteMaster.RouteEffDate,
						tblRouteMaster.RouteSStage,
						tblRouteMaster.RouteEStage,
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
			}
		} else {
			console.log(err);
		}
	});
};

//read Route
exports.readRoute = (req, res) => {
	let tblRouteMaster = req.body;
	const OperId = tblRouteMaster.operId;
	var query1 = `SELECT RouteID,RouteName,RouteSStage,RouteEStage FROM tblRouteMaster WHERE RouteID LIKE '%${OperId}%'`;
	db.query(query1, (err, result) => {
		if (!err) {
			if (result.length > 0) {
				res.status(200).json({ status: 201, data: result });
				return;
			} else {
				res.status(200).json({ status: 201, data: 'Route Not Found' });
			}
		} else {
			console.log(err);
		}
	});
};

//create routestage map
exports.createRoutemap = (req, res) => {
	let tblRouteStageMap = req.body;
	const RouteID = tblRouteStageMap.route;
	const stageArr = tblRouteStageMap.stage;
	const fareArr = tblRouteStageMap.fare;
	const effDate = tblRouteStageMap.effDate;

	const insertValues = async () => {
		for (let i = 0; i < stageArr.length; i++) {
			const routeVal = stageArr[i];
			const fareVal = fareArr[i];
			const query =
				'INSERT INTO tblRouteStageMap (RouteID, StageID, Fare, EffectiveDate) VALUES (?, ?, ?, ?)';
			await new Promise((resolve, reject) => {
				db.query(
					query,
					[RouteID, routeVal, fareVal, effDate],
					(error, results) => {
						if (error) {
							reject(error);
						} else {
							resolve(results);
						}
					}
				);
			});
		}
	};

	insertValues()
		.then(() => {
			res
				.status(200)
				.json({ status: 201, data: 'All values inserted successfully' });
		})
		.catch((error) => {
			console.error(error);
			res.status(500).send('Error inserting values');
		});
};
