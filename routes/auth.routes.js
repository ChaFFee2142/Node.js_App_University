const {Router} = require('express')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const chalk = require('chalk')
const router = Router()

router.post('/register', async (req, res) => {
    try{
        const {email, password} = req.body
        console.log(req.body)
        const candidate = await User.findOne({email})
        if (candidate) return res.status(400).json({message: "User with this email already exists"})

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({email, password: hashedPassword})
        await user.save()

        res.status(201).json({message: "User has been created"})


    } catch(e){
        res.status(500).json({message: `Something went wrong    `})
    }
})




router.post('/login', async (req, res) => {
    try {const {email, password} = req.body
        const candidate = await User.findOne({email})
        const isMatch = await bcrypt.compare(password, candidate.password)
        console.log(chalk.green(isMatch))
        if (!isMatch){
            console.log("Not logged in")    
        }
        
        return res.status(200).json({message:"SUCCESS"})
    } catch{
        res.status(500).json({message: "ERROR"})
    }
})




module.exports = router