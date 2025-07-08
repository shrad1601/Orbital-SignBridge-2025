from requests_html import HTMLSession 
from bs4 import BeautifulSoup

#so that i dont crash or get blocked, i will use a delay
import time

session = HTMLSession()
time.sleep(2)
url = 'https://www.signasl.org/sign/abbreviate'
response = session.get(url)
print(f'Parsing: {response.html.url}')

print(response.status_code)


soup = BeautifulSoup(response.html.html, 'html.parser')


with open('checkVidlink.html', 'w', encoding='utf-8') as f:
    f.write(response.text)