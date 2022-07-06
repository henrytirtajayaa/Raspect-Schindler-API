import moment from "moment-timezone";
import { 
   getMetricsSensorBatteryLogic
} from "../logic/sensorBattery-logic.mjs";

const DEFAULT_TIMEZONE = "Asia/Shanghai";

export default class SensorBatteryController {
   static async getMetricsSensorBattery(ctx){
      const { sensorId, measurableComponentId } = ctx.params
      const metrics = await getMetricsSensorBatteryLogic(sensorId, measurableComponentId);
      
      ctx.body = metrics;
  }

}