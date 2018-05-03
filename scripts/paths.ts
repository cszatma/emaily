import fs from 'fs-extra';
import path from 'path';

// Resolve paths relative to the root project directory
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: string) =>
    path.resolve(appDirectory, relativePath);

// Resolve paths relative to the client
const clientDirectory = resolveApp('client');
const resolveClient = (relativePath: string) =>
    path.resolve(clientDirectory, relativePath);

// Resolve packages installed in the client
const resolveClientPackage = (packageName: string) =>
    resolveClient(`node_modules/${packageName}`);

const clientPackageJsonPath = resolveClient('package.json');
const clientPackageJson = require(clientPackageJsonPath);

const reactScripts = Object.keys(clientPackageJson.dependencies).find(
    dependency => dependency.includes('react-scripts'),
);

if (!reactScripts) {
    throw new Error('react-scripts is not installed in the client!');
}

const paths = {
    appBuild: resolveApp('build'),
    appBuildClient: resolveApp('build/client'),
    appClient: clientDirectory,
    appClientBuild: resolveClient('build'),
    appPackageJson: resolveApp('package.json'),
    appSrc: resolveApp('src'),
    appTsBuildConfig: resolveApp('tsconfig.build.json'),
    appTsConfig: resolveApp('tsconfig.json'),
    clientPackageJson: clientPackageJsonPath,
    reactScripts: `${resolveClientPackage(reactScripts)}/scripts`,
    yarnLockFile: resolveApp('yarn.lock'),
};

export default paths;
export { resolveApp, resolveClient, resolveClientPackage };
