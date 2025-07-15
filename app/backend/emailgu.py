#backend for feedback form

import os
from pathlib import Path
from mailgun.client import Client

#as for safety i saved private keys into env. this is so i can access it
from dotenv import load_dotenv, dotenv_values
load_dotenv()

key: str = os.environ.get("MAILGUN_APIKEY")
domain: str = os.environ.get("MAILGUN_DOMAIN")
print(f'key is {key}')
print(f'domain is {domain}')
client: Client = Client(auth=("api", key))



from flask import Flask, Response
from flask_cors import CORS

feedapp = Flask(__name__)
CORS(feedapp)

#all my params wld be strings
@feedapp.route('/mail/<userName>/<userEmail>/<userMSG>')
def post_message(userName,userEmail,userMSG) -> None:
    data = {
        "from": os.getenv("MESSAGES_FROM", userEmail),
        "to": os.getenv("MESSAGES_TO", "e1385469@u.nus.edu"),
        "subject": f'SignBridge feedback from {userName}',
        "text": f'the issue is: {userMSG} & the image can be obtained in my azure storage acct',
        "o:tag": "Feedback",
    }

    req = client.messages.create(data=data, domain=domain)
    #print(req.json())
    print(req.status_code)
    print(req.text)
    #so that i can know if my fronted sent email succesfullly
    return "True" 
if __name__ == "__main__":
  feedapp.run(host='0.0.0.0', port=8001, debug=True)
