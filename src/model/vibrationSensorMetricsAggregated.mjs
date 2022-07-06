import mongoose from "mongoose";
import BaseRegionMetricsSchema from "./regionMetrics.mjs";

// Indicate a issue in measurable violating condition involving multiple sensorIds under that measurable or that measurable environments
const VibrationSensorMetricsAggregatedSchema = new mongoose.Schema({
   ...BaseRegionMetricsSchema.obj,
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
   maxStage: {
      type: Number,
   },
   recordCount: {
      type: Number,
   },
   timestamp: {
      type: Date,
      required: true,
   },
})

export default VibrationSensorMetricsAggregatedSchema;