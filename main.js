const express = require("express");
const app = express();
const validUrl = require("valid-url");
const sqlite = require("sqlite3");
const crypto = require("crypto");
const appName = "gShortLink";

function randomValueHex (len) {
	    return crypto.randomBytes(Math.ceil(len/2))
	        .toString('hex') // convert to hexadecimal format
	        .slice(0,len);   // return required number of characters
}

let db = new sqlite.Database("./test.db");

app.get("/saveUrl", (req,res) => {
	var url = req.query.url;
	db.all("SELECT id FROM urls WHERE url=?", [url], (err,data) => {
		if (err)
			console.log(err);
		if (!data[0]) {	
			if (validUrl.isUri(url)) {
				var randomString = randomValueHex(9);
				db.run("INSERT INTO urls (id, url) VALUES (?,?)", [randomString,url], () => {
					res.send('[{"id":"' + randomString + '"}]');	
				});
			} else {
				res.send("not_valid");
			}
		} else {
			res.send(data);
		}
	});
});

app.get("/:id", (req,res) => {
	var id = req.params.id;
	console.log(id);
	if (id.length === 9) {
		db.all("SELECT * FROM urls WHERE id=?", [id], (err, result) => {
			if (err) {
				res.send(err);
				return;
			}
			res.send(result[0]);	
		});
	} else {
		res.send("not_valid");
	}
});


const server = app.listen(8081, () => {
	const address = server.address();
	const host = address.address;
	const port = address.port;
	console.log("%s is listening at http://%s:%s", appName, host, port);
});
