import test from "ava";
import {executeQuery} from "../../src/utils/query-runner.mjs";
import moment from "moment";
import getConnection from "../../src/model/connection-factory.mjs";

// test.serial('Query Alert Count', async t => {
//     const startDate = moment().startOf('days').subtract(7 , 'days');
//     const endDate = moment().startOf('days');
//     const result = await executeQuery("alert", {
//         page: 0,
//         limit: 5,
//     }, startDate, endDate, 'Asia/Shanghai');
//     console.log(JSON.stringify(result));
// });

test.serial('Query Weather Data', async t => {
    const startDate = moment().startOf('days').subtract(7 , 'days');
    const endDate = moment().startOf('days');
    const result = await executeQuery("weather", {
        "countryCode": "HK",
        "regionCode": "HEA"
    }, startDate, endDate, 'Asia/Shanghai');
    console.log(JSON.stringify(result));
    t.pass();
})