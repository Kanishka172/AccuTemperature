const express=require('express');

const https=require('https');
const bodyParser=require('body-parser');
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get('/',function(req,resp) {
	resp.sendFile(__dirname+"/index.html");
	
		})
app.post('/',function(req,res)
{
	const query=req.body.cityName;
	const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=a63ffee21041302129d2458669165c7e&units=metric"
	https.get(url,function(response){
		console.log(response.statusCode);
		response.on("data",function(data){
			const weatherdata=JSON.parse(data)
			const temp=weatherdata.main.temp
			const city=weatherdata.name
			const icon=weatherdata.weather[0].icon;
			const weatherDescription=weatherdata.weather[0].description
			res.write("<h1>The weather is "+weatherDescription+".</h1>");
			res.write("<h1><i>The temperature in "+city+" is "+temp+" degree celcius</i></h1>");
			res.send();
	
})
	})
})

app.listen(3000,function()
{
	console.log("Server is running on port 3000");
})