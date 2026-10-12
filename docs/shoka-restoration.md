# 恢复原 Shoka 主题

## 来源

旧远程 `master` 提交 `b722a43ecac1005aa35334d4122600af568817aa` 的 HTML 标明 Hexo 7.3.0，资源版本为 0.2.5，页脚为 Theme.Shoka。

取回上游 https://github.com/amehime/hexo-theme-shoka ，固定 `ad3bb6039fe37a294e2ce8d1a83aa2c782e5d2ea`（2021-10-03）。package version 为 0.2.5，没有 tag/release。主题源码和 MIT 许可证均保留。

## 局部调整

- 原页头、四层波浪、segments 图文卡片、侧栏、文章样式与配色保留。
- 六图轮播改成单张本站小型深灰 SVG；头像按显示尺寸缩小。
- 关闭音乐、烟花、loading、动画、评论与赞赏挂件。
- 去掉失效 polyfill、CDN vendor 合并脚本、PJAX、原播放器初始化；用本站小脚本处理侧栏、明暗主题和代码复制。
- 系统字体、本地图标；正文默认可见，无须等待入场脚本。
- 独立本地搜索，只在 `/search/` 请求索引，不使用旧 Algolia key。
- 当前 Markdown-it、Prism、KaTeX 在构建时处理正文与 MathML，避免安装旧渲染器携带的过时浏览器下载器。
- 停用旧 after_post_render 中把图片改为 data-src、链接改为编码 span 的处理，保留原生图片与正常链接。
- 原 `url.parse` 调用改为 WHATWG URL，停用不必要的 pangu 重排。
- 两篇正文、15 公式、旧 URL、图片、PDF 和两个公开项目均从上一阶段迁移。

后续内容调整：按用户要求撤下课程笔记、PDF 与 24 点项目，将原文件保存在不参与网站生成的 `archive/`；首页和项目页展示 ATAS、ReCA、Gen-RSI，搜索覆盖项目与个人介绍。修复 Shoka 在没有文章时未设置首页路径和页码的问题，使个人介绍与项目列表仍然显示。没有文章时隐藏归档、标签导航和 RSS 入口。

## 实际遇到的兼容问题

初次安装因 `hexo-feed@1.1.2` 仅声明支持 Hexo 4–7 而失败，没有强制安装，改用官方 `hexo-generator-feed@4.0.0`。

Hexo 最初未识别工程，添加 CLI 要求的 package.hexo 元数据后修正。首次生成又发现它会把 scripts 下的 Python 校验文件作为 JS 读取，已迁至 tools。图标精简后 Stylus 有缺失的 @extend 目标，单独修复样式依赖。

构建封装新增日志 ERROR 检查，避免 Hexo 退出码误报。npm 仍提示部分间接构建依赖 deprecated（inflight、glob、moize），没有将这些库加载到浏览器。原作者没有保证 Hexo 8 兼容性，实际结果以本地验证记录为准。

发布准备：原作者赞赏二维码和未使用的播放器图片已从主题资源目录移出；未使用的本机记录与工具配置不纳入公开源码。旧 Git 历史与本机快照仍保留。
