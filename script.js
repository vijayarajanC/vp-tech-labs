/* ==========================================================================
   VP TECH LABS (VIJAY & PRAFEEP) - INTERACTIVE LOGIC & SCRIPTS
   ========================================================================== */

// 1. Header Blur on Scroll
window.addEventListener('scroll', () => {
  const header = document.getElementById('siteHeader');
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// 2. Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  // Close menu on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });
}

// 3. Portfolio Category Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filter === 'all' || (category && category.includes(filter))) {
        card.style.display = 'flex';
        card.style.animation = 'fadeIn 0.35s ease forwards';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// 4. Interactive Brochure Modal Logic
let currentBrochurePage = 1;
const totalBrochurePages = 3;

function openBrochureModal() {
  const modal = document.getElementById('brochureModal');
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    showBrochurePage(1);
  }
}

function closeBrochureModal() {
  const modal = document.getElementById('brochureModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = 'auto';
  }
}

function closeBrochureModalOnBackdrop(event) {
  if (event.target.id === 'brochureModal') {
    closeBrochureModal();
  }
}

function showBrochurePage(page) {
  currentBrochurePage = page;
  document.querySelectorAll('.flip-page').forEach((p, idx) => {
    p.classList.toggle('active', idx + 1 === page);
  });

  const indicator = document.getElementById('bPageIndicator');
  if (indicator) {
    indicator.textContent = `Page ${page} of ${totalBrochurePages}`;
  }
}

function nextBrochurePage() {
  if (currentBrochurePage < totalBrochurePages) {
    showBrochurePage(currentBrochurePage + 1);
  } else {
    showBrochurePage(1);
  }
}

function prevBrochurePage() {
  if (currentBrochurePage > 1) {
    showBrochurePage(currentBrochurePage - 1);
  } else {
    showBrochurePage(totalBrochurePages);
  }
}

function downloadBrochureSim() {
  // Generate a beautiful printable view / prompt download
  window.print();
}

// 5. Interactive Cost & Scope Calculator
function initCalculator() {
  const platformChips = document.querySelectorAll('#platformChips .chip');
  const featureChips = document.querySelectorAll('#featureChips .chip');
  const timelineChips = document.querySelectorAll('#timelineChips .chip');

  function calculate() {
    let basePrice = 0;
    let selectedCount = 0;

    platformChips.forEach(chip => {
      if (chip.classList.contains('active')) {
        basePrice += parseInt(chip.getAttribute('data-price') || '0', 10);
        selectedCount++;
      }
    });

    featureChips.forEach(chip => {
      if (chip.classList.contains('active')) {
        basePrice += parseInt(chip.getAttribute('data-price') || '0', 10);
        selectedCount++;
      }
    });

    let multiplier = 1.0;
    let timelineText = 'Estimated Timeline: ~6 - 8 Weeks';

    timelineChips.forEach(chip => {
      if (chip.classList.contains('active')) {
        multiplier = parseFloat(chip.getAttribute('data-mult') || '1.0');
        const val = chip.getAttribute('data-value');
        if (val === 'urgent') timelineText = 'Estimated Timeline: ~3 - 4 Weeks (Fast-Track)';
        else if (val === 'enterprise') timelineText = 'Estimated Timeline: ~12+ Weeks (Enterprise / Phased)';
      }
    });

    const finalTotal = Math.round(basePrice * multiplier);
    const totalEl = document.getElementById('calcTotal');
    const timelineEl = document.getElementById('calcTimeline');

    if (totalEl) totalEl.textContent = `$${finalTotal.toLocaleString()}`;
    if (timelineEl) timelineEl.textContent = timelineText;
  }

  // Attach chip click handlers
  document.querySelectorAll('.calc-chips .chip').forEach(chip => {
    chip.addEventListener('click', function() {
      // If it belongs to timeline, single select
      if (this.parentElement.id === 'timelineChips') {
        this.parentElement.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        this.classList.add('active');
      } else {
        // Multi-select for platforms and features
        this.classList.toggle('active');
      }
      calculate();
    });
  });

  calculate();
}

// 6. Preselect service in Contact form
function preselectService(serviceName) {
  const select = document.getElementById('serviceSelect');
  if (select) {
    select.value = serviceName;
  }
}

