import { Position } from "./position";

export interface Contract{
    id: number;
    dateStartContract: Date;
    dateEndContract?: Date;
    dateEstimatedEndContract?: Date;
    salary: number;
    position: Position;
    idWorkerAsigned: number
}