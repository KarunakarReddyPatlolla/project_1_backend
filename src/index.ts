import "reflect-metadata";
import {createConnection, Connection,getConnection,getManager, EntityManager} from "typeorm";
import { Request,response,Response } from "express";
import {Password} from "./entity/Password";
import * as cors from 'cors'

const express = require("express")
const app = express()
app.use(express.json())

app.use(cors())
app.options('*', cors())


const initializeServerAndGetConnection=async()=>{
    try{
        const connection= await createConnection({
            "type": "postgres",
            "host": "localhost",
            "port": 5432,
            "username": "postgres",
            "password": "Karna@123",
            "database": "postgres",
            "entities": [Password],
            "logging": true,
            "synchronize": true
        })
    }
    catch(err){
        console.log(err)
    }
}

initializeServerAndGetConnection()

app.listen(3001,()=>{
    console.log("Server running on port 3001")
})

const entityManager = getManager()


// to get all saved passwords from database
app.get("/",async(req:Request,res:Response)=>{       
    try{

        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 

        const data=await entityManager.find(Password)
        res.send(data);
    }

    catch(err){
        console.log(err)
    }
})

app.get("/passwords/",async (req:Request,res:Response)=>{
    try{
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
        
        const data=await entityManager.find(Password)
        console.log(data,"////////////////////////////////////////////")
        res.send(data)
    }
    catch(err)
    {
        console.log(err.message)
    }
})


app.post("/passwords/",async(req:Request,res:Response)=>{
    try{
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
        
        let {id, website, username, password}=req.body;
        console.log(req.body,"///////////////////////////////")
        //insert data into db
        await entityManager.insert(Password,{id,website, username, password})
        res.send("New Password details added successfully")
    }

    catch(err){
        console.log(err.message)
    }
})


app.delete("/passwords/:id",async(req:Request,res:Response)=>{
    try{
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
        

        let {id} =req.params
        await entityManager.delete(Password,id)
        res.send("Password deleted successfully")
    }
    catch(err){
        console.log(err.message)
    }
})



// createConnection().then(async connection => {

//     console.log("Inserting a new user into the database...");
//     const newPassword = new Password();
//     newPassword.firstName = "Timber";
//     newPassword.lastName = "Saw";
//     newPassword.age = 25;
//     await connection.manager.save(user);
//     console.log("Saved a new user with id: " + user.id);

//     console.log("Loading users from the database...");
//     const users = await connection.manager.find(User);
//     console.log("Loaded users: ", users);

//     console.log("Here you can setup and run express/koa/any other framework.");

// }).catch(error => console.log(error));
