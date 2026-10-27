# Lingua — Learn English Free

A free, no-sign-up English learning site: grammar, vocabulary, idioms, spelling, speaking practice and progress tracking. Plain HTML/CSS/JS, no build step.

## Run locally
Open `index.html` in your browser, or run `python3 -m http.server` in this folder.

## Project structure
```
index.html            Page markup
css/
  base.css            Reset, colour tokens, body, footer
  layout.css          Nav, hero, panels, cards
  components.css      Buttons, choices, feedback, flip card, pills, stats
  speaking.css        Speaking coach styles
  modal.css           Floating button + request modal
  responsive.css      Mobile overrides (keep last)
js/
  data/               <- add new content here
    grammar.js        Grammar questions
    vocab.js          Vocabulary words
    idioms.js         Idioms
    spelling.js       Spelling words
  state.js            Shared state + helpers
  nav.js              Panel switching
  grammar.js · vocab.js · idioms.js · spelling.js
  speaking.js         Speech recognition + AI feedback
  progress.js         Progress panel
  modal.js            Request modal (mailto)
  main.js             Start-up
```

## Adding content
Open the matching file in `js/data/` and copy an existing line. No other changes needed.

## Publish with GitHub Pages
1. Push this folder to a GitHub repo.
2. Repo **Settings → Pages → Deploy from a branch → `main` / root**.
3. Your site appears at `https://<username>.github.io/<repo>/`.

## Speaking Coach note
`js/speaking.js` calls the Anthropic API directly. That works inside Claude, but on GitHub Pages the request will fail because there is no API key (and you must never put a key in front-end code). To make it work publicly, send the request through a small backend (Cloudflare Workers, Vercel, Netlify Functions) that holds the key, and change the `fetch` URL in `speaking.js` to point to it.
