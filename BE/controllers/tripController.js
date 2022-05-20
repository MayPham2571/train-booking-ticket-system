const catchAsync = require("../middleware/async");
const Trip = require("../models/trip");
const Seat = require("../models/seat");

// _id.valueOf() --> lấy id từ object id
exports.createTrip = catchAsync(async (req, res) => {
  const {
    source,
    destination,
    Date,
    StartTime,
    EndTime,
    price,
    NumOfSeat,
    isFull,
  } = req.body;
  const trip = await Trip.create({
    source,
    destination,
    Date,
    StartTime,
    EndTime,
    price,
    NumOfSeat,
    isFull,
  });
  for (let i = 0; i < NumOfSeat; i++) {
    await Seat.create({ Seatnumber: i + 1, tripID: trip._id });
  }
  res.status(200).json({
    success: true,
    data: trip,
  });
});
exports.deleteTrip = catchAsync(async (req, res) => {
  const { id } = req.params;
  const trip = await Trip.findById(id);
  if (!trip) {
    throw new ApiError(400, "This trip is not available");
  }
  await trip.remove();
  await Seat.deleteMany({ tripID: id });
  res.status(200).json({
    success: true,
    data: trip,
  });
});
exports.updateTrip = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { source, destination, Date, StartTime, EndTime, price } = req.body;
  const trip = await Trip.findByIdAndUpdate(
    id,
    { source, destination, Date, StartTime, EndTime, price },
    { new: true }
  );
  res.status(200).json({ success: true, data: trip });
});
exports.getTrip = catchAsync(async (req, res) => {
  const { source, destination } = req.body;
  var data;
  if (!source && !destination) {
    data = await Trip.find({});
  } else if (source && !destination) {
    data = await Trip.find({ source });
  } else {
    data = await Trip.find({ source, destination });
  }
  if (!data) {
    throw new ApiError(400, "There is no available trip");
  }
  res.status(200).json({
    success: true,
    data,
  });
});
