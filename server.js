require('dotenv').config()

const axios = require("axios")

const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')

const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

var methodOverride = require('method-override')
 

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      var method = req.body._method
      delete req.body._method
      return method
    }
}))


var cookieParser = require('cookie-parser');
var session = require('express-session');


app.use(cookieParser('keyboard cat'))
app.use(session({ 
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: { maxAge: 60000 }
}))

app.get('/tokengenerate',(req,res,next)=>{

})


app.post('/API_REQUEST' , (req,res,next)=>{
    const { type , url , data } = req.body


    if(type === "POST"){
        axios.post(`${process.env.BACKENDAPI_URL}${url}`, data,  {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${req.session.token}`,
                }
            })
            .then((response)=>{
                res.json(response.data)
            })
            .catch(err=>{
                res.status(err.response.status).json(err)
            })
    }else if(type === "GET"){

    }
})

app.use('/', serveStatic(path.join(__dirname,'/build')))

app.get('/*',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'/build/index.html'))
})


const port = process.env.PORT || 8081
app.listen(port)
console.log(`app is listening on port ${port}`)