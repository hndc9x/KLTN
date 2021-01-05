const { requireSignin, userMiddleware } = require("../common-middleware");
const { addOrder, updateOrder, getOrder } = require("../controller/order");
const router = require("express").Router();

router.post("/addOrder", requireSignin, userMiddleware, addOrder);
router.post("/updateOrder", updateOrder);
router.post("/getOrder", getOrder);
// router.get("/getOrders", requireSignin, userMiddleware, getOrders);
// router.post("/getOrder", requireSignin, userMiddleware, getOrder);

module.exports = router;