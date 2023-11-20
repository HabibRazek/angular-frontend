import { DrugClass } from "./DrugClass.model";
import { Image } from "./image.model";

export class Drugs {
  id!: number;
  genericName!: string;
  brandNames!: string;
  dosageForm!: string;
  lastUpdated!: Date;
  drugClass!: DrugClass;
  images!: Image[];
  imageStr!:string ;



}
