import esbuild from 'esbuild';
import packageJson from './package.json' assert { type: 'json' };
import esbuildPluginTsc from 'esbuild-plugin-tsc';

await esbuild.build({
    entryPoints: ['src/index.ts'],
    outfile: 'dist/index.js',
    bundle: true,
    target: 'esnext',
    format: 'esm',
    sourcemap: 'inline',
    keepNames: true,
    minify: false,
    plugins: [
        esbuildPluginTsc({
            force: true,
            tsconfigPath: 'tsconfig.json',
        }),
    ],
    external: [...Object.keys(packageJson.dependencies), 'crypto', 'alt-server'],
});
