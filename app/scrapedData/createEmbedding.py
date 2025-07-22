#i am gonna run this once and for all to get the embeddings and then just read that in ML code to prvent gateway timout w/o using application gateway

import os
os.environ['CUDA_VISIBLE_DEVICES'] = '-1'

from sentence_transformers import SentenceTransformer, util
model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2', device="cpu")

import pandas as pd
import csv
dataset = pd.concat(map(pd.read_csv, ["/Users/deepamalika/SignBridge/app/scrapedData/a.csv", 
                                      "/Users/deepamalika/SignBridge/app/scrapedData/b.csv", 
                                      "/Users/deepamalika/SignBridge/app/scrapedData/c.csv",
                                      "/Users/deepamalika/SignBridge/app/scrapedData/d.csv", 
                                      "/Users/deepamalika/SignBridge/app/scrapedData/e.csv", 
                                      "/Users/deepamalika/SignBridge/app/scrapedData/f.csv",
                                      "/Users/deepamalika/SignBridge/app/scrapedData/g.csv", 
                                      "/Users/deepamalika/SignBridge/app/scrapedData/h.csv", 
                                      "/Users/deepamalika/SignBridge/app/scrapedData/i.csv",
                                      "/Users/deepamalika/SignBridge/app/scrapedData/j.csv", 
                                      "/Users/deepamalika/SignBridge/app/scrapedData/k.csv", 
                                      "/Users/deepamalika/SignBridge/app/scrapedData/l.csv",
                                      "/Users/deepamalika/SignBridge/app/scrapedData/m.csv", 
                                      "/Users/deepamalika/SignBridge/app/scrapedData/n.csv", 
                                      "/Users/deepamalika/SignBridge/app/scrapedData/o.csv",
                                      "/Users/deepamalika/SignBridge/app/scrapedData/p.csv", 
                                      "/Users/deepamalika/SignBridge/app/scrapedData/q.csv", 
                                      "/Users/deepamalika/SignBridge/app/scrapedData/r.csv",
                                      "/Users/deepamalika/SignBridge/app/scrapedData/s.csv", 
                                      "/Users/deepamalika/SignBridge/app/scrapedData/t.csv", 
                                      "/Users/deepamalika/SignBridge/app/scrapedData/u.csv",
                                      "/Users/deepamalika/SignBridge/app/scrapedData/v.csv", 
                                      "/Users/deepamalika/SignBridge/app/scrapedData/w.csv", 
                                      "/Users/deepamalika/SignBridge/app/scrapedData/x.csv",
                                      "/Users/deepamalika/SignBridge/app/scrapedData/y.csv", 
                                      "/Users/deepamalika/SignBridge/app/scrapedData/z.csv"
                                        ]))

dataset = dataset.dropna()
dataset['id'] = dataset.index
dataset.columns = dataset.columns.str.strip()
dataset['word'].str.strip()
dataset['videoURL'].str.strip()

embeddings = model.encode(dataset["word"].to_list(), show_progress_bar=True)

dataset.to_parquet('dataset.parquet', engine="pyarrow")
df_embeddings = pd.DataFrame(embeddings)
df_embeddings.to_parquet('embeddings.parquet', engine='pyarrow')

'''
with open('embeddings.csv', 'w', newline='', encoding='utf-8') as csv_file:
        writer = csv.writer(csv_file)
        for content in embeddings:
            writer.writerow(content)
'''
