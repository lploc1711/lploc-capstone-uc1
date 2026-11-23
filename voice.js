const VOICE_ENDPOINT = 'https://cognigy-endpoint-jp1.nicecxone.com/ca0cff68ca493b2bb4f0a930335f8c8a7278d8cd5059a339ed5f10fb16da5db9';
const status = document.querySelector('#status');
function showError(message) {
  status.replaceChildren(document.createTextNode(message + ' '));
  status.hidden = false;
  const retry = document.createElement('button');
  retry.id = 'retry';
  retry.textContent = 'Try again';
  retry.addEventListener('click', () => location.reload());
  status.append(retry);
}
if (!window.isSecureContext) {
  showError('Voice calls need HTTPS or localhost. Open this page using a local server or secure hosting.');
} else if (!navigator.mediaDevices?.getUserMedia) {
  showError('Microphone access is unavailable. Please use a browser with microphone support.');
} else {
  const script = document.createElement('script');
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    showError('The voice assistant took too long to load. Check your connection and try again.');
  }, 25000);
  script.src = 'https://github.com/Cognigy/click-to-call-widget/releases/latest/download/webRTCWidget.js';
  script.onerror = () => {
    clearTimeout(timer);
    showError('Unable to load the voice assistant. Check your connection and try again.');
  };
  script.onload = async () => {
    try {
      if (timedOut) return;
      if (!window.initWebRTCWidget) throw new Error('Voice initialization is unavailable.');
      await window.initWebRTCWidget(VOICE_ENDPOINT);
      if (timedOut) return;
      clearTimeout(timer);
      status.hidden = true;
    } catch {
      clearTimeout(timer);
      showError('Unable to connect to the voice assistant. Please try again.');
    }
  };
  document.head.append(script);
}
