---
title: ReCA：通过递归上下文分配实现多镜头长视频外推
layout: page
permalink: projects/reca/
description: ReCA：通过递归上下文分配实现多镜头长视频外推
count: false
comments: false
audio: false
---

**ReCA: Multi-Shot Long Video Extrapolation via Recursive Context Allocation** *arXiv 2026*{.pub-venue} {.pub-title}

Akide Liu, Jinbo Xing, Chaojie Mao, **Ye Li**, Zeyu Zhang, Yefei He, Weijie Wang, Zihan Wang, Yu Liu, Gholamreza Haffari, and Bohan Zhuang {.pub-authors}

[arXiv](https://arxiv.org/abs/2605.26525) [项目页](https://reca.vmv.re/) [展示仓库](https://github.com/memoryoffish/ReCA) {.pub-links}

![ReCA 方法总图：递归规划、叶子节点执行、并行与顺序执行逻辑、自适应状态更新](/projects/reca-method.webp){width=1600 height=874 loading=lazy}

ReCA 方法总图：递归规划、叶子节点执行、并行与顺序执行逻辑、自适应状态更新 {.fig-cap}

- **问题** 从一帧或一段已有画面出发，续写成几分钟、有镜头结构的长视频（多镜头视频外推，MSVE）。单镜头外推保住了画面却没有镜头结构；多镜头叙事有结构，却会自己编造画面，而不是延续已有的那一个。短视频模型每次调用的预算有限：把整部剧本交给全局规划会规定出无从支撑的细节，塞进每个镜头的提示词会稀释相关状态，靠上一段末帧串联则让身份、场景、物体和动作状态逐段衰减。
- **做法** ReCA 认为长视频的失败不在上下文不够长，而在上下文分配不当。它递归地把任务拆成上下文有界的子问题，只在叶子节点调用冻结的短视频生成器；每次调用只读上段边界、本镜目标和显式状态，生成后校验并刷新状态，沿时间向后传递。
- **评测** 提出 MSVE-Bench 与 NB-Q，专门评测 3–5 分钟的长视频生成。
- **结果** 平均归一化得分比最强的对比控制器高 8–16%，多镜头一致性指标提升 28–43%。
- **我的工作** 负责递归规划与上下文分配模块的代码实现与实验。
{.points}
