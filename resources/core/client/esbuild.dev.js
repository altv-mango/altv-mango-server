import esbuild from 'esbuild';
import { altvEsbuild } from 'altv-esbuild';
import packageJson from './package.json' with { type: 'json' };
import esbuildPluginTsc from 'esbuild-plugin-tsc';
import { replace } from 'esbuild-plugin-replace';

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
            mode: 'client',
            dev: {
                enabled: true,
                enhancedRestartCommand: false,
                topLevelExceptionHandling: true,
            },
        }),
        replace({
            include: /\.ts$/,
            __WEBVIEW_URL__: 'http://localhost:5173/',
        }),
    ],
    external: [...Object.keys(packageJson.dependencies), 'alt-client'],
});

ctx.watch();
