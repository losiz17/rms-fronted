# -*- coding: utf-8 -*-
import MeCab
import csv
import pandas as pd
import MySQLdb
 
wordFreq_dic = {}
wordcount_output = []
 
#解析テキスト
# text = " 「オケ老人！」作者が描く新しいお仕事小説。<br><br> 中堅よりやや落ちるレベルの女子大を卒業した片桐いずみは、就活で大苦戦し、ようやく住宅リフォーム会社に内定した。しかし、入社早々、理不尽に怒鳴りまくる部長・大木田の姿を目にして生ぬるい空気が一変する。<br>  それから、３年。なんとか社内でのポジションをキープしながら鬼の飛び込み営業を続けていたある日、片桐に新人の部下が付く。だが、これが、前代未聞のとんでもないやる気のない男だったのだ。連日連夜、超絶無気力新人・俵の教育に骨を折るものの、一向に改善の余地は見られない。業を煮やした大木田はある策に出るのだが――。"
csv_file = open("./test.csv",'r')
a_list = [] 

connection = MySQLdb.connect(
    host='database-rms0.ci9npugkyvqo.ap-northeast-1.rds.amazonaws.com',
    user='admin',
    passwd='8D^yvu9j#vaD',
    db='mecab_development',
    charset='utf8')
cursor = connection.cursor()

for row in csv.reader(csv_file):
    a_list.append(row[2]) #取得したい列番号を指定（0始まり）

# 先頭行を削除しておく
del a_list[0]

a_text = ""
for a in reversed(a_list):
    a_text += a
    a_text += "\n"

# print(a_text)

#単語頻出度カウント
def WordFrequencyCount(word):
    if word in wordFreq_dic:
        wordFreq_dic[word] +=1

    else:
        wordFreq_dic.setdefault(word, 1)
    return wordFreq_dic

#特定の品詞の単語を抽出
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
print(wordcount_output)

for wordcount in wordcount_output:
    print(wordcount[0])
    sql = "INSERT INTO words2 (name,count)values(%s, %s)"
    cursor.execute(sql, (wordcount[0], str(wordcount[1])))


# 保存を実行
connection.commit()
# 接続を閉じる
connection.close()
#CSV出力
# with open("wordcount_dic.csv", "w", encoding="utf-8") as f:
#     writer = csv.writer(f, lineterminator="\n")
#     writer.writerows(wordcount_output)