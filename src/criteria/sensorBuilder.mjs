export default class SensorBuilder {
   buildCriteria(params, startDate, endDate) {
       const { sensorType } = params
       const criteria = {
           collection: 'BaseSensorMetrics',
           criteria: {
               timestamp: {
                   $gte: startDate.toDate(),
                   $lt: endDate.toDate()
               },
               sensorType : sensorType
           },
           sort: {
               timestamp: -1,
           },
           paging: {
               limit: 10
           }
       }
       return criteria;
   }
}