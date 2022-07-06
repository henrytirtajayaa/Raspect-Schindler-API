import getConnection from "../model/connection-factory.mjs";
import moment from "moment";
import mongoose from "mongoose";

export async function listMeasurables(teamIdOrWorkspaceId, hierarchyId, queryDate, measurableType) {
    const db = await getConnection();
    const Measurable = db.model('Measurable');
    let criteria = {
        $or: [
            { teamId: teamIdOrWorkspaceId },
            { workspaceId: teamIdOrWorkspaceId }
        ]
    };
    if(hierarchyId){
        criteria.hierarchyId = hierarchyId
    }
    if(measurableType){
        criteria.measurableType = measurableType
    }
    if(queryDate){
        criteria.startDate = {'$lte': queryDate};
        criteria['$or'] = [{endDate: null}, {endDate: {$gte: queryDate}}]
    }
    const measurables = await Measurable.find(criteria);
    const targetMeasurables = [];
    measurables.forEach(m => {
        const { measurableComponent } = m;
        if (!measurableComponent) {
            targetMeasurables.push(m);
        } else {
            measurableComponent.forEach(comp => {
                targetMeasurables.push(comp);
            })
        }
    })


    return targetMeasurables.map((t) => { return t.toObject() });
}

export async function getMeasurableInfo(teamId, measurableId){
    const db = await getConnection();
    const Measurable = db.model('Measurable');
    const AssetHierarchy = db.model('AssetHierarchy');
    const Asset = db.model('Asset');
    const measurable = await Measurable.findOne({
        _id: measurableId,
        teamId
    });
    const hierarchyId = measurable.hierarchyId;
    const hierarchy = await AssetHierarchy.findOne({
        "layouts": {
            $elemMatch: {
                "labels": {
                    $elemMatch: {
                        _id: hierarchyId
                    }
                }
            }
        }
    });
    const code = hierarchy.code;
    const asset = await Asset.findOne({
        code
    });
    const buildingName = asset.name;
    return Object.assign(measurable.toObject(), {
        buildingName
    });
}