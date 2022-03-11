import { RingApi } from 'ring-client-api'

let ringApi = new RingApi({
       // Replace with your refresh token
       "refreshToken": "eyJhbGciOiJIUzUxMiIsImprdSI6Ii9vYXV0aC9pbnRlcm5hbC9qd2tzIiwia2lkIjoiYzEyODEwMGIiLCJ0eXAiOiJKV1QifQ.eyJpYXQiOjE2NDY5NDkwMjIsImlzcyI6IlJpbmdPYXV0aFNlcnZpY2UtcHJvZDp1cy1lYXN0LTE6M2Q3ZDcxOWYiLCJyZWZyZXNoX2NpZCI6InJpbmdfb2ZmaWNpYWxfYW5kcm9pZCIsInJlZnJlc2hfc2NvcGVzIjpbImNsaWVudCJdLCJyZWZyZXNoX3VzZXJfaWQiOjcwNzU1NTU4LCJybmQiOiJUTm5vQmMtNkNuS2dYZyIsInNlc3Npb25faWQiOiIzNGE1MjA5MS0yZTUwLTQxM2EtODJkNi00YzU2MzQxOTJjN2UiLCJ0eXBlIjoicmVmcmVzaC10b2tlbiJ9.7i7TGO2CXDVX3Ey8_bp3GhDup5R0_aquPW--VEs63yOU4Yp7mwEAn3MhthRvngUhAZFmhW6Jvx01gF4KTTpyUA"
     });

// Query all 'locations' for a ring account, and then get all cameras registered at the first location.
// This assumes your first location is the primary one.
// Then, check each camera's events, and grab the URL associated with the video that was created for that event.

const locations = await ringApi.getLocations();
const camerasAtPrimaryLocation = await locations[0].cameras;

for (var i = 0; i < camerasAtPrimaryLocation.length; i++) {
  const cameraEvents = await camerasAtPrimaryLocation[i].getEvents();
  
  for (var j = 0; j < cameraEvents.events.length; j++) {
    const eventRecordingUrl = await camerasAtPrimaryLocation[i].getRecordingUrl(cameraEvents.events[j].ding_id_str, true);
    console.log(eventRecordingUrl);
    
    // TODO: Download the video link, and then rsync
  }
}
