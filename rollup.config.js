import ts from 'rollup-plugin-ts';

export default [
    {
        plugins: [
            ts()
        ],
        input: `src/index.ts`,
        external: [
            'postcss'
        ],
        output: [
            {
                file: `dist/index.cjs`,
                format: 'cjs',
                exports: 'default'
            },
            {
                file: `dist/esm/index.mjs`,
                format: 'es'
            }
        ]
    }
];