// mobile nav toggle
const menuToggle = document.getElementById('menuToggle') || document.querySelector('.menu-toggle');
const nav = document.getElementById('nav') || document.querySelector('.nav');
if(menuToggle && nav){
  menuToggle.addEventListener('click',()=>nav.classList.toggle('open'));
}

// contact & intern simple handlers (prevent page reload for demo)
document.getElementById('internForm')?.addEventListener('submit', e=>{
  e.preventDefault();
  alert('Internship application received — demo only.');
  e.target.reset();
});
document.getElementById('contactForm')?.addEventListener('submit', e=>{
  e.preventDefault();
  alert('Message sent — demo only.');
  e.target.reset();
});

// Chat widget logic
const chatToggle = document.getElementById('chatToggle');
const chatPanel = document.getElementById('chatPanel');
const chatBody = document.getElementById('chatBody');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');

if(chatToggle){
  chatToggle.addEventListener('click', ()=>{
    if(chatPanel.style.display === 'flex'){ chatPanel.style.display='none'; chatToggle.innerText='💬' }
    else { chatPanel.style.display='flex'; chatToggle.innerText='✕' }
  });
}
if(chatSend){
  chatSend.addEventListener('click', sendChat);
  chatInput?.addEventListener('keydown', (e)=>{ if(e.key==='Enter') sendChat() });
}
function sendChat(){
  const text = chatInput.value?.trim();
  if(!text) return;
  const user = document.createElement('div'); user.className='user'; user.textContent=text; chatBody.appendChild(user);
  chatInput.value='';
  chatBody.scrollTop = chatBody.scrollHeight;
  setTimeout(()=>{
    const reply = document.createElement('div'); reply.className='bot';
    const t = text.toLowerCase();
    if(t.includes('intern')) reply.textContent='We have WebDev, AI/ML and Marketing internships — apply via the portal.';
    else if(t.includes('scholar')) reply.textContent='Scholarships: merit & need based. Check eligibility and apply.';
    else if(t.includes('exam')||t.includes('upsc')||t.includes('kpsc')) reply.textContent='Exam prep includes daily current affairs and test series.';
    else if(t.includes('placement')||t.includes('training')) reply.textContent='Placement training: mock interviews, aptitude and resume workshops.';
    else reply.textContent='Sorry, I did not understand. Ask about internships, scholarships or exam prep.';
    chatBody.appendChild(reply);
    chatBody.scrollTop = chatBody.scrollHeight;
  },600);
}
// KCET College Suggestion Feature
document.getElementById("findCollegeBtn").addEventListener("click", function () {
  const rank = parseInt(document.getElementById("kcetRank").value);
  const location = document.getElementById("location").value.trim().toLowerCase();
  const resultDiv = document.getElementById("collegeResults");

  if (!rank || !location) {
    resultDiv.innerHTML = `<p style="color: #d2b48c;">Please enter both rank and location.</p>`;
    return;
  }

  let colleges = [];

  if (rank <= 1000) {
    colleges = ["RV College of Engineering", "PES University", "BMS College of Engineering"];
  } else if (rank <= 5000) {
    colleges = ["MSRIT", "Dayananda Sagar College", "BNM Institute of Technology"];
  } else if (rank <= 10000) {
    colleges = ["NMIT", "JSSATE", "SJB Institute of Technology"];
  } else if (rank <= 20000) {
    colleges = ["Reva University", "East Point College", "Acharya Institute of Technology"];
  } else {
    colleges = ["Global Academy of Technology", "Don Bosco Institute of Technology", "Cambridge Institute of Technology"];
  }

  // 🎓 College links map
  const collegeLinks = {
    "RV College of Engineering": "https://www.rvce.edu.in/",
    "PES University": "https://pes.edu/",
    "BMS College of Engineering": "https://www.bmsce.ac.in/",
    "MSRIT": "https://www.msrit.edu/",
    "Dayananda Sagar College": "https://dayanandasagar.edu/",
    "BNM Institute of Technology": "https://bnmit.org/",
    "NMIT": "https://www.nmit.ac.in/",
    "JSSATE": "https://jssateb.ac.in/",
    "SJB Institute of Technology": "https://sjbit.edu.in/",
    "Reva University": "https://reva.edu.in/",
    "East Point College": "https://eastpoint.ac.in/",
    "Acharya Institute of Technology": "https://www.acharya.ac.in/",
    "Global Academy of Technology": "https://gat.ac.in/",
    "Don Bosco Institute of Technology": "https://donboscobangalore.education/",
    "Cambridge Institute of Technology": "https://www.cambridge.edu.in/"
  };

  // Filter based on location
  let filteredColleges = colleges.filter(c =>
    location.includes("bangalore") ? true : c.toLowerCase().includes(location)
  );

  if (filteredColleges.length === 0) {
    filteredColleges = colleges.slice(0, 3);
  }

  // ✅ Show clickable college links
  resultDiv.innerHTML = `
    <h3 style="color:#d2b48c; margin-top:20px;">
      Suggested Colleges near ${location.charAt(0).toUpperCase() + location.slice(1)}:
    </h3>
    <ul style="list-style:none; padding:0; color:#fff;">
      ${filteredColleges.map(c => {
        const link = collegeLinks[c] || "#";
        return `<li>🎓 <a href="${link}" target="_blank" style="color:#f5deb3; text-decoration:none;">${c}</a></li>`;
      }).join("")}
    </ul>
  `;
});
