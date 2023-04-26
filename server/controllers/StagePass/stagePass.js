const db = require('../../db/db');

exports.stagePass = (req, res) => {
	let spData = req.body;
	let query =
		'INSERT INTO tblStagePass (EmpId, RouteID, StageId, idx, TimeStamp) VALUES (?, ?, ?, ?, ?)';
	db.query(
		query,
		[
			spData.EmpId,
			spData.RouteID,
			spData.StageId,
			spData.idx,
			spData.TimeStamp,
		],
		(err, results) => {
			if (!err) {
				res.json({ message: 'stage pass set' });
			} else {
				res.send('err');
			}
		}
	);
};
