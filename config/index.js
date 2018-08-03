module.exports = {
    devDirectory: "devBuild", // 开发目录
    proDirectory: "dist", // 发布目录
    resource: "assets", // 静态资源
    resourcePrefix: "assets", // 静态资源前缀

    port: 8080,
    host: "localhost",
    tabs: [
      {
        id: 1,
        name: "index",
        path: "index/Index",
        title: "首页",
        keywords: "首页",
        description: "首页",
        href: "/index.html"
      },  {
        id: 2,
        name: "foot",
        path: "foot/Index",
        title: "足迹",
        keywords: "foot",
        description: "foot",
        href: "/foot.html"
      },  {
        id: 3,
        name: "demo",
        path: "demo/Index",
        title: "demo",
        keywords: "demo",
        description: "demo",
        href: "/demo.html"
      }
    ],
    footList: [{
      id: 1,
      title: 'webpack',
      desc: '打包工具',
      img: '../../assets/img/foot/artist-1.png'
    },{
      id: 2,
      title: 'gulp',
      desc: '构建工具',
      img: '../../assets/img/foot/artist-2.png'
    },{
      id: 3,
      title: 'vue',
      desc: '组件化框架',
      img: '../../assets/img/foot/artist-3.png'
    },{
      id: 4,
      title: 'react',
      desc: '组件化框架',
      img: '../../assets/img/foot/artist-1.png'
    },{
      id: 5,
      title: 'webpack',
      desc: '打包工具',
      img: '../../assets/img/foot/artist-2.png'
    },{
      id: 6,
      title: 'gulp',
      desc: '构建工具',
      img: '../../assets/img/foot/artist-3.png'
    }]
};
