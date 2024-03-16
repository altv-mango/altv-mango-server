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
    minify: true,
    plugins: [esbuildPluginTsc()],
    external: [...Object.keys(packageJson.dependencies), 'crypto'],
});
