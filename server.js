const express = require('express')     
const app = express()
const fs = require('fs')
const path = require('path')

// const HomeRouter = require('./routes/HomeRoute')
// const AboutRouter = require('./routes/AboutRoute')


require('dotenv').config()
const PORT = process.env.PORT

// app.use('/', HomeRouter)
// app.use('/about', AboutRouter)


app.listen(PORT, _ => console.log(`SERVER READY AT http://localhost:${PORT}`))


// Middlewares -- strat
const authMiddleware = require('./middlewares/auth')
const cookieParser = require('cookie-parser')
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.static('public'))
app.use(cookieParser())
app.use(authMiddleware)
// Middlewares -- end





//settings -- start
app.set('view engine', 'ejs')
//settings -- end 



// Routes -- start
let routesPath =path.join(__dirname , 'routes')
fs.readdir(routesPath, (err, files) => {
   files.forEach(file => {
        let filePath = path.join(routesPath, file)
        let Route = require(filePath)
        if(Route.path && Route.router) app.use(Route.path, Route.router)
        
   })
})
// Routes -- end
