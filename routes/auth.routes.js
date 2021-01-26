const { Router } = require('express')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const chalk = require('chalk')
const config = require('config')
const router = Router()

router.post('/register',
    [
        check('email', 'Incorrect email').isEmail().exists(),
        check('password', 'Minimum password length is 6 symbols')
            .isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400)
                    .json({
                        errors: errors.array(),
                        message: 'Incorrect data for registration'
                    })

            }

            const { email, password } = req.body
            console.log(req.body)
            const candidate = await User.findOne({ email })
            if (candidate) return res.status(400).json({ message: "User with this email already exists" })

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({ email, password: hashedPassword })
            await user.save()

            res.status(201).json({ message: "User has been created" })


        } catch (e) {
            res.status(500).json({ message: `Something went wrong` })
        }
    })




router.post('/login',
    [
        check('email', "Enter correct email").normalizeEmail().isEmail(),
        check('password', "Enter password").exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            console.log(req.body)
            if (!errors.isEmpty()) {
                res.status(400)
                    .json({
                        errors: errors.array(),
                        message: "Enter email and password"
                    })
            }

            const { email, password } = req.body
            const user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({ message: "Incorrect login data" })
            }
            const isMatch = await bcrypt.compare(password, user.password)
            console.log(chalk.green("isMatch: " + isMatch))
            if (!isMatch) {
                return res.status(400).json({ message: "Incorrect login data" })
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('secretKey'),
                { expiresIn: '1h' }
            )

            res.json({ token, userId: user.id })

        } catch (e){
            res.status(500).json({ message: "Something went wrong" })
            console.log(e)
        }
    })




module.exports = router