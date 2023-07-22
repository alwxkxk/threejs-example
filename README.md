# threejs-example
这是3D可视化教程源码，其教程文字内容在[作者博客中](https://www.scaugreen.cn/posts/30679)，教程还在制作当中。
three.js(R119)，最新的three.js目录有较大变化，当前代码暂时还没更进。
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