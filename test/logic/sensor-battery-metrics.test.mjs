import test from "ava";
import {executeQuery} from "../../src/utils/query-runner.mjs";
import moment from "moment";
import getConnection from "../../src/model/connection-factory.mjs";

test.serial('Sensor Battery Metric Data', async t => {
    const startDate = moment().startOf('days').subtract(30 , 'days');
    const endDate = moment().startOf('days');
    const result = await executeQuery("sensorBatteryMetrics", {
        "battery": 258.76
    }, startDate, endDate, 'Asia/Shanghai');
    console.log(JSON.stringify(result));
    t.pass();
})