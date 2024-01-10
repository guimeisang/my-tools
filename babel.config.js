module.exports = {
  presets: [
    [
      '@babel/preset-env', {
        modules: false,
      }
    ]
  ],
  plugins: [
    [
      '@babel/plugin-proposal-decorators', {
        legacy: true,
      }
    ],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-runtime',
    [
      'import',
      {
        libraryName: 'xxx',
        camel2DashComponentName: false, // 是否需要驼峰转短线
        customName (name) {
          return `xxx/components/${name}`
        }
      }
    ]
  ]
}