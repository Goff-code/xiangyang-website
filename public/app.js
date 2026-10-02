'use strict';

const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const scrollBehavior = () => motionQuery.matches ? 'instant' : 'smooth';
const track = document.querySelector('#members-track');
const slideButtons = [...document.querySelectorAll('[data-slide]')];
const updateCarousel = () => {
  const end = track.scrollWidth - track.clientWidth;
  slideButtons.forEach(button => {
    button.disabled = Number(button.dataset.slide) < 0 ? track.scrollLeft <= 2 : track.scrollLeft >= end - 2;
  });
};
slideButtons.forEach(button => button.addEventListener('click', () => {
  const card = track.querySelector('.member-card');
  const step = card.getBoundingClientRect().width + 22;
  const count = Math.max(1, Math.floor(track.clientWidth / step));
  track.scrollBy({ left: step * count * Number(button.dataset.slide), behavior: scrollBehavior() });
}));
track.addEventListener('scroll', updateCarousel, { passive: true });
new ResizeObserver(updateCarousel).observe(track);
updateCarousel();

let toastTimer;
const toast = document.querySelector('#toast');
function notify(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('visible');
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 4000);
}

async function copyWechat(value, button) {
  let copied = false;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      copied = true;
    }
  } catch { /* Some in-app browsers disallow the Clipboard API. */ }
  if (!copied) {
    const field = document.createElement('textarea');
    field.value = value;
    field.setAttribute('readonly', '');
    field.style.cssText = 'position:fixed;top:0;left:0;opacity:0;width:1px;height:1px;';
    const host = document.querySelector('#qr-dialog').open ? document.querySelector('#qr-dialog') : document.body;
    host.append(field);
    field.focus();
    field.select();
    field.setSelectionRange(0, field.value.length);
    try { copied = document.execCommand('copy'); } catch { copied = false; }
    field.remove();
    button?.focus({ preventScroll: true });
  }
  if (copied) {
    notify(`已复制微信号 ${value}，添加时请备注「向阳前行」`);
    if (button) {
      const previous = button.textContent;
      button.textContent = '已复制';
      setTimeout(() => { button.textContent = previous; }, 2200);
    }
  } else {
    notify(`未能自动复制，请长按微信号 ${value} 手动复制。`);
    const hint = document.querySelector('#manual-copy-hint');
    hint.textContent = `微信号：${value}（可长按文字复制）`;
    hint.hidden = false;
  }
}
document.querySelectorAll('[data-copy]').forEach(button => button.addEventListener('click', () => copyWechat(button.dataset.copy, button)));

const contacts = {
  yang: { name: '杨筱卿', role: '创始人', wechat: 'lengyue818', image: 'assets/wechat-yang.jpg', filename: '杨筱卿-微信二维码.jpg', width: 639, height: 636 },
  xu: { name: '许国夫', role: '合伙人', wechat: 'Gof2088', image: 'assets/wechat-xu.png', filename: '许国夫-微信二维码.png', width: 960, height: 1418 }
};
const dialog = document.querySelector('#qr-dialog');
const dialogCopy = document.querySelector('#dialog-copy');
let activeContact = contacts.yang;
document.querySelectorAll('[data-qr]').forEach(button => button.addEventListener('click', () => {
  activeContact = contacts[button.dataset.qr];
  document.querySelector('#qr-dialog-title').textContent = `${activeContact.name}的微信`;
  document.querySelector('#qr-dialog-subtitle').textContent = `${activeContact.role} · 微信号 ${activeContact.wechat}`;
  const img = document.querySelector('#dialog-qr-image');
  img.src = activeContact.image;
  img.alt = `${activeContact.name}的原始微信二维码`;
  img.width = activeContact.width;
  img.height = activeContact.height;
  document.querySelector('#dialog-crop').classList.toggle('is-xu', button.dataset.qr === 'xu');
  const download = document.querySelector('#download-qr');
  download.href = activeContact.image;
  download.download = activeContact.filename;
  document.querySelector('#manual-copy-hint').hidden = true;
  dialog.showModal();
  document.body.classList.add('dialog-open');
}));
dialogCopy.addEventListener('click', () => copyWechat(activeContact.wechat, dialogCopy));
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const box = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
});
dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));

document.querySelectorAll('[data-plan]').forEach(link => link.addEventListener('click', () => {
  const context = document.querySelector('#consult-context');
  context.textContent = `你正在了解 ${link.dataset.plan} 会员。添加微信后，可以直接告诉我们。`;
  context.hidden = false;
}));

const mobileBar = document.querySelector('#mobile-consult');
const contactObserver = new IntersectionObserver(entries => {
  mobileBar.classList.toggle('is-hidden', entries[0].isIntersecting);
}, { threshold: 0.05 });
contactObserver.observe(document.querySelector('#contact'));

// Modest motion supports reading; content is never dependent on animations.
if (!motionQuery.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('entered');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.section-heading, .audience-grid, .moments-grid, .plans-grid, .about-grid').forEach(element => {
    element.classList.add('reveal-ready');
    observer.observe(element);
  });
}
