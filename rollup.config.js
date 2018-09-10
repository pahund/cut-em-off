// rollup.config.js
import replace from 'rollup-plugin-replace';

export default {
    input: 'src/index.js',
    output: {
        file: './tmp/bundle.js',
        format: 'iife'
    },
    plugins: [
        replace({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
};
