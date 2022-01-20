# threejs-example
这是3D可视化教程源码，其教程文字内容在[作者博客中](https://www.scaugreen.cn/posts/30679)，教程还在制作当中。

## 大陆访问
- 大陆访问网址：[http://3d.scaugreen.cn](http://3d.scaugreen.cn/)

## 运行
```bash
# 拉取代码
git clone https://github.com/alwxkxk/threejs-example.git

cd threejs-example

# 安装依赖
npm install 

#dev
npm run dev 

#build
npm run build
```

## 其它
- 本项目涉及建模内容，其Blender工程项目放在百度网盘，链接：[https://pan.baidu.com/s/1DjqU7bfYWbuKj_GUpo5Xqw?pwd=z965](https://pan.baidu.com/s/1DjqU7bfYWbuKj_GUpo5Xqw?pwd=z965)，提取码：z965
- 此项目只放简单案例，完整案例是放到用TS写的[iot-visualization-examples](https://github.com/alwxkxk/iot-visualization-examples)
## 目录结构说明
webpack处理时会将每个目录下的index.html使用该目录下的的index.js，即使在index.html里没有显式地使用。
### LFS（准备弃用）
`static/lfs/`用于使用git lfs 存放大文件。`.gitattributes`暂时已经配置了该目录下所有`*.glb`都使用lfs。这些文件部署到github pages时需要手动修改路径才能正常使用：
比如：
```js
const url = window.location.host.includes("github.io") ?"https://media.githubusercontent.com/media/alwxkxk/threejs-example/master/static/lfs/car.glb":"./static/lfs/car.glb"
```

## TODO
- 首页优化