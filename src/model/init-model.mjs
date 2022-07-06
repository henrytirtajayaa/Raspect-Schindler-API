import mongoose from "mongoose";
import MonitoringAlertSchema from "./alert.mjs";
import MonitoringAlertAggregatedSchema from "./alertAggregated.mjs";
import MeasurableSchema from "./measurable.mjs";
import MeasurableHealthSchema from "./measurableHealth.mjs";
import VibrationSensorSchema from "./vibrationSensorMetrics.mjs";
import VibrationSensorMetricsAggregatedSchema from "./vibrationSensorMetricsAggregated.mjs";
import BaseSensorMetricsSchema from "./sensorMetrics.mjs";
import SensorBatterySchema from "./sensorBatteryMetrics.mjs"
import SensorBatteryMetricsAggregatedSchema from "./sensorBatteryMetricsAggregated.mjs"
import WeatherMetricsSchema from "./weatherMetrics.mjs";
import WeatherMetricsAggregatedSchema from "./weatherMetricsAggregated.mjs";

export default function initModel(conn) {
    conn.model('Measurable', MeasurableSchema);
    // Alert Model
    conn.model('MonitoringAlerts', MonitoringAlertSchema);
    conn.model('MonitoringAlertsHourlys', MonitoringAlertAggregatedSchema);
    conn.model('MonitoringAlertsDailys', MonitoringAlertAggregatedSchema);
    conn.model('MonitoringAlertsMonthlys', MonitoringAlertAggregatedSchema);

    conn.model('MeasurableMetrics', MeasurableSchema);
    conn.model('MeasurableHealthMetrics', MeasurableHealthSchema);
    conn.model('BaseSensorMetrics', BaseSensorMetricsSchema);
    
    conn.model('VibrationSensorMetrics', VibrationSensorSchema);
    conn.model('VibrationSensorMetricsMonthly', VibrationSensorMetricsAggregatedSchema);
    conn.model('VibrationSensorMetricsDaily', VibrationSensorMetricsAggregatedSchema);
    conn.model('VibrationSensorMetricsHourly', VibrationSensorMetricsAggregatedSchema);
    
    conn.model('SensorBatteryMetrics', SensorBatterySchema);
    conn.model('SensorBatteryMetricsMonthly', SensorBatteryMetricsAggregatedSchema);
    conn.model('SensorBatteryMetricsDaily', SensorBatteryMetricsAggregatedSchema);
    conn.model('SensorBatteryMetricsHourly', SensorBatteryMetricsAggregatedSchema);

    conn.model('WeatherMetrics', WeatherMetricsSchema);
    conn.model('WeatherMetricsHourlys', WeatherMetricsAggregatedSchema);
    conn.model('WeatherMetricsDailys', WeatherMetricsAggregatedSchema);
    conn.model('WeatherMetricsMonthlys', WeatherMetricsAggregatedSchema);
}