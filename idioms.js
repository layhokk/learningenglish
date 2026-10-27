// Idioms panel (learn + quiz modes).
function setIdiomMode(btn, mode) {
  activatePills(btn.closest('.pill-row'), btn);
  S.idiomMode = mode;
  document.getElementById('idiom-learn-area').style.display = mode === 'learn' ? 'block' : 'none';
  document.getElementById('idiom-quiz-area').style.display = mode === 'quiz' ? 'block' : 'none';
  hideFB('iq-feedback');
  if (mode === 'quiz') nextIdiomQuiz();
}
function showIdiom(id) {
  document.getElementById('i-phrase').textContent = id.phrase;
  document.getElementById('i-meaning').textContent = '💡 ' + id.meaning;
  document.getElementById('i-example').textContent = id.example;
}
function nextIdiom() {
  if (S.idiomMode === 'learn') {
    if (S.idiomShuffled.length === 0 || S.idiomIndex >= S.idiomShuffled.length) {
      S.idiomShuffled = shuffle(IDIOMS); S.idiomIndex = 0;
    }
    showIdiom(S.idiomShuffled[S.idiomIndex++]);
    S.idiomDone++; S.idiomStat++;
    document.getElementById('idiom-chip').textContent = S.idiomDone + ' learned';
    saveProgress();
  } else { nextIdiomQuiz(); }
}
function nextIdiomQuiz() {
  hideFB('iq-feedback');
  const correct = pick(IDIOMS);
  document.getElementById('iq-phrase').textContent = correct.phrase;
  const wrongs = shuffle(IDIOMS.filter(i => i.phrase !== correct.phrase)).slice(0, 3);
  const allChoices = shuffle([correct, ...wrongs]);
  const choicesEl = document.getElementById('iq-choices');
  choicesEl.innerHTML = '';
  allChoices.forEach((c, i) => {
    const letters = ['A', 'B', 'C', 'D'];
    const btn = document.createElement('button');
    btn.className = 'c-btn';
    btn.innerHTML = `<span class="c-letter">${letters[i]}</span><span>${c.meaning}</span>`;
    btn.onclick = () => {
      const isCorrect = c.phrase === correct.phrase;
      btn.classList.add(isCorrect ? 'correct' : 'wrong');
      if (!isCorrect) choicesEl.querySelectorAll('.c-btn').forEach(b => {
        if (b.querySelector('span:last-child').textContent === correct.meaning) b.classList.add('reveal');
      });
      choicesEl.querySelectorAll('.c-btn').forEach(b => b.disabled = true);
      showFB('iq-feedback', isCorrect ? 'correct' : 'wrong', isCorrect ? '✓ Correct' : '✗ Incorrect',
        isCorrect ? correct.example : `"${correct.phrase}" means: ${correct.meaning}`);
      updateStreak(isCorrect); S.idiomStat++;
      saveProgress();
    };
    choicesEl.appendChild(btn);
  });
}
