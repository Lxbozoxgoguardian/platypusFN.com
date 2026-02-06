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

// ===== DEV MODE =====
let devMode = false;
const SECRET = "edu-quiz.com cool";

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

// Trigger dev mode ONLY on ENTER
input.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    if (input.value === SECRET) {
      devMode = true;
      devBanner.style.display = "block";
      input.value = "";
      suggestions.innerHTML = "";
    }
  }
});

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

function openEditor(blocker) {
  editorTitle.textContent = blocker;
  editorOverlay.style.display = "flex";
  editorBox.value = blockers[blocker];

  if (devMode) {
    editorBox.removeAttribute("readonly");
  } else {
    editorBox.setAttribute("readonly", true);
  }
}

closeEditor.onclick = () => {
  if (devMode) {
    blockers[editorTitle.textContent] = editorBox.value;
    localStorage.setItem("blockers", JSON.stringify(blockers));
  }
  editorOverlay.style.display = "none";
};
