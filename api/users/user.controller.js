const {
    serviceAddUser,
    serviceGetUsers,
    serviceGetUsersById,
    serviceUpdateUser,
    serviceDeleteUser,
    serviceGetUserByEmail
} = require("./user.service");
const {genSaltSync, hashSync, compareSync} = require('bcryptjs');
const { sign } = require('jsonwebtoken')
const jwt_decode = require('jwt-decode')
module.exports = {
    controllerAddUser:(req,res)=>{
        const decoded = jwt_decode(req.get("authorization"));
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        serviceAddUser(body,(err,results)=>{
            if(err){
                 console.log(err);
                 return res.status(500).json({
                     success: 0,
                     message: "Database connection error"
                 })
            }
            return res.status(200).json({
                success:1,
                account:decoded,
                data:results
            })
        })
    },

    controllerGetUsersById:(req,res)=>{
        const data = req.params.id;
        serviceGetUsersById(data,(err,results)=>{
            if(err){
                console.log(err)
                return
            }else{
                return res.json({
                    success:1,
                    data:results
                })
            }
        })
    },

    controllerGetUsers:(req,res)=>{
        serviceGetUsers((err,results)=>{
            if(err){
                console.log(err)
                return
            }else{
                return res.json({
                    success:1,
                    data:results
                })
            }
        })
    },

    controllerUpdateUser:(req,res)=>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password,salt)
        serviceUpdateUser(body,(err,results)=>{
            if(err){
                console.log(err)
                return
            }if(!results){
                return res.json({
                    success:0,
                    message:"Data Not Found"
                })
            }else{
                return res.json({
                    success:1,
                    message:"Update succesfuly " 
                })
            }
        })
    },

    controllerDeleteUser:(req,res)=>{
        const data = req.body;
        serviceDeleteUser(data,(err,results)=>{
            if(err){
                console.log(err)
                return
            }if(!results){
                return res.json({
                    success:0,
                    message:"Record not found"
                })
            }else{
                return res.json({
                    success:1,
                    message:"User delete succesfuly"
                })
            }
        })
    },

    controllerLogin:(req,res)=>{
        const body = req.body;
        serviceGetUserByEmail(body.email,(err,results)=>{
            if(err){
                console.log(err)
            }if(!results){
                return res.json({
                    success:0,
                    message:"Invalid email or password"
                })
            }
            const result= compareSync(body.password,results.password)

            if(result ){
                results.password = undefined
                const jsonwebtoken = sign({result:results},"secretkey",{
                    expiresIn:"1h"
                })
                return res.json({
                    success:1,
                    message:"Login succesfuly, Your Acount Already Use",
                    account: results,
                    token:jsonwebtoken
                })
            }else{
                return res.json({
                    success:0,
                    message:"Email or password invalid"
                })
            }
        })
    },
}