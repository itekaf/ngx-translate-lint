interface IArgv {
    project: string;
    languages: string;

    help?: boolean;
    views?: string;
    ignore?: string;
    version?: boolean;
    zombies?: string;
    misprint?: boolean;
}

export { IArgv };
