

// Ring API Setup section
import { RingApi } from 'ring-client-api'

const ringApi = new RingApi({
  refreshToken: 'token generated with ring-auth-cli.  See https://github.com/dgreif/ring/wiki/Refresh-Tokens',

  // The following are all optional. See below for details
  cameraStatusPollingSeconds: 20,
  cameraDingsPollingSeconds: 2,
  locationIds: ['488e4800-fcde-4493-969b-d1a06f683102', '4bbed7a7-06df-4f18-b3af-291c89854d60']
});

// API usage section. See: https://github.com/dgreif/ring/blob/master/examples/api-example.ts

/*

// This code assumes that there's only one location.

cameras = ringApi.getCameras()
camera = cameras[0]
 const eventsResponse = camera.getEvents({
    limit: 10,
    kind: 'ding',
    state: 'accepted',
    // olderThanId: previousEventsResponse.meta.pagination_key
    // favorites: true
  });

  console.log('Got events', eventsResponse.events[0])
  const eventsWithRecordings = eventsResponse.events.filter(
      (event) => event.recording_status === 'ready'
     )

    transcodedUrl = camera.getRecordingUrl(
      eventsWithRecordings[0].ding_id_str, // MUST use the ding_id_str, not ding_id
      {
        transcoded: true, // get transcoded version of the video.  false by default.  transcoded has ring log and timestamp
      }
    )

  console.log('Recording Transcoded URL', transcodedUrl)

  // Now upload the video to S3 ??


*/