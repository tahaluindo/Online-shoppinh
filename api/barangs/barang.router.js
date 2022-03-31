const {
    controllerAddBarang,
    controllerGetBarangs,
    controllerGetBarangByEmail,
    controllerUpdateBarang,
    controllerDeleteBarang,
    controllerGetBarangsUser
} = require('./barang.controller');
const {checkToken} = require("../../auth/token_validation")
const router = require('express').Router();

router.post('/', checkToken, controllerAddBarang);
router.get('/', checkToken, controllerGetBarangs);
router.get('/user', checkToken, controllerGetBarangsUser);
router.get('/email', checkToken, controllerGetBarangByEmail);
router.patch('/', checkToken, controllerUpdateBarang);
router.delete('/',checkToken, controllerDeleteBarang)

module.exports = router;