import path from 'path';
import glob from 'glob';

class PathModel {
    public name: string;

    public relative: string = '';
    public absolute: string = '';

    constructor(
        name: string,
        absolute: string | undefined = '',
        relative: string | undefined = '',
    ) {
        this.name = name;
        this.absolute = absolute;
        this.relative = relative;
    }

    public static create(pathValue: string): PathModel {
        const absolutePath: string = PathModel.absoltePath(pathValue);
        const relativePath: string = PathModel.relativePath(absolutePath);

        const name: string = path.basename(absolutePath);

        const resultModel: PathModel = new PathModel(name, absolutePath, relativePath);
        return resultModel;
    }

    public static relativePath(absolutePath: string): string {
        return path.relative(process.cwd(), absolutePath);
    }

    public static absoltePath(filePath: string): string {
        return path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
    }

    public static getNormalizeFiles(folder: string | undefined, ignores: string[] = []): string[] {
        if (!folder) return [];
        const correctFilesPath: string = PathModel.absoltePath(folder);
        const correctIgnorePath: string[] = ignores.map((path: string) => PathModel.absoltePath(path.trim()));

        return glob.sync(correctFilesPath, {
            ignore: correctIgnorePath,
        }).map((filePath: string) => path.normalize(filePath));
    }
}

export { PathModel };
