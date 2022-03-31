const {
    controllerCekBarang,
    controllerPesanBarang,
    controllerPesanKeranjang
} = require('./transaksi.controller');
const {checkToken} = require("../../auth/token_validation")
const router = require('express').Router();

router.get('/', checkToken, controllerCekBarang)
router.post('/pesan', checkToken, controllerPesanBarang)
router.post('/keranjang', checkToken, controllerPesanKeranjang)

module.exports = router 