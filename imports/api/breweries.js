import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

export const Breweries = new Mongo.Collection("Breweries");

if (Meteor.isServer) {
  Meteor.publish("Breweries", function rankingsToPublish() {
    return Breweries.find(
      {},
      {
        limit: 20,
        sort: {
          createdAt: -1
        }
      }
    );
  });
}

//Method to add to database, called by submit
Meteor.methods({
  "Breweries.add"(incomingData) {
    // Make sure the user is logged in before inserting a task
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }
    //add to collection
    Breweries.insert({
      createdAt: Date.now(),
      owner: Meteor.user().username
    });
  }
});
