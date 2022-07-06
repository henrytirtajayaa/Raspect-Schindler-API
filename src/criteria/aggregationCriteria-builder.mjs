import mongoose from "mongoose";
import _ from "lodash";

export default class AggregationCriteriaBuilder {

    constructor(params){
        this.params = params;
    }

    processAggregatedField(field){
        let index = 0;
        for(const char of field){
            if(char == char.toUpperCase()){
                break;
            }
            index ++;
        }
        return {
            aggregatedType: field.substring(0, index),
            name: _.camelCase(field.substring(index, ))
        }
    }

    build(){
        let criteria = {};
        let matchParams = {
            timestamp: {
                $gte: this.params.startDate.toDate(),
                $lt: this.params.endDate.toDate()
            },
            teamId: this.params.teamId
        };
        if(!_.isEmpty(this.params.measurableIds)){
            matchParams.measurableId = {
                $in: this.params.measurableIds.map(measurableId => mongoose.mongo.ObjectID(measurableId))
            }
        }
        let groupParams = {
            _id: (this.params.queryType == 'groupByMeasurableId') ? "$measurableId" : "$hierarchyId"
        };
        for(const field of this.params.fields){
            let processedField = this.processAggregatedField(field);
            groupParams[field] = { [`$${processedField.aggregatedType}`]: `$${processedField.name}`}
        }
        criteria.pipelines = [
            {
                $match: matchParams
            },{
                $group: groupParams
            }
        ]   
        return criteria;
    }
}