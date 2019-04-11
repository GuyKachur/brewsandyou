import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { HTTP } from "meteor/http";

export const Breweries = new Mongo.Collection("Breweries");
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

if (Meteor.isServer) {
  Meteor.publish("Breweries", function breweriesToPublish(brewID) {
    let data = Breweries.find({ id: brewID });
    //console.log("returning data", data);
    return data;
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
  "comments.update"(userComment) {
    if (Meteor.isServer) {
      // Make sure the user is logged in before inserting a task
      console.log("Adding usercomment");
      console.log(userComment);
      if (!this.userId) {
        throw new Meteor.Error("not-authorized");
      } else {
        //user is logged in, sending an updated list, ^^
        // console.log("new comments update:");
        // console.log(.comments);
        //Update the ranking with the new updated list
        Breweries.update(
          { _id: userComment._id },
          { $push: { comments: userComment.comment } }
        );
      }
    }
  }
});

// Meteor.methods({
//   "rating.update"(userRating) {
//     if (Meteor.isServer) {
//       // Make sure the user is logged in before inserting a task
//       console.log("Adding rating");
//       console.log(userRating);
//       if (!this.userId) {
//         throw new Meteor.Error("not-authorized");
//       } else {
//         //user is logged in adding rating
//         Breweries.update(
//           { _id: userRating._id },
//           { $push: { ratings: userRating.rating } }
//         );
//       }
//     }
//   }
// });

//user rating should be {user:. rating:}
Meteor.methods({
  "rating.addSimple"(userRating) {
    if (Meteor.isServer) {
      // Make sure the user is logged in before inserting a task
      console.log("Adding rating");
      console.log(userRating);
      if (!this.userId) {
        throw new Meteor.Error("not-authorized");
      } else {
        //user is logged in adding rating
        Breweries.update({ _id: userRating }, { $inc: { rating: 1 } });
        // Breweries.aggregate([
        //   {
        //     rating: {
        //       avgRating: { $avg: "$ratings" }
        //     }
        //   }
        // ]);
      }
    }
  }
});

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
        console.log("RESPONSEFROMGOOGLE", response.content);
        let fullJSON = JSON.parse(response.content);
        console.log("ADDRESSS LOCATION PARSE JSON", fullJSON);
        //console.log(fullJSON);
        return fullJSON.results[0].geometry.location;
      } catch (e) {
        console.log("address error" + e);
      }
    }
  }
});
//retruns location
function addressToLocaiton(streetAddress) {
  if (Meteor.isServer) {
    try {
      let params = { address: streetAddress, key: GOOGLE_API_KEY };
      let response = HTTP.call(
        "GET",
        "https://maps.googleapis.com/maps/api/geocode/json",
        { params: params }
      );
      console.log("RESPONSEFROMGOOGLE", response.content);
      let fullJSON = JSON.parse(response.content);
      console.log("ADDRESSS LOCATION PARSE JSON", fullJSON);
      //console.log(fullJSON);

      let res = fullJSON.results[0].geometry.location;

      let lati = parseFloat(res.lat);
      let longi = parseFloat(res.lng);

      console.log("LATILONGGOOGLE", lati, longi);
      return { lat: lati, lng: longi };
    } catch (e) {
      console.log("address error" + e);
    }
  }
}

function validateBrewery(breweryToBeValidated) {
  if (Meteor.isServer) {
    let invalidBrewery = {
      id: 99999999,
      name: "_Brewing",
      brewery_type: "unknown",
      street: "34800 Bob Wilson Dr",
      city: "San Diego",
      state: "CA",
      postal_code: "92134",
      country: "United States",
      longitude: "-117.1596557",
      latitude: "32.7078239",
      phone: "",
      website_url: "http://www.yesnoif.com",
      updated_at: "2018-08-23T23:26:25.248Z",
      tag_list: []
    };

    if (
      !breweryToBeValidated.street ||
      !breweryToBeValidated.city ||
      !breweryToBeValidated.state
    ) {
      return invalidBrewery;
    } else {
      //this brewery has a state city and

      if (!breweryToBeValidated.longitude || !breweryToBeValidated.latitude) {
        let address =
          breweryToBeValidated.street +
          "," +
          breweryToBeValidated.city +
          "," +
          breweryToBeValidated.state;
        let location = addressToLocaiton(address);
        breweryToBeValidated.locaiton = location;
        breweryToBeValidated.longitude = location.lng;
        breweryToBeValidated.latitude = location.lat;
      }
      breweryToBeValidated.longitude = parseFloat(
        breweryToBeValidated.longitude
      );
      breweryToBeValidated.latitude = parseFloat(breweryToBeValidated.latitude);
      return breweryToBeValidated;
    }
  }
}

function collateBrewery(brewery) {
  if (Meteor.isServer) {
    //// TODO: this is where we want to update the location to have latlng
    const databaseBrewery = Breweries.find({ id: brewery.id }).fetch();
    if (databaseBrewery.length === 0) {
      //brewery wasnt found in database, insert database
      let sanitizedBrewery = validateBrewery(brewery);
      Breweries.insert({
        createdAt: Date.now(),
        brewery: sanitizedBrewery,
        id: brewery.id,
        comments: [],
        rating: 0
      });
      let returnME = Breweries.find({ id: brewery.id }).fetch();
      return returnME[0];
    } else {
      //brewery was found, grab comments
      return databaseBrewery[0];
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
  "breweries.breweryID"(breweryID) {
    if (Meteor.isServer) {
      console.log("FROM BREWERY ID METHOD", breweryID);
      try {
        let response = HTTP.call(
          "GET",
          "https://api.openbrewerydb.org/breweries/" + breweryID
        );
        console.log("Returned this ONE brewery hopefully", response.content);
        //grab brewery from database, if not in database add to database w/location

        let returnBrewery = collateBrewery(JSON.parse(response.content));
        console.log("RETURNEDBREWERY", returnBrewery);
        return returnBrewery;
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
        );
        let resultList = [];
        console.log("RESPONSE" + response);

        console.log("DATA" + response.content);
        JSON.parse(response.content).map(brewery =>
          resultList.push(collateBrewery(brewery))
        );
        console.log(resultList);
        return resultList;
      } catch (e) {
        console.log("http request error log" + e);
      }
    }
  }
});
