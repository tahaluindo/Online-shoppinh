const {
    serviceCekBarang,
    servicePesanBarang
} = require('./transaksi.service');
const { verify } = require('jsonwebtoken')

module.exports={
    controllerCekBarang:(req,res)=>{
        const body = req.body
        serviceCekBarang(body,(err,results)=>{
            if(err){
                if(err === "gk ada"){
                    return res.json({
                        success:0,
                        message:"Data Tidak Ditemukan"
                    })
                }
                if(err === "Habis Lur..."){
                    return res.json({
                        success:0,
                        message:"Habis Lur..."
                    })
                }
                console.log(err);
                return;
            }if(!results){
                return res.json({
                    message:"Tidak Ada",
                    data:results
                }) 
            }else{
                return res.json({
                    message:"Tersedia",
                    data:results
                })
            }
        })
    },
    controllerPesanBarang:(req,res)=>{
        const body = req.body
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
                        kode_barang: body.id_barang,
                        jumlah: body.jumlah,
                        uang_bayar: body.uang_bayar,
                        email: user.email
                    }
                    servicePesanBarang(data,(err,results)=>{
                        if(err){
                            if(err === "Habis"){
                                return res.json({
                                    success: 0,
                                    message: "Stok Habis"
                                })
                            }
                            if(err === "Kakean"){
                                return res.json({
                                    success: 0,
                                    message: "Permintaan Terlalu Banyak"
                                })
                            }
                            if(err === "No-Id"){
                                return res.json({
                                    success:0,
                                    message:"Tidak Ditemukan"
                                })
                            }
                            if(err === "barangku"){
                                return res.json({
                                    success: 0,
                                    message: "Barang Milik Sendiri"
                                })   
                            }
                            if(err === "uang lur"){
                                return res.json({
                                    success: 0,
                                    message: "Uang Anda Kurang"
                                })
                            }     
                            console.log(err);      
                            return ;
                        }
                        if(!results){
                            return res.json({
                                success:0,
                                message:"Tidak Ditemukan"
                            })
                        }else{
                            return res.json({
                                success:1,
                                message:"Terpesan"
                            })
                        }
                    })
                }
            })
        }
    },
    controllerPesanKeranjang:(req,res)=>{
        const body = req.body
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
                        kode_barang: body.id_barang,
                        jumlah: body.jumlah,
                        email: user.email
                    }
                    servicePesanBarang(data,(err,results)=>{
                        if(err){
                            if(err === "Habis"){
                                return res.json({
                                    success: 0,
                                    message: "Stok Habis"
                                })
                            }
                            if(err === "Kakean"){
                                return res.json({
                                    success: 0,
                                    message: "Permintaan Terlalu Banyak"
                                })
                            }
                            if(err === "No-Id"){
                                return res.json({
                                    success:0,
                                    message:"Tidak Ditemukan"
                                })
                            }
                            if(err === "barangku"){
                                return res.json({
                                    success: 0,
                                    message: "Barang Milik Sendiri"
                                })   
                            }     
                            console.log(err);      
                            return ;
                        }
                        if(!results){
                            return res.json({
                                success:0,
                                message:"Tidak Ditemukan"
                            })
                        }else{
                            return res.json({
                                success:1,
                                message:"Terpesan"
                            })
                        }
                    })
                }
            })
        }
    }
}