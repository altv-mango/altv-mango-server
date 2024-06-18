import esbuild from 'esbuild';
import packageJson from './package.json' assert { type: 'json' };
import esbuildPluginTsc from 'esbuild-plugin-tsc';
import { replace } from 'esbuild-plugin-replace';

await esbuild.build({
    entryPoints: ['src/index.ts'],
    outfile: 'dist/index.js',
    bundle: true,
    target: 'esnext',
    format: 'esm',
    sourcemap: 'inline',
    keepNames: true,
    minify: true,
    plugins: [
        esbuildPluginTsc(),
        replace({
            include: /\.ts$/,
            __WEBVIEW_URL__: 'http://resource/ui/dist/index.html',
        }),
    ],
    external: [...Object.keys(packageJson.dependencies), 'alt-client'],
});
