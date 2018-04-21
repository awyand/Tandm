# Tandm

## Description
Tactical Network Device Manager (Tandm) is a mission-centric Mobile Device Management (MDM) portal. IT admins use Tandm to rapdily provision teams (military, police, intelligence, disaster relief, etc) with mobile devices tailored to their specific mission.

## Key Features
* Tandm missions are fully-customizable per device
* Mission configurations are saved to a database for future reuse
* Devices are visualized in real-time during customization
* Stretch: Device information from FonoAPI
* Stretch: Reports provide data and graphs for inventory, device configuration, and deployed status
* Stretch: map view for currently-deployed missions


## Value
### Background
* I am the Project Manager for a DARPA-funded project which includes designing an MDM for flashing devices with a custom OS tailored to specific missions
* Our MDM will likely not be finalized for months

### Goals
* Combine professional focus with final project
* Bring interesting ideas and designs to the table at work based on project experience

### What sets Tandm apart?
* Device visualization during customization
* Focus on small teams, not enterprise

## Technologies
### Front End
* React (rendering)
* Passport.js (authentication)
  * Authentication Credit: https://github.com/shouheiyamauchi/react-passport-example
* Chart.js (data visualization)
* Material-UI (UI/UX)

### Back End
* Node (server)
* Express (API)
* MongoDB (database)
* Mongoose (ODM)


### External APIs
* FonoAPI (mobile device info)
* Mapbox (mapping)

## Architecture
![Architecture Diagram](https://github.com/awyand/beautification-app/blob/master/readme-images/architecture-diagram.png)

## Data Flow
![Data Flow](https://github.com/awyand/beautification-app/blob/master/readme-images/architecture-diagram.png)

## Wireframe
![Login Page](https://github.com/awyand/beautification-app/blob/master/readme-images/architecture-diagram.png)
![Missions Screens](https://github.com/awyand/beautification-app/blob/master/readme-images/architecture-diagram.png)

## Scope
### MVP
* Functioning customization page with 2-3 preloaded devices to choose from
* Preloaded device information manually loaded into device database
* Clicking options updates device preview container (generic phone)
* Users can save mission to database
* Authenticated log on allows users to see their saved missions

### Polish
* Reports: graphs displaying data about missions (device type, OS, features)

### Stretch Goals
* New device types
  * Adding a new device make/model fetches information from FonoAPI
  * Data loaded into device database and made available to user

* Map
  * Users can define deployment location as part of mission set up
  * Deployment location is rendered on map tab

## Schedule
* Deliverable 2: MVP (28 April)
  * MVP goals achieved (see previous slide)
  * Basic styling / navigation in place
  * Stretch goals curated based on progress

* Deliverable 3: Project Polish (5 May)
  * Device preview container displayed based on device make
  * New device information pulled from FonoAPI
  * Polished style/UI/UX improvements
  * Incorporate stretch goals (map, reports)

* Deliverable 4: Presentation (12 May)
  * Help/Manual page added in-app
  * README finalized
  * Presentation slide completed
