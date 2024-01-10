import NodePath from 'path'
import autoprefixer from 'autoprefixer'
import url from 'postcss-url'
import px2vw from 'postcss-plugin-pxtoviewport'
import RollupJson from '@rollup/plugin-json'
import RollupAlias from '@rollup/plugin-alias'
import RollupUrl from '@rollup/plugin-url'
import RollupBabel from '@rollup/plugin-babel'
import RollPostcss from 'rollup-plugin-postcss'
import RollPostcssInject2Css from 'rollup-plugin-postcss-inject-to-css'
import RollProgress from 'rollup-plugin-progress'
import RollupCommonjs from '@rollup/plugin-commonjs'
import RollupNodeResolve from '@rollup/plugin-node-resolve'
import { terser } from "rollup-plugin-terser"

// babel 配置
const rollBabelConfig = {
  babelHelpers: 'runtime'
}

// postcss 配置
const rollPostcssConfig = {
  inject: true,
  plugins: [
    url({
      url: 'inline',
      maxSize: 1000000  // 所有图片转成base64
    }),
    px2vw({
      viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
      unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: ['.ignore', '.hairlines'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
      minPixelValue: 1 // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
    }),
    autoprefixer({
      remove: false
    })
  ],
  extensions: ['.css', 'scss']
}

export default {
  input: './packages/main.js',
  output: [{
    format: 'es', // 打包成es模块
    dir: './lib', // 输出到 lib 文件夹
    preserveModules: true,  // 保留模块，尽可能多的输出chunk
    preserveModulesRoot: 'packages'
  }],
  external:  [
    'react',
    'react-dom'
  ],
  plugins: [
    RollupAlias({
      entries: [{ find: '@', replacement: NodePath.join(__dirname, 'packages') }]
    }),
    RollupBabel(rollBabelConfig),
    RollPostcss(rollPostcssConfig),
    RollupNodeResolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      },
      rootDir: NodePath.join(__dirname, '.'),
      browser: true
    }),
    RollupCommonjs({
      include: /\/node_modules\//
    }),
    RollupJson(),
    RollupUrl(),
    RollProgress(),
    RollPostcssInject2Css({
      exclude: /\/node_modules\//
    }),
    terser()
  ]
}