const { writeFile } = require("fs");
const cors=require("cors");
//  start writing your code from here
express=require("express");
fs=require("fs");
app=express();

app.use(express.json())
app.use(cors());

app.post("/add",function(req,res){
    const id=req.body.id;
    let newd=req.body;
    fs.readFile("data.json","utf-8",function(err,data){
        console.log(err);
        data=JSON.parse(data);
        let newobj={
            task:newd.task,
        };
        console.log(id+" "+newd.task);
        console.log(data);
        if(data[id]===undefined)data[id]=[];
        data[id].push(newobj);
        data=JSON.stringify(data,0,2);
        fs.writeFile("data.json",data,"utf-8",function(err){res.send()});
    })
})
app.get("/",function(req,res){
    fs.readFile("data.json","utf-8",function(err,data){
        console.log(data);
        res.send(data);
    })
})

app.listen(3000);

