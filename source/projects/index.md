---
title: 项目
layout: page
permalink: projects/
description: ATAS、ReCA 与 Gen-RSI 等视频生成研究工作。
cover: /projects/reca.svg
count: false
comments: false
audio: false
---

## ATAS：以世界状态为中心的智能体视频生成

*Any Time, Any Space: A World-State-Centric Framework for Agentic Video Generation*

![ATAS 场景记忆与事件记忆的概念示意图](/projects/atas.svg)

**共同第一作者。**

ATAS 使用持久世界状态组织多镜头视频生成：场景记忆记录共享坐标系中的几何信息，事件记忆支持按场景、事件和时间检索。在返回旧场景或从新视角重现既有事件时，系统检索相关状态，并在验证后更新记忆，以保持时空一致性。

[项目页面](https://memoryoffish.github.io/atas_demo/)

## ReCA：通过递归上下文分配实现多镜头长视频外推

![多镜头视频时间线与上下文节点示意图](/projects/reca.svg)

**预印本 · 2026**

在有限的短视频生成预算下，递归组织镜头规划、上下文分配与状态更新，将已有画面延续为多镜头长视频。

我负责递归规划与上下文分配模块的代码实现与实验。

[论文](https://arxiv.org/abs/2605.26525) · [项目页](https://reca.vmv.re/) · [展示仓库](https://github.com/memoryoffish/ReCA)

## Gen-RSI：视频生成模型的递归自改进

*Gen-RSI: Recursive Self-Improvement of Video Generators through World Proxies*

![Gen-RSI 视频、世界代理与物理仿真反馈的概念示意图](/projects/gen-rsi.svg)

Gen-RSI 将生成视频转化为可执行的 Blender 代理，通过物理仿真修正代理，再用渲染结果引导教师模型，在学生自身的去噪状态上训练视频生成器，以改进物理一致性。

我参与后训练实现与实验。

[论文 · OpenReview](https://openreview.net/forum?id=noC2O6ZFgM) · [项目页面](https://gen-rsi.vmv.re/)
