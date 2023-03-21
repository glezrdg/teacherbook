import { Calification } from "./calification";

export interface Student {
  id?: number;
  name: string;
  gradeId: number;
  califications?: Calification[]
}
