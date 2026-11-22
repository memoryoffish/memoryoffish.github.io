---
title: Gen-RSI：借助世界代理实现视频生成模型的递归自改进
layout: page
permalink: projects/gen-rsi/
description: Gen-RSI：借助世界代理实现视频生成模型的递归自改进
count: false
comments: false
audio: false
---

**Gen-RSI: Recursive Self-Improvement of Video Generators through World Proxies** *ICLR 2027 在审*{.pub-venue} {.pub-title}

Ye Li 为学生二作；双盲审稿中，作者列表暂不公开 {.pub-authors}

&#91;[OpenReview](https://openreview.net/forum?id=noC2O6ZFgM)&#93; &#91;[项目页](https://gen-rsi.vmv.re/)&#93; {.pub-links}

![Gen-RSI 方法总图：基于 Blender 的世界知识、在学生访问状态上的 on-policy 蒸馏、蒸馏后的推理](/projects/gen-rsi-method.webp){width=1600 height=775 loading=lazy}

- **问题**：视频生成的画面越来越精致，物理却常常不对：物体穿模、凭空消失、没有支撑却悬停。现成视频语料只记录结果，缺少能纠正过程的监督。
- **做法**：把生成的视频重建为可执行的 Blender 代理，由物理仿真检查并修正；修好的代理渲染出画面和掩码，作为条件交给冻结的 VACE 教师，在学生模型自己走到的去噪状态上给出稠密修正（on-policy 蒸馏）。学生更新后会犯新的错，这些错又成为下一轮的监督，循环往复。推理时只需要文本和学生模型。
- **我的工作**：参与后训练实现与实验。
