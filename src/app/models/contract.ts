import { Position } from "./position";

export interface Contract{
    id: string;
    dateStartContract: Date;
    dateEndContract?: Date | null;
    dateEstimatedEndContract?: Date | null;
    salary: number;
    position: Position;
    idWorkerAsigned: string
}