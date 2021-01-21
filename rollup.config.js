import babel from "rollup-plugin-babel";
import serve from "rollup-plugin-serve";


export default {
    input: "./src/index.js", // 以那个文件作为打包的入口
    output: {
        file: "dist/umd/vue.js", // 出口 
        name: "Vue", // 指定打包后全局变量的name
        format: "umd", // 统一模块规范
        sourcemap: true, // es6=> es5  源码调试
    },
    plugins: [  // 使用插件
        babel({
            exclude: "node_modules/**"
        }),
        serve({
            open: true,
            openPage: "/public/index.html", // 默认打开的页面
            port: 3000,
            contentBase: ""
        })
    ]

}