import mongoose from "mongoose";
import BaseRegionMetricsSchema from "./regionMetrics.mjs";

const WeatherMetricsSchema = new mongoose.Schema({
    ...BaseRegionMetricsSchema.obj,
    temperature: {
        type: Number,
    },
    humidity: {
        type: Number,
    },
    rainfall: {
        type: Number,
    },
    uvIndex: {
        type: Number,
    }
})

export default WeatherMetricsSchema;