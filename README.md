# Course Page

This prototype was developed using React, with Material UI for styling. It utilizes Json-Server for mocking the server and Tanstack React-Query for fetching data.

## Getting Started

To initialize:

1.  Install all dependencies by running `npm install`.
2.  Once installation is complete, start the application by running `npm start`.
3.  Open a new terminal and start the server by running `npm run server`.

## Expected Behavior

-   Clicking on one of the tiles will display the save course button, indicating whether the course has been previously saved or not. If saved, the button will display with a filled icon.
-   Action buttons remain disabled until the information is loaded.

## To-Do

-   Investigate saving behavior (there's currently a data parse error).