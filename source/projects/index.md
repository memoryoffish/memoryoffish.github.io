---
title: 项目
layout: page
permalink: projects/
description: 视频生成与强化学习相关的公开项目。
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

## 用 GRPO 训练模型解 24 点

![24 点算式与 SFT 到 GRPO 训练流程示意图](/projects/game24-grpo.svg)

**强化学习 · 课程项目**

基于 veRL 与 Qwen2.5-1.5B-Instruct，整理 24 点任务的数据准备、SFT 冷启动、GRPO 训练和 Countdown 泛化评估流程。

[GitHub](https://github.com/memoryoffish/nlp_grpo)
