const db = require('../../config/connection');
module.exports={
    serviceCekBarang:(data,callBack)=>{
        db.query(
            `select stok from tb_barang where kode_barang=?`,
            [data.id_barang],
            (err,results)=>{
                if(err){
                    console.log(err) 
                    return callBack(err);   
                }if(results.length < 1){
                    return callBack("gk ada")
                }if(results[0].stok <= 0){
                    console.log(results[0].stok);
                    return callBack("Habis Lur...");
                }else{
                    return callBack(null,results[0]);
                }
            }
        )
    },
    servicePesanBarang:(data,callBack)=>{
            db.query(
            `select * from tb_barang where kode_barang=?`,
            [data.kode_barang],(err,results)=>{
                // console.log(data.kode_barang);
                // console.log(data.jumlah);
                // console.log(data.email);
                // console.log(data.uang_bayar);
                // console.log(results[0].owner)
                if(err){
                    console.log(err);
                    return callBack(err)
                }if(results.length < 1){
                    return callBack("No-Id")  
                }else if(results[0].stok <= 0){
                    return callBack("Habis")
                }else if(results[0].stok < data.stok){
                    return callBack("Kakean")
                }else if(data.email === results[0].owner){
                    return callBack("barangku")     
                }else if(data.uang_bayar < results[0].harga * data.jumlah){
                    return callBack("uang lur")
                }
                else{
                    const data_barang = results[0];
                    const total = data_barang.harga * data.jumlah
                    const hasil = results[0].stok - data.jumlah
                    const uang_kembali = data.uang_bayar - total
                        db.query(
                        `update tb_barang set stok=? where kode_barang=?`,
                        [
                            hasil,
                            data.kode_barang
                        ]
                    );
                    db.query(
                        `insert into tb_transaksi(kode_barang,jumlah,harga_total,uang_bayar,
                            uang_kembali,email_pembeli)
                            values(?,?,?,?,?,?)`,
                            [
                                data.kode_barang,
                                data.jumlah,
                                total,
                                data.uang_bayar,
                                uang_kembali,
                                data.email
                            ]
                    );
                    console.log(uang_kembali)
                    // console.log(total)
                    return callBack(null,results)
                }
            }
        )
    }
}