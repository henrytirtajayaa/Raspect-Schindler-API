import moment from "moment-timezone";
import { getMetrics } from "../logic/metrics-logic.mjs";

const DEFAULT_TIMEZONE = "Asia/Shanghai";

export default class MetricsController {
    static async getMetricsOverTime(ctx) {
        const { teamId, workspaceId } = ctx.params;
        const targetId = teamId ?? workspaceId;
        const criteria = ctx.request.body;
        let { startDate, endDate, outputTimezone } = ctx.query;
        if (!outputTimezone) outputTimezone = DEFAULT_TIMEZONE;
        const startMoment = moment(startDate);
        const endMoment = moment(endDate);
        const metrics = await getMetrics(targetId, startMoment, endMoment, outputTimezone, ...criteria);
        console.log(metrics);
        ctx.body = metrics;
    }
}