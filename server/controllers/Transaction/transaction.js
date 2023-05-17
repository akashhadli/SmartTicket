const db = require('../../db/db');
const moment = require('moment');
const qr = require('qr-image');
var id = 0;

// CREATE TRANSACTION ID
exports.getTransID = (req, res) => {
	let transData = req.body;
	let date = new Date();

	let day = date.getDate();

	let month = date.getMonth() + 1;

	let year = date.getFullYear();

	let hours = date.getHours();

	let minutes = date.getMinutes();

	let seconds = date.getSeconds();

	if (day < 10) {
		day = '0' + day;
	}
	if (month < 10) {
		month = '0' + month;
	}
	if (hours < 10) {
		hours = '0' + hours;
	}
	if (minutes < 10) {
		minutes = '0' + minutes;
	}
	if (seconds < 10) {
		seconds = '0' + seconds;
	}

	const orderTimeStamp =
		year +
		'-' +
		month +
		'-' +
		day +
		' ' +
		hours +
		':' +
		minutes +
		':' +
		seconds;
	console.log(orderTimeStamp);

	let slicedyear = year.toString().slice(2, 4);

	// This arrangement can be altered based on how we want the date's format to appear.
	let currentDate = `${slicedyear}${month}${day}`; // "YYMMDD"
	console.log('out', currentDate);
	var query1 = `SELECT Num, OrderID FROM tblTransaction WHERE OrderID LIKE '%${currentDate}%' ORDER BY Num DESC LIMIT 1`;
	db.query(query1, (err, result) => {
		if (!err) {
			if (result.length > 0) {
				let num = parseInt(result[0].Num);
				let Num = num + 1;
				var OrderID = `T${currentDate}${Num}`;
				console.log('first', OrderID);
				if (!err) {
					var query =
						'INSERT INTO tblTransaction (Num, Id, RouteName, StartStage, EndStage, Passengers, Fare, TType, OrderID, OrderTimeStamp) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
					db.query(
						query,
						[
							Num,
							transData.Id,
							transData.RouteName,
							transData.StartStage,
							transData.EndStage,
							transData.Passengers,
							transData.Fare,
							transData.Ttype,
							OrderID,
							orderTimeStamp,
						],
						(err, results) => {
							if (!err) {
								return res.status(200).json({
									message: 'OrderID generated',
									data: { orderid: `${OrderID}` },
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
			} else {
				let Num = result.length;
				Num = Num + 1;
				var OrderID = `T${currentDate}${Num}`;
				console.log('second', OrderID);
				if (!err) {
					var query =
						'INSERT INTO tblTransaction (Num, Id, RouteName, StartStage, EndStage, Passengers, Fare, TType, OrderID, OrderTimeStamp) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
					db.query(
						query,
						[
							Num,
							transData.Id,
							transData.RouteName,
							transData.StartStage,
							transData.EndStage,
							transData.Passengers,
							transData.Fare,
							transData.Ttype,
							OrderID,
							orderTimeStamp,
						],
						(err, results) => {
							if (!err) {
								return res.status(200).json({
									message: 'OrderID generated',
									data: { orderid: `${OrderID}` },
								});
							} else {
								return res.status(500).json(err);
							}
						}
					);
				} else {
					console.log(err);
				}
			}
		} else {
			console.log(err);
		}
	});
};

// update transactionID, Status and Timestamp fields
exports.getPaymentInfo = (req, res) => {
	let payData = req.body;
	let oid = payData.OrderID;
	let query =
		'UPDATE tblTransaction SET TransactionID = ?, TransactionTimeStamp = ?, Status = ? WHERE OrderID = ?';
	db.query(
		query,
		[payData.transid, payData.timestamp, payData.tstatus, oid],
		(err, results) => {
			if (!err) {
				res.json({ message: 'Edit Success', time: `${payData.timestamp}` });
			} else {
				res.json({ message: 'Edit Failure' });
			}
		}
	);
};

//create asset qrcode
exports.createTransQR = async (req, res) => {
	const qrstring = req.body;
	console.log('qrsrting', req.body);
	const oid = qrstring.orderid;
	const Tgen = qrstring.Tgen;
	const qrstatus = 'A';

	const data = JSON.stringify(qrstring);
	console.log(data);

	//Qrcode using Qr-image
	const qrCodeData = qr.imageSync(data, { type: 'png' }); // Get the QR code image data as a buffer
	var QRVal = qrCodeData.toString('base64');

	const query =
		'UPDATE tblTransaction SET QR = ?, QRStatus = ?, Tdata = ?, Tgen = ? WHERE OrderID = ?';
	db.query(query, [QRVal, qrstatus, data, Tgen, oid], (err, result) => {
		if (!err) {
			console.log('in', data);
			res.send(QRVal); // Send the QR code image data as the response
			return;
		} else {
			res.send(err);
		}
	});
};

// qrverify
exports.transQRVerify = async (req, res) => {
	let payData = req.body;
	let oid = payData.OrderID;
	console.log(payData);
	let qrok = 'I';
	let query = 'SELECT QRStatus FROM tblTransaction WHERE OrderID = ?';
	db.query(query, [oid], (err, results) => {
		if (!err) {
			if (results[0].QRStatus == 'A') {
				let query1 = 'UPDATE tblTransaction SET QRStatus = ? WHERE OrderID = ?';
				db.query(query1, [qrok, oid], (err, results) => {
					if (!err) {
						res.json({ message: 'OK' });
					}
				});
			} else {
				res.json({ message: 'Not OK' });
			}
		}
	});
};

// transaction history
exports.getHistory = async (req, res) => {
	let uid = req.body.UserId;
	var query = 'SELECT Tdata FROM tblTransaction WHERE Id = ?';
	db.query(query, [uid], (err, results) => {
		if (!err) {
			res.json(results);
		} else {
			res.send(err);
		}
	});
};

// get last ticket
exports.getLasTicket = async (req, res) => {
	let uid = req.body.UserId;
	var query = 'SELECT Tdata FROM tblTransaction WHERE Id = ?';
	db.query(query, [uid], (err, results) => {
		if (!err) {
			res.json(results[results.length - 1]);
		} else {
			res.send(err);
		}
	});
};
