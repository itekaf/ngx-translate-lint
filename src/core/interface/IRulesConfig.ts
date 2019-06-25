import { ErrorTypes } from "./../enums";

interface IRulesConfig {
    views?: ErrorTypes;
    zombies?: ErrorTypes;
    misprint?: boolean;
}

export { IRulesConfig };
