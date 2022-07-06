import Router from 'koa-router';
import compose from 'koa-compose';
import Oas3 from 'koa-oas3';
import config from 'config';
import jwt from 'koa-jwt';
import permissionCheckMiddleware from '../middleware/permission-check.mjs';
import MetricsController from "../controller/metrics-controller.mjs";
import VibrationSensorController from '../controller/vibrationSensor-controller.mjs';
import MeasurableController from "../controller/measurable-controller.mjs";
import SensorBatteryController from '../controller/sensorBattery-controller.mjs';
import MonitoringAlertsController from '../controller/monitoringAlerts-controller.mjs';
import MeasurableHealthController from '../controller/measurableHealth-controller.mjs';

export default async () => {
  const prefix = config.get('server.apiPrefix');
  console.log(prefix);
  const router = new Router({
    prefix,
  });
  const oasMiddleware = await Oas3.oas({
    file: `${process.cwd()}/api_spec/openapi-v1.yaml`,
    endpoint: `${prefix}/openapi.json`,
    uiEndpoint: `${prefix}/openapi.html`,
    validatePaths: [prefix],
    validateResponse: true,
    validationOptions: {
      requestBodyAjvOptions: {
        discriminator: true,
        removeAdditional: false,
      },
      responseBodyAjvOptions: {
        discriminator: true,
        removeAdditional: false,
      }
    },
    errorHandler: (error, ctx) => {
      throw error;
    },
  });

  // Full system requires authentication
  router.use(jwt({ secret: config.get('auth.jwtVerify') }));
  router.post('/teams/:teamId/metrics', permissionCheckMiddleware(), MetricsController.getMetricsOverTime);
  router.post('/workspace/:workspaceId/metrics', permissionCheckMiddleware(), MetricsController.getMetricsOverTime);
  
  //GetBearingFrequencySpectrum
  router.get('/measurableId/:measurableId/measurableComponentId/:measurableComponentId/vibration-sensor', permissionCheckMiddleware(), VibrationSensorController.getMetricsVibrationSensor);
  
  //GetSensorBattery
  router.get('/sensorId/:sensorId/measurableComponentId/:measurableComponentId/sensor-battery', permissionCheckMiddleware(), SensorBatteryController.getMetricsSensorBattery);

  //MonitoringAlert
  router.get('/teamId/:teamId/monitoring-alerts', permissionCheckMiddleware(), MonitoringAlertsController.getMetricsMonitoringAlerts);

  //MeasurableHealth
  router.get('/measurableType/:measurableType/measurable-health', permissionCheckMiddleware(), MeasurableHealthController.getMetricsMeasurableHealth);

  //Measurable
  router.get('/teams/:teamId/measurables/:id', permissionCheckMiddleware(), MeasurableController.getMeasurableInfo);
  router.get('/teams/:teamId/measurables', permissionCheckMiddleware(), MeasurableController.getMeasurables);
  router.get('/workspaceId/:workspaceId/measurables', permissionCheckMiddleware(), MeasurableController.getMeasurables);

  const routes = router.routes();

  return compose([
    // oasMiddleware,
    routes,
  ]);
};
