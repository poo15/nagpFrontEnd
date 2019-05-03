import { Batch } from './Batch'
import { Level } from './Level'
export class Applicant{
    applicantId?:number;
    name?:string;
    email?:string;
    contactNo:string;
    batch:Batch = new Batch();
    level:Level = new Level();
    status?:string;
}