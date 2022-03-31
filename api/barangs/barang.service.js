const db = require('../../config/connection');
module.exports={
    serviceAddBarang:(data,callBack)=>{
        db.query(`insert into tb_barang set ?`,
        [data],
        (error,result)=>{
            if(error){
                return callBack(error);
            }else{
                return callBack(null,result);
            }
        })
    },
    serviceGetBarangs:callBack=>{
        db.query(`SELECT
                  tb_barang.namaBarang,
                  tb_barang.harga,
                  tb_kategori.jenis,
                  tb_barang.stok,
                  registration.namaPanjang
                  FROM tb_kategori
                  JOIN tb_barang
                  ON tb_kategori.id_kategori = tb_barang.id_kategori
                  JOIN registration
                  ON tb_barang.owner = registration.email`,
        [],(err,result)=>{
            if(err){
                return callBack(err)
            }else{
                return callBack(null,result)
            }
        })
    },
    serviceGetBarangsUser:(data,callBack)=>{
        db.query(
            `SELECT
                  tb_barang.namaBarang,
                  tb_barang.harga,
                  tb_kategori.jenis,
                  tb_barang.stok,
                  registration.namaPanjang
                  FROM tb_kategori
                  JOIN tb_barang
                  ON tb_kategori.id_kategori = tb_barang.id_kategori
                  JOIN registration
                  ON tb_barang.owner = registration.email
                  WHERE owner = ?`,
                  [
                      data.owner
                  ],
                  (err,results)=>{
                      if(err){
                          return callBack(err)
                      }else{
                          return callBack(null,results)
                      }
                  }
        )
    },
    serviceGetBarangByEmail:(data,callBack)=>{
        db.query(
            `SELECT
                  tb_barang.namaBarang,
                  tb_barang.harga,
                  tb_kategori.jenis,
                  tb_barang.stok,
                  registration.namaPanjang
                  FROM tb_kategori
                  JOIN tb_barang
                  ON tb_kategori.id_kategori = tb_barang.id_kategori
                  JOIN registration
                  ON tb_barang.owner = registration.email
                  WHERE owner = ?`,
            [data],(err,results)=>{
                if(err){
                    return callBack(err)
                }else{
                    return callBack(null,results)
                }
            }
        )
    },
    serviceUpdateBarang:(data,callBack)=>{
        db.query(
            `select * from tb_barang where kode_barang=?`,
            [data.kode_barang],(err,results)=>{
                console.log(data.kode_barang)
                console.log(data.owner)
                console.log(results[0].owner)
                if(err){
                    return callBack(err);
                }else if(data.email === results[0].owner){
                    console.log(data.stok);
                    db.query(
                        `update tb_barang set ? where kode_barang =? `
                        ,[
                            data,
                            data.kode_barang
                        ]);
                        return callBack(null,results[0])
                }else{
                    return callBack("salah")
                }
            }
        )
    },
    serviceDeleteBarang:(data,callBack)=>{
        db.query(
            `select kode_barang from tb_barang where kode_barang=?`
        ,[data.id],
        (err,results)=>{
            if(err){
                return callBack(err);
            }else{
                db.query(
                    `delete from tb_barang where kode_barang=?`,
                    [data.id]);
                return callBack(null,results[0])
            }
        }
    )
    },
    // serviceAddBarang:(data,callBack)=>{
    //     db.query(
    //         `select namaBarang from tb_barang where kode_barang=?`,
    //         [data.kode_barang],
    //         (err,results)=>{
    //             if(err){
    //                 db.query(
    //                     `insert into tb_barang set?`,
    //                     [data]
    //                 )
    //                 return callBack(err);
    //             }else{
    //                 db.query(
    //                     `update tb_barang set stok=? where kode_barang=?`,
    //                     [
    //                         results.stok + data.stok,
    //                         data.namaBarang
    //                     ]
    //                 );
    //                 return callBack(null,results)
    //             }
    //         })
    // }
}