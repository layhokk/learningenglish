// Shared state + helper functions used by every feature.
const S = {
  grammarTopic: 'all', grammarDone: [], grammarCorrect: 0, grammarTotal: 0, grammarAnswered: false,
  vocabTopic: 'all', vocabSeen: [], vocabCount: 0, currentVocab: null, vocabFlipped: false,
  idiomMode: 'learn', idiomIndex: 0, idiomShuffled: [], idiomDone: 0,
  spellDiff: 'easy', spellDone: [], spellCorrect: 0, spellTotal: 0, currentSpell: null,
  streak: 0, totalQ: 0, totalCorrect: 0, vocabStat: 0, idiomStat: 0,
  speakAttempts: 0,
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function activatePills(container, btn) {
  container.querySelectorAll('button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}
function showFB(id, type, label, text) {
  const el = document.getElementById(id);
  el.className = 'feedback show ' + type;
  document.getElementById(id + '-label').textContent = label;
  document.getElementById(id + '-text').innerHTML = text;
}
function hideFB(id) { document.getElementById(id).className = 'feedback'; }

function updateStreak(correct) {
  S.totalQ++;
  if (correct) { S.streak++; S.totalCorrect++; }
  else S.streak = 0;
  document.getElementById('streak-badge').textContent = `🔥 ${S.streak} streak`;
}

function saveProgress() {
  localStorage.setItem('lingua_progress', JSON.stringify({
    totalQ: S.totalQ, totalCorrect: S.totalCorrect,
    streak: S.streak, vocabStat: S.vocabStat, idiomStat: S.idiomStat
  }));
}
function loadProgress() {
  try {
    const d = JSON.parse(localStorage.getItem('lingua_progress') || '{}');
    S.totalQ = d.totalQ || 0; S.totalCorrect = d.totalCorrect || 0;
    S.streak = d.streak || 0; S.vocabStat = d.vocabStat || 0; S.idiomStat = d.idiomStat || 0;
    document.getElementById('streak-badge').textContent = `🔥 ${S.streak} streak`;
  } catch {}
}
