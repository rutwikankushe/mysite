from django.shortcuts import render
import requests
from django.http import HttpResponse
from subprocess import run,PIPE
import sys
from django.core.files.storage import FileSystemStorage



def button(request):
    return render(request,'index.html')
# Create your views here.


def About_us(request):
    return render(request,'About-us.html')



def Contact_us(request):
    return render(request, 'Contact-us.html')

def Terms_of_Service(request):
    return render(request, 'Terms-of-services.html')

def Online_Cerificate_Verification_Tool(request):
    return render(request,'index.html')



def output(request):
    data=requests.get("https://reqres.in/api/users")
    print(data.text)
    data=data.text
    return render(request,'index.html',{'data':data})


def Online_Cerificate_Verification_Tool_Verification_Result(request):
    inp = request.POST.get('param')
    image =request.FILES['image']
    print("image is",image)
    fs=FileSystemStorage()
    filename=fs.save(image.name,image)
    fileurl=fs.open(filename)
    templateurl=fs.url(filename)
    print("file raw url",filename)
    print("file full url",fileurl)
    print("template url",templateurl)

    # out = run([sys.executable, 'C://Users//admin//Desktop//mysite//1+2.py',inp], shell=False, stdout=PIPE)
    image = run([sys.executable, 'C://Users//admin//Desktop//mysite//1+2.py',str(fileurl),str(filename)], shell=False, stdout=PIPE)
    # print(out)
    print(image.stdout)
    return render(request, 'index.html', {'data1': image.stdout.decode('utf-8'), 'raw_url': templateurl, 'edit_url': image.stdout})
# def home(request):
#     return render(request, 'index.html')


