export default class WeatherBuilder {
    buildCriteria(params, startDate, endDate) {
        const {countryCode, regionCode} = params
        const criteria = {
            collection: 'WeatherMetrics',
            criteria: {
                timestamp: {
                    $gte: startDate.toDate(),
                    $lt: endDate.toDate()
                },
                countryCode: countryCode,
                regionCode: regionCode
            },
            sort: {
                timestamp: -1,
            },
            paging: {
                limit: 1
            }
        }
        return criteria;
    }
}