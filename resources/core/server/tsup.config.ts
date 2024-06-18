import { defineConfig } from 'tsup';
import packageJson from './package.json';

export default defineConfig((options) => {
    const dev = options.watch as boolean;

    return {
        entry: ['src/index.ts'],
        outDir: 'dist',
        splitting: false,
        sourcemap: 'inline',
        clean: true,
        dts: false,
        format: 'esm',
        bundle: true,
        minify: !dev,
        external: [...Object.keys(packageJson.dependencies), 'alt-server'],
        noExternal: Object.keys(packageJson.devDependencies),
    };
});
