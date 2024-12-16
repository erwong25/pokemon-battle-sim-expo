import { Account, Client } from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.eric.pokemon-battle-sim-expo",
  projectId: "675f4614001afe2119e4",
  databaseId: "675f47360000a1aca737",
  userCollectionId: "675f4a6f0026d0dee19d",
  partyCollectionId: "675f4787002e0e06c010",
  storage: "675f4ae7003276f178f4",
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);

// Register User
account.create(ID.unique(), "me@example.com", "password", "Jane Doe").then(
  function (response) {
    console.log(response);
  },
  function (error) {
    console.log(error);
  }
);
