const express = require('express')
const chalk = require('chalk')
const mongoose = require('mongoose')
const config = require('config')



const app = express()
app.use(express.json({extended: true}))



app.use('/api/auth', require('./routes/auth.routes'))


const PORT = config.get('port') || 5000

async function start(){
    try{
        await mongoose.connect(config.get("mongoUri"),{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, ()=>{
            console.log(`Server listening on port ${PORT}`)
        })
    } catch(e){
        console.log('server error', e.message)
        process.exit(1)
    }
}


start()



