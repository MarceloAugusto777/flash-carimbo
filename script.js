/* ==========================================
   CARIMBOS FLASH - INTERACTIVE SCRIPT
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle Button Logic
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  
  // Load saved theme preference - Default is 'red' for all new visitors
  const savedTheme = localStorage.getItem('flash_theme');
  if (savedTheme === 'dark') {
    document.body.classList.remove('theme-red');
    updateThemeBtnText(false);
  } else {
    document.body.classList.add('theme-red');
    updateThemeBtnText(true);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isRed = document.body.classList.toggle('theme-red');
      localStorage.setItem('flash_theme', isRed ? 'red' : 'dark');
      updateThemeBtnText(isRed);
    });
  }

  function updateThemeBtnText(isRed) {
    if (!themeToggleBtn) return;
    const iconSpan = themeToggleBtn.querySelector('.theme-btn-icon');
    const textSpan = themeToggleBtn.querySelector('.theme-btn-text');
    if (isRed) {
      if (iconSpan) iconSpan.textContent = '🌙';
      if (textSpan) textSpan.textContent = 'Tema Escuro';
      themeToggleBtn.title = 'Alternar para Tema Escuro Tech';
    } else {
      if (iconSpan) iconSpan.textContent = '🎨';
      if (textSpan) textSpan.textContent = 'Tema Vermelho';
      themeToggleBtn.title = 'Alternar para Tema Vermelho Flash';
    }
  }

  // Simulator Inputs
  const simModel = document.getElementById('simModel');
  const simLine1 = document.getElementById('simLine1');
  const simLine2 = document.getElementById('simLine2');
  const simLine3 = document.getElementById('simLine3');
  const simLine4 = document.getElementById('simLine4');
  const simLine5 = document.getElementById('simLine5');
  const colorOptions = document.querySelectorAll('.color-option');
  const btnTestStamp = document.getElementById('btnTestStamp');
  const btnOrderSimulated = document.getElementById('btnOrderSimulated');

  // Preview Elements
  const stampedResult = document.getElementById('stampedResult');
  const prevLine1 = document.getElementById('prevLine1');
  const prevLine2 = document.getElementById('prevLine2');
  const prevLine3 = document.getElementById('prevLine3');
  const prevLine4 = document.getElementById('prevLine4');
  const prevLine5 = document.getElementById('prevLine5');

  let activeColor = '#111111';

  // Fictitious preset layouts based on model selection
  const presets = {
    'auto-cnpj': {
      l1: '00.000.000/0001-00',
      l2: 'NOME DA SUA EMPRESA LTDA',
      l3: 'RUA EXEMPLO, Nº 123 - CENTRO',
      l4: 'BAIRRO MODELO - CEP 00000-000',
      l5: 'ARARUAMA - RJ'
    },
    'auto-med': {
      l1: 'DR. NOME DO PROFISSIONAL',
      l2: 'ESPECIALIDADE / CARGO',
      l3: 'CRM/RJ 000.000',
      l4: 'AV. PRINCIPAL, 500 - SALA 101',
      l5: 'ARARUAMA - RJ'
    },
    'auto-pocket': {
      l1: 'DR. NOME DO PROFISSIONAL',
      l2: 'ESPECIALIDADE / CARGO',
      l3: 'CRM/RJ 000.000',
      l4: '',
      l5: ''
    },
    'pedagogico': {
      l1: 'PROFA. NOME DA PROFESSORA',
      l2: 'EDUCAÇÃO INFANTIL',
      l3: 'VISTO EM: ____/____/________',
      l4: 'PARABÉNS PELO CAPRICHO!',
      l5: ''
    }
  };

  // Update Live Preview Function
  function updatePreview() {
    const line1Val = simLine1 ? simLine1.value.trim() : '';
    const line2Val = simLine2 ? simLine2.value.trim() : '';
    const line3Val = simLine3 ? simLine3.value.trim() : '';
    const line4Val = simLine4 ? simLine4.value.trim() : '';
    const line5Val = simLine5 ? simLine5.value.trim() : '';

    if (prevLine1) {
      prevLine1.textContent = line1Val;
      prevLine1.style.display = line1Val ? 'block' : 'none';
    }
    if (prevLine2) {
      prevLine2.textContent = line2Val;
      prevLine2.style.display = line2Val ? 'block' : 'none';
    }
    if (prevLine3) {
      prevLine3.textContent = line3Val;
      prevLine3.style.display = line3Val ? 'block' : 'none';
    }
    if (prevLine4) {
      prevLine4.textContent = line4Val;
      prevLine4.style.display = line4Val ? 'block' : 'none';
    }
    if (prevLine5) {
      prevLine5.textContent = line5Val;
      prevLine5.style.display = line5Val ? 'block' : 'none';
    }

    // Apply Ink Color
    if (stampedResult) {
      stampedResult.style.color = activeColor;
    }

    // Update WhatsApp Order Link
    if (btnOrderSimulated && simModel) {
      const modelText = simModel.options[simModel.selectedIndex].text;
      let message = `Olá! Vim pelo site da Carimbos Flash e quero personalizar meu carimbo:\n\n` +
        `📌 *Modelo Base:* ${modelText}\n`;
      
      if (line1Val) message += `✏️ *Linha 1:* ${line1Val}\n`;
      if (line2Val) message += `✏️ *Linha 2:* ${line2Val}\n`;
      if (line3Val) message += `✏️ *Linha 3:* ${line3Val}\n`;
      if (line4Val) message += `✏️ *Linha 4:* ${line4Val}\n`;
      if (line5Val) message += `✏️ *Linha 5:* ${line5Val}\n`;
      message += `🎨 *Cor da Tinta:* ${getColorName(activeColor)}\n\n` +
        `Gostaria de ajustar a logo/layout no WhatsApp e solicitar meu orçamento!`;

      const encodedMsg = encodeURIComponent(message);
      btnOrderSimulated.href = `https://wa.me/5522988093012?text=${encodedMsg}`;
    }
  }

  function getColorName(hex) {
    switch (hex) {
      case '#111111': return 'Preto';
      case '#D32F2F': return 'Vermelho';
      case '#1976D2': return 'Azul';
      case '#388E3C': return 'Verde';
      default: return 'Preto';
    }
  }

  // Synthesize Stamp Press Sound effect using Web Audio API
  function playStampSound() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.5, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch (e) {
      // Audio context fallthrough
    }
  }

  // Stamp Press Animation Trigger
  function triggerStampAnimation() {
    playStampSound();
    if (stampedResult) {
      stampedResult.classList.remove('press-animation');
      // Force reflow
      void stampedResult.offsetWidth;
      stampedResult.classList.add('press-animation');
    }
  }

  // Model Preset Switcher
  if (simModel) {
    simModel.addEventListener('change', () => {
      const presetKey = simModel.value;
      if (presets[presetKey]) {
        if (simLine1) simLine1.value = presets[presetKey].l1;
        if (simLine2) simLine2.value = presets[presetKey].l2;
        if (simLine3) simLine3.value = presets[presetKey].l3;
        if (simLine4) simLine4.value = presets[presetKey].l4;
        if (simLine5) simLine5.value = presets[presetKey].l5;
      }
      updatePreview();
      triggerStampAnimation();
    });
  }

  // Event Listeners for Simulator Inputs
  [simLine1, simLine2, simLine3, simLine4, simLine5].forEach(input => {
    if (input) input.addEventListener('input', updatePreview);
  });

  // Color Selector Listener
  colorOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      colorOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      activeColor = opt.getAttribute('data-color');
      updatePreview();
      triggerStampAnimation();
    });
  });

  // Test Stamp Button Listener
  if (btnTestStamp) {
    btnTestStamp.addEventListener('click', triggerStampAnimation);
  }

  // FAQ Accordion Logic
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // INFINITE SEAMLESS MARQUEE CLONING
  const marqueeTrack = document.getElementById('marqueeTrack');
  if (marqueeTrack) {
    const cards = Array.from(marqueeTrack.children);
    cards.forEach(card => {
      const clone = card.cloneNode(true);
      marqueeTrack.appendChild(clone);
    });
  }

  // Initial Preview Call
  updatePreview();

  // ---- Animação scroll dos cards de passos ----
  const passoCards = document.querySelectorAll('.passo-card');
  if (passoCards.length > 0 && 'IntersectionObserver' in window) {
    const passoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          passoObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    passoCards.forEach(card => passoObserver.observe(card));
  } else {
    // fallback sem IntersectionObserver
    passoCards.forEach(card => card.classList.add('visible'));
  }
});
