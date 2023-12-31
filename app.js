const express= require("express");
const bodyParser=require("body-parser");
const https=require("https")

const app= express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
  res.sendFile(__dirname+"/index.html")
})

app.post('/',(req,res)=>{
  const email=req.body.Email;
  const firstname=req.body.fName;
  const lastname =req.body.lName;
  const url="https://us21.api.mailchimp.com/3.0/lists/d9c9525b1b";
  const data={
      members:[
        {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME: firstname,
          LNAME: lastname
        }
      }
    ]
  };
  const josnData=JSON.stringify(data);
  const option={
    auth: "Your API key",
    method: "POST"
  }
  const request=https.request(url,option,(response)=>{
    if(response.statusCode==200){
      res.sendFile(__dirname+"/SS.html")
    }
    else{
      res.sendFile(__dirname+"/Nots.html")
    }
  })
  request.write(josnData);
  request.end();
  })

app.post("/Nots",(req,res)=>{
  res.redirect("/")
})

app.listen(process.env.PORT || 3000,()=>{
  console.log("Listening");
});


