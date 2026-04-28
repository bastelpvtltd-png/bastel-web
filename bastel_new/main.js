/* ============================================================
   BASTEL PVT LTD — main.js
   EmailJS: sends mail to bathiyapradeep@yahoo.com + auto-reply
   ============================================================ */

// ─── LOADER ──────────────────────────────────────────────────
const loader = document.getElementById('loader');
const progress = document.getElementById('loaderProgress');

let loadVal = 0;
const loadInterval = setInterval(() => {
  loadVal += Math.random() * 12 + 4;
  if (loadVal >= 100) {
    loadVal = 100;
    clearInterval(loadInterval);
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
      initReveal();
    }, 400);
  }
  progress.style.width = loadVal + '%';
}, 80);

document.body.style.overflow = 'hidden';

// ─── CUSTOM CURSOR ───────────────────────────────────────────
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');

if (cursor && cursorDot) {
  let mouseX = 0, mouseY = 0;
  let curX = 0, curY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`;
  });

  function animateCursor() {
    curX += (mouseX - curX) * 0.12;
    curY += (mouseY - curY) * 0.12;
    cursor.style.transform = `translate(${curX}px, ${curY}px) translate(-50%,-50%)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.querySelectorAll('a, button, .service-card, .mvv-card, .why-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '60px';
      cursor.style.height = '60px';
      cursor.style.borderColor = 'rgba(34,212,240,0.5)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '40px';
      cursor.style.height = '40px';
      cursor.style.borderColor = 'var(--cyan)';
    });
  });
}

// ─── NAVBAR ──────────────────────────────────────────────────
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

navToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const spans = navToggle.querySelectorAll('span');
  if (mobileMenu.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(4.5px, 4.5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(4.5px, -4.5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    const spans = navToggle.querySelectorAll('span');
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ─── SMOOTH SCROLL ───────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navH = nav.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ─── REVEAL ON SCROLL ────────────────────────────────────────
function initReveal() {
  const els = document.querySelectorAll('.reveal-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => observer.observe(el));
}

// ─── COUNTER ANIMATION ───────────────────────────────────────
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const duration = 2000;
  const start = performance.now();
  const update = (now) => {
    const elapsed = now - start;
    const prog = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - prog, 3);
    el.textContent = Math.round(eased * target);
    if (prog < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.stat-num').forEach(animateCounter);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) counterObserver.observe(heroStats);

// ─── CONTACT FORM — EMAILJS (Dual Email) ─────────────────────
// Mail 1: Owner (bathiyapradeep@yahoo.com) වෙත notification
// Mail 2: Sender (customer) වෙත auto-reply
const form = document.getElementById('contactForm');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const btn = form.querySelector('.btn-primary');
    const origText = btn.textContent;
    
    // UI එක update කිරීම
    btn.textContent = 'Sending...';
    btn.disabled = true;

    // Form එකෙන් values ලබා ගැනීම
    const fromName = document.getElementById('from_name').value;
    const fromEmail = document.getElementById('from_email').value;
    const serviceType = document.getElementById('service_type').value;
    const messageContent = document.getElementById('message_content').value;

    // EmailJS එකට යවන parameters
    const templateParams = {
      from_name: fromName,
      from_email: fromEmail,
      service: serviceType,
      message: messageContent
    };

    const SERVICE_ID = 'service_bfj2ua8'; // මෙතනට ඔයාගේ Service ID එක දාන්න
    const TEMPLATE_TO_OWNER = 'template_k3uoxrw'; // මෙතනට Owner Template ID එක දාන්න
    const TEMPLATE_AUTOREPLY = 'template_d6set95'; // මෙතනට Autoreply Template ID එක දාන්න

    // 1. Owner හට email එක යැවීම
    emailjs.send(SERVICE_ID, TEMPLATE_TO_OWNER, templateParams)
      .then(() => {
        // 2. පාරිභෝගිකයාට auto-reply එක යැවීම
        return emailjs.send(SERVICE_ID, TEMPLATE_AUTOREPLY, {
          to_email: fromEmail,
          to_name: fromName,
          message: "Thank you for contacting us. We have received your inquiry."
        });
      })
      .then(() => {
        // සාර්ථක වූ විට
        btn.textContent = 'Message Sent ✓';
        btn.style.background = '#1a7a4a';
        form.reset();
        
        setTimeout(() => {
          btn.textContent = origText;
          btn.style.background = '';
          btn.disabled = false;
        }, 3500);
      })
      .catch((error) => {
        // වැරදීමක් වූ විට
        console.error('EmailJS error:', error);
        btn.textContent = 'Error! Try Again';
        btn.disabled = false;
        btn.style.background = '#d9534f';
        
        setTimeout(() => {
          btn.textContent = origText;
          btn.style.background = '';
        }, 3000);
      });
  });
}

// ─── PARALLAX & ACTIVE NAV ────────────────────────────────────
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero-video');
  if (hero) hero.style.transform = `translateY(${window.scrollY * 0.25}px)`;

  let current = '';
  document.querySelectorAll('section[id]').forEach(sec => {
    if (window.scrollY + 120 >= sec.offsetTop) current = sec.id;
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
});

const dynStyle = document.createElement('style');
dynStyle.textContent = `.nav-link.active:not(.contact-btn) { color: var(--cyan) !important; }
.nav-link.active:not(.contact-btn)::after { width: 100% !important; }`;
document.head.appendChild(dynStyle);

// ─── GRAIN ANIMATION ─────────────────────────────────────────
function createGrain() {
  const grain = document.querySelector('.hero-grain');
  if (!grain) return;
  let frame = 0;
  const animate = () => {
    frame++;
    if (frame % 2 === 0) grain.style.backgroundPosition = `${Math.random()*100}% ${Math.random()*100}%`;
    requestAnimationFrame(animate);
  };
  animate();
}
createGrain();

// ─── CHATBOT ─────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const chatbotToggler = document.querySelector(".chatbot-toggler");
  const closeBtn       = document.querySelector(".close-btn");
  const chatbox        = document.querySelector(".chatbox");
  const chatInput      = document.querySelector(".chat-input textarea");
  const sendChatBtn    = document.querySelector("#send-btn");

  if (!chatbotToggler || !chatbox || !chatInput || !sendChatBtn) return;

  const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    chatLi.innerHTML = className === "outgoing"
      ? `<p></p>`
      : `<span class="icon">🤖</span><p></p>`;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
  };

  const generateResponse = (chatElement) => {
    const messageElement = chatElement.querySelector("p");
    setTimeout(() => {
      messageElement.textContent =
        "The chatbot is currently being updated to serve you better. 🛠️ Please use the 'Contact Us' form above to send an email, and we will get back to you immediately.";
      chatbox.scrollTo(0, chatbox.scrollHeight);
    }, 1000);
  };

  const handleChat = () => {
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;
    chatInput.value = "";
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    setTimeout(() => {
      const incomingChatLi = createChatLi("Checking system status...", "incoming");
      chatbox.appendChild(incomingChatLi);
      chatbox.scrollTo(0, chatbox.scrollHeight);
      generateResponse(incomingChatLi);
    }, 600);
  };

  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
      e.preventDefault();
      handleChat();
    }
  });

  sendChatBtn.addEventListener("click", handleChat);

  closeBtn.addEventListener("click", () => {
    document.body.classList.remove("show-chatbot");
  });

  chatbotToggler.addEventListener("click", () => {
    document.body.classList.toggle("show-chatbot");
  });

  console.log('Bastel Pvt Ltd — Global Trade Catalyst 🌐');
});
