import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { HTTP } from "meteor/http";

export const Breweries = new Mongo.Collection("Breweries");
const GOOGLE_API_KEY = "API_KEY";

if (Meteor.isServer) {
  Meteor.publish("Breweries", function breweriesToPublish() {
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
// Meteor.methods({
//   "breweries.add"(incomingData) {
//     // Make sure the user is logged in before inserting a task
//     if (!this.userId) {
//       throw new Meteor.Error("not-authorized");
//     }
//     //add to collection
//     Breweries.insert({
//       createdAt: Date.now(),
//       owner: Meteor.user().username
//     });
//   }
// });

Meteor.methods({
  "address.location"(streetAddress) {
    if (Meteor.isServer) {
      try {
        let params = { address: streetAddress, key: GOOGLE_API_KEY };
        let response = HTTP.call(
          "GET",
          "https://maps.googleapis.com/maps/api/geocode/json",
          { params: params }
        );
        //console.log(response.content);
        let fullJSON = JSON.parse(response.content);
        //  console.log("ADDRESSS LOCATION PARSE JSON");
        //console.log(fullJSON);
        return fullJSON.results[0].geometry.location;
      } catch (e) {
        console.log("address error" + e);
      }
    }
  }
});

// function getFromAPI(location) {
//   //gran from API with a location with latlong
//   //// TODO: options callback: called when request is completed
//   // HTTP.get(API_URL + location, options, callback)
//   //   .then(data => data.json())
//   //   .then(jsonData => this.setState({ breweries: jsonData.breweries }))
//   //   .catch(err => this.setState({ error: err }));
//
//   //we must take a location
//   HTTP.call(
//     "GET",
//     "https://api.openbrewerydb.org/breweries/autocomplete",
//     { params: params },
//     (error, result) => {
//       if (error) {
//         console.log("error in get: ", error);
//       } else {
//         return JSON.parse(result.content);
//       }
//     }
//   );
// }

function collateBrewery(brewery) {
  if (Meteor.isServer) {
    //// TODO: this is where we want to update the location to have latlng
    const databaseBrewery = Breweries.find({ id: brewery.id }).fetch();
    if (databaseBrewery.length === 0) {
      //brewery wasnt found in database, insert database
      Breweries.insert({
        createdAt: Date.now(),
        brewery: brewery,
        id: brewery.id,
        comments: [],
        rating: 0
      });
      return Breweries.find({ id: brewery.id }).fetch();
    } else {
      //brewery was found, grab comments
      return databaseBrewery;
    }
  }

  //take an incoming brewery, insert into database if it doesnt exist,
  //grab comments and rating if it does, and add to the brewery and return
}
// //// TODO: create method for comments, grab user
// Meteor.methods({
//   "breweries.get"(incomingData) {
//     // Make sure the user is logged in before inserting a task
//     if (!this.userId) {
//       throw new Meteor.Error("not-authorized");
//     }
//     let breweryArray = getFromAPI(incomingData.location);
//     let resultList = [];
//     breweryArray.map(element => {
//       resultList.push(collateBrewery(element));
//     });
//
//     return resultList;
//   }
// });

//returns a list of brewery names and id's
Meteor.methods({
  "breweries.autocomplete"(suggestionQuery) {
    if (Meteor.isServer) {
      try {
        const params = { query: suggestionQuery };
        let response = HTTP.call(
          "GET",
          "https://api.openbrewerydb.org/breweries/autocomplete",
          { params: params }
        );
        return JSON.parse(response.content);
      } catch (e) {
        console.log("autocomplete error" + e);
      }
    }
  }
});

//returns the brewery based on ID
Meteor.methods({
  "breweries.breweryID"(brewery) {
    if (Meteor.isServer) {
      // Make sure the user is logged in before inserting a task
      try {
        let response = HTTP.call(
          "GET",
          "https://api.openbrewerydb.org/breweries/",
          { params: brewery.id }
        );
        collateBrewery(JSON.parse(response.content));
      } catch (e) {
        console.log("breweryID error" + e);
      }
    }
  }
});

//this function should take an city and return the closest 20 breweries to the city
Meteor.methods({
  "breweries.byCityState"(incomingCity) {
    if (Meteor.isServer) {
      //we wamt tp return a list(bounded by location or number returned)
      try {
        let response = HTTP.call(
          "GET",
          "https://api.openbrewerydb.org/breweries",
          {
            params: { by_city: incomingCity.city, by_state: incomingCity.state }
          }
          // (error, result) => {
          //   if (error) {
          //     console.log("error in get: ", error);
          //   } else {
          //     console.log("CITY STATE FUNCTION");
          //     console.log(result);
          //     let resultList = [];
          //     JSON.parse(result.content).map(brewery =>
          //       resultList.push(collateBrewery(brewery))
          //     );
          //
          //     console.log(resultList);
          //     return resultList;
          //   }
          // }
        );
        let resultList = [];
        //console.log("RESPONSE" + response);

        //  console.log("DATA" + response.content);
        JSON.parse(response.content).map(brewery =>
          resultList.push(collateBrewery(brewery))
        );
        //console.log(resultList);
        return resultList;
      } catch (e) {
        console.log("http request error log" + e);
      }
    }
  }
});
