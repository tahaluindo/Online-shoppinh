const {
    serviceAddBarang,
    serviceGetBarangs,
    serviceGetBarangByEmail,
    serviceUpdateBarang,
    serviceDeleteBarang,
    serviceGetBarangsUser
} = require('./barang.service');

const { verify } = require('jsonwebtoken')
module.exports = {
    controllerAddBarang:(req,res)=>{
        const body = req.body;
        const token = req.get("authorization")
        if(token){
            let wow = token.slice(7)
            verify(wow,"secretkey",(err,decoded)=>{
                if(err){
                    res.json({
                        success:0,
                        message:"Login First"
                    })
                }else{
                    var user = decoded.result
                    const data_barang = {
                        namaBarang : body.nama_barang,
                        harga: body.harga,
                        stok: body.stok,
                        owner: user.email                    
                    }
                    serviceAddBarang(data_barang,(err,results)=>{
                        if(err){
                            console.log(err);
                            return res.status(500).json({
                                success:0,
                                message:"Database connection error"
                            })
                        }else{
                            return res.status(200).json({
                                success:1,
                                account:decoded,
                                data:results,
                                data_barang
                            })
                        }
                    })
                }
            })
        }
    },
    controllerGetBarangs:(req,res)=>{
        serviceGetBarangs((err,results)=>{
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
    controllerGetBarangsUser:(req,res)=>{
        const token = req.get("authorization")
        if(token){
            let wow = token.slice(7)
            verify(wow,"secretkey",(err,decoded)=>{
                if(err){
                    res.json({
                        success:0,
                        message:"Login First"
                    })
                }else{
                    var user = decoded.result
                    const data = {
                        owner: user.email                    
                    }
                    serviceGetBarangsUser(data,(err,results)=>{
                        if(err){
                            console.log(err);
                            return
                        }else{
                            return res.json({
                                success:0,
                                data:results
                            })
                        }
                    });
                }
            })
        }
    },
    controllerGetBarangByEmail:(req,res)=>{
        const data = req.body.email;
        serviceGetBarangByEmail(data,(err,results)=>{
            if(err){
                return res.json({
                    success:0,
                    message:"Not Found"
                })
            }else{
                return res.json({
                    success:1,
                    data:results
                })
            }
        })
    },
    controllerUpdateBarang:(req,res)=>{
        const body = req.body;
        const token = req.get("authorization")
        if(token){
            let wow = token.slice(7)
            verify(wow,"secretkey",(err,decoded)=>{
                if(err){
                    res.json({
                        success:0,
                        message:"Login First"
                    })
                }else{
                    var user = decoded.result
                    const data_barang = {
                        kode_barang : body.id,
                        namaBarang : body.nama_barang,
                        harga: body.harga,
                        stok: body.stok,
                        owner: user.email
                    }
                    serviceUpdateBarang(data_barang,(err,results)=>{
                        if(err){
                            if(err === "salah"){
                                return res.json({
                                    success:0,
                                    message:"User Berbeda"
                                })
                            }
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
                }
            })
        }
    },
    controllerDeleteBarang:(req,res)=>{
        const body = req.body;
        serviceDeleteBarang(body,(err,results)=>{
            if(err){
                return res.json({
                    success:0,
                    message:"Not Found data"+err
                })
            }else{
                return res.json({
                    success:1,
                    message:"Delete Success"
                })
            }
        })
    }
}