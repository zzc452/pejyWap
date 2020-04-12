module.exports = {
  outputDir: process.env.outputDir,
  publicPath: process.env.BASE_URL,
  chainWebpack: config => {
    const oneOfsMap = config.module.rule('less').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // Or array of paths
          resources: ['./src/assets/css/default.less']
        })
        .end()
    })
  }
  
}