This project revolves around building a full-stack app, using data from a self-built API to access and manipulate user information, and can be accessed at: https://mongodatabase-pnz0.onrender.com/. On top of this, to retrieve the 'trivia questions' that were implemented into this app, data was retrieved from 'Open Trivia Database' and can be accessed at: https://opentdb.com/api_config.php.


The app is a 2D RPG game with trivia elements. The user is able to create and log into their accounts, and will be able to move around in a map, whereby they can enter different areas in which they will be prompt with trivia questions for a certain topic. Additional features include a health system, whereby the user will 'lose' and will have to 'retry' the set of trivia questions if their health falls to 0, and will win if the 'enemy' health falls to 0. 

To fork and clone this repository, fork a copy of the original repository and copy the unique link to your dashboard, and run $git clone <link>.

To run this locally, ensure to install all the required packages and dependencies by running $npm i and then running $npm run dev to launch the app, or to access a hosted version of the app, please follow: https://trivimon.netlify.app (Note that there are currently some issues with hosting, and running locally with $npm run dev is required to play the game). Note: Node v22.5.1 will be required to run this repository.

Once the app is launched, the user will be directed to the login page, where the user will be able to log into their account or create one by clicking the 'Create an Account' button. Should the user need to create an account, they will be directed to the account creation page, where they will enter a username, password, and will also have to select an avatar, which defaults to the left option if not selected. After doing this, the user will be able to press the 'Create Account' button, and will be redirected to the login page. In the login page, the user will need to enter their username and password, whereby they can then click 'Login' and will be redirected to the main game.

Once in the main game, the user will have the ability to move within the boundaries of the map. The map will consist of 6 buildings, representing a different category for trivia, and will be able to enter them. Once the user has 'collided' into the building, the scene will change. The user will be prompt with a screen consisting of several features: user health bar, enemy health bar, trivia questions, and trivia options. The user will be required to read the trivia question, and will also need to select the option they believe to be the answer to said question. After this, 2 events may take place, the user will lose a health point if they answer the user incorrectly, or the enemy will lose a health point if the answer is answered correctly.  Should the user lose, whereby their health points fall to 0, the scene will change back to the main game, outside of the building they had entered, and will be able to enter this building again in order to complete the challenge again. However, the user has only 1 winning condition; make the enemy health points fall to 0. Should the user win, the scene will change back to the main game, outside of the building they had entered, and will no longer be able to enter this building again. After winning, the user will earn a 'badge' to mark the completion of this set of trivia questions. On top of this, the user will be able to save the game by pressing the save button, symbolised by a 'floppy disc', allowing the user to save their progress. 

The user has 1 completion condition: complete the final 'boss' area located at the top right of the map, which is inaccessible until 1 condition is met: all 6 'badges' have been acquired. The 'boss' will be completed in the same manner as the other challenges, however the user will need to answer more questions correctly. Once again, if the user fails to win, they will change scenes and will be able to try again, however if the user wins, they would have completed the game, whereby they will see the 'game credits'.

Note: Movement controls will be performed with the arrow keys, where left arrow is left, right arrow is right, up arrow is up, and down arrow is down. The user will need to use their mouse to click on the trivia options to answer them. 

Contributors:
Israel Grande Fernandez: isramueka
Jason Duc Minh La: JasonDMLa
James Ji Jian Lau: JamesLau2001
Nattal Zemichael: NattalZ30

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/).
