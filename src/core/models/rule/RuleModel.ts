import { ErrorFlow, ErrorTypes } from "../../enums";
import { ResultErrorModel } from "./../results/ResultErrorModel";
import { IRule } from "../../interface";
import { KeyModel } from "..";

class RuleModel implements IRule {

    public flow: ErrorFlow;
    public type: ErrorTypes;
    public results: ResultErrorModel[] = [];

    constructor(
        flow: ErrorFlow,
        type: ErrorTypes
    ) {
        this.flow = flow;
        this.type = type;
    }

    public check(viewKeys: KeyModel[] | ResultErrorModel[], langaugesKeys: KeyModel[]): ResultErrorModel[] {
        return [];
    }
}

export { RuleModel };
