const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

function createParticle(x, y) {
  return {
    x: x || Math.random() * canvas.width,
    y: y || Math.random() * canvas.height,
    radius: Math.random() * 3 + 2,
    dx: Math.random() * 1.5 - 0.75,
    dy: Math.random() * 1.5 - 0.75
  };
}

// Buat partikel awal
for (let i = 0; i < 150; i++) {
  particlesArray.push(createParticle());
}

let mouse = { x: undefined, y: undefined };

canvas.addEventListener('mousemove', function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

// ➕ Tambah partikel saat klik canvas
canvas.addEventListener('click', function(event) {
  for (let i = 0; i < 10; i++) {
    particlesArray.push(createParticle(event.x, event.y));
  }
});

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let p of particlesArray) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'; // warna putih partikel
    ctx.fill();

    // Reaksi ke mouse
    let dx = p.x - mouse.x;
    let dy = p.y - mouse.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 150) {
      p.x += dx * 0.03;
      p.y += dy * 0.03;
    }

    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  }

  // Gambar garis koneksi antar partikel
  for (let i = 0; i < particlesArray.length; i++) {
    for (let j = i + 1; j < particlesArray.length; j++) {
      let dx = particlesArray[i].x - particlesArray[j].x;
      let dy = particlesArray[i].y - particlesArray[j].y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 150) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'; // warna garis putih tipis
        ctx.lineWidth = 1;
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  drawParticles();
  requestAnimationFrame(animate);
}
animate();