function applyEstimateToContact() {
  const total = document.getElementById('calcTotal')?.textContent || '$5,000+';
  const timeline = document.getElementById('calcTimeline')?.textContent || '';
  const messageInput = document.getElementById('messageInput');
  
  if (messageInput) {
    messageInput.value = `Hello VP Tech Labs,\n\nI calculated an estimated project scope (${total}, ${timeline}) on your website. I would like to schedule a discovery call to discuss our requirements and begin development.`;
  }
  
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// 7. Contact Form Handling
function handleContactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('nameInput')?.value || '';
  const email = document.getElementById('emailInput')?.value || '';
  const service = document.getElementById('serviceSelect')?.value || '';
  const message = document.getElementById('messageInput')?.value || '';
  const feedback = document.getElementById('formFeedback');
  const submitBtn = document.getElementById('submitBtn');

  if (submitBtn) {
    submitBtn.innerHTML = '<span>Sending Message...</span>';
    submitBtn.style.opacity = '0.7';
  }

  setTimeout(() => {
    if (feedback) {
      feedback.textContent = `Thank you ${name}! Your inquiry for "${service}" has been received. Our VP engineering team will reply to ${email} within 2 hours.`;
      feedback.className = 'form-feedback success';
    }
    if (submitBtn) {
      submitBtn.innerHTML = '<span>Message Sent Successfully! ✓</span>';
      submitBtn.style.background = '#10B981';
      submitBtn.style.opacity = '1';
    }
    // Optional direct mailto trigger fallback
    const mailtoLink = `mailto:vijay@unique-creations.biz?subject=VP Tech Inquiry: ${encodeURIComponent(service)}&body=Name: ${encodeURIComponent(name)}%0D%0AEmail: ${encodeURIComponent(email)}%0D%0A%0D%0A${encodeURIComponent(message)}`;
    console.log('Prepared Mailto:', mailtoLink);
  }, 900);
}

// 8. Floating AI Assistant Widget Simulation
let isAiOpen = false;

function toggleAiWidget() {
  const chatWindow = document.getElementById('aiChatWindow');
  if (!chatWindow) return;
  isAiOpen = !isAiOpen;
  chatWindow.classList.toggle('open', isAiOpen);

  if (isAiOpen) {
    setTimeout(() => {
      document.getElementById('aiUserInput')?.focus();
    }, 200);
  }
}

function askAi(question) {
  const input = document.getElementById('aiUserInput');
  if (input) {
    input.value = question;
    sendAiMessage();
  }
}

function sendAiMessage() {
  const input = document.getElementById('aiUserInput');
  const messagesContainer = document.getElementById('aiMessages');
  if (!input || !messagesContainer) return;

  const userText = input.value.trim();
  if (!userText) return;

  // Append user message
  const userMsgEl = document.createElement('div');
  userMsgEl.className = 'ai-msg user';
  userMsgEl.textContent = userText;
  messagesContainer.appendChild(userMsgEl);

  input.value = '';
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  // Bot typing simulation & response
  setTimeout(() => {
    const botMsgEl = document.createElement('div');
    botMsgEl.className = 'ai-msg bot';
    botMsgEl.innerHTML = generateAiResponse(userText);
    messagesContainer.appendChild(botMsgEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, 600);
}

function generateAiResponse(query) {
  const q = query.toLowerCase();

  if (q.includes('mobile') || q.includes('ios') || q.includes('android') || q.includes('react native')) {
    return '📱 <strong>VP Mobile Engineering:</strong> We specialize in cross-platform iOS & Android apps built with <strong>React Native, Expo, and Flutter</strong>. Features include biometric login, 120Hz smooth animations, offline Wasabi/S3 caching, and multi-tenant school/enterprise architecture.';
  } else if (q.includes('billing') || q.includes('fee') || q.includes('invoice') || q.includes('payment') || q.includes('ecommerce') || q.includes('e-commerce')) {
    return '🧾 <strong>VP Billing & Invoicing Systems:</strong> We engineer high-security billing software, GST invoicing, student fee collection systems, recurring E-NACH mandates, and multi-gateway integrations (Razorpay, NTT Data/Atom, Stripe) with automated reconciliation.';
  } else if (q.includes('brochure') || q.includes('design') || q.includes('graphic') || q.includes('ui') || q.includes('ux')) {
    return '🎨 <strong>VP Creative Brochure & UI/UX:</strong> We produce interactive digital flipbooks, print-ready 300 DPI CMYK corporate prospectuses, complete Figma design systems, and brand identities tailored for educational and tech enterprises.';
  } else if (q.includes('claude') || q.includes('ai') || q.includes('ocr') || q.includes('anthropic')) {
    return '🤖 <strong>Claude AI Integration:</strong> Powered by Anthropic Claude 3.5 Sonnet and Haiku, we build automated OCR document extraction for marks cards/IDs, automated feedback generators, and smart conversational campus assistants.';
  } else if (q.includes('price') || q.includes('cost') || q.includes('estimate') || q.includes('quote')) {
    return '💡 <strong>Project Pricing:</strong> You can use our live <em>Project Cost Calculator</em> above to get an instant scope! Custom apps typically range from $2,500 to $9,000 depending on features and Claude AI integrations. Let\'s schedule a call!';
  } else {
    return '✨ <strong>VP Tech Labs:</strong> Founded by <strong>Vijay & Prafeep</strong>, we build Mobile Apps, Enterprise Web SaaS, Billing & Invoicing software, E-Commerce, and Corporate Brochures. Email us at <a href="mailto:vijay@unique-creations.biz" style="color:#38bdf8;">vijay@unique-creations.biz</a> to get started!';
  }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  initCalculator();
});
