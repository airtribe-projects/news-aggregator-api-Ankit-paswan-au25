const express = require('express');
const app = express();
const port = 3000;
const authRoutes = require('./routes/authRoutes')
const prefrenceRoute = require('./routes/preferencesRoutes')
const authGuard = require('./MiddleWare/routeGuard')


//preMiddleware before route
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//main route
app.use('/api/v1/auth', authRoutes)

app.use(authGuard)

app.use('/api/v1/users/preferences', prefrenceRoute)



//error handler
app.use((err, req, res, next) => {

    const statusCode = err.status
    const msg = err.msg
    res.status(statusCode).send({ msg: msg })

})

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;