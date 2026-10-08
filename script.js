/* ==========================================================================
   VP TECH LABS - INTERACTIVE LOGIC & SCRIPTS
   ========================================================================== */

// 1. Header Blur on Scroll
window.addEventListener('scroll', () => {
  const header = document.getElementById('siteHeader');
  if (header) {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
});

// 2. Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });

  // Close menu on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });
}

// 3. Hero Interactive Showcase Tabs
function switchBannerTab(tabId, btn) {
  document.querySelectorAll('#heroBannerTabs .w-tab').forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');

  document.querySelectorAll('.banner-panel').forEach(panel => {
    panel.classList.remove('active');
  });

  const activePanel = document.getElementById(`panel-${tabId}`);
  if (activePanel) {
    activePanel.classList.add('active');
  }
}

// 4. Portfolio Category Filtering
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
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// 5. Capabilities & Tech Matrix Slider
let currentSlideIndex = 0;
const totalSlides = 5;
let sliderAutoInterval = null;

function goToSlide(index) {
  currentSlideIndex = (index + totalSlides) % totalSlides;
  
  const track = document.getElementById('sliderTrack');
  if (track) {
    track.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
  }

  // Update tabs
  const tabs = document.querySelectorAll('#sliderTabsNav .s-nav-tab');
  tabs.forEach((tab, idx) => {
    tab.classList.toggle('active', idx === currentSlideIndex);
  });

  // Update dots
  const dots = document.querySelectorAll('#sliderDots .dot-ind');
  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === currentSlideIndex);
  });
}

function nextSlide() {
  goToSlide(currentSlideIndex + 1);
}

function prevSlide() {
  goToSlide(currentSlideIndex - 1);
}

function startSliderAutoplay() {
  stopSliderAutoplay();
  sliderAutoInterval = setInterval(() => {
    nextSlide();
  }, 5000);
}

function stopSliderAutoplay() {
  if (sliderAutoInterval) {
    clearInterval(sliderAutoInterval);
    sliderAutoInterval = null;
  }
}

// Pause slider on hover
const sliderContainer = document.querySelector('.tech-slider-container');
if (sliderContainer) {
  sliderContainer.addEventListener('mouseenter', stopSliderAutoplay);
  sliderContainer.addEventListener('mouseleave', startSliderAutoplay);
}

// 6. Preselect service in Contact form
function preselectService(serviceName) {
  const select = document.getElementById('serviceSelect');
  if (select) {
    select.value = serviceName;
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
      feedback.textContent = `Thank you ${name}! Your inquiry for "${service}" has been received. Our engineering studio will review your requirements and reply to ${email} within 2 hours.`;
      feedback.className = 'form-feedback success';
    }
    if (submitBtn) {
      submitBtn.innerHTML = '<span>Message Sent Successfully! ✓</span>';
      submitBtn.style.background = '#059669';
      submitBtn.style.opacity = '1';
    }
    
    // Prepare mailto link trigger fallback
    const mailtoLink = `mailto:vijay@unique-creations.biz?subject=VP Tech Inquiry: ${encodeURIComponent(service)}&body=Name: ${encodeURIComponent(name)}%0D%0AEmail: ${encodeURIComponent(email)}%0D%0A%0D%0A${encodeURIComponent(message)}`;
    console.log('Inquiry prepared:', mailtoLink);
  }, 600);
}

// 8. Interactive Project Assistant Widget
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

  // Response
  setTimeout(() => {
    const botMsgEl = document.createElement('div');
    botMsgEl.className = 'ai-msg bot';
    botMsgEl.innerHTML = generateAiResponse(userText);
    messagesContainer.appendChild(botMsgEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, 450);
}

function generateAiResponse(query) {
  const q = query.toLowerCase();

  if (q.includes('mobile') || q.includes('ios') || q.includes('android') || q.includes('react native') || q.includes('flutter')) {
    return '📱 <strong>Mobile Engineering:</strong> We specialize in cross-platform iOS & Android apps built with <strong>React Native, Expo, and Flutter</strong>. Features include biometric login, 120Hz smooth animations, offline Wasabi S3 caching, and multi-tenant architecture.';
  } else if (q.includes('billing') || q.includes('fee') || q.includes('invoice') || q.includes('payment') || q.includes('enach')) {
    return '🧾 <strong>Billing & Invoicing Systems:</strong> We engineer high-security billing software, GST invoicing, student fee collection systems, recurring E-NACH mandates, and multi-gateway integrations (Razorpay, NTT Data/Atom) with automated reconciliation.';
  } else if (q.includes('brochure') || q.includes('visiting') || q.includes('card') || q.includes('logo') || q.includes('design') || q.includes('adobe')) {
    return '🎨 <strong>Adobe Creative Suite Design:</strong> We design multi-page corporate brochures, luxury visiting cards (embossed & spot UV), vector logos, and complete brand style guides in Adobe Illustrator, InDesign, and Photoshop.';
  } else if (q.includes('cloud') || q.includes('backend') || q.includes('api') || q.includes('fastapi') || q.includes('database')) {
    return '☁️ <strong>Cloud Infrastructure:</strong> High-performance FastAPI & Node.js backend services, PostgreSQL database clustering, Wasabi S3 encrypted object storage, and Redis caching built for 99.98% production uptime.';
  } else if (q.includes('price') || q.includes('cost') || q.includes('estimate') || q.includes('quote')) {
    return '💡 <strong>Project Consultation:</strong> Reach out via our contact form to discuss scope and get an accurate technical estimate tailored to your requirements!';
  } else {
    return '✨ <strong>VP Tech Labs:</strong> We build Mobile Apps, Enterprise Web SaaS, Billing & Invoicing software, E-Commerce, and Corporate Brochures & Visiting Cards. Email us directly at <a href="mailto:vijay@unique-creations.biz" style="color:#38bdf8;">vijay@unique-creations.biz</a> to get started!';
  }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  startSliderAutoplay();
});
