#a neat version of code to show timing diff btw non cached code vs cached. 

from flask import Flask, Response , jsonify
from flask_cors import CORS

import time

app = Flask(__name__)
CORS(app)

@app.route('/outputURL/<textFromUser>')
def outputURL(textFromUser):

  print(f"the query we got {textFromUser} ")

  start = time.time()

  from sentence_transformers import SentenceTransformer, util
  import torch
  import pandas as pd
  import pickle

  dataset = pd.concat(map(pd.read_csv, ["https://scrapedcsvfiles.blob.core.windows.net/26csvs/a.csv",
                                        "https://scrapedcsvfiles.blob.core.windows.net/26csvs/b.csv",
                                        "https://scrapedcsvfiles.blob.core.windows.net/26csvs/c.csv",
                                        "https://scrapedcsvfiles.blob.core.windows.net/26csvs/d.csv",
                                        "https://scrapedcsvfiles.blob.core.windows.net/26csvs/e.csv",
                                        "https://scrapedcsvfiles.blob.core.windows.net/26csvs/f.csv",
                                        "https://scrapedcsvfiles.blob.core.windows.net/26csvs/g.csv",
                                        "https://scrapedcsvfiles.blob.core.windows.net/26csvs/h.csv",
                                        "https://scrapedcsvfiles.blob.core.windows.net/26csvs/i.csv",
                                        "https://scrapedcsvfiles.blob.core.windows.net/26csvs/j.csv",
                                        "https://scrapedcsvfiles.blob.core.windows.net/26csvs/k.csv",
                                        "https://scrapedcsvfiles.blob.core.windows.net/26csvs/l.csv",
                                        "https://scrapedcsvfiles.blob.core.windows.net/26csvs/m.csv",
                                        "https://scrapedcsvfiles.blob.core.windows.net/26csvs/n.csv",
                                        "https://scrapedcsvfiles.blob.core.windows.net/26csvs/o.csv",
                                        "https://scrapedcsvfiles.blob.core.windows.net/26csvs/p.csv",
                                        "https://scrapedcsvfiles.blob.core.windows.net/26csvs/q.csv",
                                        "https://scrapedcsvfiles.blob.core.windows.net/26csvs/r.csv",
                                        "https://scrapedcsvfiles.blob.core.windows.net/26csvs/s.csv",
                                        "https://scrapedcsvfiles.blob.core.windows.net/26csvs/t.csv",
                                        "https://scrapedcsvfiles.blob.core.windows.net/26csvs/u.csv",
                                        "https://scrapedcsvfiles.blob.core.windows.net/26csvs/v.csv",
                                        "https://scrapedcsvfiles.blob.core.windows.net/26csvs/w.csv",
                                        "https://scrapedcsvfiles.blob.core.windows.net/26csvs/x.csv",
                                        "https://scrapedcsvfiles.blob.core.windows.net/26csvs/y.csv",
                                        "https://scrapedcsvfiles.blob.core.windows.net/26csvs/z.csv"
                                        ]))

  dataset = dataset.dropna()
  dataset['id'] = dataset.index
  dataset.columns = dataset.columns.str.strip()
  dataset['word'].str.strip()
  dataset['videoURL'].str.strip()

  model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2', device="cpu")
  #to list coz i dw a dataframe i want the list of words to encode
  embeddings = model.encode(dataset["word"].to_list(), show_progress_bar=True)

  user_queries = [textFromUser] 

  queries_embeddings = model.encode(user_queries, convert_to_tensor=True)

  import numpy as np
  from sklearn.neighbors import NearestNeighbors             

  #fitting my training data on the nearest neighbours
  neigh = NearestNeighbors(n_neighbors=1, metric='euclidean')
  neigh.fit(embeddings)
  
  dist, index = neigh.kneighbors(queries_embeddings)
  
  vidUR = dataset['videoURL'].to_list()[index[0][0]]
  end = time.time()
  print(f"Total runtime is {end - start} seconds")
  return Response(vidUR, mimetype='text/plain', content_type='text/plain')

if __name__ == "__main__":
  app.run(host='0.0.0.0', port=8000, debug=True) #changed 5000 to 8000 here and on index fetch