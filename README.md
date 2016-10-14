![:LArk-logo](public/images/LArk_hp_readme.png "Logo")

#####Park Cheap. Park Safe.

---

LArk is a mobile-friendly web app that lets users create and share parking tips so that they can successfully navigate the parking restriction hell that is the city of Los Angeles.

|Table of Contents|
|-----------------|
|[1. Links](#links)|
|[2. How to Use](#howtouse)|
|[3. Approach](#approach)|
|[3. Technologies Used](#technologies)|
|[4. Issues and Fixes](#issues)|

Explanations of the technologies used (including outside APIs).
A couple paragraphs about the general approach you took.
Descriptions of any unsolved problems or major hurdles your team had to overcome.

## <a name="#links">Links</a>
[Deployed app on Heroku](https://lark-it.herokuapp.com/)  
[Trello board](https://trello.com/b/oiCva1SG/lark)  
[Presentation Deck](https://docs.google.com/presentation/d/1cm3IbdF91dOqQ9wGx6zPDaZvdOCa5C1XmH6DQeNSuXs/edit#slide=id.gd9c453428_0_16)

## <a name="#howtouse">Instructions</a>
Anyone can use the app to view parking tips for their area. For additional functionality, such as adding, editing, deleting, and flagging tips, the user must be logged in.

**Adding Tips:** Once the user has logged in, they will have access to the Add Tip button at the upper right hand corner. To add a tip, the user just needs to click the button, and then click on the street where they want to add a tip. They should complete the form and submit their tip. It's that easy! At least, hopefully the user will find it easy.

**Editing Tips:** If the user created the tip, they should have access to edit it. All they have to do is click on the location marker for the tip that they created, and they'll see a yellow Edit button at the bottom. Once they've clicked on that, they'll be able to change the details for that particular tip. Click submit to update!

**Deleting Tips:** The creator of the tip can also delete it. Again, the user clicks on the location marker, where they will also see a red Delete button right next to the Edit button. Hopefully they'll know what to do next to delete the tip.

**Flagging Tips:** In case there's a troll submitting bad data or there's an overly helpful illiterate/really nearsighted user who cannot read parking signs accurately, other users can flag the tip as inaccurate. Each user can only flag a particular tip once. Once that bad tip has reached a certain number of unique flags, that tip will no longer show up on the map.

## <a name="#approach">Our Approach</a>
**Starting:** In regards to working as a team, we all had things that we naturally wanted to do. We split up management duties: James managed the database because he prefers working with data, Sochin handled the Trello board because she was the first one to start putting the preliminary ERD together, Winnie managed the GitHub because she had been reading up on git commands, and Joseph was the project manager. We did not need much discussion on who should do what because we all had things we already wanted to do, and they were distinct from each other.

We took a mostly democratic approach to decision-making. If any one of us made a major 

## <a name="#technologies">Technologies Used</a>

* **Runtime environment:** Node.js  
* **Web App Framework:** Express  
* **Database:** MongoDB  
* **Authentication:** oAuth 2.0 using Passport  
* **Node package modules:** Mongoose, body-parser, dotenv, ejs, express-session, passport, socket.io  
* **Outside APIs**: Google Maps Javascript API
* **Languages:** HTML5, CSS3, Javascript  
* **Front-end Libraries:** jQuery, Handlebars  
* **Front-end Frameworks:** Bootstrap  


## <a name="#issues">Issues</a>

* Map centers everytime user adds tip
* Does not refresh after editing
* Can't edit parking hours
