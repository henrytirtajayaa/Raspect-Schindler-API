import moment from "moment-timezone";
import {listMeasurables, getMeasurableInfo} from "../logic/measurable-logic.mjs";
import {getMetrics} from "../logic/metrics-logic.mjs";

const DEFAULT_TIMEZONE = "Asia/Shanghai";

export default class MeasurableController {

    static async getMeasurableInfo(ctx){
        const teamId = ctx.params.teamId;
        const measurableId = ctx.params.id;
        ctx.body = await getMeasurableInfo(teamId, measurableId);
    }

    static async getMeasurables(ctx) {
        const { teamId, workspaceId } = ctx.params;
        const targetId = workspaceId || teamId;
        const { date, layoutId, measurableType } = ctx.query;
        const queryDate = date ? moment(date) : null;
        const measurables = await listMeasurables(targetId, layoutId, queryDate, measurableType);
        measurables.forEach((measurable) => {
            delete measurable['teamId'];
            delete measurable['startDate'];
            delete measurable['__v'];
        })
        ctx.body = measurables;
    }

    static async getMetrics(ctx) {
        const { teamId } = ctx.params;
        const criteria = ctx.request.body;
        let {startDate, endDate, outputTimezone} = ctx.query;
        if (!outputTimezone) outputTimezone = DEFAULT_TIMEZONE;
        const startMoment = moment.tz(startDate, outputTimezone);
        const endMoment = moment.tz(endDate, outputTimezone);
        const metrics = await getMetrics(teamId, startMoment, endMoment, outputTimezone, ...criteria);
        ctx.body = metrics;
    }

}