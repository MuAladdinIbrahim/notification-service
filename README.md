# Notification-service
### Overview

this's a simple notification service which uses RabbitMQ to save messages until they're delievered to users. 
it deals with different types of notifications, personal ones which are sent to each user with custom texts or grouped ones
which are sent to bunch of users with happy news or discounts. 
this happens through various channels like SMS, Emails, notifications on smart devices and more.

this notification service has only one end point, it receives the data and take the responsibility from here.  

##### Install
```
git clone https://github.com/MuAladdinIbrahim/notification-service
cd notification-service
docker-compose up
```
##### Run unit tests
```
npm run test
npm run test:converage
```
##### Try the end point
```
POST http://localhost:3001/v1/notification/send
```
using **POST** http verb with request body looks like: 
```
{
    "receiversIds":["1","2","3"],
    "type":"Email",
    "title":"Congratulations!",
    "message":"congrats sir, you've been selected to perform a role in ..."
}
```
In fact, **title** is *optional*. And **type** must be one of *["Email", "SMS", "Push"]*.   
**receriversIds** is an array of users ids who waiting the **message**.    
At all, if you forgot those values, our end point is going to tell you what is required.

#### Request flow
- request comes to notification-service 
- first, validate the request. if there're any problem, response with it is sent.
- then, request is delivered to build Raw Notification object which is saved into "raw" queue.
- the "raw" queue exists for collecting all raw data to assert its persistance.
- An Organizer service starts consuming raw notifications from "raw" queue then,
- build Notification object according to *type* of raw one. then,
- send the builded Notification to be saved in another queue **for its type**.
- An Notifier service is consuming from the typed queues [SMS's queue, Email's queue, Push's queue].
- Notifier, receives data and dealing with various providers to send it according to its type.
 
![WhatsApp Image 2021-07-13 at 5 00 26 AM](https://user-images.githubusercontent.com/29785103/125383214-5f196a00-e397-11eb-9d9a-67fe9c32c5d3.jpeg)
