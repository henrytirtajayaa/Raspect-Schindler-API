export default class MeasurableHealthBuilder {
   buildCriteria(params, startDate, endDate) {
    const { measurableType } = params
    let filterQuery = {};

    if(measurableType) filterQuery.measurableType = measurableType;

       const criteria = {
           collection: 'MeasurableHealthMetrics',
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