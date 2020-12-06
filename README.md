# CMPE 202 Team Project Fall 2020

As part of the final team project we have designed and developed a web application called "HomeFinder" which is a replica of Zillow.
It provides a platform to buy, sell and rent different types of houses.
The design and implemenation includes both frontend and backend applications to support HomeFinder features states in team project requirements.

## Team Members

- Aditya Shah
- Deepthi Jallepalli
- Prashanth Narasimha
- Prerana Shekar

## Technology Stack

* Lucid Charts - For Archeitecture design, DB design

* ReactJS, React Bootstrap, HTML, CSS - Frontend development

* DjangoRESTFul Framework, Python - For backend development

* PostgresSQL - Primary DB

* Algolia - Secondary DB to improvise search performance

* Postman - REST API client to test the developed APIs

* Heroku - Deploy frontend and backend applications, PostgresSQL DB

* Project Management Tools 

  - GitHub - Source code and Project Management 

  - Google Sheet - Task tracking and sprint burndown 

  - Zoom - Team collaboration (Organizing daily scrum and other meetings)
  
  - Slack channel (CMPE-202-Zillow-Clone) - To discuss and share any information related to specific story or issues

## Architecture Diagram
<p align="center">
	<img width="650" src="https://user-images.githubusercontent.com/55044852/101270114-be8d0880-372a-11eb-8337-2d3a4c044321.png">
</p>
## Database Design
<p align="center">
	<img width="1050" src="https://user-images.githubusercontent.com/55044852/101270215-d6b15780-372b-11eb-861e-0bc298e682de.png">
</p>

## Depolyment Diagram
<p align="center">
	<img width="650" src="https://user-images.githubusercontent.com/55044852/101270257-327be080-372c-11eb-80ef-a319790e3c44.png">
</p>

## Design Decisions
  * **Architecture-level:**
    * CQRS architecture : Choosing a search engine host “Algolia” to improve search performance for home listings by creating search indexes. It also provides dashboard analysis of hits and their performance.
    * Separate deployment environments for frontend and backend applications.


  * **Application Design-level**:
    * Leveraging Django’s Model and Views design patterns to design APIs. We have utilized the Structural Model and Normalized Model design pattern that allows us to define all the classes(database tables) in a single models.py file and follow the concept Object Relational Mapping. Class-based views pattern takes a request and returns a response. These allowed us to structure our APIs and reuse code by harnessing inheritance. These design patterns helped us in reducing the code maitainibity and eased designing new APIs in every upcoming sprint.
    * Separating configuration and highly quered tables. Associating configurations like User types, home listing types, user status, images as foriegn keys ids, helped in reducing query retrieval time. Tracking creation, updation and deletion time for each record and performing soft delete whenever required.
    * Storing images on AWS S3 cloud
    
  * **Business-level:**
    Below are listed are decisions or assumptions considered to maintain logically simplified features provided by HomeFinder application:
	  * Users can search and browse through listings without any registration or even when the user registration is in pending status
    * Types of user status: Approved, Pending, Rejected, Deactivated
    * By default all registered user are assigned pending status
    * Users need to login to use all other services except searching and browsing.
    * Only approved users can login
    * A removed user can not register or login
    * Once a buyer application is approved, the property is marked as Sold
    * Email notifications are sent on approval or rejection of registration, receiving applications for posted listings, scheduling houses and visits
    * My Listings feature is only available for Realtor, Seller and Landlord
    * Buy tab lists only homes of sale type and Sell tab lists homes that can be rent-out
    * Mobile application support is out of scope
    * Seller or Realtor or Landlord can create and manage multiple listings

## Sprint Journal
<p align="center">
	<img width="1050" src="https://user-images.githubusercontent.com/56493886/101271089-b8038e80-3734-11eb-8e34-0ba9b1171ac2.PNG">
	<img width="1050" src="https://user-images.githubusercontent.com/55044852/101270299-8f779680-372c-11eb-939a-e56a9a2873de.png">
</p>
## XP Core Values

Throughout the project (sprints) we followed below stated XP core values:

- **Communication**
  * Communication was one of the key strengths of our team. We had weekly calls scheduled for every Monday evening to discuss the functionality, make necessary design decisions and assumptions.  
  * During the call we made sure to understand the progress, dependency on each other and any blockers.
  * We maintained Github projects Kanban Board to maintain the list of ToDo, InProgress, Completed tasks. This also helped us to understand the progress of various tasks throughout the sprint.
  * We had a clear work breakdown, which helped us clearly understand who was working on a specific feature and whom to contact when there was a need or dependency. This also completely eliminated doing any redundant work.
  * We also maintained a slack channel to communicate on a daily basis. Any clarifications regarding frontend and backend communication, rest api endpoints, request-response parameter details and much more was shared with each other on the channel regularly.

