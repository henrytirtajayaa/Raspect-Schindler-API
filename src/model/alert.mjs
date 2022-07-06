import mongoose from "mongoose";

// Indicate a issue in measurable violating condition involving multiple sensorIds under that measurable or that measurable environments
const MonitoringAlertSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
    },
    sensorIds: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
    },
    measurableId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    hierarchyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    measurableType: {
        type: String,
    },
    message: {
        type: String,
    },
    info: {
        type: Map,
    },
    ruleCategory: {
        type: String,
    },
    ruleId: {
        type: String,
    },
    rule: {
        type: Map,
    },
    status: {
        type: String,
        enum: ['Active', 'Resumed', 'Closed'],
    },
    severity: {
        type: Number,
    },
})

export default MonitoringAlertSchema;