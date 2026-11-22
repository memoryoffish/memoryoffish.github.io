---
title: UniRLM：面向图文交错生成的递归统一状态建模
layout: page
permalink: projects/unirlm/
description: UniRLM：面向图文交错生成的递归统一状态建模
count: false
comments: false
audio: false
---

**UniRLM: Recursive Unified State Modeling for Interleaved Generation** *AAAI 2027 在审*{.pub-venue} {.pub-title}

Ye Li 为共同第一作者；双盲审稿中，作者列表暂不公开 {.pub-authors .pub-last}

- **问题**：统一多模态模型已经能生成图文交错的长篇内容，但序列一长质量就崩。我们发现崩的是图像生成：同一个模型里，文本生成在长篇交错语料上训练，图像生成几乎只见过一两张图，它能用好的上下文远小于模型的上下文窗口；再往里加中间推理只会让差距更大。
- **做法**：UniRLM 不训练模型，而是把一条长上下文轨迹改写成基于显式多模态状态的短上下文调用：自顶向下把任务拆成子任务 DAG，每次调用只带入该节点的直接依赖，校验通过才写回、失败则回滚，互不依赖的节点并行执行。这样每次图像生成都只看到它真正依赖的图，且格式与训练时一致。
- **我的工作**：共同第一作者，负责问题发现、方法设计与主实验。
