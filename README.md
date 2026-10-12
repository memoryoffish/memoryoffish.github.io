# 李业的个人主页

恢复原站 **Hexo + Shoka 0.2.5** 的个人博客：<https://memoryoffish.github.io/>。

保留大页头、静态波浪、图文卡片、侧栏和原配色。关闭音乐、烟花、loading、轮播与过场动画；使用本站资源，文章和公式在构建时生成。

## 本地使用

建议 Node 24 LTS，最低 20.19；本次本机实际使用 Node 25.9.0。

```sh
npm ci --ignore-scripts
npm run check
npm run serve
```

预览地址：<http://localhost:13131/>。不需要全局安装 Hexo。

## 内容与配置

- `source/_posts/`：文章。使用 `npx hexo new "文章标题"` 创建新文，两篇旧文已固定原 URL。
- `source/_data/projects.yml`：ATAS、ReCA 与 24 点 GRPO 的公开项目介绍。
- `source/projects/index.md`：项目页面。
- `source/images/`、`source/pdfs/`：本地图片与 PDF。
- `_config.yml`：站点配置；`_config.shoka.yml`：主题配置。

数学使用 `\(...\)`、`\[...\]` 或 `$$...$$`，单个 `$` 不作为公式分隔符，避免误解汇编寄存器。代码高亮与 MathML 均在构建时完成。

## 原主题与版本

Hexo **8.1.2** 及依赖固定在 `package-lock.json`。原作者 [amehime/hexo-theme-shoka](https://github.com/amehime/hexo-theme-shoka) 的 0.2.5 源码保存在 `themes/shoka/`，上游提交 `ad3bb6039fe37a294e2ce8d1a83aa2c782e5d2ea`。上游没有对应 tag，勿使用不存在的 `v0.2.5` tag。

使用真实 Shoka 模板与样式，保留 MIT 许可证。局部兼容性、性能改动见 `docs/shoka-restoration.md`；没有换成 ShokaX。

## 检查和发布

`npm run check` 完整重建并检查链接、PDF、15 个公式、资源、搜索和音乐禁用。`tools/build.js` 额外捕获日志 ERROR，因为 Hexo 有时在渲染失败时仍返回 0。

GitHub Actions 检查 PR，并在 `main` 更新时发布；首次需要 Settings → Pages → GitHub Actions。`main` 保存源码，并通过 GitHub Actions 发布生成的 `public/`。

原站 `master` 分支保留为旧站回退参考；日常修改应从 `main` 新建工作分支。
