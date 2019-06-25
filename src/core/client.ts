import { flatMap, filter } from 'lodash';

import { config as appConfig } from './config';
import { ErrorTypes, ErrorFlow } from './enums';
import { IRulesConfig } from './interface';
import { ZombieRule, AbsentViewKeysRule, MisprintRule } from './rules';
import { ResultErrorModel, FileLanguageModel, KeyModel, FileViewModel } from './models';
import { PathModel } from './models/path/PathModel';
import { ConfigModel } from './models/config/ConfigModel';

export interface INamedEntity<K, V> {
	id: K;
	name: V;
}

export class NamedEntity<K, V> implements INamedEntity<K, V> {
	public id: K;
	public name: V;

	constructor(id: K, name: V) {
		this.id = id;
		this.name = name;
	}
}

class NgxTranslateLint {
    public config: ConfigModel = new ConfigModel();
    public projectPath: string;
    public languagesPath: string;

    public ignore?: string;

    constructor (
        projectPath: string = appConfig.defaultValues.projectPath,
        languagesPath: string = appConfig.defaultValues.languagesPath,
        ignore?: string,
        config: IRulesConfig = appConfig.defaultValues.rules,
    ) {
        this.languagesPath = languagesPath;
        this.projectPath = projectPath;
        this.config = ConfigModel.create(config);
        this.ignore = ignore;
    }

    public lint(): ResultErrorModel[] {
        if (!(this.projectPath && this.languagesPath)) {
            throw new Error(`Path to project or languages is incorrect`);
        }

        // TODO: RL: Refactor it
        if (!('views' in this.config)) {
            throw new Error('Error config is incorrect');
        }

        const projectPath: PathModel = PathModel.create(this.projectPath);
        const languagesPath: PathModel = PathModel.create(this.languagesPath);

        const languagesKeys: FileLanguageModel = new FileLanguageModel(languagesPath, [], [], this.ignore).getKeys();
        const languagesKeysNames: string[] = flatMap(languagesKeys.keys, (key: KeyModel) => key.name);
        const viewsRegExp: RegExp = appConfig.findKeysList(languagesKeysNames);
        const views: FileViewModel = new FileViewModel(projectPath, [], [], this.ignore).getKeys(viewsRegExp);

        const result: ResultErrorModel[] = [];
        const ops: Array<NamedEntity<ErrorFlow, ResultErrorModel[]>> = [];

        // TODO: RL: Refactor this
        if (this.config.zombies !== ErrorTypes.disable) {
            const ruleInstance: ZombieRule = new ZombieRule(this.config.zombies);
            const ruleResult: ResultErrorModel[] = ruleInstance.check(views.keys, languagesKeys.keys);
            result.push(...ruleResult);
            ops.push({
                id: ErrorFlow.zombie,
                name: ruleResult
            });
        }

        if (this.config.views !== ErrorTypes.disable) {
            const ruleInstance: AbsentViewKeysRule = new AbsentViewKeysRule(this.config.views, languagesKeys.files);
            const ruleResult: ResultErrorModel[] = ruleInstance.check(views.keys, languagesKeys.keys);
            result.push(...ruleResult);
            ops.push({
                id: ErrorFlow.views,
                name: ruleResult
            });
        }

        if(this.config.misprint) {
            const ruleInstanse: MisprintRule = new MisprintRule();
            const errorKeys: ResultErrorModel[] = filter(ops, (x) => x.id === ErrorFlow.views).reduce((acum, x) => {
                acum.push(...x.name);
                return acum;
            }, Array<ResultErrorModel>());
            const ruleResult: ResultErrorModel[] = ruleInstanse.check(errorKeys, languagesKeys.keys);
        }

        return result;
    }
}

export { NgxTranslateLint };
