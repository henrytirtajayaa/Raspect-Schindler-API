import mongoose from "mongoose";
import BaseRegionMetricsSchema from "./regionMetrics.mjs";

const WeatherMetricsAggregatedSchema = new mongoose.Schema({
    ...BaseRegionMetricsSchema.obj,
    avgTemperature: {
        type: Number,
    },
    avgHumidity: {
        type: Number,
    },
    maxRainfall: {
        type: Number,
    },
    avgUvIndex: {
        type: Number,
    }
})

export default WeatherMetricsAggregatedSchema;