---
title: 研究项目
layout: page
permalink: projects/
description: ATAS、UniRLM、ReCA 与 Gen-RSI：视频生成中的世界状态、图文交错生成、长视频上下文分配与物理一致性。
count: false
comments: false
audio: false
---

\* 表示共同第一作者；† 表示通讯作者 {.pub-legend}

## ATAS：以世界状态为中心的智能体视频生成 {#atas}

**Any Time, Any Space: A World-State-Centric Framework for Agentic Video Generation** *ICLR 2027 在审*{.pub-venue} {.pub-title}

Weijie Wang\*, Haomin Zhang\*, **Ye Li\***, Akide Liu, Zeyu Zhang, Haoyu Zhao, Yefei He, Donny Y. Chen, Feng Chen, and Bohan Zhuang† {.pub-authors}

&#91;[arXiv](https://arxiv.org/abs/2610.20571)&#93; &#91;[代码](https://github.com/ziplab/ATAS)&#93; &#91;[项目页](https://lhmd.top/atas/)&#93; &#91;[Hugging Face 当日论文第 2](https://huggingface.co/papers/2610.20571){.hot}&#93; {.pub-links}

![ATAS 方法总图：世界状态编译、视频生成与校验、场景记忆与事件记忆两段式记忆](/projects/atas-method.webp){width=1600 height=368 loading=lazy}

- **问题**：长片按剧本分镜生成时，镜头之间并不连续——隔几个镜头回到同一个场景，或换个机位重放之前发生的事。只在镜头之间传提示词或最近几帧，既没有共享的空间坐标，也没有按时间索引的事件记录，回访时场景和事件都会走样。
- **做法**：ATAS 把剧本编译成带有地点、机位和事件时间引用的镜头请求。生成前，从场景记忆（配准后的静态几何）和事件记忆（按场景、事件、时间索引的动态观测）中取出相关证据作为条件；生成后重建并配准新片段，只有通过审核和状态检查才写回记忆，成片交付不受记忆写入影响。
- **结果**：在四个视频生成器上，全部跨镜头一致性指标都有提升，每个基座的综合分都最高；空间回访超过对比的智能体和 3D 引导方法，三项事件重现指标领先，人工评测六项全部第一。
- **我的工作**：共同第一作者，负责代码编写、实验数据和 demo 设计。

## UniRLM：面向图文交错生成的递归统一状态建模 {#unirlm}

**UniRLM: Recursive Unified State Modeling for Interleaved Generation** *AAAI 2027 在审*{.pub-venue} {.pub-title}

Ye Li 为共同第一作者；双盲审稿中，作者列表暂不公开 {.pub-authors .pub-last}

- **问题**：统一多模态模型已经能生成图文交错的长篇内容，但序列一长质量就崩。我们发现崩的是图像生成：同一个模型里，文本生成在长篇交错语料上训练，图像生成几乎只见过一两张图，它能用好的上下文远小于模型的上下文窗口；再往里加中间推理只会让差距更大。
- **做法**：UniRLM 不训练模型，而是把一条长上下文轨迹改写成基于显式多模态状态的短上下文调用：自顶向下把任务拆成子任务 DAG，每次调用只带入该节点的直接依赖，校验通过才写回、失败则回滚，互不依赖的节点并行执行。这样每次图像生成都只看到它真正依赖的图，且格式与训练时一致。
- **我的工作**：共同第一作者，负责问题发现、方法设计与主实验。

## ReCA：通过递归上下文分配实现多镜头长视频外推 {#reca}

**ReCA: Multi-Shot Long Video Extrapolation via Recursive Context Allocation** *arXiv 2026*{.pub-venue} {.pub-title}

Akide Liu, Jinbo Xing, Chaojie Mao, **Ye Li**, Zeyu Zhang, Yefei He, Weijie Wang, Zihan Wang, Yu Liu, Gholamreza Haffari, and Bohan Zhuang {.pub-authors}

&#91;[arXiv](https://arxiv.org/abs/2605.26525)&#93; &#91;[项目页](https://reca.vmv.re/)&#93; &#91;[展示仓库](https://github.com/memoryoffish/ReCA)&#93; {.pub-links}

![ReCA 方法总图：递归规划、叶子节点执行、并行与顺序执行逻辑、自适应状态更新](/projects/reca-method.webp){width=1600 height=874 loading=lazy}

- **问题**：从一帧或一段已有画面出发，续写成几分钟、有镜头结构的长视频（多镜头视频外推，MSVE）。单镜头外推保住了画面却没有镜头结构；多镜头叙事有结构，却会自己编造画面，而不是延续已有的那一个。短视频模型每次调用的预算有限：把整部剧本交给全局规划会规定出无从支撑的细节，塞进每个镜头的提示词会稀释相关状态，靠上一段末帧串联则让身份、场景、物体和动作状态逐段衰减。
- **做法**：ReCA 认为长视频的失败不在上下文不够长，而在上下文分配不当。它递归地把任务拆成上下文有界的子问题，只在叶子节点调用冻结的短视频生成器；每次调用只读上段边界、本镜目标和显式状态，生成后校验并刷新状态，沿时间向后传递。
- **评测**：提出 MSVE-Bench 与 NB-Q，专门评测 3–5 分钟的长视频生成。
- **结果**：平均归一化得分比最强的对比控制器高 8–16%，多镜头一致性指标提升 28–43%。
- **我的工作**：负责递归规划与上下文分配模块的代码实现与实验。

## Gen-RSI：借助世界代理实现视频生成模型的递归自改进 {#gen-rsi}

**Gen-RSI: Recursive Self-Improvement of Video Generators through World Proxies** *ICLR 2027 在审*{.pub-venue} {.pub-title}

Ye Li 为学生二作；双盲审稿中，作者列表暂不公开 {.pub-authors}

&#91;[OpenReview](https://openreview.net/forum?id=noC2O6ZFgM)&#93; &#91;[项目页](https://gen-rsi.vmv.re/)&#93; {.pub-links}

![Gen-RSI 方法总图：基于 Blender 的世界知识、在学生访问状态上的 on-policy 蒸馏、蒸馏后的推理](/projects/gen-rsi-method.webp){width=1600 height=775 loading=lazy}

- **问题**：视频生成的画面越来越精致，物理却常常不对：物体穿模、凭空消失、没有支撑却悬停。现成视频语料只记录结果，缺少能纠正过程的监督。
- **做法**：把生成的视频重建为可执行的 Blender 代理，由物理仿真检查并修正；修好的代理渲染出画面和掩码，作为条件交给冻结的 VACE 教师，在学生模型自己走到的去噪状态上给出稠密修正（on-policy 蒸馏）。学生更新后会犯新的错，这些错又成为下一轮的监督，循环往复。推理时只需要文本和学生模型。
- **我的工作**：参与后训练实现与实验。
