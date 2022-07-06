import mongoose from "mongoose";

// Indicate a issue in measurable violating condition involving multiple sensorIds under that measurable or that measurable environments
const MonitoringAlertAggregatedSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        required: true,
    },
    hierarchyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    measurableType: {
        type: String,
    },
    maxSeverity: {
        type: Number,
    },
    recordCount: {
        type: Number,
    },
})

export default MonitoringAlertAggregatedSchema;