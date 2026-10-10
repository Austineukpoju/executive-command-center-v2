const systems = [
{name:"Gmail",icon:"✉️",url:"https://mail.google.com/",note:"Email"},
{name:"Google Calendar",icon:"📅",url:"https://calendar.google.com/",note:"Calendar"},
{name:"Google Drive",icon:"📁",url:"https://drive.google.com/",note:"Files"},
{name:"Outlook",icon:"📨",url:"https://outlook.office.com/mail/",note:"Email"},
{name:"Microsoft 365",icon:"🟦",url:"https://www.microsoft365.com/",note:"Work apps"},
{name:"Clio",icon:"⚖️",url:"https://www.clio.com/",note:"Legal practice management"},
{name:"Slack",icon:"💬",url:"https://slack.com/signin",note:"Team messages"},
{name:"Notion",icon:"🗒️",url:"https://www.notion.so/login",note:"Workspace"},
{name:"Trello",icon:"📋",url:"https://trello.com/login",note:"Projects"},
{name:"Dropbox",icon:"🗂️",url:"https://www.dropbox.com/login",note:"Files"},
{name:"OneDrive",icon:"☁️",url:"https://onedrive.live.com/",note:"Files"},
{name:"Zoho",icon:"🟠",url:"https://www.zoho.com/",note:"Business apps"},
{name:"Other system",icon:"➕",url:"",note:"Add later"}
];
const grid=document.getElementById("systemsGrid"), setup=document.getElementById("setup"), choices=document.getElementById("choices");
const defaultSelected=["Gmail","Google Calendar","Google Drive","Clio"];
let selected=[]; try{selected=JSON.parse(localStorage.getItem("ecc_systems")||"null")||defaultSelected}catch(e){selected=defaultSelected}
function renderGrid(){grid.innerHTML="";systems.filter(s=>selected.includes(s.name)).forEach(s=>{const card=document.createElement("div");card.className="system";card.innerHTML=`<span class="emoji">${s.icon}</span><strong>${s.name}</strong><span class="status">${s.note} · Not connected</span>${s.url?`<a href="${s.url}" target="_blank" rel="noopener noreferrer">Open service ↗</a>`:"<span class='status'>Set up when needed</span>"}`;grid.appendChild(card)});if(!selected.length)grid.innerHTML="<p>Select systems to see them here.</p>"}
function renderChoices(){choices.innerHTML="";systems.forEach(s=>{const label=document.createElement("label");label.className="choice";const cb=document.createElement("input");cb.type="checkbox";cb.value=s.name;cb.checked=selected.includes(s.name);label.append(cb,document.createTextNode(s.icon+" "+s.name));choices.appendChild(label)})}
function showSetup(){renderChoices();setup.classList.remove("hidden");setup.scrollIntoView({behavior:"smooth",block:"start"})}
document.getElementById("settingsBtn").onclick=showSetup;document.getElementById("addSystemBtn").onclick=showSetup;document.getElementById("closeSetup").onclick=()=>setup.classList.add("hidden");
document.getElementById("saveSystems").onclick=()=>{selected=[...choices.querySelectorAll("input:checked")].map(x=>x.value);try{localStorage.setItem("ecc_systems",JSON.stringify(selected))}catch(e){}renderGrid();setup.classList.add("hidden")};
document.getElementById("searchInput").addEventListener("input",()=>{document.getElementById("searchMessage").textContent="This is a prepared search area. Live search across connected accounts requires secure API integrations; no account data is searched yet."});
renderGrid();if("serviceWorker" in navigator){window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}))}
