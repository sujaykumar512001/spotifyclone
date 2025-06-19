const mongoose = require('mongoose');
const { Schema } = mongoose;

main()
  .then(() => console.log("Connection successful"))
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

const orderSchema = new Schema({
  item: String,
  price: Number,
});

const customerSchema = new Schema({
  name: String,
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

const Order = mongoose.model('Order', orderSchema);
const Customer = mongoose.model('Customer', customerSchema);

const addCustomer = async () => {
  let cust1 = new Customer({
    name: "raj",
  });

  let order1 = await Order.findOne({ item: "samosa" });
  let order2 = await Order.findOne({ item: "sama" });

  if (order1) cust1.orders.push(order1);
  if (order2) cust1.orders.push(order2);

  let result = await cust1.save();
  console.log(result);
};

addCustomer();

// const addOrder=async()=>{
//    let res= await Order.insertMany([
//         {item:"samosa",price:12},
//          {item:"sama",price:120},
//          {item:"dosa",price:122},
//          {item:"sosa",price:121},

//    ] );
//     console.log(res);
    
//     };
   // addOrder();