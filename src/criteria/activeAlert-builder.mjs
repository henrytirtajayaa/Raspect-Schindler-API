import mongoose from "mongoose";

export default class ActiveAlertBuilder {
    buildCriteria(params, startDate, endDate) {
        const {teamId, severity, hierarchyId, ruleCategory} = params
        const criteria = {
            collection: 'MonitoringAlerts',
            criteria: {
                status: 'Active',
                teamId: teamId,
            },
            sort: {
                timestamp: -1,
            }
        }
        if (severity) criteria.criteria.severity = severity;
        if (hierarchyId) criteria.criteria.hierarchyId = mongoose.mongo.ObjectId(hierarchyId);
        if (ruleCategory) criteria.criteria.ruleCategory = ruleCategory;
        return criteria;
    }
}