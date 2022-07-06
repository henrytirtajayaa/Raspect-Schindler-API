import moment from "moment";
import mongoose from "mongoose";


export default class AlertBuilder {
    buildCriteria(params, startDate, endDate) {
        const {teamId, severity, hierarchyId, ruleCategory, status, page, limit} = params
        const criteria = {
            collection: 'MonitoringAlerts',
            criteria: {
                timestamp: {
                    $gte: startDate.toDate(),
                    $lt: endDate.toDate()
                },
                teamId: teamId,
            },
            sort: {
                timestamp: -1,
            },
            paging: {
                page: page,
                limit: limit
            }
        }
        if (severity) criteria.criteria.severity = severity;
        if (hierarchyId) criteria.criteria.hierarchyId = mongoose.mongo.ObjectId(hierarchyId);
        if (ruleCategory) criteria.ruleCategory = ruleCategory;
        if (status) criteria.criteria.status = status;
        return criteria;
    }
}