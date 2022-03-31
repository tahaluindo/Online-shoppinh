const db = require("../../config/connection")

module.exports = {
    serviceAddUser: (data,callBack)=>{
      db.query(
        `insert into tb_user(nama_panjang, email, password)
        values(?,?,?)`,
        [
            data.nama_panjang,
            data.email,
            data.password
        ],
        function(error,result){
            if(error){
                return callBack(error);
            }else{
                return callBack(null,result);
            }
        }
      )  
    },
    serviceGetUsers: callBack=>{
        db.query(
            `select * from tb_user`,
            [],(err,results)=>{
                if(err){
                    return callBack(err);
                }else{
                    return callBack(null,results);
                }
            }
        )
    },
    serviceGetUsersById:(data,callBack)=>{
        db.query(
            `select * from tb_user where id_user=?`,
            [data],(err,results)=>{
                if(err){
                    return callBack(err)
                }else{
                    return callBack(null,results[0])
                }
            }
        )
    },
    serviceUpdateUser:(data,callBack)=>{
        db.query(
            `select id_user from tb_user where id_user=?`,
            [data.id_user],(err,results)=>{
                if(err){
                    return callBack(err)
                }else{
                    db.query(
                        `update tb_user set nama_panjang=?, email=?, password=? where id_user = ?`
                        ,[
                            data.nama_panjang,
                            data.email,
                            data.password,
                            data.id
                        ]);
                        return callBack(null,results[0])
                }
            }
        )
        
    },
    serviceDeleteUser:(data,callBack)=>{
        db.query(
            `select id from tb_user where id=?`,
            [data.id],(err,results)=>{
                if(err){
                    return callBack(err)
                }else{
                    db.query(
                        `delete from tb_user where id=?`,
                        [data.id]);
                        console.log(results[0]);
                        return callBack(null,results[0])
                }
            }
        )
    },
    serviceGetUserByEmail: (email,callBack)=>{ 
        db.query(
            `select nama_panjang,email,password from tb_user where email=? `,
            [email],(err,results)=>{
                if(err){
                    return callBack(err)
                }else{
                    return callBack(null,results[0])
                }
            }
        )
    }

}