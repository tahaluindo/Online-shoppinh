require("dotenv").config();
const express = require('express')
const app = express();
const userRouter = require("./api/users/user.router");
const barangRouter = require("./api/barangs/barang.router");
const transaksiRouter = require("./api/transaksi/transaksi.router");
app.use(express.json());
app.use("/api/users", userRouter)
app.use("/api/barangs",barangRouter)
app.use("/api/transaksi",transaksiRouter)


app.listen(process.env.APP_PORT,()=>{
    console.log("running on port"+process.env.APP_PORT)
})