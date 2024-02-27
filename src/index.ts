import express from 'express';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import fs from 'fs';

const app = express();
const port =  8000;
app.get('/user',(req,res)=> {
    res.send({a:1})
});
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({extended:false})
const users:object[]=[]
app.post('/createUser',urlencodedParser,(req,res)=>{
    console.log(req.body)
    const user = req.body.userName
   let has = async ()=> await bcrypt.hash(req.body.password,10).then((hash)=>{
        console.log(hash)
        // console.log('Error is')
        users.push({userName:user,password:hash})
     })
     has()
    fs.writeFile('userData.json',JSON.stringify(users),'utf8',(err)=>{
        console.log(err)
    })
    res.status(201).send(users)
})
app.post('/saveUser',(req,res)=>{
    console.log(req);
    console.log('Saved User')
    res.send('Saved User')
})

app.listen(port,()=>{
    console.log('Server is running at port 8000')
})