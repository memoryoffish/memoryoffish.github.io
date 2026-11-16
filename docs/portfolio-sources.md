# 首页作品来源

核验日期：2026-10-12。首页借鉴 https://zhmin.top/ 的简介、图文项目条目和相关链接布局，配色使用本地 CSS，未复制参考站作者的履历、论文、照片或视频。

## ReCA

- 标题：ReCA: Multi-Shot Long Video Extrapolation via Recursive Context Allocation。
- 论文：https://arxiv.org/abs/2605.26525 ，v1 于 2026-05-26 提交，作者列表包含 Ye Li（第 4 位，共 11 位作者）。
- 项目页：https://reca.vmv.re/ ，原 GitHub Pages 地址会跳转至此。
- 展示仓库：https://github.com/memoryoffish/ReCA 。该仓库提供项目展示页面，不作为已发布算法实现来介绍。
- 首页仅写“预印本 · 2026”和机制概述，不声称已获会议录用，不写性能数字。

## 24 点 GRPO

- 来源：https://github.com/memoryoffish/nlp_grpo 的公开 README。
- 已核验：基于 veRL、Qwen2.5-1.5B-Instruct，包含数据准备、SFT 冷启动、GRPO 训练、Countdown 泛化评估流程。
- 首页将其描述为课程项目，不把 veRL/TinyZero 本体称为原创。
- README 中准确率 62% 与 18% 位于示例输出，不作为实测成绩写入首页。

## 缩略图

两张 SVG 是根据公开项目概念绘制的示意图，用于区分项目条目。它们不是论文原图、实际生成视频帧或实验性能曲线；24 点算式为公开 README 中的有效示例。缩略图由本站提供，带固定尺寸与 lazy loading。

## Gen-RSI 名称更新

用户于 2026-10-12 明确说明，简历中“视频生成的物理一致性”工作现名为 Gen-RSI，已在 arXiv。关于页据此更新名称；机制概述参考 https://gen-rsi.vmv.re/ 的公开介绍，正式题名为 Gen-RSI: Recursive Self-Improvement of Video Generators through World Proxies。

本次 arXiv 官方搜索尚未匹配到目标条目，项目页当时也未给出论文链接，因此没有填写或猜测 arXiv ID、作者排序或公开日期。待用户提供准确链接后再添加；不能据搜索未命中否定用户说明。

## ATAS

用户于 2026-10-12 明确确认 ATAS 为共同第一作者工作。公开项目页 https://memoryoffish.github.io/atas_demo/ 同时列出 Ye Li*，并标注 Equal contribution。正式题名为 Any Time, Any Space: A World-State-Centric Framework for Agentic Video Generation。

首页、关于页及项目页均标注“共同第一作者”，简介根据项目页中的持久场景/事件记忆与验证后更新机制整理。缩略图是概念示意，不是结果图或性能曲线。

项目页引用区残留 arXiv:2605.26525，该编号已验证属于 ReCA，未用于 ATAS。代码地址本次公开访问为404；OpenReview PDF访问被验证页面拦截，因此只添加实际核实可用的项目页链接，没有宣称代码已公开或论文已录用。

atas_demo 是同一 GitHub Pages 域名下的独立项目站，未由本博客构建。链接检查对这一个已验证完整URL作明确区分，不把它误判成本仓库缺失路径。

## 2026-11-16 项目介绍重写

用户认为项目页写得太差，并指出 ATAS 在 Hugging Face Daily Papers 上获当日第 2 名却没写。本次核验：

- ATAS：arXiv 2610.20571，2026-10-14 公开，作者 10 位，Ye Li 第 3 位。官方项目页 https://lhmd.top/atas/ 标注前三位作者 Equal contribution，并标出 Bohan Zhuang 为通讯作者；代码 https://github.com/ziplab/ATAS 公开可访问。HF 论文页 https://huggingface.co/papers/2610.20571 显示「#2 Paper of the day」，提交到 2026-10-15 的日榜。用户称其为 ICLR 论文，因此标为「ICLR 2027 在审」，不写已录用。旧链接 memoryoffish.github.io/atas_demo 换成官方项目页。
- ReCA：arXiv 2605.26525 的作者列表（11 位，Ye Li 第 4 位）取自 https://reca.vmv.re/ 。摘要中的代码地址 ali-vilab/ReCA 本次查询不存在，所以不链接。
- Gen-RSI：arXiv 上没有搜到；项目页 BibTeX 仍是 Anonymous Authors、ICLR 2027 Under review，因此本站不列作者。
- 结果描述只用 arXiv 摘要里的说法（ATAS：四个生成器上全部跨镜头一致性指标提升、人工评测六项第一；ReCA：平均归一化得分高 8–16%，多镜头一致性提升 28–43%）。Gen-RSI 没有公开论文，不写数字。
- 配图换成论文原图：首页缩略图取自 ATAS 项目页的成片画面、ReCA 展示视频海报、Gen-RSI 方法图中的机械臂三帧；项目页使用三篇的方法总图。原示意 SVG 移到 `archive/projects/`。
- 「我的工作」：ReCA、Gen-RSI 沿用原有说法；ATAS 由用户 2026-11-16 说明为「负责代码编写，实验数据以及 demo 设计」。
- UniRLM：用户 2026-11-16 要求加上（AAAI 2027 在审，共同第一作者）。arXiv 上搜不到，本地 AAAI 稿件署名是 Anonymous Submission。题目取自稿件 main.tex，分工「负责问题发现、方法设计与主实验」取自用户简历。作为未公开稿件，本站不列作者、不放论文图、不写数字和链接，简介只写摘要里的问题和做法。
