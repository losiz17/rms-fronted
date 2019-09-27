# -*- coding: utf-8 -*-
#記事の内容insert

import MeCab
import csv
import pandas as pd
import MySQLdb


csv_file = open("./all_content.csv",'r')

cnt = 1
connection = MySQLdb.connect(
    host='database-rms0.ci9npugkyvqo.ap-northeast-1.rds.amazonaws.com',
    user='admin',
    passwd='8D^yvu9j#vaD',
    db='mecab_development',
    charset='utf8')
cursor = connection.cursor()


for row in csv.reader(csv_file):
    if cnt == 1:
        cnt += 1
        continue
    print(row[2])
    # sql = "INSERT INTO articles (id,content)values(%s, %s)"
    sql = "UPDATE articles SET content=%s WHERE title=%s;"
    cursor.execute(sql, (row[2], row[1]))
    cnt += 1
    connection.commit()
connection.close()