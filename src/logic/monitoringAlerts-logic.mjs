import getConnection from "../model/connection-factory.mjs";
import {executeQuery} from "../utils/query-runner.mjs";
import moment from "moment";
import mongoose from "mongoose";

export async function getMetricsMonitoringAlertsLogic(teamId) {
   const db = await getConnection();
   const MonitoringAlert = db.model('MonitoringAlerts');
   let criteria = {};

   if(teamId) criteria.teamId = teamId;
   
   const models = await MonitoringAlert.find(criteria);
   return models.map((t) => { return t.toObject()});
}