import mongoose from "mongoose";

// Indicate a issue in measurable violating condition involving multiple sensorIds under that measurable or that measurable environments
const VibrationSensorSchema = new mongoose.Schema({
    sensorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    measurableId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    measurableComponentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    workspaceId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    direction: {
        type: String,
    },
    s3ObjectKey: {
        type: String,
    },
    freq: {
        type: Array,
    },
    acceleration: {
        type: Array,
    },
    velocity: {
        type: Array
    },
    stage: {
        type: Number
    },
    startTime: {
        type: Date,
    },
    endTime: {
        type: Date,
    },
    timestamp: {
        type: Date,
        required: true,
    },
})

export default VibrationSensorSchema;