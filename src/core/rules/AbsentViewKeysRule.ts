import path from 'path';
import { differenceBy } from 'lodash';

import { IRule } from './../interface';
import { KeysUtils } from './../utils';
import { ErrorTypes, ErrorFlow } from './../enums';
import { ResultErrorModel, KeyModel } from './../models';

class AbsentViewKeysRule implements IRule {
    public flow: ErrorFlow = ErrorFlow.views;
    public type: ErrorTypes;
    public languagesPathList: string[];

    get languagesCount(): number {
        return this.languagesPathList.length;
    }

    constructor (
        type: ErrorTypes = ErrorTypes.error,
        languagesPathList: string[],
    ) {
        this.type = type;
        this.languagesPathList = languagesPathList;
    }

    public check(viewsKeys: KeyModel[], languagesKeys: KeyModel[]): ResultErrorModel[] {
        const keysList: KeyModel[] = KeysUtils.groupKeysByName([ ...viewsKeys, ...languagesKeys]);
        const keysListError: KeyModel[] = keysList.filter((key: KeyModel) => !(key.localesList.length === this.languagesCount));
        const resultErrorList: ResultErrorModel[] = keysListError.reduce((result: ResultErrorModel[], key: KeyModel) => {
            const resultErrors: ResultErrorModel[] = key.templatesList.map((viewPath: string) => {
                const absentLanguagePath: string[] = differenceBy(this.languagesPathList, key.localesList)
                    .map((filePath: string) => path.basename(filePath));
                const resultErrorModel: ResultErrorModel = new ResultErrorModel(key.name, this.flow, this.type, viewPath, absentLanguagePath);
                return resultErrorModel;
            });
            result.push(...resultErrors);
            return result;
        }, []);
        return resultErrorList;
    }
}

export { AbsentViewKeysRule };
