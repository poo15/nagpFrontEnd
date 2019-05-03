import { Batch } from './Batch'
import { Level } from './Level'
export class Activity{
    id?:string;
    name?:string;
    description?:string;
    points:number;
    batch:Batch = new Batch();
    level:Level = new Level();
    maxQualificationPoints?:number;
    optional:boolean;
}