![:LArk-logo](public/images/LArk_hp_readme.png "Logo")

####Park Cheap. Park Safe.

---

LArk is a responsive, mobile-friendly web app that lets users create and share parking tips so that they can successfully navigate the parking restriction hell that is the city of Los Angeles.

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
[Deployed app hosted on Heroku](https://lark-it.herokuapp.com/)  
[Trello board](https://trello.com/b/oiCva1SG/lark)  
[Presentation Deck](https://docs.google.com/presentation/d/1cm3IbdF91dOqQ9wGx6zPDaZvdOCa5C1XmH6DQeNSuXs/edit#slide=id.gd9c453428_0_16)

## <a name="#howtouse">Instructions</a>
Anyone can use the app to view parking tips for their area. Each tip is represented by a location marker, which is placed at a point where parking is available. Tips include useful information about each parking location, such as whether or not the available space is street parking, at an outdoor lot, or at an indoor lot; what days and hours legal parking is available there; whether or not a permit is required to park there; the cost for parking there; and the maximum amount of time a vehicle can be parked there. Tips also include user comments about the parking location that others might find useful, such as the crime rate in area, or if there are ant hills near that spot, or if homeless people have tents set up there at night.

For additional functionality, such as adding, editing, deleting, and flagging tips, the user must be logged in.

**Adding Tips:** Once the user has logged in, they will have access to the Add Tip button at the upper right hand corner. To add a tip, the user just needs to click that button, and then click on the location where they want to add a tip. This places a location marker at that spot and creates a form they should complete with all of the necessary information about that spot. They click the Submit button to create their tip. It's that easy! At least, the user will hopefully find it easy.

**Editing Tips:** If the user created the tip, they should have access to edit it. All they have to do is click on the location marker for the tip that they created, and they'll see a yellow Edit button at the bottom. Once they've clicked on that, they'll be able to change the details for that particular tip. Click submit to update!

**Deleting Tips:** The creator of the tip can also delete it. Again, the user clicks on the location marker, where they will also see a red Delete button right next to the Edit button. Hopefully they'll know what to do next to delete the tip.

**Flagging Tips:** In case there's a troll submitting bad data or there's an overly helpful illiterate/really nearsighted user who cannot read parking signs accurately, other users who see the bad tip can flag the tip as inaccurate. Each user can only flag a particular tip once. Once that bad tip has reached a certain number of unique flags, that tip will no longer show up on the map.

## <a name="#approach">Our Approach</a>
**Starting:** In regards to working as a team, we all had things that we naturally wanted to do. We split up management duties: James managed the database, Sochin handled the Trello board, Winnie managed the GitHub repo, and Joseph was the project manager. We did not need much discussion on who should do what because we each already had distinct things we wanted to do.

We took a mostly democratic approach to decision-making. If any one of us made a major change, we would consult other members and ask first if it was alright with the group. The ones who were listening would respond with some sort of response, and the person asking would usually act according to that response or at least take that response into serious consideration. It helped that we're all pretty laidback and were alright with almost every change that occurred throughout the project.

One drawback to this might have been that we were a little too laidback, and this led to an app with mixed methodologies. Our data retrieval/read is done through sockets, but we're creating and updating through AJAX calls. We use Handlebars templating for one form and EJS for another. Instead of one person having a coherent vision and imposing that vision upon a bunch of worker bees, we all just had things we wanted to work on for that day, and we all had an idea of how we wanted to do that particular thing without thinking about how everybody else was doing their own particular thing. 

This isn't to say that we worked together poorly as a team -- sometimes we would build upon what the other person was doing, and if someone didn't have anything they wanted to work on for that day, we would sometimes say, "Hey, do you want to work on this? It needs to get done."  It's just that it's pretty apparent from looking at the code that this was done by disparate people. However, this is the first time we're using most of these tools to build something meaningful, and this was our first group project. I think it's understandable that nobody had a coherent vision about how this should be done, and I think what we managed to do together in less than a week is pretty remarkable.

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

* Map centers every time user adds tip
* Have to reload to see the information for tip that was just created
* Does not refresh after editing
* Can't edit parking hours
* Display for hours is a little strange
