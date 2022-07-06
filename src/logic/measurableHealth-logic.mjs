import getConnection from "../model/connection-factory.mjs";
import {executeQuery} from "../utils/query-runner.mjs";
import moment from "moment";
import mongoose from "mongoose";

export async function getMeasurableHealthLogic(measurableType) {
   const db = await getConnection();
   const MeasurableHealth = db.model('MeasurableHealthMetrics');
   let criteria = {};

   if(measurableType) criteria.measurableType = measurableType;
   
   const models = await MeasurableHealth.find(criteria);
   return models.map((t) => { return t.toObject()});
}