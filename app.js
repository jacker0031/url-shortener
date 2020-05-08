//express
const express = require("express");
const app = express();

//handlebars for views
const Handlebars = require("handlebars");
app.set('view engine', 'hbs')


var cors = require("cors");
app.use(cors());

require("dotenv").config();


//for post req  
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));


// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
app.use("/public", express.static(process.cwd() + "/public"));
// https://expressjs.com/en/starter/basic-routing.html


var validateUrl = require('./validateUrl');
var randomString = require('./randomString');

var Url = require('./model');



app.get('/',function(req,res){
   res.render('index');
})

app.post("/", function(req, res) {

  var short_url= req.body.custom_url;

    if(short_url === '')  short_url = randomString.generate(6);
    
    var urlObject = Url({
      original_url:req.body.url,
      short_url: short_url
    });

    var short = urlObject.save(function(err,data){
        if(err) console.log(" post requests on / "+err);
    });
    
  if (validateUrl.isValidHttpUrl(req.body.url))
  {
    
     res.render('output', {urlObject:urlObject,alert:false,BASE_URL:process.env.BASE_URL});
  } 
  else{
    res.render('index', {urlObject:urlObject,alert:true,BASE_URL:process.env.BASE_URL});
  }

 
});

app.get("/a", async function(req, res) {
  // console.log("short"+req.params.short);

  var obj = await Url.find().exec();
  console.log(obj);
  res.render('analize', {BASE_URL:process.env.BASE_URL,urlObject:obj});

 
});

app.get("/:short", async function(req, res) {
  // console.log("short"+req.params.short);

  var obj = await Url.findOneAndUpdate({ short_url : req.params.short },{$inc: {'count' :1 } },{new:false}).exec();
  res.redirect(obj.original_url);
 
});







// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
