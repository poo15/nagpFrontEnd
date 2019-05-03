import { ActivityRecord } from './ActivityRecord';

export class Notification{
    notificationId?:number;
    recordId?:ActivityRecord = new ActivityRecord();
    message?:string;
    readStatus?:boolean;
    date?:string;
}