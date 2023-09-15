const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const addressSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pinCode: {
    type: Number,
    required: true,
  },
  phoneNo: {
    type: Number,
    required: true,
  },
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
