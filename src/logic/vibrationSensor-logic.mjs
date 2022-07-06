import getConnection from "../model/connection-factory.mjs";
import {executeQuery} from "../utils/query-runner.mjs";
import moment from "moment";
import mongoose from "mongoose";

export async function getMetricsVibrationSensorLogic(workspaceId, measurableId, measurableComponentId, direction) {
   const db = await getConnection();
   const VibrationSensor = db.model('VibrationSensorMetrics');
   let criteria = {};

   if(workspaceId) criteria.workspaceId = workspaceId;
   if(measurableId) criteria.measurableId = measurableId;
   if(measurableComponentId) criteria.measurableComponentId = measurableComponentId;
   if(direction) criteria.direction = direction;
   
   const models = await VibrationSensor.find(criteria);
   return models.map((t) => { return t.toObject()});
}