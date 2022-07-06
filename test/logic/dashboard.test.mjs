import test from "ava";
import {executeQuery} from "../../src/utils/query-runner.mjs";
import moment from "moment";
import getConnection from "../../src/model/connection-factory.mjs";

// MONITORING ALERT TEST
test.serial('Monitoring Alert Data', async t => {
   const startDate = moment().startOf('days').subtract(30 , 'days');
   const endDate = moment().startOf('days');
   const result = await executeQuery("activeAlert", {
      "status" : "Active",
      "teamId" : "4c696b6f6e5465616d313233"
   }, startDate, endDate, 'Asia/Shanghai');
   console.log(JSON.stringify(result));
   t.pass();
})

//MEASURABLES
test.serial('Measurable Data', async t => {
   //const startDate = moment().startOf('days').subtract(30 , 'days');
   const startDate = moment().startOf('days').subtract(2 , 'years');
   const endDate = moment().startOf('days');
   const result = await executeQuery("measurable", {
      
   }, startDate, endDate, 'Asia/Shanghai');
   console.log(JSON.stringify(result));
   t.pass();
})

//MEASURABLE HEALTH
test.serial('Measurable Health Data', async t => {
   const startDate = moment().startOf('days').subtract(30 , 'days');
   const endDate = moment().startOf('days');
   const result = await executeQuery("measurableHealth", {

   }, startDate, endDate, 'Asia/Shanghai');
   console.log(JSON.stringify(result));
   t.pass();
})

//BASE SENSOR
test.serial('Base Sensor Data', async t => {
   const startDate = moment().startOf('days').subtract(30 , 'days');
   const endDate = moment().startOf('days');
   const result = await executeQuery("sensor", {

   }, startDate, endDate, 'Asia/Shanghai');
   console.log(JSON.stringify(result));
   t.pass();
})