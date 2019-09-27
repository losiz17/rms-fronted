# -*- coding: utf-8 -*-
#word_articlesをCSV吐き出し
import MeCab
import csv
import pandas as pd
import MySQLdb

col_names = [1,2,3,4]
a_text = ""

wordFreq_dic = {}
wordcount_output = []

def WordFrequencyCount(word):
    if word in wordFreq_dic:
        wordFreq_dic[word] +=1

    else:
        wordFreq_dic.setdefault(word, 1)
    return wordFreq_dic

def pd_read_row(path, idx):
    return pd.read_csv(path, header=None, skiprows=lambda x: x not in [idx])

csv_input = pd.read_csv('all_content.csv',names=col_names)

# autor_idが1のやつを全部取り出してarchicle_idを取得する
cnt = 17
all_result = ""

def WordFrequencyCount(word):
    if word in wordFreq_dic:
        wordFreq_dic[word] +=1

    else:
        wordFreq_dic.setdefault(word, 1)
    return wordFreq_dic

connection = MySQLdb.connect(
    host='database-rms0.ci9npugkyvqo.ap-northeast-1.rds.amazonaws.com',
    user='admin',
    passwd='8D^yvu9j#vaD',
    db='mecab_development',
    charset='utf8')
cursor = connection.cursor()

for i in range(510):
    print(type(cnt))
    sql = "SELECT * FROM articles where author_id =%s"
    data = (str(cnt),)    
    cursor.execute(sql, data)
    rows = cursor.fetchall()

    for row in rows:
        print(row)
        
    # 取り出したarchicle_idの文章全部繋げる
        print(csv_input.values[row[0],2])
        a_text += csv_input.values[row[0],2]
        a_text += "\n"

    mecab = MeCab.Tagger('-d /usr/local/lib/mecab/dic/mecab-ipadic-neologd')
    mecab.parse('')
    node = mecab.parseToNode(a_text)
    
    while node:
        if node.feature.split(",")[0] == "名詞":
            word = node.surface
            WordFrequencyCount(word)
        else:pass
        node = node.next
    
    #辞書リストを取り出し、降順に並び替え
    for item in wordFreq_dic.items():
        wordcount_output.append(item)
    wordcount_output = sorted(wordcount_output, key = lambda x:x[1], reverse=True)
    # print(wordcount_output)
    
    for wordcount in wordcount_output:
        print(wordcount[0])
        sql = "INSERT INTO word_authors (count,word,author_id)values(%s, %s,%s)"
        cursor.execute(sql, (wordcount[1], wordcount[0], cnt))
    cnt += 1
    print(cnt)
    connection.commit()
connection.close()
