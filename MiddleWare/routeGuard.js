const jwt = require('jsonwebtoken');
const { promisify } = require('util')

authGuard = async (req, res, next) => {
    try {

        if (!req.headers.authorization || req.headers.authorization.split(" ")[0] !== 'Bearer') {
            return next({ msg: 'Unauthorized access please login again', status: 403 })
        }
        //fetching token from headers
        const token = req.headers.authorization.split(" ")[1]

        if (!token) {
            return next({ msg: 'Unauthorized access please login again', status: 403 })
        }

        //now veryfying token 
        const secretKey = process.env.JWT_SECRET || 'abc'


        const decodedToken = await promisify(jwt.verify)(token, secretKey)

        //token was created through from userId so finding user which we got from decoded token

        /*
            const authUser = await User.findOne({_id:decodedToken.userId})

            if(!authUser){
            return next({msg:'Authentication Error Please login again',status:401})
            }
        */


        next()
    } catch (error) {

        if (error.name === 'TokenExpiredError') {
            return next({ msg: 'Please login again', status: 401 })
        }
        return next({ msg: 'error', status: 500 })
    }
}

module.exports = authGuard