import getConnection from "../model/connection-factory.mjs";
import {executeQuery} from "../utils/query-runner.mjs";
import moment from "moment";
import mongoose from "mongoose";

export async function createMetrics(modelName, metrics, externalId) {
    const db = await getConnection();
    const Model = db.model(modelName);
    const dbMetrics = new Model(metrics);
    if (externalId) {
        const Sensor = db.model('Sensor');
        const sensor = await Sensor.findOne({
            externalId,
        });
        if (sensor) {
            dbMetrics.sensorId = sensor._id;
            dbMetrics.measurableId = sensor.measurableId;
        }
    }
    await dbMetrics.save();
    return dbMetrics;
}

export async function getMetrics(teamId, startDate, endDate, outputTimezone, ...queryCriteria) {
    const result = {};
    const promises = [];
    for (const criteria of queryCriteria) {
        criteria.teamId = mongoose.mongo.ObjectId(teamId);
        const promise = executeQuery(criteria.name, criteria, startDate, endDate, outputTimezone).then((queryResult) => {
            result[criteria.name] = queryResult;
        });
        promises.push(promise);
    }
    await Promise.allSettled(promises);
    return result;
}
