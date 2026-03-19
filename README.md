# Zumba with Rocio 💃

Professional bilingual Zumba instructor website — static site ready for GitHub Pages.

## Features
- Bilingual (English / Spanish) toggle
- Licensed ZIN™ instructor badge
- 6 class types with descriptions
- Flexible schedule section
- 3-tier pricing / subscription plans
- Newsletter signup
- Contact form
- Responsive (mobile-first)
- Smooth scroll animations

## Setup

### GitHub Pages
1. Push to a GitHub repo
2. Go to **Settings → Pages**
3. Source: `main` branch, `/ (root)`
4. Your site will be live at `https://yourusername.github.io/repo-name`

### Local Preview
Open `index.html` directly in a browser — no build step needed.

## Customization
| Item | Where |
|------|-------|
| Instructor name | `index.html` — search `Rocio` |
| Phone number | `index.html` — search `208-550-2397` |
| Email | `index.html` — search `rocio@zumbawithrocio.com` |
| Location | `index.html` — search `Boise, Idaho` |
| Colors | `css/styles.css` — `:root` variables |
| Forms backend | `js/main.js` — replace `setTimeout` mock with Formspree/Netlify |

## Connect a Real Form Backend
Replace the `setTimeout` blocks in `js/main.js` with a real submission:

```js
// Example with Formspree (free tier available)
fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, message })
});
```

## License
MIT — free to use and modify.
