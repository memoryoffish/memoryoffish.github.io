---
layout: post
title: SQL 基础笔记
date: 2025-02-18T09:57:17+08:00
updated: 2025-03-04T11:06:04+08:00
permalink: "2025/02/18/数据库/"
description: "SQL 查询、条件筛选、集合运算与聚合函数的基础笔记。"
excerpt: "SQL 查询、条件筛选、集合运算与聚合函数的基础笔记。"
tags: ["数据库", "SQL"]
math: false
cover: "/images/sql-cover.svg"
count: false
comments: false
audio: false
---

sql 语法

## 基础语句

- 去重复  
  `select distinct name as 别名 from table_name as 别名`  
  后一个别名代表一个元组  
  distinct 看的是所有name是否相同，而不是单独一个name
- 允许重复 all ，默认是这个
- `from table1,table2` 得到的是table笛卡尔积，一般需要做自然连接，`where table1.id =table2.id`

## where

where 里可用or and not between  
%表示字符串  
`_`表示一个字符

## union,intersect,except（并集，交集，差集） {id="union-intersect-except（并集，交集，差集）"}

A union/intersect/except B会自动消除重复  
要保存重复再后面加all如union all

## 聚合函数

avg  
max  
min  
sum  
count  
一般后面要跟group by不然前面元组的属性不应该拥有不同属性（即使where限定也不行），  
用having可以过滤group  
聚合函数一般忽略null除了count  
sum(null)=null
