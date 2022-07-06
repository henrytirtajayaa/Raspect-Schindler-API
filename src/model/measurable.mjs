import mongoose from "mongoose";

const PolygonSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Polygon'],
        required: true
    },
    coordinates: {
        type: [[[Number]]],
        required: true
    }
}, { _id : false });

const PointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
}, { _id : false });

const MeasurableSchema = new mongoose.Schema({
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
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date
    },
    planId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    areaHotspot: {
        type: PolygonSchema,
    },
    pointHotspot: {
        type: PointSchema,
    },
})

export default MeasurableSchema;