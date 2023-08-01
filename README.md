# FoundVibes User Manual

## Introduction

FoundVibes is a web application that allows users to visualize and explore audio features of their top Spotify tracks. With FoundVibes, you can gain insights into the musical characteristics of your favorite songs and see how they shape your specific island.

Main Types of Files
-------------------

FoundVibes utilizes different files to handle various functionalities of the application. 

1. `script.js`: 
   This file contains the code responsible for handling the Spotify Web API functionalities. It is primarily responsible for fetching audio features of the user's top Spotify tracks. The API calls, authentication process, and data handling related to Spotify are all managed within this file.

2. `apps.js`: 
   This is the main code file for generating the 3D visualization of the island. It utilizes the Three.js library to create a 3D environment where the user can explore the audio features of their top tracks in an immersive way. The 3D models, animations, and interactions with the island are all defined and managed within this file.

3. `3.css`: 
   This CSS file contains styles and layout instructions for the visual elements of the application. It is responsible for the overall look and feel of the FoundVibes web app. Styling for buttons, background images, and other visual components are defined in this file.

4. Other Resource Files:
   Apart from the main JavaScript and CSS files, FoundVibes may include other resource files such as 3D models (.glb), images, and textures. These resources are used to create the visual representation of the island and add visual elements to the 3D scene.

5. `index.html`:
   This HTML file serves as the entry point to the FoundVibes web application. It provides the structure and layout for the user interface, loading the required JavaScript files and linking to the styles defined in `3.css`.

##Prerequisites
Before setting up FoundVibes, make sure you have the following prerequisites installed:

1. Node.js and npm: 
   Install Node.js and npm from the official website: https://nodejs.org
2. Spotify Account: 
   You will need a Spotify account to authenticate and access your top tracks' audio features.

## Getting Started

1. Download the FoundVibes file from [GitHub](https://github.com/your-username/foundvibes). Then, extract the file to your local drives. 

2. Create a Spotify Developer account by visiting https://developer.spotify.com and signing up.

3. Once you have created your Spotify Developer account, log in and go to the Dashboard.

4. Click on the "Create App" button and fill in the required details for your new app.

5. Set the Redirect URIs to the following:

	Redirect URI: http://localhost:5173
		      http://localhost:5173/callback
   These URIs are necessary for the authentication process to work properly with FoundVibes.

6. After creating the app, you will be provided with a Client ID and a Client Secret. Keep these credentials safe, as you will need them in the next step.

7. In the src/apps.js file, replace the placeholder YOUR_CLIENT_ID with your actual Spotify Client ID.

8. Save the changes to the src/apps.js file.

###Running FoundVibes

1. In the terminal or command prompt (ctrl+@), navigate to the project directory and start the local development server by running the following command:

	cd spotify-profile-demo 
	npm install
	Note: You only need to run this command once during the initial setup.

	To start the FoundVibes application, use the following command each time you want to run it:
	npm run dev

2. You will be redirected to the Spotify authentication page. Log in to your Spotify account and grant the necessary permissions to use FoundVibes.

3. Once authenticated, you will be able to explore the audio features of your top tracks in the immersive 3D environment.

##Troubleshooting##
If you encounter any issues during setup or while using FoundVibes, please check the following:

 • Make sure you have provided the correct Spotify Client ID in the src/script.js file.

 • Ensure that your Redirect URIs in the Spotify Developer Dashboard match the ones specified in the setup instructions.

 • If you encounter any errors or bugs, please report them on the GitHub repository. We appreciate your feedback and will be happy to assist you.

**Credits**
FoundVibes was developed by :

-MUHAMMAD IRFAN DANIAL BIN MOHAMAD NASIR
-篠原　丈生
-長田　美咲
-山崎　花梨

This apps is based on the Spotify Web API and the Three.js library.
