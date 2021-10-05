module.exports = {
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "โปรแกรมงานประกัน - เช็ค 3 ไฟล์";
                return args;
            })
    },
    publicPath: "/check-3-files",
    outputDir: "./../docs",
  };