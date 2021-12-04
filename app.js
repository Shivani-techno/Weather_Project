const express=require("express");
const https=require("https");
const app=express();
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
   res.sendFile(__dirname+"/index.html");
 });
 app.post("/",function(req,res){
   const query=req.body.cityName;
    const appkey="cd25c0437c833a062a44c508aad5749b";
    const url="https://api.openweathermap.org/data/2.5/weather?appid="+appkey+"&q="+query+"&units=metric";
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      const weatherdata=JSON.parse(data);
    //  const object={
      //  name:"Shivani",
        //favoritefood:"noddles"
      //}
      //console.log(JSON.parse(object));
      const icon=weatherdata.weather[0].icon
      const temp=weatherdata.main.temp
      const weatherdescription=weatherdata.weather[0].description
      const imageurl="http://openweathermap.org/img/wn/"+icon+"@2x.png"
      res.write("<h1>The weather description of "+query+" is "+weatherdescription);
      res.write("<h1>The Temperature of "+query+" is "+temp+"</h1>");

      res.write("<img src="+imageurl + ">");
    })
  })
 })


app.listen(3000,function(){
  console.log("server is running on port 3000");
});
