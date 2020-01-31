var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = require('../model/db_connect');

router.post('/register_ok',async function(req, res){
    con = await pool.getConnection();
    query = "insert into user values(?,?,?,?,false)";
    param = [req.body.userName,req.body.userEmail,req.body.userPass,req.body.userPhone];
    try{
        result = await con.query(query,param);
    }catch(e){
        res.send({"join_result":0});
        console.log('가입실패');
        console.log(e.message);
    }finally{
        con.release();
    };
    
    console.log('가입완료');
    res.send({"join_result":1});
})

module.exports = router;