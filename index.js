require("dotenv").config();
require("./config/passport");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const fs = require("fs");

// initialize express
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(morgan("tiny"));
app.use(cors());

// routes
fs.readdirSync("./routes").map(r => app.use("/api", require("./routes/" + r)));

//error handling
app.use((req, res) => {
	res.status(404).json({ message: "resource not found on this server" });
});

app.use((err, req, res, next) => {
	console.log(err);
	let code = 500;
	if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
		code = 401;
	}
	if (process.env.NODE_ENV === "development") {
		res.status(code).json({ error: err.message });
	} else {
		res.status(code).json({ message: " Your mom is sad." });
	}
});

//server hosting
app.listen(process.env.PORT || 8765, () =>
	console.log("server listening on port " + process.env.PORT || 8765)
);
