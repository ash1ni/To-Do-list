const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const ejs = require('ejs')
const date = require(__dirname+"/date.js")
require('dotenv').config()

const url = process.env.ToDoList_Url
mongoose.connect(url,{useNewUrlParser: true})
const connection = mongoose.connection
connection.once('open', ()=>{
    console.log('connected successfully')
})



const app = express()

var items = []
var workItems = []

app.set('view engine', "ejs")
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

app.get("/",(req,res)=>{
    // res.send("hello")
    let day = date()

    res.render("list", {
        listTitle: day, newListItems: items
    })

})

app.post("/",(req,res)=>{
    let item = req.body.newItem
    if(req.body.list === "Work"){
        workItems.push(item)
        res.redirect("/work")
    }else{
        items.push(item)
        res.redirect("/")

    } 
    
})

app.get("/work",(req, res)=>{
    // var today = new Date()
    // var options = {
    //      weekday: "long",
    //      day: "numeric",
    //      month:"long",
    //      year:"numeric" 
    // }
    // var day = today.toLocaleDateString("en-US", options)

    res.render("list", {listTitle: "Work List", newListItems: workItems})
})

app.post("/work", (req, res)=>{
    let item = req.body.newItem
    workItems.push(items)
    res.redirect("/")

})

app.get("/about",(req,res)=>{
    res.render("about")
})











































app.listen(3000,()=>{
    console.log("server listening at port 3000")
})