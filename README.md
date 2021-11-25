# threejs-example

<!-- threejs-example is the code for a three.js tutorial.Blender project in [threejs-example-blender-project](https://github.com/alwxkxk/threejs-example-blender-project) -->

- 备用网址：[https://alwxkxk.github.io/threejs-example/](https://alwxkxk.github.io/threejs-example/)(由github action自动更新部署的github Pages)
- 国内访问网址：[http://3d.scaugreen.cn](http://3d.scaugreen.cn/)


这是3D可视化教程源码，其教程内容在[作者博客中](https://www.scaugreen.cn/posts/30679)，教程还在制作当中。

本项目涉及建模内容，其Blender工程项目放在[threejs-example-blender-project](https://github.com/alwxkxk/threejs-example-blender-project)。


## 运行
```bash
# 需要先安装git LFS

# 拉取代码
git clone https://github.com/alwxkxk/threejs-example.git

cd threejs-example

# 安装依赖
yarn 

#dev
yarn run dev 
#build
yarn run build
```


## 其它
- 3D背景效果来源于：[3D Infinity Effect CSS/HTML Tutorial -  YouTube](https://www.youtube.com/watch?v=s05vBlszF-I)

## 目录结构说明
webpack处理时会将每个目录下的index.html使用该目录下的的index.js，即使在index.html里没有显式地使用。
### LFS
`static/lfs/`用于使用git lfs 存放大文件。`.gitattributes`暂时已经配置了该目录下所有`*.glb`都使用lfs。这些文件部署到github pages时需要手动修改路径才能正常使用：
比如：
```js
const url = window.location.host.includes("github.io") ?"https://media.githubusercontent.com/media/alwxkxk/threejs-example/master/static/lfs/car.glb":"./static/lfs/car.glb"
```
