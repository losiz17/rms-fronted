# -*- coding: utf-8 -*-
import MeCab
import csv
import pandas as pd
import MySQLdb
 

 
#解析テキスト
# text = " 「オケ老人！」作者が描く新しいお仕事小説。<br><br> 中堅よりやや落ちるレベルの女子大を卒業した片桐いずみは、就活で大苦戦し、ようやく住宅リフォーム会社に内定した。しかし、入社早々、理不尽に怒鳴りまくる部長・大木田の姿を目にして生ぬるい空気が一変する。<br>  それから、３年。なんとか社内でのポジションをキープしながら鬼の飛び込み営業を続けていたある日、片桐に新人の部下が付く。だが、これが、前代未聞のとんでもないやる気のない男だったのだ。連日連夜、超絶無気力新人・俵の教育に骨を折るものの、一向に改善の余地は見られない。業を煮やした大木田はある策に出るのだが――。"
csv_file = open("./all_content.csv",'r')


connection = MySQLdb.connect(
    host='database-rms0.ci9npugkyvqo.ap-northeast-1.rds.amazonaws.com',
    user='admin',
    passwd='8D^yvu9j#vaD',
    db='mecab_development',
    charset='utf8')
cursor = connection.cursor()

def WordFrequencyCount(word):
    if word in wordFreq_dic:
        wordFreq_dic[word] +=1

    else:
        wordFreq_dic.setdefault(word, 1)
    return wordFreq_dic

cnt = 1

for row in csv.reader(csv_file):
    a_text = ""
    wordFreq_dic = {}
    wordcount_output = []

    a_text += row[2] #取得したい列番号を指定（0始まり）
    mecab = MeCab.Tagger()
    mecab.parse('')
    node = mecab.parseToNode(a_text)

    while node:
        if node.feature.split(",")[0] == "名詞":
            word = node.surface
            #print(wordFreq_dic)
            WordFrequencyCount(word)
        else:pass
        node = node.next

    for item in wordFreq_dic.items():
        wordcount_output.append(item)
        # print(item)
    wordcount_output = sorted(wordcount_output, key = lambda x:x[1], reverse=True)
    #print(wordcount_output)
    for wordcount in wordcount_output:
        print(wordcount[0])
        sql = "INSERT INTO word_articles (count,word,article_id)values(%s, %s,%s)"
        cursor.execute(sql, (wordcount[1], str(wordcount[0]),cnt))
    cnt += 1

# 保存を実行
connection.commit()
# 接続を閉じる
connection.close()