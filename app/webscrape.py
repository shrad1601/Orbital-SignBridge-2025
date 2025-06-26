#plan is to load the words and video url so that i can pass it to postgresql then do search
#first there is class active with href to each dictionary pg for each lttr. then so in each page of the dictionary when we do page source, we see there is href to each word on that page then there is pagination class with href o each of that letter's page
#when we go into a word and page source, it has the meta property of og:video content with the vid url

#we already installed requests_html & bs4 to use the webscraping tools:beautifulsoup & give req
from requests_html import HTMLSession 
from bs4 import BeautifulSoup

#so that i dont crash or get blocked, i will use a delay
import time

print('for debug')
# create necessary variables to loop through
alphabets = ('a', 'b','c','d','e','f','g','h','i','j','k','l',
             'm','n','o','p','q''r','s','t','u','v','w','x','y','z')

session = HTMLSession()

for lttr in alphabets:
    time.sleep(1)
    #variable for the changing url & to store all the word content
    page_no = 1
    list_words_vids = []

    while True:
        time.sleep(2)
        url =  f'https://www.signasl.org/dictionary/{lttr}/{page_no}'
        #response rep us making a get request to python
        #session = HTMLSession()
        response = session.get(url)

        print(f'Parsing: {response.html.url}')

        if response.html.url == 'https://www.signasl.org/':
            print(list_words_vids)
            #we break so that can move on to the nxt lttr in alphabet
            break

        soup = BeautifulSoup(response.html.html, 'html.parser')

        #my css selector for the html webpage: 
        #for the whole words block in this pg when i do inspect it is in the container class
        #i need to select the 2nd instance of container class
        
        #table = soup.select('div.container:nth-of-type(2) div.row.featurette div.col-md-12 table tbody')
        #table = soup.select('div.row.featurette table tbody')
        table = soup.select_one('table')

        if not table: 
            print(f'table not found at {lttr} at {page_no}')
            break

        #adding these in coz table does not actually get the text etc
        #also there's a thing abt find_all not working on lists, it works on tags so did extraction for tabbod
        #tabBod = table[0]
        tabRow = table.find_all('tr')

        for row in tabRow: 
            #TO-DO:i think i shld do the going into each link from words here to get the video url
            #word.contents gives us a list of the words in that pg so [0] to get the specific string to append
            
            #WOULD BE EDITING THE INSIDE OF THIS FOR BLOCK 
            '''
            print(word.prettify())
            list_words_vids.append(word.contents[0])
            '''
            time.sleep(1)
            tdata = row.find_all('td')
            #OMG each row has multiple td elem so i cant do tdata[0]
            for data in tdata:
                #linking ref is in our home main pg the href so like not the vid thing we want
                theLinkingref = 'https://www.signasl.org' + data.find('a')['href']
                theText = data.get_text(strip=True) 

                response2 = session.get(theLinkingref)
                print(f'Parsing: {theLinkingref}')
                soup2 = BeautifulSoup(response2.html.html, 'html.parser')
                #then i need to select the sign vid link
                vidTag = soup2.select_one('source')
                #to be safe
                if vidTag:
                    vidLink = vidTag['src']
                else:
                    vidLink = 'NA'

                #print(f'I GOT THE VIDLINK & IT IS {vidLink}')
                

                list_words_vids.append(f'{theText}, {vidLink}')
                time.sleep(1)





        '''
        #soup.select gives list containing all the elems if it finds smth with that selector, else u get empty list      
        last_pg_listVal = soup.select('div.container:nth-of-type(2) div.row.featurette ' \
        'div.col-md-12 ul.pagination:nth-of-type(2) li') #i need to figure out how to tell last pg is recahed & no more nxt. i am giving detailed path coz i am scared it might select wrong pagination
        
        #so coz i sleceted the whole ul then last_pg_listVal shld be a list so i can get length
        
        if len(last_pg_listVal) == page_no:
            print(list_words_vids)
            #we break so that can move on to the nxt lttr in alphabet
            break
        '''



        page_no += 1

    #gonna store the words array into a txt file
    with open(f'{lttr}.csv', 'w', encoding='utf-8') as csv_file:
        for content in list_words_vids:
            csv_file.write(content + '\n')
    
    








print('woah done')
