import mongoose from "mongoose";

const SensorBatterySchema = new mongoose.Schema({
   measurableComponentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
  },
  sensorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
   },
   workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
   },
   battery: {
      type: Number,
   },
   timestamp: {
      type: Date,
      required: true,
   },
})

export default SensorBatterySchema;