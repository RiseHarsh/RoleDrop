# RoleDrop 🎲

**RoleDrop** is a web-based secret role generator game inspired by Mafia/Among Us style games.  
It allows players to reveal their roles one by one, pass the device safely, and view the final list for admin verification.

---

## Features

- Fully responsive (mobile-first design)
- Dark mafia/game theme with glow accents
- 3D card flip animation for role reveal
- Blank pass screen for safe role passing
- Repeat game button
- Admin view with password protection (default: `7777`)
- Sound effects for buttons, reveal, transitions
- Optional background music toggle
- Lightweight and Vercel-ready

---

## File Structure
roledrop/
├── index.html → Main HTML structure
├── style.css → Dark theme + animations
├── script.js → Game logic + reveal system
├── assets/
│ ├── sounds/ → All SFX and background music
│ └── img/ → Optional logo/images
├── README.md → This file
└── vercel.json → Vercel deployment config


---

## Usage

1. Open `index.html` in a browser or deploy to Vercel.
2. Enter total number of players.
3. Add roles with quantities.
4. Click **Generate Roles**.
5. Players reveal roles one by one:
   - Tap card to see role.
   - Press OK to pass to next player.
6. Admin can view the full list using password.

---

## Sound Credits

All sound effects are **royalty-free** from [Mixkit](https://mixkit.co/).

- Click sound: Mixkit UI Click  
- Card flip: Mixkit Whoosh/Transition  
- Reveal suspense: Mixkit Cinematic  
- Background music: Mixkit Free Music

**Note:** Ensure downloaded MP3 files are placed in `assets/sounds/` folder.

---

## Deployment on Vercel

1. Clone or push this repository to GitHub.
2. Login to [Vercel](https://vercel.com/).
3. Click **New Project → Import Git Repository**.
4. Select this repository.
5. Vercel will detect the project as **Static HTML** and deploy automatically.
6. Your live RoleDrop link will be generated (e.g., `https://your-project-name.vercel.app`).

---

## Admin Password

Default password to view all roles: `7777`  
Can be changed manually in `script.js` if desired.

---

## License

MIT License. Free to use, modify, and distribute.