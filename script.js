let roles = [];
let finalAssignment = [];
let currentPlayer = 0;

// Elements
const roleListDiv = document.getElementById('roleList');
const roleText = document.getElementById('roleText');
const card = document.getElementById('roleCard');
const clickSound = document.getElementById('clickSound');
const revealSound = document.getElementById('revealSound');
const transitionSound = document.getElementById('transitionSound');
const bgMusic = document.getElementById('bgMusic');
const musicToggleBtn = document.getElementById('musicToggleBtn');

function playSound(sound){
  sound.currentTime = 0;
  sound.play();
}

// Add role
document.getElementById('addRoleBtn').onclick = ()=>{
  const name = document.getElementById('roleName').value.trim();
  const qty = parseInt(document.getElementById('roleQty').value);
  if(!name || !qty) return alert('Enter role and quantity');
  roles.push({name, qty});
  roleListDiv.innerHTML += `<p>${name} - ${qty}</p>`;
  document.getElementById('roleName').value = '';
  document.getElementById('roleQty').value = '';
  playSound(clickSound);
}

// Generate roles
document.getElementById('generateBtn').onclick = ()=>{
  const total = parseInt(document.getElementById('totalPlayers').value);
  let tempRoles = [];
  roles.forEach(r=>{
    for(let i=0;i<r.qty;i++) tempRoles.push(r.name);
  });
  if(tempRoles.length !== total) return alert('Total roles quantity must match total players!');
  // Shuffle
  for(let i=tempRoles.length-1;i>0;i--){
    let j=Math.floor(Math.random()*(i+1));
    [tempRoles[i], tempRoles[j]]=[tempRoles[j], tempRoles[i]];
  }
  finalAssignment = tempRoles;
  currentPlayer = 0;
  switchScreen('revealScreen');
  playSound(clickSound);
}

// Reveal logic
card.onclick = ()=>{
  card.classList.add('flip');
  roleText.innerText = finalAssignment[currentPlayer];
  playSound(revealSound);
}

// OK button → pass screen
document.getElementById('okBtn').onclick = ()=>{
  card.classList.remove('flip');
  roleText.innerText = '';
  currentPlayer++;
  if(currentPlayer<finalAssignment.length){
    switchScreen('passScreen');
  }else{
    switchScreen('adminScreen');
  }
  playSound(transitionSound);
}

// Next Player
document.getElementById('nextPlayerBtn').onclick = ()=>{
  switchScreen('revealScreen');
  playSound(clickSound);
}

// Admin view
document.getElementById('adminViewBtn').onclick = ()=>{
  const password = prompt("Enter Admin Password:");
  if(password==='7777'){
    let output='';
    finalAssignment.forEach((role,i)=>{
      output+=`<p>Player ${i+1} - ${role}</p>`;
    });
    document.getElementById('finalList').innerHTML=output;
  }else{
    alert('Wrong password!');
  }
  playSound(clickSound);
}

// Music toggle
musicToggleBtn.onclick = ()=>{
  if(bgMusic.paused){
    bgMusic.play();
    musicToggleBtn.innerText='Music OFF';
  }else{
    bgMusic.pause();
    musicToggleBtn.innerText='Music ON';
  }
  playSound(clickSound);
}

// Repeat game
function repeatGame(){
  finalAssignment=[];
  roles=[];
  roleListDiv.innerHTML='';
  currentPlayer=0;
  switchScreen('setupScreen');
}

// Screen switch helper
function switchScreen(screenId){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
}