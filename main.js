/* ============================================================
   ARQUITECTURA DE COMPUTADORAS I — JavaScript del sitio
   ============================================================ */

/* ─── 1. ANIMACIONES DE ENTRADA (Intersection Observer) ─── */
(function initReveal() {
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.07 });

  sections.forEach(s => observer.observe(s));
})();


/* ─── 2. NAV ACTIVO AL HACER SCROLL ─── */
(function initNavHighlight() {
  const navLinks  = document.querySelectorAll('.toc a');
  const sectionEls = document.querySelectorAll('section[id]');

  function updateActiveLink() {
    let current = '';
    sectionEls.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 130) current = sec.id;
    });
    navLinks.forEach(a => {
      const active = a.getAttribute('href') === '#' + current;
      a.classList.toggle('toc-active', active);
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink(); // estado inicial
})();


/* ─── 3. CALCULADORA DE LEY DE AMDAHL ─── */
(function initAmdahl() {
  const pSlider = document.getElementById('pSlider');
  const nSlider = document.getElementById('nSlider');
  const pVal    = document.getElementById('pVal');
  const nVal    = document.getElementById('nVal');
  const result  = document.getElementById('amdahlResult');

  if (!pSlider || !nSlider || !result) return; // guard si el elemento no existe

  function calcSpeedup() {
    const P = parseFloat(pSlider.value) / 100;
    const N = parseInt(nSlider.value);
    const speedup = 1 / ((1 - P) + (P / N));

    pVal.textContent = pSlider.value + '%';
    nVal.textContent  = N === 64 ? '64 (máx)' : N;
    result.innerHTML  =
      speedup.toFixed(2) + '×' +
      '<span>speedup teórico · límite por fracción serial = ' +
      ((1 - P) * 100).toFixed(0) + '%</span>';
  }

  pSlider.addEventListener('input', calcSpeedup);
  nSlider.addEventListener('input', calcSpeedup);
  calcSpeedup(); // cálculo inicial
})();


/* ─── 4. CALCULADORA DE MIPS ─── */
(function initMIPS() {
  const freqInput = document.getElementById('mipsFreq');
  const cpiInput  = document.getElementById('mipsCPI');
  const mipsOut   = document.getElementById('mipsResult');

  if (!freqInput || !cpiInput || !mipsOut) return;

  function calcMIPS() {
    const freq = parseFloat(freqInput.value) || 0;
    const cpi  = parseFloat(cpiInput.value)  || 1;
    const mips = (freq * 1000) / cpi; // freq en GHz → MHz / CPI
    mipsOut.textContent = mips.toFixed(0) + ' MIPS';
  }

  freqInput.addEventListener('input', calcMIPS);
  cpiInput.addEventListener('input', calcMIPS);
  calcMIPS();
})();


/* ─── 5. CALCULADORA DE BANCOS DE MEMORIA ─── */
(function initMemBanks() {
  const banksInput = document.getElementById('memBanks');
  const sizeInput  = document.getElementById('memBankSize');
  const memOut     = document.getElementById('memBankResult');

  if (!banksInput || !sizeInput || !memOut) return;

  function calcMem() {
    const banks = parseInt(banksInput.value)  || 0;
    const size  = parseInt(sizeInput.value)   || 0;
    const total = banks * size;
    const unit  = total >= 1024 ? (total / 1024).toFixed(2) + ' KB'
                : total + ' Bytes';
    memOut.textContent = banks + ' × ' + size + ' = ' + total + ' direcciones (' + unit + ')';
  }

  banksInput.addEventListener('input', calcMem);
  sizeInput.addEventListener('input', calcMem);
  calcMem();
})();

// ─── NAV MÓVIL (select) ───
(function initMobileNav() {
  const sel = document.querySelector('.toc-select');
  if (!sel) return;
  sel.addEventListener('change', () => {
    if (sel.value) {
      document.querySelector(sel.value)?.scrollIntoView({ behavior: 'smooth' });
      sel.value = ''; // resetea para poder reusar
    }
  });
})();