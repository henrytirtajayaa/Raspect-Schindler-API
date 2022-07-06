import getConnection from "../model/connection-factory.mjs";
import {executeQuery} from "../utils/query-runner.mjs";
import moment from "moment";
import mongoose from "mongoose";

export async function getMetricsSensorBatteryLogic(sensorId, measurableComponentId) {
   const db = await getConnection();
   const SensorBattery = db.model('SensorBatteryMetrics');
   let criteria = {};

   if(sensorId) criteria.sensorId = sensorId;
   if(measurableComponentId) criteria.measurableComponentId = measurableComponentId;
   
   const models = await SensorBattery.find(criteria);
   return models.map((t) => { return t.toObject()});
}