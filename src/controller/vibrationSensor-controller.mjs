import moment from "moment-timezone";
import { 
   getMetricsVibrationSensorLogic
} from "../logic/vibrationSensor-logic.mjs";

const DEFAULT_TIMEZONE = "Asia/Shanghai";

export default class VibrationSensorController {
   static async getMetricsVibrationSensor(ctx){
      const { workspaceId, measurableId, measurableComponentId, direction } = ctx.params
      const metrics = await getMetricsVibrationSensorLogic(workspaceId, measurableId, measurableComponentId, direction);
      
      console.log(metrics);
      ctx.body = metrics;
  }

}