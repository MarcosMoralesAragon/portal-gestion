import { Position } from "./position";

export interface Contract{
    id: string;
    dateStartContract: Date;
    dateEndContract?: Date;
    dateEstimatedEndContract?: Date;
    salary: number;
    position: Position;
    idWorkerAsigned: string
}