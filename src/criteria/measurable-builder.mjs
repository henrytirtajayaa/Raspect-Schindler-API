export default class MeasurableBuilder {
   buildCriteria(params, startDate, endDate) {
       const { measurableType } = params
       const criteria = {
           collection: 'MeasurableMetrics',
           criteria: {
               timestamp: {
                   $gte: startDate.toDate(),
                   $lt: endDate.toDate()
               },
               measurableType: measurableType
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