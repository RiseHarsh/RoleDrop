let roles = [];
let finalAssignment = [];
let currentPlayer = 0;
let currentRound = 1;
let isMuted = false; // global mute

// Elements
const roleListDiv = document.getElementById('roleList');
const roleText = document.getElementById('roleText');
const card = document.getElementById('roleCard');
const roundCounter = document.getElementById('roundCounter');
const clickSound = document.getElementById('clickSound');
const revealSound = document.getElementById('revealSound');
const transitionSound = document.getElementById('transitionSound');
const bgMusic = document.getElementById('bgMusic');
const musicToggleBtn = document.getElementById('musicToggleBtn');

// Play sound
function playSound(sound){
  if(isMuted) return;
  sound.currentTime = 0;
  sound.play();
}

// Update round counter
function updateRoundCounter(){
  roundCounter.innerText = `Round ${currentRound}`;
}

// Add role
document.getElementById('addRoleBtn').onclick = () => {
  const name = document.getElementById('roleName').value.trim();
  const qty = parseInt(document.getElementById('roleQty').value);
  if(!name || !qty){
    const inputField = !name ? document.getElementById('roleName') : document.getElementById('roleQty');
    inputField.classList.add('errorShake');
    setTimeout(()=> inputField.classList.remove('errorShake'), 500);
    return alert('Enter role name and quantity');
  }
  roles.push({name, qty});
  roleListDiv.innerHTML += `<p>${name} - ${qty}</p>`;
  document.getElementById('roleName').value = '';
  document.getElementById('roleQty').value = '';
  playSound(clickSound);
}

// Generate roles
document.getElementById('generateBtn').onclick = () => {
  const total = parseInt(document.getElementById('totalPlayers').value);
  let tempRoles = [];
  roles.forEach(r => {
    for(let i=0;i<r.qty;i++) tempRoles.push(r.name);
  });
  if(tempRoles.length !== total) return alert('Total roles quantity must match total players!');
  // Shuffle
  for(let i=tempRoles.length-1;i>0;i--){
    let j = Math.floor(Math.random()*(i+1));
    [tempRoles[i], tempRoles[j]] = [tempRoles[j], tempRoles[i]];
  }
  finalAssignment = tempRoles;
  currentPlayer = 0;
  currentRound = 1;
  updateRoundCounter();
  switchScreen('revealScreen');
  playSound(clickSound);
}

// Reveal logic
card.onclick = () => {
  card.classList.add('flip');
  roleText.innerText = finalAssignment[currentPlayer];
  playSound(revealSound);
}

// OK button → pass screen
document.getElementById('okBtn').onclick = () => {
  card.classList.remove('flip');
  roleText.innerText = '';
  currentPlayer++;
  if(currentPlayer < finalAssignment.length){
    switchScreen('passScreen');
  } else {
    switchScreen('adminScreen');
  }
  playSound(transitionSound);
}

// Next Player → reveal screen
document.getElementById('nextPlayerBtn').onclick = () => {
  switchScreen('revealScreen');
  playSound(clickSound);
}

// Admin view
document.getElementById('adminViewBtn').onclick = () => {
  const password = prompt("Enter Admin Password:");
  if(password === '7777'){
    let output = '';
    finalAssignment.forEach((role,i) => {
      output += `<p>Player ${i+1} - ${role}</p>`;
    });
    document.getElementById('finalList').innerHTML = output;
  } else {
    alert('Wrong password!');
  }
  playSound(clickSound);
}

// Next Round → reshuffle
document.getElementById('nextRoundBtn').onclick = () => {
  if(finalAssignment.length === 0) return alert('Generate roles first!');
  for(let i = finalAssignment.length-1; i>0; i--){
    let j = Math.floor(Math.random()*(i+1));
    [finalAssignment[i], finalAssignment[j]] = [finalAssignment[j], finalAssignment[i]];
  }
  currentPlayer = 0;
  currentRound++;
  updateRoundCounter();
  switchScreen('revealScreen');
  playSound(clickSound);
}

// New Game → reset everything
document.getElementById('newGameBtn').onclick = () => {
  repeatGame();
  playSound(clickSound);
}

// Music toggle → global mute
musicToggleBtn.onclick = () => {
  isMuted = !isMuted;
  if(!isMuted){
    bgMusic.play();
    musicToggleBtn.innerText = 'Music OFF';
  } else {
    bgMusic.pause();
    musicToggleBtn.innerText = 'Music ON';
  }
  playSound(clickSound);
}

// Repeat game → full reset
function repeatGame(){
  finalAssignment = [];
  roles = [];
  currentPlayer = 0;
  currentRound = 1;
  roleListDiv.innerHTML = '';
  document.getElementById('totalPlayers').value = '';
  document.getElementById('roleName').value = '';
  document.getElementById('roleQty').value = '';
  updateRoundCounter();
  document.getElementById('finalList').innerHTML = '';
  switchScreen('setupScreen');
}

// Screen switch helper
function switchScreen(screenId){
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
}