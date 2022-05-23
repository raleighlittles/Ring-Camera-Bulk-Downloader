import {
  RingApi
} from 'ring-client-api'

import fs from "fs";
import https from "https";
import sleep from 'sleep';


let ringApi = new RingApi({
  // Replace with your refresh token

});


// Query all 'locations' for a ring account, and then get all cameras registered at each location
// Then, check each camera's events, and grab the URL associated with the video that was created for that event.
const locations = await ringApi.getLocations();

// Read in the configuration JSON file
let config = JSON.parse(fs.readFileSync("ring-config.json"))

for (var i = 0; i < locations.length; i++) {

  const cameraAtLocation = await locations[i].cameras;

  console.log(cameraAtLocation.length, " cameras found at current location");

  for (var j = 0; i < cameraAtLocation.length; j++) {

    const cameraName = cameraAtLocation[j].data.description;
    const cameraEvents = await cameraAtLocation[j].getEvents();

    console.log(cameraEvents.events.length, " events found for camera: ", cameraName);

    for (var k = 0; k < cameraEvents.events.length; k++) {

      const eventRecordingUrl = await camerasAtLocation[j].getRecordingUrl(cameraEvents.events[k].ding_id_str, true);

      // the event timestamp looks like: "2022-03-20T03:03:47Z"
      // you want to turn that into something that can be used in the filename.
      // final result should have the form 'YYYY-MM-DD__HHmmss'

      let eventTimestampArray = cameraEvents.events[k].created_at.split("T");

      const eventDateTimeString = eventTimestampArray[0].concat(eventTimestampArray[0].replaceAll(":", "").replace("Z", ""));

      // Download the video link, and save it with the timestamp and the camera name

      const videoFilename = "ring__".concat(cameraName, "__", cameraEvents.events[k].ding_id_str, "__", eventDateTimeString, ".mp4");

      const file = fs.createWriteStream("".concat(config['videos_directory'], "/", videoFilename));

      sleep.sleep(10);

      const request = https.get(eventRecordingUrl, function (response) {

        response.pipe(file);

        // after download completed close filestream
        file.on("finish", () => {
          file.close();
        });
      });
    }
  }
}