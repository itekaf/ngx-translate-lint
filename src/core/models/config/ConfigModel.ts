import { IRulesConfig } from './../../interface/IRulesConfig';
import { ErrorTypes } from '../../enums';

class ConfigModel implements IRulesConfig {

    public views: ErrorTypes = ErrorTypes.error;
    public zombies: ErrorTypes = ErrorTypes.warning;
    public misprint: boolean = true;

    constructor (
        views: ErrorTypes = ErrorTypes.error,
        zombies: ErrorTypes = ErrorTypes.warning,
        misprint: boolean = true
    ) {
        this.views = views;
        this.zombies = zombies;
        this.misprint = misprint;
    }


    public static create(obj: IRulesConfig): ConfigModel {
        return new ConfigModel(obj.views, obj.zombies, obj.misprint);
    }
}

export { ConfigModel }
