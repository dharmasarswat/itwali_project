const router = require('express').Router();
const { check } = require('express-validator');

const { register, login } = require('../controller/auth')


/*
* @route  POST /api/user/register
* @desc   Register User
* @access Public
*/

router.post(
    '/register',
    [
        // validate User
        check('name', 'Name is required.').not().isEmpty(),
        check('email', 'Email is required.').isEmail(),
        check('password', 'Please enter Password with 6 or more character.').isLength({min: 6})
    ],
    register
);



/*
* @route  POST /api/user/login
* @desc   Login User
* @access Public
*/

router.post(
    '/login',
    [
        // validate User
        check('email', 'Email is required.').isEmail(),
        check('password', 'Please enter Password with 6 or more character.').isLength({min: 6})
    ],
    login
);

module.exports = router