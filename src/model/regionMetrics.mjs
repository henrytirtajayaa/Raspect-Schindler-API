import mongoose from "mongoose";

const BaseRegionMetricsSchema = new mongoose.Schema({
    timestamp: {
        type: Date
    },
    measurementType: {
        type: String,
    },
    countryCode: {
        type: String,
    },
    cityCode: {
        type: String,
    },
    districtCode: {
        type: String,
    },
})

export default BaseRegionMetricsSchema;