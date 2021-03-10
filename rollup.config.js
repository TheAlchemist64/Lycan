import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: {
    file: 'bin/bundle.js',
    format: 'iife',
    sourcemap: 'true'
  },
  plugins: [nodeResolve(), typescript({downlevelIteration: true})]
};