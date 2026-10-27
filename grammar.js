// Grammar practice panel.
function setGTopic(btn, topic) {
  activatePills(document.getElementById('grammar-topic-pills'), btn);
  S.grammarTopic = topic; S.grammarDone = []; S.grammarAnswered = false;
  hideFB('g-feedback');
  document.getElementById('g-question').textContent = 'Topic changed. Press "Next question".';
  document.getElementById('g-question').style.cssText = 'color:var(--mid);font-style:italic;font-size:14px';
  document.getElementById('g-choices').innerHTML = '';
  updateGrammarChip();
}
function getGrammarPool() {
  return S.grammarTopic === 'all' ? GRAMMAR : GRAMMAR.filter(q => q.topic === S.grammarTopic);
}
function nextGrammar() {
  S.grammarAnswered = false; hideFB('g-feedback');
  document.getElementById('g-choices').innerHTML = '';
  const pool = getGrammarPool();
  let unused = pool.filter(q => !S.grammarDone.includes(q.q));
  if (unused.length === 0) { S.grammarDone = []; unused = pool; }
  const q = pick(unused);
  S.grammarDone.push(q.q);
  const qEl = document.getElementById('g-question');
  qEl.textContent = q.q; qEl.style.cssText = '';
  const pct = Math.round((S.grammarDone.length / pool.length) * 100);
  document.getElementById('g-prog').style.width = pct + '%';
  const choicesEl = document.getElementById('g-choices');
  choicesEl.innerHTML = '';
  q.choices.forEach(c => {
    const letter = c.split(':')[0].trim();
    const btn = document.createElement('button');
    btn.className = 'c-btn';
    btn.innerHTML = `<span class="c-letter">${letter}</span><span>${c.substring(3)}</span>`;
    btn.dataset.letter = letter;
    btn.onclick = () => answerGrammar(btn, q.correct, q.exp);
    choicesEl.appendChild(btn);
  });
}
function answerGrammar(btn, correct, exp) {
  if (S.grammarAnswered) return;
  S.grammarAnswered = true; S.grammarTotal++;
  const isCorrect = btn.dataset.letter === correct;
  if (isCorrect) { btn.classList.add('correct'); S.grammarCorrect++; }
  else {
    btn.classList.add('wrong');
    document.querySelectorAll('#g-choices .c-btn').forEach(b => {
      if (b.dataset.letter === correct) b.classList.add('reveal');
    });
  }
  document.querySelectorAll('#g-choices .c-btn').forEach(b => b.disabled = true);
  showFB('g-feedback', isCorrect ? 'correct' : 'wrong', isCorrect ? '✓ Correct' : '✗ Incorrect', exp);
  updateStreak(isCorrect); updateGrammarChip(); saveProgress();
}
function updateGrammarChip() {
  const chip = document.getElementById('grammar-chip');
  chip.textContent = `${S.grammarCorrect} / ${S.grammarTotal}`;
  chip.className = 'chip' + (S.grammarTotal > 0 && S.grammarCorrect / S.grammarTotal >= 0.7 ? ' good' : '');
}
