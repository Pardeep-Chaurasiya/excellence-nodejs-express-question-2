const Address = require('../models/addressSchema');
const User = require('../models/userSchema');

const createAddress = async (req, res) => {
  try {
    const {
      address, city, state, pinCode, phoneNo,
    } = req.body;
    const userId = req.User._id;

    if (!address || !city || !state || !pinCode || !phoneNo) {
      return res
        .status(400)
        .json({ code: 'Invalid_Input', error: 'Please fill all feilds' });
    }
    const newAddress = new Address({
      userId,
      address,
      city,
      state,
      pinCode,
      phoneNo,
    });

    const savedAddress = await newAddress.save();

    await User.findByIdAndUpdate(
      userId,
      { $push: { addresses: savedAddress._id } },
      { new: true, upsert: true },
    );

    return res.json({ code: 'Address-Created-Successfully', data: newAddress });
  } catch (error) {
    console.error(error.toString());
    return res.status(500).json({ error, message: 'Internal server error' });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const address = req.User.addresses.toString();
    const addressArray = address.split(',');
    const deleteaddress = await Address.deleteMany({
      _id: { $in: addressArray },
    });
    if (!deleteaddress) {
      return res.status(200).json({
        code: 'Address-Deletion-Failed',
        message: 'Address deletion failed or user not updated',
      });
    }
    return res.status(200).json({
      code: 'Deletion-Successfully',
      message: 'User Address Deleted successfully',
    });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ code: 'Something-Went-Wrong', message: 'Deletion is not done' });
  }
};

module.exports = { createAddress, deleteAddress };
