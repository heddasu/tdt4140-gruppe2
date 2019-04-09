### ShoppingList

ShoppingList is an application that makes it easier for a group of people to share a common shopping list, regardless of time and place.

[Here](https://gitlab.stud.idi.ntnu.no/programvareutvikling-v19/gruppe-2/wikis/home) is a guide on how to navigate through the projects repository, wiki and backlog. 

### Motivation

The Project is developed by a group of students at NTNU as a part of **TDT4140 Software Development**, a course that aims to give students a taste of working in the software industry.

### Structure:

The project is separated into two main folders: backend and frontend. The backend contains the Django project, used as a Django Rest Framework to host a simple API. The frontend uses React and contains the visual representation of the app, and queries data from the API. 

### Running
**Getting started**

To run this application on your local computer, you will need to have [Node.js](https://nodejs.org/en/), [Python](https://www.python.org/downloads/) and [Django](https://docs.djangoproject.com/en/2.1/topics/install/) installed. 

**Versions used for this project**

*  Node: 10.15.1

*  Npm: 6.8.0

*  Python: 3.7.0

*  Django: 2.1.7






**Installation**

Clone this repository, then using a terminal, navigate to the frontend directory and run the following:
```
$ npm install
```

**Running python**

Check version of python:
```
$ python -V
```
If you get python 1 or 2 use pip3 and python3 instead of pip and python in your terminal.

Navigate to backend and run the following: 
```
$ pip install django
$ pip install djangorestframework
$ pip install django-cors-headers
$ pip install django-rest-auth
$ pip install djangorestframework-jwt
```



**Run locally**

To start the server, navigate to the frontend directory and run this command:
```
$ npm start
```
The application should now be running in your browser at http://localhost:3000.

Then open a new terminal and navigate to the backend directory an run the following: 
```
$ pipenv shell
$ python manage.py runserver

to exit shell:
$ ctrl + d
```
You will now be able to access the database server at http://127.0.0.1:8000/.

If there are changes to the backend, run the following: 
```
$ ctrl C (to exit)
$ python manage.py makemigrations
$ python manage.py migrate
```

### License

NTNU © [Programvareutvikling/gruppe 2](https://gitlab.stud.idi.ntnu.no/programvareutvikling-v19/gruppe-2)