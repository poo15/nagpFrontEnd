import { Level } from './Level'
import { Activity } from './Activity';
import { Applicant } from './Applicant';
export class ActivityRecord{
    activityRecordId:number;
    levelId?:string;
    activity?:Activity= new Activity();
    status?:string;
    percentage?:number;
    applicant:Applicant = new Applicant();
    description?:string;
    startDate?:string;
    doneDate?:string;
    completionDate?:string;
    attempts?:number;
    points?:number;
}