# Lingua — AI-Powered English Learning

An interactive English learning website for adult learners, powered by the Claude AI API.

## Features

- **Grammar Practice** — Multiple-choice questions on tenses, articles, prepositions, conditionals, and modal verbs. Supports CEFR levels B1, B2, and C1.
- **Vocabulary Builder** — Flip cards with definitions and example sentences. Write a sentence using the word and get instant AI feedback.
- **Writing Practice** — AI-generated prompts across email, essay, story, and description formats, with structured feedback on task achievement, grammar, structure, and one key improvement.
- **Reading Comprehension** — Short passages on science, culture, technology, and history, followed by multiple-choice questions.

## Setup

### 1. Get a Claude API Key

Sign up at [console.anthropic.com](https://console.anthropic.com) and create an API key.

### 2. Add your API key

Open `index.html` and find this line near the top of the `<script>` section:

```js
const ANTHROPIC_API_KEY = "YOUR_API_KEY_HERE";
```

Replace `YOUR_API_KEY_HERE` with your actual key.

> ⚠️ **Important:** Do not commit your API key to a public repository. For a production deployment, proxy API calls through a backend server so your key stays secret.

### 3. Run locally

Since it's a single HTML file, just open it in your browser:

```bash
open index.html
# or double-click the file in your file explorer
```

No build step or dependencies required.

### 4. Deploy to GitHub Pages

1. Push the repo to GitHub
2. Go to **Settings → Pages**
3. Set source to `main` branch, `/ (root)`
4. Your site will be live at `https://yourusername.github.io/your-repo-name`

## File Structure

```
/
├── index.html   ← entire app (HTML + CSS + JS in one file)
└── README.md
```

## Tech Stack

- Vanilla HTML, CSS, JavaScript — no frameworks, no build tools
- [Claude API](https://docs.anthropic.com) (`claude-sonnet-4-6`) for all AI features
- Google Fonts: Instrument Serif, Inter, JetBrains Mono

## Customisation

| What to change | Where to find it |
|---|---|
| Site name / branding | `.logo` in the HTML, `<title>` tag |
| Colour palette | `:root` CSS variables at the top of `<style>` |
| Grammar topics | `.topic-pill` buttons in the Grammar panel |
| CEFR levels | `.level-pill` buttons and `selectLevel()` calls |
| AI model | `model:` field inside `callClaude()` |

## License

MIT — free to use, modify, and distribute.
