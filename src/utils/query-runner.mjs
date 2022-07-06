import getConnection from "../model/connection-factory.mjs";
import AlertCountByMeasurableTypeBuilder from "../criteria/alertCountByMeasurableType-builder.mjs";
import AlertCountByHierarchyIdBuilder from "../criteria/alertCountByHierarchyId-builder.mjs";
import AlertCountByDateBuilder from "../criteria/alertCountByDate-builder.mjs";
import AlertBuilder from "../criteria/alert-builder.mjs";
import ActiveAlertBuilder from "../criteria/activeAlert-builder.mjs";
import WeatherBuilder from "../criteria/weather-builder.mjs";
import SensorBuilder from "../criteria/sensorBuilder.mjs";
import SensorBatteryMetricBuilder from "../criteria/sensorBattery-builder.mjs";
import VibrationSensorMetricBuilder from "../criteria/vibrationSensor-builder.mjs"
import MeasurableHealthBuilder from "../criteria/measurableHealth-builder.mjs";
import MeasurableBuilder from "../criteria/measurable-builder.mjs";
import moment from "moment-timezone";

const BUILDER_MAPPING = {
    'alertCountByDate': new AlertCountByDateBuilder(),
    'alertCountByType': new AlertCountByMeasurableTypeBuilder(),
    'alertCountByLocation': new AlertCountByHierarchyIdBuilder(),
    'alert': new AlertBuilder(),
    'activeAlert': new ActiveAlertBuilder(),
    'weather': new WeatherBuilder(),
    'sensor': new SensorBuilder(),
    'sensorBatteryMetrics' : new SensorBatteryMetricBuilder(),
    'vibrationSensorMetrics' : new VibrationSensorMetricBuilder(),
    'measurable' : new MeasurableBuilder(),
    'measurableHealth' : new MeasurableHealthBuilder(),
};

async function executeCriteria(Model, criteria) {
    let chain = Model.find(criteria.criteria, criteria.projection);
    if (criteria.sort) {
        chain = chain.sort(criteria.sort);
    }
    if (criteria.paging && criteria.paging.page) {
        chain = chain.skip(criteria.paging.page * criteria.paging.limit)
    }
    if (criteria.paging && criteria.paging.limit) {
        chain = chain.limit(criteria.paging.limit)
    }
    console.log(`Execute query ============ ${JSON.stringify(criteria)}`)
    
    const result = await chain.exec();
    return result;
}

function transformResult(result, outputTimezone) {
    const filteredResult = result.map((record) => {
        let transformed = null;
        if (record.toObject) {
            transformed =  record.toObject({ flattenMaps: true });
        } else {
            transformed = record;
        }
        ['timestamp', 'startTime', 'endTime'].forEach((field) => {
            if (transformed[field]) {
                transformed[field] = moment(transformed[field]).tz(outputTimezone).format()
            }
        })
        return transformed;
    });
    return filteredResult;
}

export async function executeQuery(name, params, startDate, endDate, outputTimezone) {
    const builder = BUILDER_MAPPING[name];
    if (builder) {
        const criteria =  builder.buildCriteria(params, startDate, endDate);
        const db = await getConnection();
        const Model = db.model(criteria.collection);
        let result = [];
        let totalCount = -1;
        if (criteria.criteria) {
            result = await executeCriteria(Model, criteria);
            if (criteria.paging && criteria.paging.page) {
                totalCount = await Model.estimatedDocumentCount(criteria.criteria)
            }
        } else if (criteria.pipelines) {
            result = await Model.aggregate(criteria.pipelines);
        }
        const filteredResult = transformResult(result, outputTimezone);
        return {
            total: totalCount,
            data: filteredResult
        }
    } else {
        // Return empty list
        return {
            code: 'metrics.query.undefined',
            message: 'Query is not defined'
        };
    }
}