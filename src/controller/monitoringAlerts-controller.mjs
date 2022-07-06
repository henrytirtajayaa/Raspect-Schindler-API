import moment from "moment-timezone";
import { 
   getMetricsMonitoringAlertsLogic
} from "../logic/monitoringAlerts-logic.mjs";

const DEFAULT_TIMEZONE = "Asia/Shanghai";

export default class MonitoringAlertsController {
   static async getMetricsMonitoringAlerts(ctx){
      const { teamId } = ctx.params
      const metrics = await getMetricsMonitoringAlertsLogic(teamId);
      
      ctx.body = metrics;
  }

}