import { ErrorFlow, ErrorTypes } from "../enums";
import { ResultErrorModel, KeyModel } from "./../models";

interface IRule {
    flow: ErrorFlow;
    type: ErrorTypes;
    check(viewKeys: KeyModel[] | ResultErrorModel[], langaugesKeys: KeyModel[]): ResultErrorModel[];
}

export { IRule };
