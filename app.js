// ===== THREE BACKGROUND =====
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("bg") });
renderer.setSize(innerWidth, innerHeight);
camera.position.z = 30;

const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material = new THREE.MeshStandardMaterial({ color: 0x00ffff, wireframe: true });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

const light = new THREE.PointLight(0xffffff);
light.position.set(10, 10, 10);
scene.add(light);

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.002;
  torus.rotation.y += 0.002;
  renderer.render(scene, camera);
}
animate();

// ===== ADMIN CREDENTIALS (SET YOUR OWN) =====
const ADMIN = {
  username: "dihman67",
  first: "hehe",
  last: "ohmagod",
  password: "696796poop",
  github: "bozoman",
  discord: "notabot"
};

let devMode = false;

// ===== BLOCKERS =====
let blockers = JSON.parse(localStorage.getItem("blockers")) || {
  "GoGuardian": "",
  "Lightspeed": "",
  "iBoss": "",
  "FortiGuard": "",
  "Cisco Umbrella": "",
  "Smoothwall": "",
  "Securly": ""
};

// ===== UI =====
const input = document.getElementById("searchInput");
const suggestions = document.getElementById("suggestions");
const devBanner = document.getElementById("devBanner");
const editorOverlay = document.getElementById("editorOverlay");
const editorBox = document.getElementById("editorBox");
const editorTitle = document.getElementById("editorTitle");
const closeEditor = document.getElementById("closeEditor");

const loginOverlay = document.getElementById("loginOverlay");
const loginBtn = document.getElementById("loginBtn");
const cancelLogin = document.getElementById("cancelLogin");

// ===== SEARCH =====
input.addEventListener("input", () => {
  const val = input.value.toLowerCase();
  suggestions.innerHTML = "";
  if (!val) return;

  Object.keys(blockers)
    .filter(b => b.toLowerCase().includes(val))
    .forEach(b => {
      const div = document.createElement("div");
      div.className = "suggestion";
      div.textContent = b;
      div.onclick = () => openEditor(b);
      suggestions.appendChild(div);
    });
});

// ===== ADMIN COMMAND =====
input.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    if (input.value.trim() === "/admin enable") {
      loginOverlay.style.display = "flex";
      input.value = "";
      suggestions.innerHTML = "";
    }
  }
});

// ===== LOGIN =====
loginBtn.onclick = () => {
  const u = document.getElementById("loginUser").value;
  const f = document.getElementById("loginFirst").value;
  const l = document.getElementById("loginLast").value;
  const p = document.getElementById("loginPass").value;
  const g = document.getElementById("loginGit").value;
  const d = document.getElementById("loginDisc").value;

  if (
    u === ADMIN.username &&
    f === ADMIN.first &&
    l === ADMIN.last &&
    p === ADMIN.password &&
    g === ADMIN.github &&
    d === ADMIN.discord
  ) {
    devMode = true;
    devBanner.style.display = "block";
    loginOverlay.style.display = "none";
  } else {
    alert("Invalid admin credentials");
  }
};

cancelLogin.onclick = () => {
  loginOverlay.style.display = "none";
};

// ===== EDITOR =====
function openEditor(blocker) {
  editorTitle.textContent = blocker;
  editorOverlay.style.display = "flex";
  editorBox.value = blockers[blocker] || "";

  if (devMode) {
    editorBox.removeAttribute("readonly");
    editorBox.focus();
  } else {
    editorBox.setAttribute("readonly", true);
  }
}

function saveEditor() {
  if (devMode) {
    const blocker = editorTitle.textContent;
    blockers[blocker] = editorBox.value;
    localStorage.setItem("blockers", JSON.stringify(blockers));
  }
}

closeEditor.onclick = () => {
  saveEditor();
  editorOverlay.style.display = "none";
};

editorBox.addEventListener("input", saveEditor);
