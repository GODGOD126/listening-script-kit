---
title: 左连接复习
status: 待核对
---

# 左连接复习：所有用户都要留下

> 本笔记为原创虚构教学材料。SQLite结果已实际运行；不是用户数据或产品性能测试。

复习对象：[[SQL连接#外连接|左连接]]。相关：![[查询结果截图.png]]

| 用户 | 订单情况 | 条件在WHERE后的名单 | 条件在ON后的名单 |
| --- | --- | --- | --- |
| 阿青 | 101号，已付款 | 保留 | 保留，带101号 |
| 小林 | 102号，未付款 | 不保留 | 保留，订单字段NULL |
| 小周 | 没有订单 | 不保留 | 保留，订单字段NULL |

“已付款”放WHERE：最后筛名单。放ON：决定哪些订单能匹配。这里说的是逻辑语义，不是物理执行顺序。

- [x] WHERE版实际只留下阿青。
- [x] ON版实际留下三人。
- [x] WHERE付款或订单编号为空：阿青、小周，仍然漏小林。
- [ ] 以后再补另一份笔记里的索引执行计划；当前没有提供那份内容。

```sql
SELECT u.name, o.id, o.status
FROM users u LEFT JOIN orders o ON o.user_id=u.id
WHERE o.status='paid'
ORDER BY u.id;
```

图中没有新增证据，本示例只给出图片引用文字，不提供图片。不能根据文件名猜内容。

[实际查询与结果](https://godgod126.github.io/listening-script-kit/learning/sql-left-join/)
[SQLite官方说明](https://www.sqlite.org/lang_select.html#whereclause)
