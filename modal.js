// "Send a request" floating button + modal (opens the user's email app).
const OWNER_EMAIL = 'layhok.houn@email.com';
let selectedSubject = 'New Vocabulary Request';

const PLACEHOLDERS = {
  'New Vocabulary Request': 'e.g. Please add the word "persevere" — it means to continue despite difficulty.',
  'New Grammar Question': 'e.g. Please add more questions about the present perfect tense.',
  'New Idiom Suggestion': 'e.g. Please add "kick the bucket" — it means to die.',
  'Bug Report': 'e.g. In the Spelling section, the word "accommodate" shows wrong feedback.',
  'Feature Idea': 'e.g. It would be great to have a pronunciation guide for each word.',
  'General Feedback': 'Write your message here…',
};

function openModal() {
  document.getElementById('modal-overlay').classList.add('open');
  document.getElementById('modal-form-view').style.display = 'block';
  document.getElementById('modal-success-view').classList.remove('show');
  document.getElementById('req-message').value = '';
  document.getElementById('req-message').focus();
  document.querySelectorAll('.req-type').forEach(b => b.classList.remove('selected'));
  document.querySelector('.req-type').classList.add('selected');
  selectedSubject = document.querySelector('.req-type').dataset.subject;
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}
function handleOverlayClick(e) {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
}
function selectType(btn) {
  document.querySelectorAll('.req-type').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  selectedSubject = btn.dataset.subject;
  document.getElementById('req-message').placeholder = PLACEHOLDERS[selectedSubject] || 'Describe your request…';
}
function sendRequest() {
  const msgEl = document.getElementById('req-message');
  const message = msgEl.value.trim();
  if (!message) {
    msgEl.focus();
    msgEl.style.borderColor = 'var(--red)';
    setTimeout(() => msgEl.style.borderColor = '', 1500);
    return;
  }
  const subject = encodeURIComponent('[Lingua] ' + selectedSubject);
  const body = encodeURIComponent(
    selectedSubject + '\n' + '─'.repeat(30) + '\n\n' + message + '\n\n' +
    '─'.repeat(30) + '\nSent from Lingua English Learning'
  );
  window.location.href = `mailto:${OWNER_EMAIL}?subject=${subject}&body=${body}`;
  document.getElementById('modal-form-view').style.display = 'none';
  document.getElementById('modal-success-view').classList.add('show');
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
