"""A tiny fictional SQLite example accompanying the Chinese listening lesson."""
import json
import sqlite3
from pathlib import Path

db=sqlite3.connect(':memory:')
db.executescript('''
CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT NOT NULL);
CREATE TABLE orders (id INTEGER PRIMARY KEY, user_id INTEGER NOT NULL, status TEXT NOT NULL);
INSERT INTO users VALUES (1,'阿青'), (2,'小林'), (3,'小周');
INSERT INTO orders VALUES (101,1,'paid'), (102,2,'unpaid');
''')
queries={
 'filter_in_where': "SELECT u.name, o.id, o.status FROM users u LEFT JOIN orders o ON o.user_id=u.id WHERE o.status='paid' ORDER BY u.id;",
 'filter_in_on': "SELECT u.name, o.id, o.status FROM users u LEFT JOIN orders o ON o.user_id=u.id AND o.status='paid' ORDER BY u.id;",
 'or_null_in_where': "SELECT u.name, o.id, o.status FROM users u LEFT JOIN orders o ON o.user_id=u.id WHERE o.status='paid' OR o.id IS NULL ORDER BY u.id;",
 'count_paid': "SELECT u.name, COUNT(o.id) AS paid_count FROM users u LEFT JOIN orders o ON o.user_id=u.id AND o.status='paid' GROUP BY u.id, u.name ORDER BY u.id;"
}
results={name:dict(sql=q,rows=db.execute(q).fetchall()) for name,q in queries.items()}
assert results['filter_in_where']['rows']==[('阿青',101,'paid')]
assert results['filter_in_on']['rows']==[('阿青',101,'paid'),('小林',None,None),('小周',None,None)]
assert results['or_null_in_where']['rows']==[('阿青',101,'paid'),('小周',None,None)]
assert results['count_paid']['rows']==[('阿青',1),('小林',0),('小周',0)]
payload={'sqliteVersion':sqlite3.sqlite_version,'scope':'虚构教学数据；本地内存数据库；仅证明这组输入输出，不是性能测试','results':results}
Path(__file__).with_name('sql-example-results.json').write_text(json.dumps(payload,ensure_ascii=False,indent=2),'utf-8')
print(json.dumps(payload,ensure_ascii=False))
