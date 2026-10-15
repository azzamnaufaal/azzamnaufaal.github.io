/* Portfolio interactions — cheerful edition */
(function () {
  'use strict';

  // Mobile menu
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  toggle.addEventListener('click', function () {
    links.classList.toggle('open');
  });
  links.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') links.classList.remove('open');
  });

  // Reveal on scroll (with a playful tilt)
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        en.target.classList.add('visible');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  // Typing effect for roles
  var roles = ['Data Analyst', 'BI Developer', 'Data Storyteller'];
  var typedEl = document.getElementById('typed');
  var ri = 0, ci = 0, deleting = false;
  function tick() {
    var word = roles[ri];
    if (!deleting) {
      ci++;
      typedEl.textContent = word.slice(0, ci);
      if (ci === word.length) { deleting = true; return void setTimeout(tick, 1800); }
      setTimeout(tick, 65);
    } else {
      ci--;
      typedEl.textContent = word.slice(0, ci);
      if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; return void setTimeout(tick, 350); }
      setTimeout(tick, 32);
    }
  }
  tick();

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Chat widget → WhatsApp ---------- */
  var WHATSAPP_NUMBER = '6285735676676';

  var bubble = document.getElementById('chatBubble');
  var panel = document.getElementById('chatPanel');
  var teaser = document.getElementById('chatTeaser');
  var closeBtn = document.getElementById('chatClose');
  var chatBody = document.getElementById('chatBody');
  var chatForm = document.getElementById('chatForm');
  var chatInput = document.getElementById('chatText');
  var chatQuick = document.getElementById('chatQuick');
  var greeted = false;

  function waLink(text) {
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text);
  }
  function addMsg(text, who) {
    var d = document.createElement('div');
    d.className = 'msg msg-' + who;
    d.textContent = text;
    chatBody.appendChild(d);
    chatBody.scrollTop = chatBody.scrollHeight;
  }
  function botSay(text, delay) {
    var t = document.createElement('div');
    t.className = 'msg msg-bot msg-typing';
    t.innerHTML = '<i></i><i></i><i></i>';
    setTimeout(function () {
      chatBody.appendChild(t);
      chatBody.scrollTop = chatBody.scrollHeight;
      setTimeout(function () {
        t.classList.remove('msg-typing');
        t.textContent = text;
        chatBody.scrollTop = chatBody.scrollHeight;
      }, 900);
    }, delay || 0);
  }
  function openChat() {
    panel.hidden = false;
    panel.classList.remove('open');
    void panel.offsetWidth;
    panel.classList.add('open');
    teaser.classList.remove('show');
    bubble.style.display = 'none';
    var navL = document.getElementById('navLinks');
    if (navL) navL.classList.remove('open');
    if (!greeted) {
      greeted = true;
      botSay('Halo! 👋 Aku asisten virtual Azzam.', 300);
      botSay('Butuh analis data, dashboard Power BI / Tableau, atau sekadar mau tanya-tanya? Tulis pesanmu di bawah — nanti langsung aku teruskan ke WhatsApp Azzam 📲', 1500);
    }
    setTimeout(function () { chatInput.focus(); }, 350);
  }
  function closeChat() {
    panel.hidden = true;
    bubble.style.display = 'flex';
  }
  function sendToWA(text) {
    text = (text || '').trim();
    if (!text) return;
    addMsg(text, 'user');
    chatInput.value = '';
    chatQuick.style.display = 'none';
    window.open(waLink(text), '_blank'); // langsung, sinkron — aman dari popup blocker
    botSay('Membuka WhatsApp... 🚀', 400);
  }
  bubble.addEventListener('click', openChat);
  closeBtn.addEventListener('click', closeChat);
  chatForm.addEventListener('submit', function (e) { e.preventDefault(); sendToWA(chatInput.value); });
  chatQuick.addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (b && b.dataset.q) sendToWA(b.dataset.q);
  });
  document.querySelectorAll('[data-chat]').forEach(function (a) {
    a.addEventListener('click', function (e) { e.preventDefault(); openChat(); });
  });
  setTimeout(function () {
    if (!greeted && panel.hidden) teaser.classList.add('show');
    setTimeout(function () { teaser.classList.remove('show'); }, 7000);
  }, 4000);
})();
