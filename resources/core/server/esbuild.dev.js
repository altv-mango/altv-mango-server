import esbuild from 'esbuild';
import { altvEsbuild } from 'altv-esbuild';
import packageJson from './package.json' with { type: 'json' };
import esbuildPluginTsc from 'esbuild-plugin-tsc';

const ctx = await esbuild.context({
    entryPoints: ['src/index.ts'],
    outfile: 'dist/index.js',
    bundle: true,
    target: 'esnext',
    format: 'esm',
    sourcemap: 'inline',
    keepNames: true,
    plugins: [
        esbuildPluginTsc(),
        altvEsbuild({
            mode: 'server',
            dev: {
                enabled: true,
                enhancedRestartCommand: false,
                topLevelExceptionHandling: true,
            },
        }),
    ],

    external: [...Object.keys(packageJson.dependencies), 'alt-server'],
});

ctx.watch();
