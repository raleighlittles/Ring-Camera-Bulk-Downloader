import { RingApi } from 'ring-client-api'

import fs from "fs";
import https from "https";


let ringApi = new RingApi({
       // Replace with your refresh token
       "refreshToken": "eyJhbGciOiJIUzUxMiIsImprdSI6Ii9vYXV0aC9pbnRlcm5hbC9qd2tzIiwia2lkIjoiYzEyODEwMGIiLCJ0eXAiOiJKV1QifQ.eyJpYXQiOjE2NTMxMTcyMDYsImlzcyI6IlJpbmdPYXV0aFNlcnZpY2UtcHJvZDp1cy1lYXN0LTE6M2M3ZjhlNGIiLCJyZWZyZXNoX2NpZCI6InJpbmdfb2ZmaWNpYWxfYW5kcm9pZCIsInJlZnJlc2hfc2NvcGVzIjpbImNsaWVudCJdLCJyZWZyZXNoX3VzZXJfaWQiOjcwNzU1NTU4LCJybmQiOiJULUo2bzNDWHpMU25jZyIsInNlc3Npb25faWQiOiIxOWIyMGU1NS03Yzk3LTQ1YzctOGM4Yy1mMTcwZjc3MmMxZjUiLCJ0eXBlIjoicmVmcmVzaC10b2tlbiJ9.2fVR3mHQNVV_EJG71cuGINwk7hkhFyGKs3GxT0fTWfNTtw2k_zAB-9czXfWbA-5YaELc7HXUpNsA8uirqfq-Mg"
     });

// Query all 'locations' for a ring account, and then get all cameras registered at the first location.
// This assumes your first location is the primary one.
// Then, check each camera's events, and grab the URL associated with the video that was created for that event.

const locations = await ringApi.getLocations();
const camerasAtPrimaryLocation = await locations[0].cameras;

// Read in the configuration JSON file
let config = JSON.parse(fs.readFileSync("ring-config.json"))


for (var i = 0; i < camerasAtPrimaryLocation.length; i++) {
  const cameraName = camerasAtPrimaryLocation[i].data.description;
  const cameraEvents = await camerasAtPrimaryLocation[i].getEvents();
  
  for (var j = 0; j < cameraEvents.events.length; j++) {
    const eventRecordingUrl = await camerasAtPrimaryLocation[i].getRecordingUrl(cameraEvents.events[j].ding_id_str, true);

    // console.log(cameraName, " detected motion at ",  cameraEvents.events[j].created_at, " - video url - ", eventRecordingUrl);

    // the event timestamp looks like: "2022-03-20T03:03:47Z"
    // you want to turn that into something that can be used in the filename.
    // final result should have the form 'YYYY-MM-DD__HHmmss'
  
    let eventTimestampArray = cameraEvents.events[j].created_at.split("T");

    const eventDateTimeString = eventTimestampArray[0].concat(eventTimestampArray[0].replaceAll(":", "").replace("Z", ""));
    
    // TODO: Download the video link, and save it with the timestamp and the camera name

    const videoFilename = "ring__".concat(cameraName, "__", eventDateTimeString, ".mp4");

    const file = fs.createWriteStream("".concat(config['videos_directory'], "/", videoFilename));
    const request = https.get(eventRecordingUrl, function(response) {
   response.pipe(file);

   // after download completed close filestream
   file.on("finish", () => {
       file.close();
       console.log("Download Completed");
     });
  });
  }
}
