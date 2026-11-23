# NICE Cognigy Capstone Lab

A responsive, buildless landing page for the capstone project's Cognigy Webchat and English click-to-call experiences.

## Run locally

From this directory, run:

```powershell
python -m http.server 8080
```

Open http://localhost:8080. No package installation or build is needed. Deploy all five page assets (`index.html`, `styles.css`, `app.js`, `voice.html`, `voice.js`) together to any static HTTPS host.

## GitHub Pages

Site URL: https://lploc1711.github.io/lploc-capstone-uc1/

Publishing source: `main` branch, `/ (root)` directory. GitHub Pages publishes updates automatically after pushes to `main`. The `.nojekyll` file serves the static site without Jekyll processing.

Repository settings: https://github.com/lploc1711/lploc-capstone-uc1/settings/pages

## Widget integrations

- Chat uses the supplied endpoint in `app.js` and loads the official widget when the visitor chooses “Let’s chat”.
- English calling uses the supplied endpoint in `voice.js`. The official voice widget opens in an isolated frame within a dialog so its layout does not interfere with the page or chat.
- Closing the voice dialog unloads the frame and ends its media session. Microphone permission is managed by the browser and voice widget.
- Voice requires HTTPS or localhost and microphone access. Both integrations require an internet connection and working Cognigy endpoint configuration.

Official references: [Webchat API](https://github.com/Cognigy/Webchat/blob/main/docs/webchat-api.md), [Click-to-call widget](https://github.com/Cognigy/click-to-call-widget).

The project is a demonstration, not an official NICE or Cognigy website. The page uses system fonts and shows only two testing options: chat and English voice calling.
