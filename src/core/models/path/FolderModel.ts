import path from 'path';
import glob from 'glob';

import { PathModel } from './PathModel';

class FolderModel {
    public path: string;

    public files: PathModel[] = [];
    public ignores: string[] = [];

    public relative: string = '';
    public absolute: string = '';

    constructor(
        path: string,
        files: PathModel[] = [],
        ignores: string[] = [],
        absolute: string | undefined = '',
        relative: string | undefined = '',
    ) {
        this.path = path;
        this.files = files;
        this.ignores = ignores;
        this.absolute = absolute;
        this.relative = relative;
    }

    public static create(pathValue: string, ignores: string[] | string = []): FolderModel {
        const absolutePath: string = PathModel.absoltePath(pathValue);
        const relativePath: string = PathModel.relativePath(absolutePath);

        const resultModel: FolderModel = new FolderModel(name, [], [], absolutePath, relativePath);

        resultModel.setIgnores(ignores);
        resultModel.setFiles();

        return resultModel;
    }

    public setIgnores(ignores: string[] | string): void {
        const ingoresList: string[] = typeof ignores === 'string' ? ignores && ignores !== '' ? ignores.split(',') : [] : ignores;
        const clearIgnoreList: string[] = ingoresList.map((path: string) => PathModel.absoltePath(path.trim()));
        this.ignores = clearIgnoreList;
    }

    public setFiles(): void {
        this.files = FolderModel.getNormalizeFiles(this.absolute, this.ignores).map((path: string) => PathModel.create(path));
    }

    public static getNormalizeFiles(folder: string | undefined, ignores: string[] = []): string[] {
        if (!folder) return [];
        const absoluteFolderPath: string = PathModel.absoltePath(folder);
        const ignorePathList: string[] = ignores.map((path: string) => PathModel.absoltePath(path.trim()));

        return glob.sync(absoluteFolderPath, {
            ignore: ignorePathList,
        }).map((filePath: string) => path.normalize(filePath));
    }
}

export { FolderModel };
