import esbuild from 'esbuild';
import { altvEsbuild } from 'altv-esbuild';
import packageJson from './package.json' assert { type: 'json' };
import esbuildPluginTsc from 'esbuild-plugin-tsc';

const ctx = await esbuild.context({
    entryPoints: ['src/index.ts'],
    outfile: 'dist/index.js',
    bundle: true,
    target: 'esnext',
    format: 'esm',
    sourcemap: 'inline',
    plugins: [
        esbuildPluginTsc(),
        altvEsbuild({
            mode: 'server',
            dev: {
                enabled: true,
                enhancedRestartCommand: true,
                topLevelExceptionHandling: true,
            },
        }),
    ],

    external: Object.keys(packageJson.dependencies),
});

ctx.watch();
