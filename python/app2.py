# -*- coding: utf-8 -*-
# database オートインクリメント用

import MySQLdb
import csv
# データベースへの接続とカーソルの生成
connection = MySQLdb.connect(
    host='database-rms0.ci9npugkyvqo.ap-northeast-1.rds.amazonaws.com',
    user='admin',
    passwd='8D^yvu9j#vaD',
    db='mecab_development',
    charset='utf8')
cursor = connection.cursor()

# f = open("wordcount_dic.csv", "r")
# reader = csv.reader(f)
# for row in reader:
#     sql = "INSERT INTO words (name,count)values(%s, %s)"
#     cursor.execute(sql, (row[0], row[1]))
 
# ここに実行したいコードを入力します
# cursor.execute("SELECT * FROM word_articles")

cursor.execute("SELECT * FROM articles where author_id =10")
rows = cursor.fetchall()

for row in rows:
    print(row)
# cursor.execute(sql, (int("1"), "aaaaa",int("1")))
 
# for row in cursor:
#     print(row)
 
# 保存を実行
connection.commit()
 
# 接続を閉じる
connection.close()