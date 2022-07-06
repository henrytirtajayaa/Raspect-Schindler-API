import mongoose from "mongoose";

const MeasurableHealthSchema = new mongoose.Schema({
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    measurableId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    measurableType: {
        type: String,
        required: true,
    },
    measurableName: {
        type: String,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date
    },
    health: {
        type: Number,
        required: true,
        default: 0,  // 0 Normal, 1 Minor, 2 Major, 3 Critical
    },
})

export default MeasurableHealthSchema;