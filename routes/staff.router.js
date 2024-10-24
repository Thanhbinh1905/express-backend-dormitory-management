const express = require("express");
const router = express.Router();
const staffController = require("../controllers/staff.controller");

router.get("/", staffController.getAllStaffs);
router.get('/:id', staffController.getById);
router.post('/', staffController.create);
router.patch('/:id', staffController.update);
router.delete('/:id', staffController.delete);
router.put('/:id/password', staffController.changePassword);

module.exports = router;
