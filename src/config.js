// ============================================================
//  个人网站配置文件
//  修改这里的信息即可全局生效，无需改动组件代码
// ============================================================

const config = {
  // GitHub 用户名（用于 API 调用 + 部署域名）
  githubUsername: "Jiafei-queenbot",

  // 个人信息
  name: "Jiafei",
  title: "开发者 / 开源爱好者",
  bio: "热爱技术，专注于构建优雅的软件解决方案。",

  // 技能标签
  skills: [
    "小女孩",
    "周阴婷",
    "杨玉环",
    "芒果",
    "Ariana",
    "Olivia Rodrigo",
    "APT女王",
  ],

  // 联系方式
  email: "your-email@example.com",
  social: [
    { name: "GitHub", url: "https://github.com/Jiafei-queenbot", icon: "github" },
    // { name: "掘金", url: "https://juejin.cn/user/xxx", icon: "juejin" },
    // { name: "B站", url: "https://space.bilibili.com/xxx", icon: "bilibili" },
  ],

  // 相册
  // 照片支持两种来源：
  //   1. 外部图片链接 —— 直接填完整 URL（如 https://...）
  //   2. 本地图片 —— 把图片放进 public/albums/ 文件夹，然后写 "/albums/图片名.jpg"
  // 每张照片可设置 title（标题）和 category（分类，用于筛选）
  gallery: {
    title: "我的相册",
    subtitle: "记录生活的每一个瞬间",
    photos: [
      { src: "https://picsum.photos/seed/queen1/900/600", title: "山野晨光", category: "风景" },
      { src: "https://picsum.photos/seed/queen2/800/1000", title: "午后咖啡", category: "日常" },
      { src: "https://picsum.photos/seed/queen3/900/600", title: "城市天际线", category: "风景" },
      { src: "https://picsum.photos/seed/queen4/800/800", title: "甜点时刻", category: "美食" },
      { src: "https://picsum.photos/seed/queen5/900/600", title: "街角", category: "日常" },
      { src: "https://picsum.photos/seed/queen6/800/1000", title: "海边的风", category: "风景" },
      { src: "https://picsum.photos/seed/queen7/900/600", title: "深夜食堂", category: "美食" },
      { src: "https://picsum.photos/seed/queen8/800/800", title: "一束花", category: "日常" },
      // 本地图片示例（把图片放到 public/albums/ 后取消注释即可）：
      // { src: "/albums/example.jpg", title: "本地照片", category: "日常" },
    ],
  },

  // 页脚信息
  footer: {
    copyright: "Jiafei",
    builtWith: "React + Vite",
  },
};

export default config;
