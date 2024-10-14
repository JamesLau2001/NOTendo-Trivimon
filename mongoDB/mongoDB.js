import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://jameslau21:Cv8qPu722MJjBJb3@first-test-cluster.iz6no.mongodb.net/?retryWrites=true&w=majority&appName=First-Test-Cluster";

const client = new MongoClient(uri);

export const findUser = (username, password) => {
  return client
    .connect()
    .then(() => {
      const database = client.db("users_test");
      const users = database.collection("users");

      const filter = { username, password };
      return users.findOne(filter);
    })
    .catch((error) => {})
    .finally(() => {
      client.close();
    });
};

export const createUser = (username, password) => {
  return client
    .connect()
    .then(() => {
      const database = client.db("users_test");
      const users = database.collection("users");

      const user = {
        username,
        password,
        saveData: {
          animalsCompleted: false,
          historyCompleted: false,
          musicCompleted: false,
          scienceCompleted: false,
          sportsCompleted: false,
          videoGamesCompleted: false,
        },
      };

      return users.insertOne(user);
    })
    .catch((error) => {})
    .finally(() => {
      client.close();
    });
};

export const updateUser = (username, saveDataStates) => {
  const {
    animalsCompleted,
    historyCompleted,
    musicCompleted,
    scienceCompleted,
    sportsCompleted,
    videoGamesCompleted,
  } = saveDataStates;

  return client
    .connect()
    .then(() => {
      const database = client.db("users_test");
      const users = database.collection("users");

      const filter = { username };
      const updateDoc = {
        $set: {
          saveData: {
            animalsCompleted,
            historyCompleted,
            musicCompleted,
            scienceCompleted,
            sportsCompleted,
            videoGamesCompleted,
          },
        },
      };

      return users.updateOne(filter, updateDoc);
    })
    .catch((error) => {})
    .finally(() => {
      client.close();
    });
};
