const { register, login } = require('../services/userService');
const { parseError } = require('../util/parser')

module.exports = {
    authRegisterGet: (req, res) => {
        res.render('register', {
            title: "Register Page"
        });
    },
    authRegisterPost: async (req, res) => {
        console.log(req.body);
        try {
            if (req.body.email == "" || req.body.password == "" || req.body.username == "" || req.body.repass == "") {
                throw new Error("All fields are required!");
            }

            if (req.body.password != req.body.repass) {
                throw new Error("Passwords don\'t match!")
            }

            const token = await register(req.body.username, req.body.email, req.body.password);
            res.cookie('token', token);
            res.redirect('/');
        } catch (error) {
            const errors = parseError(error);
            res.render('register', {
                title: 'Register Page',
                errors,
                body: {
                    username: req.body.username,
                    email: req.body.email,
                }
            })
        }
    },
    authLoginGet: (req, res) => {
        res.render('login', {
            title: "Login Page"
        })
    },

    authLoginPost: async (req, res) => {
        try {
            console.log(req.body)
            if(req.body.email == "" || req.body.password == "") {
                throw new Error("Are fields are required!")
            }
            const token = await login(req.body.email, req.body.password);
            res.cookie('token', token);
            res.redirect('/');
        } catch (error) {

            const errors = parseError(error);
            res.render('login', {
                title: 'Login Page',
                errors,
                body: {
                    email: req.body.email
                }
            })
        }
    },

    authLogout:(req,res) => {
        res.clearCookie('token');
        res.redirect('/');
    }

}