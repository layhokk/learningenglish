// Speaking coach: browser speech recognition + AI grammar feedback.
// NOTE: the AI call below only works where the Anthropic API is reachable
// without a key (e.g. inside Claude artifacts). On GitHub Pages you need a
// small backend/proxy that holds your API key — see README.md.
(function initSpeaking() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    document.getElementById('speak-no-support').style.display = 'block';
    document.getElementById('speak-mic-btn').disabled = true;
    document.getElementById('speak-mic-btn').style.opacity = '0.4';
    return;
  }

  let recognition, isRecording = false, currentTranscript = '';

  function setupRecognition() {
    recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onresult = (e) => {
      let interim = '', final = '';
      for (let i = 0; i < e.results.length; i++) {
        if (e.results[i].isFinal) final += e.results[i][0].transcript;
        else interim += e.results[i][0].transcript;
      }
      currentTranscript = (final || interim).trim();
      const el = document.getElementById('speak-transcript');
      el.textContent = currentTranscript || 'Listening…';
      el.className = currentTranscript ? 'speak-transcript has-text' : 'speak-transcript';
    };

    recognition.onend = () => {
      setRecording(false);
      if (currentTranscript) correctGrammar(currentTranscript);
    };

    recognition.onerror = (e) => {
      setRecording(false);
      if (e.error !== 'no-speech') {
        const card = document.getElementById('speak-result-card');
        const body = document.getElementById('speak-result-body');
        card.style.display = 'block';
        body.className = 'ai-result-body loading';
        body.textContent = 'Microphone error: ' + e.error + '. Please allow microphone access.';
      }
    };
  }

  function setRecording(on) {
    isRecording = on;
    const btn = document.getElementById('speak-mic-btn');
    btn.classList.toggle('recording', on);
    document.getElementById('speak-mic-icon').textContent = on ? '⏹️' : '🎙️';
    document.getElementById('speak-mic-label').textContent = on ? 'Listening… tap to stop' : 'Tap to speak';
    btn.setAttribute('aria-label', on ? 'Stop recording' : 'Start recording');
  }

  window.toggleSpeaking = function () {
    if (isRecording) {
      recognition.stop();
    } else {
      currentTranscript = '';
      document.getElementById('speak-result-card').style.display = 'none';
      const transcriptEl = document.getElementById('speak-transcript');
      transcriptEl.style.display = 'block';
      document.getElementById('speak-transcript-lbl').style.display = 'block';
      transcriptEl.textContent = 'Listening…';
      transcriptEl.className = 'speak-transcript';
      setupRecognition();
      recognition.start();
      setRecording(true);
    }
  };

  async function correctGrammar(text) {
    const card = document.getElementById('speak-result-card');
    const body = document.getElementById('speak-result-body');
    const tag = document.getElementById('speak-status-tag');
    card.style.display = 'block';
    body.className = 'ai-result-body loading';
    body.innerHTML = '<span class="speak-spinner"></span> Checking your grammar…';
    tag.className = 'ai-status-tag';
    tag.textContent = 'Checking…';

    S.speakAttempts++;
    document.getElementById('speak-chip').textContent =
      S.speakAttempts + ' attempt' + (S.speakAttempts !== 1 ? 's' : '');

    const prompt = `You are a warm, encouraging English grammar coach inside a learning website called Lingua.

The student just said: "${text}"

Your task:
1. Check for grammar, vocabulary, or sentence structure mistakes.
2. If the sentence is perfect, say so warmly and briefly explain one thing they did well (1 sentence).
3. If there are mistakes, give the corrected version first, then explain each correction clearly and simply (1–2 sentences each).
4. End with one short, memorable tip they can apply next time.
5. Write in plain conversational prose — no bullet points, no markdown, no headers.
6. Keep the total response under 100 words.`;

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          messages: [{ role: 'user', content: prompt }]
        })
      });
      const data = await res.json();
      const reply = data.content?.find(b => b.type === 'text')?.text || 'No response received.';
      const isPerfect = /perfect|correct|well done|no mistake|no error|great job|excellent/i.test(reply);

      body.className = 'ai-result-body';
      body.textContent = reply;
      tag.className = 'ai-status-tag ' + (isPerfect ? 'perfect' : 'corrected');
      tag.textContent = isPerfect ? '✓ Perfect' : '✎ Corrected';

      addSpeakHistory(text, reply, isPerfect);
    } catch (err) {
      body.className = 'ai-result-body loading';
      body.textContent = 'Something went wrong. Please try again.';
      tag.textContent = 'Error';
    }
  }

  function addSpeakHistory(original, feedback, isPerfect) {
    document.getElementById('speak-history-section').style.display = 'block';
    const list = document.getElementById('speak-history-list');
    const item = document.createElement('div');
    item.className = 'speak-history-item';
    const tagClass = isPerfect ? 'perfect' : 'corrected';
    const tagText = isPerfect ? '✓ Perfect' : '✎ Corrected';
    item.innerHTML = `
      <span class="speak-history-tag ${tagClass}">${tagText}</span>
      <div class="speak-history-original">"${original}"</div>
      <div class="speak-history-feedback">${feedback}</div>
    `;
    list.insertBefore(item, list.firstChild);
  }
})();
