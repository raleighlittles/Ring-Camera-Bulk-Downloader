# About / Context

This is a simple tool for downloading all saved videos from your [Ring cameras](https://en.wikipedia.org/wiki/Ring_(company)) system.

Ring's website only allows you to download one saved video at a time, there is no way to download multiple videos at a time.

# Setup/Usage

This tool relies on the [unofficial Ring API](https://github.com/dgreif/ring).

To first use this tool, you'll need to setup an access token for the API to access your account.

The steps on how to do so are documented on the API's wiki here: https://github.com/dgreif/ring/wiki/Refresh-Tokens#if-you-do-not-have-homebridge-ring-installed-globally

Once you have the refresh token configured, edit the `ring-config.json` file and set the output directory (where the videos are saved) to whatever you'd like. (Make sure the directory exists and its permissions are valid.)

Then install the API and this tool, using the package.json

To run the script itself, you can simply do:

```
$ node motion-capture-retrieval.js
```
