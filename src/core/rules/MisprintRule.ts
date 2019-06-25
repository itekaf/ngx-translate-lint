import stringSimilarity, { BestMatch } from 'string-similarity';

import { IRule } from "../interface";
import { ErrorTypes, ErrorFlow } from './../enums';
import { ResultErrorModel, KeyModel } from './../models';

class MisprintRule implements IRule {
    private maxRaiting: number = 0.9;
    public flow: ErrorFlow = ErrorFlow.misprint;
    public type: ErrorTypes;

    constructor(
        type: ErrorTypes = ErrorTypes.warning
    ) {
        this.type = type;
    }

    public check(viewErrorsKeys: ResultErrorModel[], languagesKeys: KeyModel[]): ResultErrorModel[] {
        const languagesKeysList: string[] = languagesKeys.map((key: KeyModel) => key.name);
        // Взять ключ, взять его ключи из файла где он отсутствует прогнаться и создавать ошибки
        const resultErrorList: ResultErrorModel[] = viewErrorsKeys.reduce((result: ResultErrorModel[], key: ResultErrorModel) => {
            const bestMatchModel: BestMatch = stringSimilarity.findBestMatch(key.value, languagesKeysList);
            const bestMatchIndex: number = bestMatchModel.bestMatch.rating >= this.maxRaiting ? bestMatchModel.bestMatchIndex : -1;
            if (bestMatchIndex !== -1) {
                // display suggestions
                const ops: ResultErrorModel = new ResultErrorModel(key.value, this.flow, this.type, key.currentPath, key.abasentedPath, [
                    `${languagesKeys[bestMatchIndex].name}`
                ]);
                result.push(ops);
            }
            return result;
        }, []);
        return resultErrorList;
    }

}

export { MisprintRule };
