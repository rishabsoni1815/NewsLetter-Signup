const express=require("express");
const bodyParser = require("body-parser");
const https=require("https");

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/",function(req,res){
   res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  const ffname=req.body.fName;
  const ssname=req.body.sName;
  const eemail=req.body.email;
  
  const data={
      members:[
          {
            email_address: eemail,
            status: "subscribed",
            merge_fields: {
                FNAME: ffname,
                LNAME: ssname,
            }
          }
      ]
  }
  const jsonData=JSON.stringify(data);
   
  const url="https://us7.api.mailchimp.com/3.0/lists/38423204ca";
  const options={
      method: "POST",
      auth: "RishabSoni1815:58690b40feb2a158d2239542f961facd-us7",
  }
  const request =https.request(url,options,function(response){

    if(response.statusCode==200){
        res.sendFile(__dirname+"/sucess.html");
    }else{
        res.sendFile(__dirname+"/failure.html");
    }

     response.on("data",function(data){
         console.log(JSON.parse(data));
     })
     })
     request.write(jsonData);
     request.end();

  });

  app.post("/failure",function(req,res){
    res.redirect("/");
  });

app.listen(process.env.PORT || 3000,function(){
    console.log("server is running on port 3000");
})




//api ID
//58690b40feb2a158d2239542f961facd-us7

//list id
//38423204ca