// ===== THREE BACKGROUND =====
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("bg"),
});
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

document.body.onscroll = () => {
  torus.rotation.y = window.scrollY * 0.001;
};

// ===== DATA (EDITABLE IN DEV MODE) =====
let services = [
  { name: "Service Alpha", link: "https://example.com" },
  { name: "Service Beta", link: "https://example.com" },
  { name: "Service Gamma", link: "https://example.com" }
];

// ===== SEARCH =====
const input = document.getElementById("searchInput");
const suggestions = document.getElementById("suggestions");
const devStatus = document.getElementById("devStatus");

let devMode = false;
const DEV_PASSWORD = "PLATYPUSMODE"; // secret trigger

input.addEventListener("input", () => {
  const val = input.value.trim();

  // Secret dev mode
  if (val === DEV_PASSWORD) {
    devMode = true;
    devStatus.textContent = "DEV MODE ACTIVE";
    suggestions.innerHTML = "";
    return;
  }

  suggestions.innerHTML = "";
  if (!val) return;

  services
    .filter(s => s.name.toLowerCase().includes(val.toLowerCase()))
    .forEach(match => {
      const div = document.createElement("div");
      div.className = "suggestion";
      div.textContent = match.name;
      div.onclick = () => window.open(match.link, "_blank");
      suggestions.appendChild(div);
    });
});

// ===== DEV MODE EDITING =====
document.addEventListener("keydown", e => {
  if (!devMode) return;

  if (e.key === "a") {
    const name = prompt("Service name:");
    const link = prompt("Service link:");
    if (name && link) services.push({ name, link });
  }

  if (e.key === "d") {
    const name = prompt("Delete which service?");
    services = services.filter(s => s.name !== name);
  }
});
