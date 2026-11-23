const CHAT_ENDPOINT = 'https://cognigy-endpoint-jp1.nicecxone.com/37421c3d1ef59411963e08b19ea2231e1cbcecc71570a97c312d07d3ab0d906f';
const chatButtons = document.querySelectorAll('[data-chat]');
const chatStatus = document.querySelector('#chat-status');
let chatPromise;

function loadChat() {
  if (chatPromise) return chatPromise;
  chatPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    const timer = setTimeout(() => reject(new Error('Chat took too long to load. Please reload and try again.')), 25000);
    script.src = 'https://github.com/Cognigy/Webchat/releases/latest/download/webchat.js';
    script.onload = async () => {
      try {
        if (!window.initWebchat) throw new Error('Chat is unavailable. Please reload and try again.');
        const chat = await window.initWebchat(CHAT_ENDPOINT);
        clearTimeout(timer);
        resolve(chat);
      } catch (error) { clearTimeout(timer); reject(error); }
    };
    script.onerror = () => {
      clearTimeout(timer);
      reject(new Error('Unable to load chat. Check your connection, then reload to try again.'));
    };
    document.head.append(script);
  });
  return chatPromise;
}

chatButtons.forEach(button => button.addEventListener('click', async () => {
  chatButtons.forEach(item => { item.disabled = true; });
  chatStatus.classList.remove('error');
  chatStatus.textContent = 'Connecting to the chat assistant…';
  try {
    const chat = await loadChat();
    chat.open();
    chatStatus.textContent = 'Chat opened. Use the chat window to start your conversation.';
  } catch (error) {
    chatStatus.classList.add('error');
    chatStatus.textContent = error.message;
  } finally { chatButtons.forEach(item => { item.disabled = false; }); }
}));

const voiceDialog = document.querySelector('#voice-dialog');
const voiceFrame = document.querySelector('#voice-frame');
document.querySelector('#open-voice').addEventListener('click', () => {
  voiceDialog.showModal();
  voiceFrame.src = 'voice.html';
});
document.querySelector('#close-voice').addEventListener('click', () => voiceDialog.close());
// Removing the iframe tears down its media session, including when closed with Escape.
voiceDialog.addEventListener('close', () => voiceFrame.removeAttribute('src'));
