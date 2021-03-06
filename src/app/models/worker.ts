import { Address } from "./address";
import { State } from "./state";

export interface Worker{
    id: string;
    name: string;
    firstName: string;
    lastName: string;
    dni: string
    bornDate: Date;
    nationality: string;
    state : State;
    address?: Address
}