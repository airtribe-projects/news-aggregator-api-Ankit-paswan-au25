const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


const register = async (req, res, next) => {
    try {
        //creating New User Structure
        const newUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword
        }

        //checking if email is there or not and if it is there then its valid or not
        if (!newUser.email || !validator.isEmail(newUser.email)) {
            return next({ msg: 'Email not valid', status: 400 })
        }

        //checking password is available or not
        if (newUser.password !== newUser.confirmPassword) {
            return next({ msg: 'Password Not Matched', status: 400 })
        }

        //checking if password is there or not and its same or not
        if (newUser.password !== newUser.confirmPassword) {
            return next({ msg: 'Password Not Matched', status: 400 })
        }

        //checking firstname and last name exist or not
        if (newUser.firstName == '' || newUser.lastName == '') {
            return next({ msg: 'Please fill all the fields', status: 400 })
        }

        //else everything is alright ready to operate

        const salt = await bcrypt.genSalt(0, 12)

        const hashedPassword = await bcrypt.hash(newUser.password, salt)
        if (!hashedPassword) {
            return next({ msg: "server error", statusCode: 500 })
        }
        newUser.password = hashedPassword
        delete newUser.confirmPassword

        //create user
        /**
         * create User to db and get userId or any other value to generate token
         */

        newUser.userID = 'abc_id_15978564'
        const token = loginToken(newUser.userID)
        res.status(200).send({ newUser, token })
    } catch (error) {
        next(error); // or log the error
    }
}

const login = async (req, res) => {
    try {

        const email = req.body.email
        const password = req.body.password

        // checking entered value is valid or not
        if (!email || !password || !validator.isEmail(email)) {

            return next({ msg: "Please enter valid emailId or password", status: 400 })
        }


        // const user = db.findOne({email})
        const user = {
            "firstName": "req.body.firstName",
            "lastName": "req.body.lastName",
            "email": "abc@gmail.com",
            "password": "$2b$10$X.ZHYwBglCczVqN.EyccrOAR6GUw85t3WfL.4C4THd4QT7IF.nTH2",
            "userID": "abc_id_15978564"
        }


        //checking user exist or not
        if (!user) {
            return next({ msg: "user not found", status: 404 })
        }

        const isMatched = await bcrypt.compare(password, user.password)
        if (!isMatched) {
            return next({ msg: "emailId or Password not matched", status: 400 })
        }

        const token = loginToken(user.userID)
        res.status(200).send({
            user: user,
            token
        })

    } catch (error) { }
}

const loginToken = (userID) => {
    const secreatKey = process.env.JWT_SECRET || 'abc'
    const token = jwt.sign({ userId: userID }, secreatKey, { expiresIn: '1h' })
    return token
}

module.exports = {

    register,
    login
}