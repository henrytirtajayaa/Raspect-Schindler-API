import moment from "moment";

function getCollectionName(duration) {
    if (duration <= 30) {
        return 'MonitoringAlertsDailys';
    } else {
        return 'MonitoringAlertsMonthlys';
    }
}

export default class AlertCountByDateBuilder {
    buildCriteria(params, startDate, endDate) {
        const duration = endDate.diff(startDate, 'days')
        return {
            collection: getCollectionName(duration),
            pipelines: [
                {
                    $match: {
                        timestamp: {
                            $gte: startDate.toDate(),
                            $lt: endDate.toDate()
                        },
                        teamId: params.teamId,
                    }
                },
                {
                    "$group": {
                        _id: {
                            timestamp: "$timestamp"
                        },
                        maxSeverity: {
                            "$max": "$maxSeverity"
                        },
                        recordCount: {
                            "$sum": "$recordCount"
                        },
                    },
                },
                {
                    "$project": {
                        "_id": 0,
                        "timestamp": "$_id.timestamp",
                        "maxSeverity": 1,
                        "recordCount": 1,
                    }
                },
                {
                    "$sort": {
                        "timestamp": 1,
                    }
                }
            ]
        }
    }
}