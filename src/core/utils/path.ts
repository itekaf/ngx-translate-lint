import path from 'path';
import glob from 'glob';

class PathUtils {
    public static resolvePath(filePath: string): string {
        return path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
    }

    public static getNormalizeFiles(folder: string | undefined, ignores: string[] = []): string[] {
        if (!folder) return [];
        const correctFilesPath: string = PathUtils.resolvePath(folder);
        const correctIgnorePath: string[] = ignores.map((path: string) => PathUtils.resolvePath(path.trim()));

        return glob.sync(correctFilesPath, {
            ignore: correctIgnorePath,
        }).map((filePath: string) => path.normalize(filePath));
    }
}

export { PathUtils };
