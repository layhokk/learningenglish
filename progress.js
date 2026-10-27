// Progress panel.
const TIPS = [
  'Try the Spelling section on Hard for a real challenge!',
  'Learning 5 new vocabulary words a day leads to 1,825 words a year.',
  'Idioms make your English sound more natural and native-like.',
  'Try all grammar topics to build a complete foundation.',
  'Aim for a 7-day streak to build a solid study habit.',
  'Use the Speaking Coach daily to build fluency and confidence.',
];

function updateProgress() {
  document.getElementById('p-total').textContent = S.totalQ;
  document.getElementById('p-correct').textContent = S.totalCorrect;
  document.getElementById('p-streak').textContent = S.streak;
  document.getElementById('p-vocab').textContent = S.vocabStat;
  document.getElementById('p-idioms').textContent = S.idiomStat;
  document.getElementById('p-accuracy').textContent =
    S.totalQ > 0 ? Math.round((S.totalCorrect / S.totalQ) * 100) + '%' : '—';
  document.getElementById('p-tip').textContent = S.totalQ === 0
    ? 'Complete some exercises to see your progress here.'
    : pick(TIPS);
}

function resetProgress() {
  if (!confirm('Reset all progress? This cannot be undone.')) return;
  localStorage.removeItem('lingua_progress');
  Object.assign(S, {
    grammarCorrect: 0, grammarTotal: 0, streak: 0,
    totalQ: 0, totalCorrect: 0, vocabStat: 0, idiomStat: 0,
    vocabCount: 0, spellCorrect: 0, spellTotal: 0, idiomDone: 0, speakAttempts: 0
  });
  document.getElementById('streak-badge').textContent = '🔥 0 streak';
  document.getElementById('grammar-chip').textContent = '0 / 0';
  document.getElementById('vocab-count').textContent = '0 seen';
  document.getElementById('spell-chip').textContent = '0 / 0';
  document.getElementById('speak-chip').textContent = '0 attempts';
  updateProgress();
}
