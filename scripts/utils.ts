import chalk from 'chalk';
import { ChildProcess } from 'child_process';

export function prefixStdout(childProcess: ChildProcess, prefix: string) {
    childProcess.stdout.on('data', data => {
        logWithPrefix(data.toString(), prefix);
    });
}

export function logWithPrefix(text: string, prefix: string) {
    const lines = text.split('\n');

    const paddedLines = lines.map((line, index) => {
        if (index !== 0 && index !== lines.length - 1) {
            return prefix + line;
        }

        return line;
    });

    process.stdout.write(prefix + paddedLines.join('\n'));
}

export function checkChildStatus(status: number, command: string) {
    if (status !== 0) {
        console.log(chalk.red(`${command} exited with code ${status}`));
        return process.exit(1);
    }
}
