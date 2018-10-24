var express = require('express'),
	app = express();


app.get("/", function(req,res){
	res.send("Homepage");
})

app.listen(8080, function(){
	console.log("Sever is running");
})