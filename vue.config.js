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
          // Provide path to the file with resources
          resources: './src/assets/css/vars.less',

          // Or array of paths
          // resources: ['./path/to/vars.scss', './path/to/mixins.scss']
        })
        .end()
    })
  }
  
}