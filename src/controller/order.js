const Order = require("../models/order");

exports.addOrder = (req, res) => {

  const {user, total , nameUser , address , note , phone ,email } = req.body;
  const order = new Order({
    user : user,
    email : email,
    total : total,
    nameUser : nameUser,
    address : address,
    note : note,
    phone : phone,
    date : new Date()
  });
  order.save((error, order) => {
    if (error) return res.status(400).json({ error });
    if (order) {
      res.status(201).json( order );
    }
  });
}

// exports.getOrders = (req, res) => {
//   Order.find({ user: req.user._id })
//     .select("_id paymentStatus paymentType orderStatus items")
//     .populate("items.productId", "_id name productPictures")
//     .exec((error, orders) => {
//       if (error) return res.status(400).json({ error });
//       if (orders) {
//         res.status(200).json({ orders });
//       }
//     });
// };

// exports.getOrder = (req, res) => {
//   Order.findOne({ _id: req.body.orderId })
//     .populate("items.productId", "_id name productPictures")
//     .lean()
//     .exec((error, order) => {
//       if (error) return res.status(400).json({ error });
//       if (order) {
//         Address.findOne({
//           user: req.user._id,
//         }).exec((error, address) => {
//           if (error) return res.status(400).json({ error });
//           order.address = address.address.find(
//             (adr) => adr._id.toString() == order.addressId.toString()
//           );
//           res.status(200).json({
//             order,
//           });
//         });
//       }
//     });
// };