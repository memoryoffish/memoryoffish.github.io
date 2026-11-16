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

**共同第一作者 · arXiv 2026 · ICLR 2027 在审 · Hugging Face Daily Papers 当日第 2（2026-10-15）。** ATAS 为多镜头视频生成维护场景记忆与事件记忆：回到旧场景、换机位重放旧事件时，先取出相关状态作为条件，生成后重建配准、通过检查才写回记忆。在四个视频生成器上提升了全部跨镜头一致性指标，人工评测六项第一。我负责代码编写、实验数据和 demo 设计。

[arXiv](https://arxiv.org/abs/2610.20571) · [项目页](https://lhmd.top/atas/) · [代码](https://github.com/ziplab/ATAS) · [本站项目介绍](/projects/#atas)

### UniRLM：面向图文交错生成的递归统一状态建模

**共同第一作者 · AAAI 2027 在审。** 我负责问题发现、方法设计与主实验。UniRLM 发现图文交错生成在长序列上的崩溃来自图像生成只在短上下文上训练过，于是免训练地把长上下文轨迹拆成子任务 DAG：每次调用只带入直接依赖，校验通过才写回、失败回滚，独立节点并行执行。

[本站项目介绍](/projects/#unirlm)

### ReCA：通过递归上下文分配实现多镜头长视频外推

**arXiv 2026 预印本。** ReCA 把一帧画面续写成几分钟、有镜头结构的长视频，认为瓶颈在上下文分配而非长度：递归拆成上下文有界的子问题，只在叶子节点调用短视频模型。我负责递归规划与上下文分配模块的代码实现与实验。

[arXiv](https://arxiv.org/abs/2605.26525) · [项目页](https://reca.vmv.re/) · [本站项目介绍](/projects/#reca)

### 扩散模型的图像与视频概念擦除

2025 年 8 月至 2026 年 5 月，参与校级大学生科研训练计划（SRTP），负责横向复现与系统综述，关注图像端概念擦除方法迁移到视频端后的跨帧回流问题。项目已结题并提交系统综述。

### Gen-RSI：借助世界代理实现视频生成模型的递归自改进

**ICLR 2027 在审。** 我参与 Gen-RSI 的后训练实现与实验。该工作把生成的视频重建为可执行的 Blender 代理，用物理仿真修正后渲染出来作为教师的条件，在学生模型自己的去噪状态上蒸馏回视频生成器，逐轮改进物理一致性。

[OpenReview](https://openreview.net/forum?id=noC2O6ZFgM) · [项目页](https://gen-rsi.vmv.re/) · [本站项目介绍](/projects/#gen-rsi)

### 后端开发实习

2025 年 7—8 月，在壹智天机科技（杭州）参与后端开发实习，参与报销、发票微服务的开发与上线，以及相关状态流转设计。

## 技术与工具

使用 Python、C/C++、Java 和 SQL，常用工具包括 PyTorch、Blender、Linux/Shell、Git、Docker 和 LaTeX。

## 联系

- [GitHub · memoryoffish](https://github.com/memoryoffish)
- [学术邮箱 · 3230102276@zju.edu.cn](mailto:3230102276@zju.edu.cn)