- **Feedback**

  * Feedback also played a very important role during the project development and testing phase. 
  * During the development phase we always pushed our changes to a branch and created pull requests. Once the code was approved by another team member, we pushed the changes to the master branch. We made sure the code changes on the master branch was always stable and did not break the other team member’s code.
  * During the testing phase, we gave feedback to each other by testing the features developed by team members. This helped in identifying the bugs.
  * The constant feedback helped to identify the unknowns and scenarios or features missed during the initial phase of the project. That helped us to make better assumptions and collective decisions.

- **Respect**
  * Throughout the project, all the team members were respectful of each other’s time, availability and the deliverables deadline.
  * The team was respectful of each other's suggestion in choosing the tools and technologies. Based on the individual's skills and comfort level, the team was accommodative to agree upon the framework utilized and programming languages. Nevertheless, all the team members were enthusiastic to learn and incorporate new software skills.
  * The suggestions about the CQRS architecture, usage of the Algolia database was well accepted and successfully implemented.

- **Simplicity**

  * At every step of our project we always evaluated the primary goals to be accomplished inorder to stay focused on what was required in the MVP.
  * We always had a segregation of “must haves” and “if possible”. 
  * We tried to reduce complexity while designing the database, api endpoints and the UI as well.
  * The backend code and database was deployed on Heroku to simply the tasks of other team members. We maintained multiple environments such as staging and production to separate development and production data. CI/CD was set up to ensure all the changes were available on Heroku server as soon as the changes were pushed to master. This enabled the frontend to be directly connected to the backend and database without replicating it in the local.
  * Similarly, the frontend code was always available on another Heroku app, which enabled all the team members to test each other’s code without replicating all the changes in the local. This reduced the efforts involved in constantly taking an update of the changes in local.

## Scrum Dashboard
<p align="center">
<img width="1500" src="https://user-images.githubusercontent.com/56493886/101140019-3a6e4000-35c7-11eb-9a3c-f8e0326883dd.PNG">
</p>
## Individual Contribution

- Our team work division has two categories, Frontend and Backend application development

- Frontend Application design, implementation and deployments - Aditya Shah and Prashanth Narshima

- Backend Application design, implementation and deployments  - Deepthi Jallepalli and Prerana Shekar
<p align="center">
	<img width="650" src="https://user-images.githubusercontent.com/55044852/101270624-8e943400-372f-11eb-9ed9-5a42c5435779.png">
</p>
## Task Sheet 
<p align="center">
	<img width="1500" src="https://user-images.githubusercontent.com/56493886/101270923-c9e43200-3732-11eb-8d1b-abf450d668bb.PNG">
</p>
## Burndown Chart
<p align="center">
	<img width="1500" src="https://user-images.githubusercontent.com/56493886/101270922-c94b9b80-3732-11eb-80d4-b189207a5583.PNG">
</p>

## Heroku Screenshots
<p align="center">
	<img width="750" src="https://user-images.githubusercontent.com/55044852/101271093-bfc33300-3734-11eb-86fa-7ba022893be1.png">
	<img width="750" src="https://user-images.githubusercontent.com/55044852/101271098-c5207d80-3734-11eb-9265-508d98d0c4e5.png">
	<img width="750" src="https://user-images.githubusercontent.com/55044852/101271103-cc478b80-3734-11eb-807f-694450311910.png">
	<img width="750" src="https://user-images.githubusercontent.com/55044852/101271106-d4073000-3734-11eb-8003-1ef179d37e0a.png">
	<img width="750" src="https://user-images.githubusercontent.com/55044852/101271109-d9fd1100-3734-11eb-913a-5281a2a88f01.png">
</p>

## Algoli Screenshots
<p align="center">
  <img width="650" src="https://user-images.githubusercontent.com/55044852/101270776-44ac4d80-3731-11eb-8df8-78c8cf049107.png">
  <img width="650" src="https://user-images.githubusercontent.com/55044852/101270779-47a73e00-3731-11eb-9d60-1d577ca02b54.png">
</p>

## AWS S3 Image Upload
<p align="center">
  <img width="650" src="https://user-images.githubusercontent.com/55044852/101270714-9d2f1b00-3730-11eb-8b0b-5016dcc2d518.png">
  <img width="650" src="https://user-images.githubusercontent.com/55044852/101270713-9bfdee00-3730-11eb-8bb2-709e725d0fac.png">
</p>

## Delivered APIs and Sample Postman requests and responses
<p align="center">
	<img width="750" src="https://user-images.githubusercontent.com/55044852/101271022-f9e00500-3733-11eb-8f41-8b4945afa870.png">
	<img width="750" src="https://user-images.githubusercontent.com/55044852/101271024-fb113200-3733-11eb-8526-b862211d9440.png">
	<img width="750" src="https://user-images.githubusercontent.com/55044852/101271027-fcdaf580-3733-11eb-8673-bfe5e60a55f2.png">
	<img width="750" src="https://user-images.githubusercontent.com/55044852/101271029-fe0c2280-3733-11eb-86f5-5925bf8af99b.png">
</p>

## Acknowldgement
