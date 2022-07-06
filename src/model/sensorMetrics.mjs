import mongoose from "mongoose";

const BaseSensorMetricsSchema = new mongoose.Schema({
    timestamp: {
        type: Date
    },
    sensorId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    measurableId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    bookmarked: {
        type: Boolean,
    },
    variant: {
        type: String
    }
})

export default BaseSensorMetricsSchema;