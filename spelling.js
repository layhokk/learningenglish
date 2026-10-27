// Spelling practice panel.
function setSpellDiff(btn, diff) {
  activatePills(document.getElementById('spell-diff-pills'), btn);
  S.spellDiff = diff; S.spellDone = []; nextSpelling();
}
function nextSpelling() {
  hideFB('spell-feedback');
  const input = document.getElementById('spell-input');
  input.value = ''; input.className = 'blank-input';
  input.disabled = false; input.focus();
  const pool = SPELLING[S.spellDiff];
  let unused = pool.filter(w => !S.spellDone.includes(w.word));
  if (unused.length === 0) { S.spellDone = []; unused = pool; }
  S.currentSpell = pick(unused);
  S.spellDone.push(S.currentSpell.word);
  document.getElementById('spell-hint').textContent = S.currentSpell.hint;
  document.getElementById('spell-hint').style.cssText = '';
}
function checkSpelling() {
  const input = document.getElementById('spell-input');
  const answer = input.value.trim().toLowerCase();
  if (!answer || !S.currentSpell) return;
  S.spellTotal++;
  const correct = answer === S.currentSpell.word.toLowerCase();
  if (correct) S.spellCorrect++;
  input.className = 'blank-input ' + (correct ? 'correct-input' : 'wrong-input');
  input.disabled = true;
  document.getElementById('spell-chip').textContent = `${S.spellCorrect} / ${S.spellTotal}`;
  showFB('spell-feedback', correct ? 'correct' : 'wrong',
    correct ? '✓ Correct!' : '✗ Incorrect',
    correct ? `"${S.currentSpell.word}" — well done!`
            : `The correct spelling is: <strong>${S.currentSpell.word}</strong>`);
  updateStreak(correct); saveProgress();
}
