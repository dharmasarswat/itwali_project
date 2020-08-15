const router = require('express').Router();
const auth = require('../middleware/auth')

/*
* @route  POST /api/home
* @desc   User dashboard
* @access Private
*/

router.get('/' , auth , (req,res)=>{
    res.send('dashboard')
})

module.exports = router