var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = require('../model/db_connect');


router.post('/login_ok', async function (req, res) {

    var email = req.body.inputEmail;
    var password = req.body.inputPassword;
    console.log(email +' '+ password);

    con = await pool.getConnection();

    query = "select * from user where email=?";

    result = await con.query(query,[email]);
    con.release();
    if(result[0].pass===password){
        req.session.name=result[0].NAME;
        req.session.phone = result[0].phone;
        res.redirect('/main');
    }else{
        res.redirect('/');
    }
  });
module.exports = router;


