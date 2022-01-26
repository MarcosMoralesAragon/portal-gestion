import { State } from "./state";

export interface Worker{
    id: number;
    name: string;
    firstName: string;
    lastName: string;
    dni: string
    bornDate: Date;
    nationality: string;
    state : State
}