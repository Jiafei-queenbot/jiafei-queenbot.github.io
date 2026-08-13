# 相册本地图片目录

把你想放进相册的照片放到这个文件夹里，然后在 `src/config.js` 的 `gallery.photos` 中用相对路径引用，例如：

```js
{ src: "/albums/example.jpg", title: "照片标题", category: "日常" },
```

部署后，`/albums/example.jpg` 会对应 `https://jiafei-queenbot.github.io/albums/example.jpg`。
