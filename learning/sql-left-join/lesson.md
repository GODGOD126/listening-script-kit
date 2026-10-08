# SQL学习笔记怎么变成能听的复习课？从LEFT JOIN丢掉一个人说起

如果豆包或ChatGPT帮你写了一篇SQL学习笔记，里面全是代码、表格和“看上面的结果”，直接点朗读，经常会丢掉关键参照：你听见了一串字段名，却不知道哪个人为什么没了。

我做了一个具体示范：同样一个左连接问题，先在SQLite里实际运行四种查询，再改写成一篇可以离开屏幕收听的中文复习稿。本文附完整代码、结果与听稿提示词。我是「自听」MyListen开发者，文稿由AI辅助制作并核查；例子人物和订单是教学虚构。

「自听」负责的是最后一步：把已经准备好的长文在iPhone本地生成、保存为能续听的音频。先把讲稿做好，再选择合适的朗读方式。

## 一个听得懂、也能跑的例子

登记用户只有三位：阿青有一笔已付款订单；小林只有一笔未付款订单；小周没有订单。需求是“所有用户都要在名单上，如果有付款订单，就放到名字旁边”。

```sql
CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT NOT NULL);
CREATE TABLE orders (id INTEGER PRIMARY KEY, user_id INTEGER NOT NULL, status TEXT NOT NULL);
INSERT INTO users VALUES (1,'阿青'), (2,'小林'), (3,'小周');
INSERT INTO orders VALUES (101,1,'paid'), (102,2,'unpaid');
```

先按用户编号连接，再在WHERE里要求已付款：

```sql
SELECT u.name, o.id, o.status
FROM users u LEFT JOIN orders o ON o.user_id=u.id
WHERE o.status='paid'
ORDER BY u.id;
```

实际只留下阿青。小林的订单未付款，小周补出的订单状态是NULL，都没有通过最后的筛选。

把已付款放在ON中，让它成为“什么订单可以匹配”的要求：

```sql
SELECT u.name, o.id, o.status
FROM users u
LEFT JOIN orders o ON o.user_id=u.id AND o.status='paid'
ORDER BY u.id;
```

实际结果是三位用户：阿青带一笔付款订单；小林和小周的订单编号、状态为NULL。这才是最初要求的名单。

不要漏掉小林这个反例。下面的常见改法也不能完整替代第二种查询：

```sql
SELECT u.name, o.id, o.status
FROM users u LEFT JOIN orders o ON o.user_id=u.id
WHERE o.status='paid' OR o.id IS NULL
ORDER BY u.id;
```

它留下阿青和小周，仍然丢掉小林：小林确实有订单，编号不为空，只是没有付款。所以“最后允许空值”和“连接时只找付款订单”不能在这个例子里互换。

若要统计每位用户的付款订单，可以在第二种连接的基础上数订单编号：

```sql
SELECT u.name, COUNT(o.id) AS paid_count
FROM users u
LEFT JOIN orders o ON o.user_id=u.id AND o.status='paid'
GROUP BY u.id, u.name
ORDER BY u.id;
```

实际是一、零、零。COUNT订单编号不计NULL；COUNT所有结果行会把左连接保留的那行也算进去。

这些结果在本地SQLite 3.49.1实际运行验证。SQLite官方SELECT文档的2.3节说明：外连接补出的NULL行发生在ON之后、WHERE之前，WHERE表达式为假或NULL的行会被排除。这里是语义解释顺序，不是数据库物理执行计划。

官方文档：https://www.sqlite.org/lang_select.html#whereclause

## 把参照物放进句子

原笔记如果写“第二种查询保留第三行”，眼睛还能来回找。耳朵听到这句话就很难知道第三行是谁。

改成听稿，可以这样写：

> 阿青有符合要求的订单，于是留下阿青和那笔订单。小林虽然有订单，但它尚未付款，所以不是这次连接想找的订单。左连接没有为小林找到符合条件的记录，于是仍然保留小林，只让订单位置空着。小周根本没有订单，也没有匹配到记录，于是保留小周，订单位置同样空着。最终三个人都在，正好符合老板最初的要求。

这段没有逐字符念SQL，但人物、条件、结果都保留下来了。每次换查询，重新交代人物状态，不靠“如上表”“这一个”“第二列”维持意思。

也别让AI把结论写成“条件只能放在ON里”。如果业务就是只找付款者，WHERE筛已付款可以满足目标。听稿要讲出条件和业务之间的关系，不能只给一个好背、却过度概括的口诀。

## 一份可以复制的提示词

```text
把下面的SQL笔记改成中文复习听稿。听众暂时不能看代码和表格。
保留我提供的查询、实际结果和反例，不补造测试。
先用中文解释条件问什么，再说明每个人为什么留下或离开。
每次重新交代人物和状态，避免“如上表”“这一列”等视觉指代。
不要逐字符念代码，来源网址与代码放在独立核查附录。
ON与WHERE讲的是逻辑语义，不宣称物理执行顺序。
不要把仅有未付款订单和没有任何订单混为一谈。
输出：一份可朗读正文；一份与实际查询结果逐条对应的核查附录。
最后检查有没有漏掉反例，有没有把两种业务需求混成一个。
```

生成稿以后，先拿它和实际结果对照，再决定怎么听。听稿适合复习概念，回到电脑上还是需要亲自跑代码；这里没有做学习效果或考试成绩实验。

## 自己的学习笔记，放进自己的节目

如果只是临时听一段，可以使用设备已有的朗读功能。如果希望长文保存为一期节目、锁屏收听、下次接着听，可以把整理好的正文粘贴到「自听」MyListen，或者导入TXT、Markdown。

它在iPhone本地生成自然流畅的声音。点击生成，稍等片刻，就能一边生成一边听；支持保存收听进度和导出M4A。无广告、无订阅；可免费下载试用，完整功能通过App内购买解锁。当前商店最低系统要求为iOS16.4，具体功能以商店页面和试用为准。

这份示例代码、讲稿和提示词可以独立使用，不需要购买App。

中国区App Store：https://apps.apple.com/cn/app/id6790382144
