export default class SensorBatteryBuilder {
    buildCriteria(params, startDate, endDate) {
        const { battery } = params
        const filterQuery = {};
        if (battery) {
            filterQuery.battery = battery;
        }
        const criteria = {
            collection: 'SensorBatteryMetrics',
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