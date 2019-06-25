import { differenceBy } from 'lodash';

import { IRule } from './../interface';
import { ErrorTypes, ErrorFlow } from './../enums';
import { ResultErrorModel, KeyModel } from './../models';

class ZombieRule implements IRule {
    public flow: ErrorFlow = ErrorFlow.zombie;
    public type: ErrorTypes;

    constructor(
        type: ErrorTypes = ErrorTypes.error
    ) {
        this.type = type;
    }

    public check(viewKeys: KeyModel[], languagesKeys: KeyModel[]): ResultErrorModel[] {
        const keysListError: KeyModel[] = differenceBy<KeyModel, KeyModel>(languagesKeys, viewKeys, 'name');
        const resultErrorList: ResultErrorModel[] = keysListError.reduce((result: ResultErrorModel[], key: KeyModel) => {
            const resultErrors: ResultErrorModel[] = key.localesList.map((languagePath: string) => {
                const resultErrorModel: ResultErrorModel = new ResultErrorModel(key.name, this.flow, this.type, languagePath);
                return resultErrorModel;
            });
            result.push(...resultErrors);
            return result;
        }, []);
        return resultErrorList;
    }
}

export { ZombieRule };
