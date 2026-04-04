document.addEventListener('DOMContentLoaded', () => {

  /* ================================
     CUSTOM CURSOR
  ================================ */
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');

  if (cursorDot && cursorOutline) {
    let mouseX = 0, mouseY = 0, outlineX = 0, outlineY = 0;
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });
    function animateCursor() {
      outlineX += (mouseX - outlineX) * 0.15;
      outlineY += (mouseY - outlineY) * 0.15;
      cursorOutline.style.left = outlineX + 'px';
      cursorOutline.style.top = outlineY + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();
    document.querySelectorAll('a, button, .plano-card, .feature-card, .addon-card, .diferencial-item, .app-feat-item, .download-btn').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorOutline.style.width = '48px'; cursorOutline.style.height = '48px';
        cursorOutline.style.borderColor = 'rgba(0,255,240,0.8)';
        cursorDot.style.opacity = '0';
      });
      el.addEventListener('mouseleave', () => {
        cursorOutline.style.width = '32px'; cursorOutline.style.height = '32px';
        cursorOutline.style.borderColor = 'rgba(0,255,240,0.5)';
        cursorDot.style.opacity = '1';
      });
    });
  }

  /* ================================
     PLANOS — TAB SWITCHER
  ================================ */
  const tabButtons = document.querySelectorAll('.planos-tab-btn');
  const tabContents = document.querySelectorAll('.planos-tab-content');
  if (tabButtons.length && tabContents.length) {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        tabButtons.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        const content = document.getElementById('tab-' + target);
        if (content) content.classList.add('active');
      });
    });
  }

  /* ================================
     STICKY HEADER
  ================================ */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  /* ================================
     HAMBURGER
  ================================ */
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const spans = hamburger.querySelectorAll('span');
      const open = navLinks.classList.contains('active');
      spans[0].style.transform = open ? 'rotate(45deg) translate(5px, 5px)' : '';
      spans[1].style.opacity = open ? '0' : '';
      spans[2].style.transform = open ? 'rotate(-45deg) translate(5px, -5px)' : '';
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      });
    });
    const hasDropdown = document.querySelector('.has-dropdown');
    if (hasDropdown) {
      hasDropdown.querySelector('a').addEventListener('click', (e) => {
        if (window.innerWidth <= 768) { e.preventDefault(); hasDropdown.classList.toggle('active'); }
      });
    }
  }

  /* ================================================================
     ORION GALAXY CANVAS — HERO BACKGROUND
     Based on the actual Orion constellation star positions
  ================================================================ */
  const orionCanvas = document.getElementById('orion-canvas');
  if (orionCanvas) {
    const ctx = orionCanvas.getContext('2d');
    let W, H, mouse = { x: -9999, y: -9999 };

    function resizeOrion() {
      W = orionCanvas.width = orionCanvas.offsetWidth;
      H = orionCanvas.height = orionCanvas.offsetHeight;
    }
    resizeOrion();
    window.addEventListener('resize', resizeOrion);
    window.addEventListener('mousemove', e => {
      const rect = orionCanvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    // Orion constellation stars — normalized 0..1 (based on real Orion layout)
    // Key stars: Betelgeuse (top-left), Bellatrix (top-right), Mintaka/Alnilam/Alnitak (belt),
    // Saiph (bottom-left), Rigel (bottom-right), + nebula region
    const orionStars = [
      // NAME            NX     NY    SIZE  R    G    B    LABEL
      { nx:0.38, ny:0.17, size:5.5, r:255, g:120, b:60,  label:'Betelgeuse',  twinkle: 0.8 },
      { nx:0.62, ny:0.20, size:3.8, r:180, g:200, b:255, label:'Bellatrix',   twinkle: 0.5 },
      { nx:0.44, ny:0.47, size:2.8, r:200, g:220, b:255, label:'Mintaka',     twinkle: 0.4 },
      { nx:0.50, ny:0.50, size:3.0, r:200, g:220, b:255, label:'Alnilam',     twinkle: 0.4 },
      { nx:0.56, ny:0.53, size:2.8, r:200, g:220, b:255, label:'Alnitak',     twinkle: 0.4 },
      { nx:0.37, ny:0.80, size:3.5, r:180, g:200, b:255, label:'Saiph',       twinkle: 0.6 },
      { nx:0.65, ny:0.82, size:5.8, r:160, g:190, b:255, label:'Rigel',       twinkle: 0.7 },
      { nx:0.42, ny:0.32, size:2.0, r:220, g:230, b:255, label:'',            twinkle: 0.3 },
      { nx:0.58, ny:0.34, size:2.0, r:220, g:230, b:255, label:'',            twinkle: 0.3 },
      { nx:0.46, ny:0.63, size:1.8, r:200, g:220, b:255, label:'',            twinkle: 0.3 },
      { nx:0.54, ny:0.65, size:1.8, r:200, g:220, b:255, label:'',            twinkle: 0.3 },
      { nx:0.50, ny:0.72, size:2.5, r:180, g:200, b:255, label:'',            twinkle: 0.5 },
    ];

    // Constellation lines (index pairs)
    const lines = [
      [0,7], [7,2], [2,3], [3,4], [4,8], [8,1],  // shoulders to belt
      [0,9], [9,10],[1,10],                         // body
      [9,5], [10,6],                                // legs
    ];

    // Background stars
    const bgStars = Array.from({ length: 220 }, () => ({
      x: Math.random(), y: Math.random(),
      size: Math.random() * 1.2 + 0.2,
      opacity: Math.random() * 0.5 + 0.1,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinklePhase: Math.random() * Math.PI * 2,
    }));

    let t = 0;
    let orionOffset = { x: 0, y: 0 };
    let targetOffset = { x: 0, y: 0 };

    function drawOrion() {
      t += 0.016;
      ctx.clearRect(0, 0, W, H);

      // Parallax: gently shift constellation based on mouse
      const cx = W * 0.6, cy = H * 0.45;
      targetOffset.x = (mouse.x - cx) * 0.015;
      targetOffset.y = (mouse.y - cy) * 0.015;
      orionOffset.x += (targetOffset.x - orionOffset.x) * 0.05;
      orionOffset.y += (targetOffset.y - orionOffset.y) * 0.05;

      // Draw nebula glow around Orion center
      const nebulaX = W * 0.5 + orionOffset.x;
      const nebulaY = H * 0.52 + orionOffset.y;
      const nebulaGrad = ctx.createRadialGradient(nebulaX, nebulaY, 0, nebulaX, nebulaY, W * 0.2);
      nebulaGrad.addColorStop(0, 'rgba(50,20,100,0.12)');
      nebulaGrad.addColorStop(0.4, 'rgba(20,60,120,0.06)');
      nebulaGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = nebulaGrad;
      ctx.fillRect(0, 0, W, H);

      // Draw background stars (twinkling)
      bgStars.forEach(star => {
        const twinkle = Math.sin(t * star.twinkleSpeed * 60 + star.twinklePhase) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(star.x * W, star.y * H, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,220,255,${star.opacity * twinkle})`;
        ctx.fill();
      });

      // Compute star positions
      const starPositions = orionStars.map(s => ({
        x: W * (0.25 + s.nx * 0.5) + orionOffset.x,
        y: H * (0.15 + s.ny * 0.7) + orionOffset.y,
      }));

      // Draw constellation lines
      lines.forEach(([a, b]) => {
        const sa = starPositions[a], sb = starPositions[b];
        const lineGrad = ctx.createLinearGradient(sa.x, sa.y, sb.x, sb.y);
        lineGrad.addColorStop(0, `rgba(0,255,240,0.18)`);
        lineGrad.addColorStop(0.5, `rgba(0,255,240,0.28)`);
        lineGrad.addColorStop(1, `rgba(0,255,240,0.18)`);
        ctx.strokeStyle = lineGrad;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(sa.x, sa.y);
        ctx.lineTo(sb.x, sb.y);
        ctx.stroke();
      });

      // Draw stars
      orionStars.forEach((star, i) => {
        const pos = starPositions[i];
        const twinkle = 1 + Math.sin(t * 1.5 + i * 1.3) * star.twinkle * 0.3;
        const size = star.size * twinkle;

        // Check mouse proximity for hover glow
        const dist = Math.hypot(mouse.x - pos.x, mouse.y - pos.y);
        const hovered = dist < 40;

        // Outer glow
        const glowRadius = size * (hovered ? 8 : 5);
        const glow = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, glowRadius);
        glow.addColorStop(0, `rgba(${star.r},${star.g},${star.b},${hovered ? 0.4 : 0.15})`);
        glow.addColorStop(1, `rgba(${star.r},${star.g},${star.b},0)`);
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Star core
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, size * (hovered ? 1.6 : 1), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.r},${star.g},${star.b},${hovered ? 1 : 0.9})`;
        ctx.shadowBlur = hovered ? 20 : 10;
        ctx.shadowColor = `rgb(${star.r},${star.g},${star.b})`;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Diffraction spikes for bright stars
        if (star.size >= 3.5) {
          const spikeLen = size * (hovered ? 16 : 10);
          ctx.strokeStyle = `rgba(${star.r},${star.g},${star.b},${hovered ? 0.5 : 0.25})`;
          ctx.lineWidth = 0.6;
          [[0,1],[1,0],[0.7,0.7],[0.7,-0.7]].forEach(([dx,dy]) => {
            ctx.beginPath();
            ctx.moveTo(pos.x - dx * spikeLen * 0.3, pos.y - dy * spikeLen * 0.3);
            ctx.lineTo(pos.x + dx * spikeLen, pos.y + dy * spikeLen);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(pos.x + dx * spikeLen * 0.3, pos.y + dy * spikeLen * 0.3);
            ctx.lineTo(pos.x - dx * spikeLen, pos.y - dy * spikeLen);
            ctx.stroke();
          });
        }

        // Label on hover
        if (hovered && star.label) {
          ctx.fillStyle = 'rgba(0,255,240,0.9)';
          ctx.font = '11px "Share Tech Mono", monospace';
          ctx.letterSpacing = '2px';
          ctx.fillText(star.label.toUpperCase(), pos.x + size + 10, pos.y - size - 4);
        }
      });

      // Shooting stars
      if (Math.random() < 0.003) {
        spawnShootingStar();
      }
      shootingStars.forEach((s, i) => {
        s.x += s.vx;
        s.y += s.vy;
        s.life++;
        if (s.life > s.maxLife) { shootingStars.splice(i, 1); return; }
        const alpha = 1 - s.life / s.maxLife;
        ctx.strokeStyle = `rgba(200,230,255,${alpha * 0.8})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(s.x - s.vx * 10, s.y - s.vy * 10);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();
      });

      requestAnimationFrame(drawOrion);
    }

    const shootingStars = [];
    function spawnShootingStar() {
      shootingStars.push({
        x: Math.random() * W,
        y: Math.random() * H * 0.5,
        vx: (Math.random() * 3 + 2) * (Math.random() < 0.5 ? 1 : -1),
        vy: Math.random() * 2 + 1,
        life: 0,
        maxLife: Math.floor(Math.random() * 40 + 30),
      });
    }

    drawOrion();
  }

  /* ================================================================
     SPEEDTEST STARS CANVAS
  ================================================================ */
  const starsCanvas = document.getElementById('speedtest-stars');
  if (starsCanvas) {
    const sc = starsCanvas.getContext('2d');
    let sW, sH;
    function resizeStars() {
      sW = starsCanvas.width = starsCanvas.offsetWidth;
      sH = starsCanvas.height = starsCanvas.offsetHeight;
    }
    resizeStars();
    window.addEventListener('resize', resizeStars);

    // Spiral galaxy particles
    const galaxyStars = Array.from({ length: 300 }, (_, i) => {
      const angle = (i / 300) * Math.PI * 6;
      const radius = (i / 300) * 0.45 + Math.random() * 0.05;
      const arm = Math.floor(Math.random() * 2) * Math.PI;
      return {
        bx: 0.5 + Math.cos(angle + arm) * radius * 0.5 + (Math.random() - 0.5) * 0.08,
        by: 0.5 + Math.sin(angle + arm) * radius * 0.3 + (Math.random() - 0.5) * 0.08,
        size: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.4 + 0.1,
        speed: Math.random() * 0.003 + 0.001,
        phase: Math.random() * Math.PI * 2,
        hue: Math.random() < 0.3 ? [120, 180, 255] : [200, 220, 255],
      };
    });

    // Extra random background stars
    const extraStars = Array.from({ length: 150 }, () => ({
      x: Math.random(), y: Math.random(),
      size: Math.random() * 1 + 0.2,
      opacity: Math.random() * 0.3 + 0.05,
      phase: Math.random() * Math.PI * 2,
    }));

    let st = 0;
    function drawSpeedtestBg() {
      st += 0.008;
      sc.clearRect(0, 0, sW, sH);

      // Nebula center glow
      const g = sc.createRadialGradient(sW*0.5, sH*0.5, 0, sW*0.5, sH*0.5, sW*0.4);
      g.addColorStop(0, 'rgba(30,10,80,0.25)');
      g.addColorStop(0.5, 'rgba(0,20,60,0.1)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      sc.fillStyle = g;
      sc.fillRect(0, 0, sW, sH);

      // Background extras
      extraStars.forEach(s => {
        const tw = Math.sin(st * 2 + s.phase) * 0.2 + 0.8;
        sc.beginPath();
        sc.arc(s.x * sW, s.y * sH, s.size, 0, Math.PI * 2);
        sc.fillStyle = `rgba(180,200,255,${s.opacity * tw})`;
        sc.fill();
      });

      // Rotating galaxy
      const cx = sW * 0.5, cy = sH * 0.5;
      galaxyStars.forEach(s => {
        const angle = st * s.speed * 60;
        const rx = (s.bx - 0.5) * Math.cos(angle) - (s.by - 0.5) * Math.sin(angle);
        const ry = (s.bx - 0.5) * Math.sin(angle) + (s.by - 0.5) * Math.cos(angle);
        const px = cx + rx * sW;
        const py = cy + ry * sH;
        const tw = Math.sin(st * 3 + s.phase) * 0.2 + 0.8;
        sc.beginPath();
        sc.arc(px, py, s.size, 0, Math.PI * 2);
        sc.fillStyle = `rgba(${s.hue[0]},${s.hue[1]},${s.hue[2]},${s.opacity * tw})`;
        sc.fill();
      });

      requestAnimationFrame(drawSpeedtestBg);
    }
    drawSpeedtestBg();
  }

  /* ================================
     PHONE SPEED COUNTER ANIMATION
  ================================ */
  const phoneSpeed = document.getElementById('phone-speed');
  if (phoneSpeed) {
    const speeds = [342, 589, 412, 720, 298, 633, 800, 455];
    let si = 0;
    setInterval(() => {
      si = (si + 1) % speeds.length;
      const target = speeds[si];
      let current = parseInt(phoneSpeed.textContent) || 0;
      const step = () => {
        const diff = target - current;
        if (Math.abs(diff) < 5) { phoneSpeed.textContent = target; return; }
        current += Math.sign(diff) * Math.max(1, Math.floor(Math.abs(diff) * 0.15));
        phoneSpeed.textContent = current;
        requestAnimationFrame(step);
      };
      step();
    }, 3000);
  }

  /* ================================
     SCROLL ANIMATIONS
  ================================ */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.feature-card,.plano-card,.addon-card,.diferencial-item,.about-stat,.app-feat-item,.download-btn').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.6s ease ${i * 0.07}s, transform 0.6s ease ${i * 0.07}s`;
    observer.observe(el);
  });

  try {
    const sheet = document.styleSheets[0];
    sheet.insertRule('.visible { opacity: 1 !important; transform: translateY(0) !important; }', sheet.cssRules.length);
  } catch(e) {
    document.querySelectorAll('.feature-card,.plano-card,.addon-card,.diferencial-item,.about-stat,.app-feat-item,.download-btn').forEach(el => {
      el.style.opacity = '1'; el.style.transform = 'none';
    });
  }

  /* ================================
     ACTIVE NAV HIGHLIGHT
  ================================ */
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navItems = document.querySelectorAll('.nav-item');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) current = s.id; });
    navItems.forEach(item => {
      item.style.color = '';
      if (item.getAttribute('href') && item.getAttribute('href').includes(current) && current)
        item.style.color = 'var(--primary)';
    });
  });

});
