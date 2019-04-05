import { Meteor } from "meteor/meteor";
import "../imports/api/breweries.js";
import { DDPRateLimiter } from "meteor/ddp-rate-limiter";
import { WebApp } from "meteor/webapp";

// Get list of all method names on Lists
const LISTS_METHODS = [
  "address.location",
  "breweries.autocomplete",
  "breweries.breweryID",
  "breweries.byCityState"
];

// Only allow 5 list operations per connection per second

if (Meteor.isServer) {
  DDPRateLimiter.addRule(
    {
      name(name) {
        return LISTS_METHODS.includes(name);
      },

      // Rate limit per connection ID
      connectionId() {
        return true;
      }
    },
    5,
    1000
  );
}
WebApp.addHtmlAttributeHook(() => ({ lang: "en" }));
Meteor.startup(() => {});
