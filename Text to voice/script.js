// Accessing values
const textarea = document.getElementById('text');
const voice_select = document.getElementById('voice-select');
const rateSelect = document.getElementById('rate-select');
const pitchSelect = document.getElementById('pitch-select');
const rateval = document.getElementById('rate-value');
const pitchval = document.getElementById('pitch-value');
let button = document.getElementById('btn');
let pause = document.getElementById('pause');
let resume = document.getElementById('resume');
let cancel = document.getElementById('cancel');

// Initialize speech API
const speechSynth = window.speechSynthesis;
let voices = [];

function populateVoiceList() {
    voices = speechSynth.getVoices();
    let voiceOptionsHTML = '';
    voices.forEach(voice => {
        voiceOptionsHTML += `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`;
    });
    voice_select.innerHTML = voiceOptionsHTML;
}

speechSynth.onvoiceschanged = function() {
    populateVoiceList();
};

function textToVoice() {
    if (textarea.value.trim() !== '') {
        const textToSpeak = new SpeechSynthesisUtterance(textarea.value);
        const selectedVoiceName = voice_select.value;
        const selectedVoice = voices.find(voice => voice.name === selectedVoiceName);
        
        if (selectedVoice) {
            textToSpeak.voice = selectedVoice;
        } else {
            console.error('Voice not found:', selectedVoiceName);
            return;
        }
        
        textToSpeak.rate = parseFloat(rateSelect.value);
        textToSpeak.pitch = parseFloat(pitchSelect.value);

        speechSynth.speak(textToSpeak);
    }
}

rateSelect.addEventListener('input', () => {
    rateval.textContent = parseFloat(rateSelect.value).toFixed(1);
});

pitchSelect.addEventListener('input', () => {
    pitchval.textContent = parseFloat(pitchSelect.value).toFixed(1);
});

button.addEventListener('click', e => {
    e.preventDefault();
    textToVoice();
});

pause.addEventListener('click', e => {
    e.preventDefault();
    speechSynth.pause();
});

resume.addEventListener('click', e => {
    e.preventDefault();
    speechSynth.resume();
});

cancel.addEventListener('click', e => {
    e.preventDefault();
    speechSynth.cancel();
});
