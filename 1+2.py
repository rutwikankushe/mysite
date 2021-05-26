import cv2
import pytesseract
import requests 
from bs4 import BeautifulSoup
import sys
from PIL import Image
from pyzbar.pyzbar import decode
import re

                      

# import datetime
# time = datetime.datetime.now()
# output = "Hi %s current time is %s" % (sys.argv[1], time)
# print(output)

image_fullpath=sys.argv[1]
image_name=sys.argv[2]
img1= Image.open(str(image_fullpath))
img2=re.sub("^/|/$", "", image_fullpath)


img = cv2.imread(img2)
msg1="This certificate is Original !"
msg2="This certificate is Fake !"
msg3="Can't process this Image , try another one !"
headers = {
    "User-agent": 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36'}


pytesseract.pytesseract.tesseract_cmd = 'C:\\Program Files\\Tesseract-OCR\\tesseract.exe'
text=pytesseract.image_to_string(img)
if(int(text.find('Coursera'))>0):

    b=int(text.find('20'))+6
    c=int(text.find('has'))-1
    t=text[b:c]
    # print(t)
    c=int(text.find('Verify at'))+10
    d=int(text.find('Coursera has confirmed'))-2
    link=text[c:d]
    # print(link)
    
    URL = "http://"+link
    try:
        page = requests.get(URL, headers=headers)
        soup = BeautifulSoup(page.content, 'html.parser')
        soup=str(soup)

        b1=int(soup.find('<strong>'))+8
        c1=int(soup.find('</strong>'))
        t1=soup[b1:c1]
        # print(t1)
        if(t==t1):
            print("This Certificate of "+"'"+t+"'"+" is Original !")
        else:
            print("This Certificate of "+"'"+t+"'"+" is Fake !")
    except:
        print(msg3)

elif(int(text.find('Certificate of Completion')) > 0):
    b = int(text.find('that'))+4
    c12 = int(text.find('successfully'))
    d = text[b+1:c12-1]
    # print(d)
    c = int(text.find('my/'))+3
    t = text[c:c+11]
    b1 = int(text.find('online course on'))-2
    c1 = int(text[c12:b1].find('of'))
    course_name = text[c12+3+c1:b1]
    # print(t)
    try:
        image_url = str("https://udemy-certificate.s3.amazonaws.com/image/"+t+".jpg")
        # print(image_url)
        r = requests.get(image_url)  # create HTTP response object

        with open("images/python_logo.png", 'wb') as f:
            f.write(r.content)

        img = cv2.imread('images/python_logo.png')
        text1 = pytesseract.image_to_string(img)
        b1 = int(text1.find('that'))+4
        c1 = int(text1.find('successfully'))
        d1 = text1[b1+1:c1-1]
        # print(d1)
        b2=int(text1.find('online course'))-2
        c2=int(text1[c1:b2].find('of'))
        course_name1=text1[c1+3+c2:b2]
        # print(d, '\n', d1, '\n', course_name, '\n', course_name1, '\n')
        if(d == d1 and course_name==course_name1):
            print("This Certificate of "+"'"+d+"'"+" is Original !")
        else:
            print("This Certificate of "+"'"+d+"'"+" is Fake !")
    except:
        print(msg3)
elif(int(text.find('Alison')) > 0):
    b = int(text.find('certify that'))+14
    c = int(text.find('Has completed'))-2
    t = text[b:c]
    # print(t)

    try:
        for i in decode(img):
            link = i.data.decode('utf-8')
            # print(link)
       
        URL = link
        page = requests.get(URL, headers=headers)

        soup = BeautifulSoup(page.content, 'html.parser')
        soup = str(soup)

        if((soup.find(t))>0):
            print("This Certificate of "+"'"+t+"'"+" is Original !")
        else:
            print("This Certificate of "+"'"+t+"'"+" is Fake !")
    except:
        print(msg3)

else:
    b = int(text.find('COMPLETION'))+12
    c = int(text.find('successfully'))-2
    t = text[b:c]
    # print(t)
    b1 = int(text.find('online course on'))-2
    c1 = int(text[c:b1].find('of'))
    course_name = text[c+3+c1:b1]
    try:
        for i in decode(img):
            link = i.data.decode('utf-8')
            # print(link)
        
        URL = link
        page = requests.get(URL, headers=headers)

        soup = BeautifulSoup(page.content, 'html.parser')
        soup = str(soup)

        if(((soup.find(t))>0) and (soup.find(course_name))):
            print("This Certificate of "+"'"+t+"'"+" is Original !")
        else:
            print("This Certificate of "+"'"+t+"'"+" is Fake !")
    except:
        print(msg3)
