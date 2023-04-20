const path = require("path");

module.exports = {
    //部署路径
    publicPath: process.env.NODE_ENV === "production" ? './' : '/',
    //生产环境构建文件的目录（打包文件夹）
    outputDir: "dist",
    //静态资源输出路径(相对于outputDir)
    assetsDir: '',
    //index.html输出路径(相对于outputDir)
    indexPath: 'index.html',
    //哈希文件名
    filenameHashing: true,
    //保存时lint代码
    lintOnSave: true,
    //包含运行时编译器的 Vue 构建版本
    runtimeCompiler: true,
    //source map，可以将其设置为 false 以加速生产环境构建。
    productionSourceMap: false,
    //webpack细化修改
    chainWebpack: config => {
        config.plugins.delete("prefetch");
        config.plugins.delete("preload");
    },
    //webpack粗略修改
    configureWebpack: config => {
        if (process.env.NODE_ENV === "production") {
            config.mode = "production";
            var optimization = {
                runtimeChunk: "single",
                splitChunks: {
                    chunks: "all",
                    maxInitialRequests: Infinity,
                    minSize: 20000,
                    cacheGroups: {
                        vendor: {
                            test: /[\\/]node_modules[\\/]/,
                            name(module) {
                                const packageName = module.context.match(
                                    /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                                )[1];
                                return `npm.${packageName.replace("@", "")}`;
                            }
                        }
                    }
                },
            };
            Object.assign(config, {
                optimization
            });
        } else {
            config.mode = "development";
            var optimization2 = {
                runtimeChunk: "single",
                splitChunks: {
                    chunks: "all",
                    maxInitialRequests: Infinity,
                    minSize: 20000, // 依赖包超过20000bit将被单独打包
                    cacheGroups: {
                        vendor: {
                            test: /[\\/]node_modules[\\/]/,
                            name(module) {
                                const packageName = module.context.match(
                                    /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                                )[1];
                                return `npm.${packageName.replace("@", "")}`;
                            }
                        }
                    }
                }
            };
        }
        Object.assign(config, {
            // externals: {
            //   'vue': 'Vue',
            //   'element-ui': 'ELEMENT',
            //   'vue-router': 'VueRouter',
            //   'vuex': 'Vuex'
            // }, // 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖(用于csdn引入)
            resolve: {
                extensions: [".js", ".vue", ".json"], //文件优先解析后缀名顺序
                alias: {
                    'vue$': 'vue/dist/vue.esm.js',
                    "@": path.resolve(__dirname, "./src"),
                    "@c": path.resolve(__dirname, "./src/components"),
                    "@v": path.resolve(__dirname, "./src/views"),
                    "@u": path.resolve(__dirname, "./src/utils"),
                    "@s": path.resolve(__dirname, "./src/service")
                    
                }, // 别名配置
                plugins: []
            },
            optimization: optimization2
        });
    },
    //是否为 Babel 或 TypeScript 使用 thread-loader
    parallel: require("os").cpus().length > 1,
    //代理API 服务器
    devServer: {
        open: true,
        port: 8080,
        // https: false,
        // proxy: {//代理
        //     "/api": {
        //         target: "",
        //         changeOrigin: false,
        //         ws: false,
        //         secure: false,
        //         pathRewrite: {
        //             '^/api/': '/'
        //         }
        //     }
        // },
    },
    // 不进行任何 schema 验证，传递任何第三方插件选项
    pluginOptions: {}
};