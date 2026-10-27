// Vocabulary builder panel.
function setVTopic(btn, topic) {
  activatePills(document.getElementById('vocab-topic-pills'), btn);
  S.vocabTopic = topic; S.vocabSeen = [];
}
function getVocabPool() {
  return S.vocabTopic === 'all' ? VOCAB : VOCAB.filter(v => v.topic === S.vocabTopic);
}
function nextVocab() {
  hideFB('v-feedback');
  document.getElementById('v-card').classList.remove('flipped');
  document.getElementById('v-quiz-area').style.display = 'none';
  document.getElementById('v-quiz-btn').style.display = 'none';
  S.vocabFlipped = false;
  const pool = getVocabPool();
  let unused = pool.filter(v => !S.vocabSeen.includes(v.word));
  if (unused.length === 0) { S.vocabSeen = []; unused = pool; }
  const v = pick(unused);
  S.vocabSeen.push(v.word); S.currentVocab = v; S.vocabStat++;
  document.getElementById('v-word').textContent = v.word;
  document.getElementById('v-pos').textContent = v.pos;
  document.getElementById('v-def').textContent = v.def;
  document.getElementById('v-ex').textContent = '"' + v.ex + '"';
  S.vocabCount++;
  document.getElementById('vocab-count').textContent = S.vocabCount + ' seen';
  document.getElementById('v-quiz-btn').style.display = 'inline-flex';
  saveProgress();
}
function flipVocab() {
  if (!S.currentVocab) return;
  S.vocabFlipped = !S.vocabFlipped;
  document.getElementById('v-card').classList.toggle('flipped', S.vocabFlipped);
}
function quizVocab() {
  if (!S.currentVocab) return;
  const v = S.currentVocab;
  document.getElementById('v-quiz-area').style.display = 'block';
  hideFB('v-feedback');
  const pool = VOCAB.filter(x => x.word !== v.word);
  const wrongs = shuffle(pool).slice(0, 3).map(w => w.ex.replace(w.word, v.word));
  const allChoices = shuffle([v.ex, ...wrongs]);
  const choicesEl = document.getElementById('v-quiz-choices');
  choicesEl.innerHTML = '';
  allChoices.forEach((c, i) => {
    const letters = ['A', 'B', 'C', 'D'];
    const btn = document.createElement('button');
    btn.className = 'c-btn';
    btn.innerHTML = `<span class="c-letter">${letters[i]}</span><span>${c}</span>`;
    btn.onclick = () => {
      const correct = c === v.ex;
      btn.classList.add(correct ? 'correct' : 'wrong');
      if (!correct) choicesEl.querySelectorAll('.c-btn').forEach(b => {
        if (b.querySelector('span:last-child').textContent === v.ex) b.classList.add('reveal');
      });
      choicesEl.querySelectorAll('.c-btn').forEach(b => b.disabled = true);
      showFB('v-feedback', correct ? 'correct' : 'wrong', correct ? '✓ Correct' : '✗ Incorrect',
        correct ? `"${v.word}" is used correctly in that sentence.` : `The correct use is: "${v.ex}"`);
      updateStreak(correct); saveProgress();
    };
    choicesEl.appendChild(btn);
  });
}
