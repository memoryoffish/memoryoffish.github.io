# 恢复原 Shoka 主题

## 来源

旧远程 `master` 提交 `b722a43ecac1005aa35334d4122600af568817aa` 的 HTML 标明 Hexo 7.3.0，资源版本为 0.2.5，页脚为 Theme.Shoka。

取回上游 https://github.com/amehime/hexo-theme-shoka ，固定 `ad3bb6039fe37a294e2ce8d1a83aa2c782e5d2ea`（2021-10-03）。package version 为 0.2.5，没有 tag/release。主题源码和 MIT 许可证均保留。

## 局部调整

- 原页头、四层波浪、segments 图文卡片、侧栏、文章样式与配色保留。
- 首页「关于我」下不再列 GitHub、邮箱和「更多关于我」，只保留侧栏里的社交链接；导航只有首页、项目、Gallery；页面 front-matter 写 `nosidebar: true` 时不渲染侧栏、正文占满宽度（项目页）（2026-11-19 用户要求）。「关于我」末尾加宣传片卡片（`index.njk`），点了才由 `shoka-lite.js` 创建视频。
- 六图轮播改成单张本站图片（原为小型深灰 SVG，2026-11-19 换成短片对照静帧 `static/hero-film.webp`，加深遮罩保证标题可读）；头像按显示尺寸缩小。
- 首页「研究项目」一栏改名「项目」，其下新增「Project」一栏放工程项目（`index.njk` + `source/_data/engineering.yml`，目前只有 film-director 的 GitHub 标题和占位链接），文章列表保持原名（2026-11-22 用户要求）。
- 文章内视频用站点插件 `scripts/local-video.js` 的 `{% localvideo 视频 封面 %}`，输出原生 `<video controls preload="none">`，不自动播放；Shoka 原 `media` 标签依赖已移除的播放器，不用（2026-11-22）。
- 每个研究项目单独一页（`source/projects/<name>/index.md`，带侧栏，像文章页）；`/projects/` 改为总目录，保留 `#atas` 等锚点给旧链接；首页、关于页的「介绍」指向单独页面；顶栏「项目」跳到首页项目栏 `/#projects-title`（2026-11-22 用户要求）。
- 2026-11-22 用户要求去掉 Gallery：删除 `/films/` 页面、`film-map.js`、对应 CSS 和顶栏入口；首页 38 秒宣传片卡片保留，视频改放 `static/promo.mp4`。
- 侧栏社交链接只留 GitHub、Gmail、小红书（学术邮箱去掉），按 Shoka 原生的「地址 || 图标 || 颜色」配色；GitHub 和 Gmail 图标是 `shoka-lite.css` 里的内嵌 SVG 遮罩（随配色变色），小红书是一个「书」字（2026-11-23 用户要求）。
- 友链页 `/friends/`（顶栏「友链」）：数据在 `source/_data/friends.yml`，从旧站 `master` 的 friends/index.html 同步；用 `scripts/friend-links.js` 的 `{% friendlinks %}` 输出 Shoka `.links` 卡片，普通链接 + 本地头像（`images/friends/`），不用原 `{% links %}` 的 exturl（2026-11-23 用户要求）。
- 项目页样式（2026-11-23 用户要求调好看）：论文信息做成一张卡片（会议徽章、作者、圆角链接按钮，总目录里「介绍 →」是主按钮），方法图加白底圆角和图注（`{.fig-cap}`），问题 / 做法 / 结果 / 我的工作用 `{.points}` 列表显示成左标签右正文；首页的紧凑论文列表不变。
- 关闭音乐、烟花、loading、动画、评论与赞赏挂件。
- 英文简历放在 `source/pdf/CV.pdf`（公开版：去掉手机号，PDF 元信息用 paperscan 清掉）；顶栏加「CV」（图标 `i-file`），关于页「联系」加链接（2026-11-25 用户要求）。
- 文章页重新开评论，改用 Giscus（评论存在本仓库 GitHub Discussions 的 Announcements 分类，读者用 GitHub 登录）：`_macro/comment.njk` 只在 `layout: post`、`comments` 没关、`giscus.repo_id` 和 `category_id` 都填了时输出 `#comments`；`shoka-lite.js` 等评论区接近视野才加载 `giscus.app/client.js`，并跟随明暗切换；`shoka-lite.css` 让评论框左右边距与正文一致（≥768px 为 2rem，568–767px 为 .5rem，更窄为 0）。页面仍不开评论（2026-11-24 用户要求；同时取消「不用远程字体和 CDN」的限制）。
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
