export default class SensorBatteryBuilder {
   buildCriteria(params, startDate, endDate) {
    const { workspaceId, measurableId, measurableComponentId, direction } = params
    let filterQuery = {};

    if(workspaceId) filterQuery.workspaceId = workspaceId;
    if(measurableId) filterQuery.measurableId = measurableId;
    if(measurableComponentId) filterQuery.measurableComponentId = measurableComponentId;
    if(direction) filterQuery.direction = direction;

       const criteria = {
           collection: 'VibrationSensorMetrics',
           criteria: {
               timestamp: {
                   $gte: startDate.toDate(),
                   $lt: endDate.toDate()
               },
               ...filterQuery
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