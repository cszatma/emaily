import fs from 'fs-extra';
import path from 'path';

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: string) =>
    path.resolve(appDirectory, relativePath);

const paths = {
    appBuild: resolveApp('build'),
    appBuildClient: resolveApp('build/client'),
    appClient: resolveApp('client'),
    appClientBuild: resolveApp('client/build'),
    appSrc: resolveApp('src'),
    appTsBuildConfig: resolveApp('tsconfig.build.json'),
    appTsConfig: resolveApp('tsconfig.json'),
    yarnLockFile: resolveApp('yarn.lock'),
};

export default paths;
