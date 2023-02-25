const express = require("express");

// ---------------------------------------------------------------------------------------
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//redirect to loading page
app.use('/', express.static("./dist", {index: "index.html"}));

// ---------------------------------------------------------------------------------------

//Web-server start
	app.listen(3000);
	console.log('RUNNING\n');

//Shutdown
process.addListener('exit', args => {
	console.log('STOPPED\n');
});