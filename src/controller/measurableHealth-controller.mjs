import moment from "moment-timezone";
import { 
   getMeasurableHealthLogic
 } from "../logic/measurableHealth-logic.mjs";

const DEFAULT_TIMEZONE = "Asia/Shanghai";

export default class MeasurableHealthController {
   static async getMetricsMeasurableHealth(ctx){
      const { measurableType } = ctx.params
      const metrics = await getMeasurableHealthLogic(measurableType);
      
      ctx.body = metrics;
  }

}