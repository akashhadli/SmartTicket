const db = require('../../db/db');

exports.getTicketTypes = (req, res) => {
	let rid = req.body.RouteID;
	let query = `SELECT TicketType FROM tblRouteTicketType WHERE RouteID = '${rid}'`;
	db.query(query, (err, result) => {
		if (!err) {
			const data = JSON.parse(result[0].TicketType);
			let Ticketname = [];
			for (let i = 0; i < data.length; i++) {
				const TicketType = data[i];
				let query2 =
					'SELECT TTname, TTid, TTshortname FROM tblTicketType WHERE TTid = ?';
				db.query(query2, [TicketType], (err2, result2) => {
					if (!err2) {
						const ttname = result2[0].TTname;
						const ttid = result2[0].TTid;
						const ttshortname = result2[0].TTshortname;
						Ticketname.push({ ttname, ttid, ttshortname });
					} else {
						console.log(err2);
					}
				});
			}
			setTimeout(() => {
				res.status(200).json({ status: 201, data: Ticketname });
			}, 1000);
		} else {
			console.log(err);
		}
	});
};
