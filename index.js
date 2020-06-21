var express = require("express");
var index = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var Vacc = require('./models/vacc');
 var Admin = require('./models/admin');
var schedule = require('node-schedule');
const msg91sms = require('msg91-lib').msg91SMS;
 var Email = require('./accounts/email');
const shortid = require('shortid');


 
console.log(shortid.generate());

const msg91SMS = new msg91sms('288868Ax9kMJOWHtfC5e3448e4P1', '611332', 1, 91);

var pdf = require("dynamic-html-pdf");
var fs = require("fs");


var ejs = fs.readFileSync("./views/index.ejs",'utf8');

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 25,
    secure: false,
    requireTLS: true,
  auth: {
    user: 'nabanitabania78',
    pass: 'Tanveer123'
  },
  tls: {
	  rejectUnauthorized: false
  }
});

var ejs = require("ejs");





    


index.get("/download/:id",function(req,res){

	Vacc.findById(req.params.id, function(err,found)
				 {

					var dataimp = found['_id'];

					var data = found['info'];
					var data1 = found['hour'];
					var data2 = found['week6'];
					var data3 = found['week10'];
					var data4 = found['week14'];
					var data5 = found['month6'];
					

		if(err)
			{
				console.log("error");
			}
		else
			{
				
				var options = {
					format: "A3",
					orientation: "potrait",
					border: "10mm"
				};

				var document = {
					template: ejs,
					context: {
						vaccimp : dataimp,
						vacc : data,
						vacc1 : data1,
						vacc2 : data2,
						vacc3 : data3,
						vacc4 : data4,
						vacc5 : data5
					},
					path: './output.pdf'
				};

				pdf.create(document,options)
					.then(res=> {
						console.log(res)
					})
					.catch(error=>{
						console.log(error)
					});
					var file = fs.readFileSync(__dirname + "/output.pdf" , "binary");
					res.setHeader('Content-Length', file.length);
					res.write(file , 'binary');
					res.end();
							}
	});
});

index.get('/download', function(req,res){
	res.redirect('/download/:id');
	
});




//====================================================================

mongoose.connect("mongodb://localhost/vacc_app", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology:true
	});
	
index.set("view engine","ejs");
index.use(express.static("public"));
index.use(methodOverride("_method"));
index.use(bodyParser.urlencoded({extended: true}));

//=========================Routes=======================================



index.get("/",function(req,res){
	res.render("home");
});



index.get("/signup", function(req, res){
	res.render("form");
});



index.get("/idgenerate", function(req,res){
	Vacc.find({},function(err, vaccs){
		if(err)
			{
				console.log("ERRor");
			}
		else
			{
				
				res.render("idpage",{vaccs: vaccs});
			}
	});
});



index.post("/idgenerate", function(req, res){
	var email=req.body.email;
	var phn=req.body.phone;
	Vacc.create(req.body.vacc, function(err, newblog){
		if(err)
			{
				console.log("new not created");
			}
		else
			{
				//  Email(newblog.info.email,newblog._id,newblog.info.phone);
				res.redirect("/idgenerate");
			}
	});
});

index.get("/login", function(req,res){
	Vacc.find({},function(err, vaccs){
		if(err)
			{
				console.log("ERRor");
			}
		else
			{
				
				res.render("login",{vaccs: vaccs});
			}
	});
});

index.get("/login/details/:id",function(req,res){
	var id = req.params.id;
	var phone = req.body.phone ; 
	Vacc.findById({_id:id}, function(err, found){
		if(err)
			{
				res.redirect("/login");
			}
		if (found===null){
			res.redirect('/login');
		}else{
			res.render('details',{vacc:found});
		}
	});
});


index.post("/login/details",function(req,res){
	var id = req.body.id;
	var phone = req.body.phone ; 
	Vacc.findById({_id:id}, function(err, found){
		if(err)
			{
				res.redirect("/login");
			}
		if (found===null){
			res.redirect('/login');
		}else{
			res.render('details',{vacc:found});
		}
	});
});



index.get("/details/:id/edit",function(req,res){
	Vacc.findById(req.params.id, function(err,found)
				 {
		if(err)
			{
				console.log("error");
			}
		else
			{
					res.render("edit",{vacc: found});
			}
	});
});




index.put("/details/:id",function(req,res){
	var stdate = req.body.stdate;
	var endate = req.body.vacc['date'];
	var phone = req.body.vacc['info.phone'];
	var email = req.body.vacc['info.email'];

	Vacc.findByIdAndUpdate(req.params.id,req.body.vacc, function(err,found)
						  {
		if(err)
			{
				console.log("error");
			}
		else
			{
				  var showUrl = "/details/" + req.params.id;

					let startTime = stdate;
					let endTime = endate;

				
					console.log(found.info.hospital);

					smsobj = [{
					"message": req.params.id + " is your ID. Please vaccinate your child before 24 hours" ,
					"to": [phone] // it can be comma separated list of numbers also each number can be either string or integer/number
					}]
					args = {  // it can be either javascript object or JSON object
					sender:'611332',
					sms:smsobj
					}

					console.log(smsobj);
					
					var j = schedule.scheduleJob({ start: startTime, end: endTime, rule: '*/1 * * * *' }, function(){
					console.log('Time for tea!');
						

					});

					// msg91SMS.send(args) // no need to pass contactNumbers and message parameter as we are passing sms key
					// 	.then((response) => {
					// 		console.log(response);
					// 	}).catch((error) => {
					// 		console.log(error);
					// 		if (error.data) {
					// 			console.log(error.data); // object containing api error code
					// 		} else {
					// 			console.log(error.message); // error message due to any other failure
					// 		}
					// 	});

					console.log(email);

					ejs.renderFile(__dirname + "/views/test.ejs", { vacc : found }, function (err, data) {
						if (err) {
							console.log(err);
						} else {
							var mainOptions = {
							from: 'nabanitabania78@gmail.com',
								to: email,
								subject: 'Hello, world',
								html: data
							};
							// console.log("html data ======================>", mainOptions.html);
							// transporter.sendMail(mainOptions, function (err, info) {
							// 	if (err) {
							// 		console.log(err);
							// 	} else {
							// 		console.log('Message sent: ' + info.response);
							// 	}
							// });
						}
						
						});
				
					
					
										
					console.log(startTime);
					console.log(endTime);

                   res.redirect(showUrl);
			}
	});
});







index.get('/details/:id',function(req,res){
	Vacc.findById(req.params.id,function(err,updated){
		if(err){
			console.log("error");
		}
		else{
			res.render('details',{vacc:updated})
		}
	});
});





index.get('/login/admin',function(req,res){
		res.render('login_admin');
});

index.post('/login/admin',function(req,res){
	var username = req.body.user;
	var password = req.body.password;
	var district = req.body.vacc['info.district'];
	Admin.find({user:username,password:password},function(err,run){
		if(err){
			console.log(err);
		}else if(run.length==0){
			res.redirect('/login/admin');
			
		}else{
			console.log(district);
			Vacc.find({'info.district':district},function(err,vaccs){
				
				if(err){
					console.log(err);
				}else{
				  res.render("showall",{vaccs: vaccs});
				}
			})
		  
			
		}
	})
});



index.listen(9000, function(req,res){
    console.log("Vaccination server started");
})
// nYJGOKyvbfzsVm^*7vYi