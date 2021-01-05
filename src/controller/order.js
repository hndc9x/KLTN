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

exports.updateOrder = async (req, res) => {
  const {  delivering , isCompleted , status , packed } = req.body;
  const updateOrders = [];
  const order = {
    delivering : delivering,
    isCompleted : isCompleted,
    packed : packed,
    status : status
  };

  const updateOrder = await Order.findOneAndUpdate(
    { _id: req.body._id },
    order,
    { new: true }
  );
  updateOrders.push(updateOrder);
  return res.status(201).json({ updateOrder: updateOrders });
};

exports.getOrder = async (req, res) => {
  const order = await Order.find({})
    .select("_id user total status shipping phone note nameUser isCompleted email delivering date , packed")
    // .populate({ path: "category", select: "_id name" })
    .exec();

  res.status(200).json(order);
};
