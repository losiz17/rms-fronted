# -*- coding: utf-8 -*-
#word_articlesをCSV吐き出し
import MeCab
import csv
import pandas as pd
import MySQLdb

# text = " 「オケ老人！」作者が描く新しいお仕事小説。<br><br> 中堅よりやや落ちるレベルの女子大を卒業した片桐いずみは、就活で大苦戦し、ようやく住宅リフォーム会社に内定した。しかし、入社早々、理不尽に怒鳴りまくる部長・大木田の姿を目にして生ぬるい空気が一変する。<br>  それから、３年。なんとか社内でのポジションをキープしながら鬼の飛び込み営業を続けていたある日、片桐に新人の部下が付く。だが、これが、前代未聞のとんでもないやる気のない男だったのだ。連日連夜、超絶無気力新人・俵の教育に骨を折るものの、一向に改善の余地は見られない。業を煮やした大木田はある策に出るのだが――。"
csv_file = open("./test.csv",'r')


def WordFrequencyCount(word):
    if word in wordFreq_dic:
        wordFreq_dic[word] +=1

    else:
        wordFreq_dic.setdefault(word, 1)
    return wordFreq_dic

cnt = 1
output = []

for row in csv.reader(csv_file):
   
    a_text = ""
    wordFreq_dic = {}
    wordcount_output = []
  

    a_text += row[2] #取得したい列番号を指定（0始まり）
    mecab = MeCab.Tagger('-d /usr/local/lib/mecab/dic/mecab-ipadic-neologd')
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
        l = list(range(3))
        # l.append(list(wordcount))
        # # cnt_insert = tuple(str(cnt))
        # l.append(cnt)
        l[1] = wordcount[0]
        l[2] = wordcount[1]
        l[0] = cnt-1
        
        # print(l)
        wordcount = tuple(l)
        if cnt != 1:
            output.append(wordcount)
    cnt += 1
with open("wordcount_dic.csv", "w", encoding="utf-8") as f:
    writer = csv.writer(f, lineterminator="\n")
    writer.writerows(output)
