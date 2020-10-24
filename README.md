# CMPE 202 - Fall 2020 - Team 5

## HomeFinder - Web application

### About

A web application that lets users buy, sell or rent homes

### Requirements

1. Register/Login: Available for all roles

2. Approve/Remove users: The administrator can approve, reject or remove any users if the
need arises.

3. Search: All types of roles can search for Sale or rental listings - based on zip code or street
address, and/or other attributes – price range, sqft., #bedrooms, #bathrooms, carpet vs
wooden flooring, home type (apartment/townhome/attached Single Family Home or Detached
Single), open/closed parking, other amenities, Year built etc.

4. Save as Favorites: Users are able to save Favorite searches and Favorite Homes

5. Sell: (Realtor or Seller)
Upload details of home to be listed
You could list multiple homes if you are a realtor(acting on behalf of multiple sellers)
Update status or other details of listing(s)
Schedule open houses
Review buyers’ applications and approve/reject
Remove listing

6. Buy: (Buyer or Realtor)
Submit an application with an offer for the home –an email sent to the Seller/seller’s realtor

7. Rent out (Realtor or Landlord): Add new listing, Upload details of home, Update lease terms,
Availability date, Security deposit, schedule visits, Review renter’s applications and
approve/reject, update listing details, remove listing

8. Rent (Renter): Submit an application for the lease, including credit score, employment
information - an email sent to the Landlord/landlord’s realtor

### Built With

* Backend - Django, PostgreSQL, Algolia
* Frontend - React JS, Bootstrap

### Running the Application 

#### Django Setup
```
#Use Python 3.8
pip install pipenv
pipenv shell 
pipenv install 
python manage.py runserver
```
#### React Setup
```
#Run in a separate Terminal
cd homefinder/frontend 
npm install
npm start
```

### System Design

### Roadmap

### Acknowledgements
