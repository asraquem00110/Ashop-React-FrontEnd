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

var session = require('express-session');
app.use(session({ 
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: { maxAge: 60000 }
}))

var cookieParser = require('cookie-parser')
var csrf = require('csurf')
var csrfProtection = csrf({ cookie: true })
app.use(cookieParser())
app.use(csrfProtection)

// used this for automatic attaching of csrf token in frontend
app.use(function (req, res, next) {
    res.cookie('XSRF-TOKEN', req.csrfToken());     
    next();
});

app.post('/sample',csrfProtection,  async (req,res,next)=>{
    let url = "getProducts"
    let response = await axios.get(`${process.env.BACKENDAPI_URL}${url}`)
    console.log(response.data)
    res.json({datafromserver: response.data, msg: 'ok with token'})
})

app.get('/API_GETCSRFTOKEN', csrfProtection, function (req, res) {
    // return res.json({csrfToken: res.locals._csrf })
    return res.json({ csrfToken: req.csrfToken() });
  
});


app.post('/API_SIGN', csrfProtection , (req,res,next)=>{
    const { url , data } = req.body

    axios.post(`${process.env.BACKENDAPI_URL}${url}`, data)
    .then((response)=>{
        req.session.token = response.data.access_token
        res.json(response.data)
    })
    .catch(err=>{
        res.status(err.response.status).json(err)
    })
})

app.post('/API_LOGOUT',  csrfProtection , (req,res,next)=>{
    const { url , data } = req.body

    axios.post(`${process.env.BACKENDAPI_URL}${url}`, data)
    .then((response)=>{
       req.session.token = null
       res.json(response.data)
    })
    .catch(err=>{
        res.status(err.response.status).json(err)
    })
})


app.post('/API_REQUEST' , csrfProtection,  (req,res,next)=>{
    const { type , url , data } = req.body

   // axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
    axios.defaults.headers.common["Accept"] = 'application/json'
    axios.defaults.headers.common["Authorization"] = `Bearer ${req.session.token}`

    let requestURL = req.body.completeurl ? url : `${process.env.BACKENDAPI_URL}${url}`
    console.log(requestURL)


    if(type === "POST"){
        axios.post(`${requestURL}`, data)
            .then((response)=>{
                res.json(response.data)
            })
            .catch(err=>{
                res.status(err.response.status).json(err)
            })
    }else if(type === "GET"){
        axios.get(`${requestURL}`)
        .then((response)=>{
            res.json(response.data)
        })
        .catch(err=>{
            res.status(err.response.status).json(err)
        })
    }else if(type === "DELETE"){
        axios.delete(`${requestURL}`)
        .then((response)=>{
            res.json(response.data)
        })
        .catch(err=>{
            res.status(err.response.status).json(err)
        })
    }else if(type === "PATCH"){
        axios.patch(`${requestURL}`, data)
        .then((response)=>{
            res.json(response.data)
        })
        .catch(err=>{
            res.status(err.response.status).json(err)
        })
    }


})

app.use('/', serveStatic(path.join(__dirname,'/build')))

app.get('/*',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'/build/index.html'))
})


const port = process.env.PORT || 8080
app.listen(port)
console.log(`app is listening on port ${port}`)
