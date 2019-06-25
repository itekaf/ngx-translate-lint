import { isArray } from 'lodash';

import { IValidationMessage } from "./../../interface";
import { ErrorFlow, ErrorTypes } from './../../enums';

class ResultErrorModel implements IValidationMessage  {
    public value: string;
    public errorFlow: ErrorFlow;
    public errorType: ErrorTypes;
    public currentPath: string;

    public suggestions?: string[] = [];
    public abasentedPath?: string | string[];

    constructor(
        value: string,
        errorFlow: ErrorFlow = ErrorFlow.views,
        errorType: ErrorTypes = ErrorTypes.error,
        currentPath: string,
        absentedPath?: string | string[],
        suggestions: string[] = [],
    ) {
        this.value = value;
        this.errorFlow = errorFlow;
        this.errorType = errorType;
        this.currentPath = currentPath;
        this.abasentedPath = absentedPath;
        this.suggestions = suggestions;
    }

    get message(): string | string[] | null {
        let message: string | string[] | null = null;
        switch (this.errorFlow) {
            case ErrorFlow.views:
                message = isArray(this.abasentedPath)
                    ? this.abasentedPath.map((path: string) => `Key: '${this.value}' doesn't exist in '${path}'`)
                    : `Key: '${this.value}' doesn't exist in '${this.abasentedPath}'`;
                break;
            case ErrorFlow.zombie:
                message = `Key: '${this.value}' doesn't exist in project'`;
                break;
            default:
                break;
        }
        return message;
    }
}

export { ResultErrorModel };
