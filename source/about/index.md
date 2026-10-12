---
title: 关于李业
layout: page
permalink: about/
description: 浙江大学软件工程本科生，关注世界模型、视频生成与多模态交错生成。
cover: /images/blog-cover.svg
count: false
comments: false
audio: false
---

我是李业，浙江大学软件工程专业本科生，2023 年 9 月入学。

我关注世界模型、视频生成与多模态交错生成，尤其是长视频生成中的上下文调度、跨镜头状态保持，以及物理知识如何用于视频生成模型。这里记录我的研究进展、论文阅读和工程实践。

## 研究与实践

### ATAS：以世界状态为中心的智能体视频生成

**共同第一作者。** ATAS 通过持久的场景记忆与事件记忆支持多镜头视频生成，在返回旧场景或从新视角重现历史事件时检索相关状态，并在验证后更新记忆，以保持时空一致性。

[项目页面](https://memoryoffish.github.io/atas_demo/) · [本站项目介绍](/projects/)

### ReCA：多镜头长视频外推

在 ReCA 中，我负责递归规划与上下文分配模块的代码实现与实验，围绕规划、分配、执行和状态刷新组织多镜头生成。

[论文预印本](https://arxiv.org/abs/2605.26525) · [项目页面](https://reca.vmv.re/) · [本站项目介绍](/projects/)

### 扩散模型的图像与视频概念擦除

2025 年 8 月至 2026 年 5 月，参与校级大学生科研训练计划（SRTP），负责横向复现与系统综述，关注图像端概念擦除方法迁移到视频端后的跨帧回流问题。项目已结题并提交系统综述。

### Gen-RSI：视频生成模型的递归自改进

我参与 Gen-RSI 的后训练实现与实验。该工作将生成视频转化为可执行的 Blender 代理，通过物理仿真修正代理，再用渲染结果引导教师模型，在学生自身的去噪状态上训练视频生成器，以改进物理一致性。

[项目页面](https://gen-rsi.vmv.re/)

### 后端开发实习

2025 年 7—8 月，在壹智天机科技（杭州）参与后端开发实习，参与报销、发票微服务的开发与上线，以及相关状态流转设计。

## 技术与工具

使用 Python、C/C++、Java 和 SQL，常用工具包括 PyTorch、Blender、Linux/Shell、Git、Docker 和 LaTeX。

## 联系

- [GitHub · memoryoffish](https://github.com/memoryoffish)
- [学术邮箱 · 3230102276@zju.edu.cn](mailto:3230102276@zju.edu.cn)
