# Localy
Welcome Localy. This is an app that aims at making consumers and shopkeepers closer, in an age in which consumers too often buy their goodies online, and have them sent home from the other side of the world. Localy allows a consumer to find out about shops in their area, by searching for very specific products. It also allows shopkeepers to advertise themselves and be more visible to their neighbours.
<img src="./client/sources/localymock.png" alt="Localy smartphone" />

## How to use it?
Fork this repo and clone it on your local machine. Once in the folder, run `npm install` on the root folder, and also on `/server` and `/client`.
Once that is done, you can initialize the server by using `nodemon index.js` on `/server`, if you have it installed. To initialize the client, run `npm start` from the `/client` folder.
Once that is done and you see the app on your browser, go to the inspector and adjust the view to mobile view. Being a proof of concept, this app has been developed by following a mobile only approach.

### Generating data
You are ready to populate the database. To do that, you will use the app to register a new user. It will be the only shopkeeper user the app will contain so far, since it’s empty by the time you start it. You will need to provide with a first name, a last name, an e-mail and a password. All info can be, of course, fake.

Once this is done, you should be able to see an empty shopkeeper profile. Go now to `/server` on your terminal, and run `npx sequelize-cli db:seed:all`. This command will run the file you find on `server/seeders`, and will populate the database with 6 fake flower shops in a Barcelona neighbourhood. They will be automatically associated to the shopkeeper user you created. Once that is done, you are good to go.
