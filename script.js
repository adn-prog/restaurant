/* ─── Toggle meal details ─── */
function toggleDetails(id) {
  const row = document.getElementById(id);
  const isOpen = row.style.display === 'table-row';
  // Close all
  document.querySelectorAll('.details').forEach(r => {
    r.style.display = 'none';
    r.classList.remove('fade');
  });
  if (!isOpen) {
    row.style.display = 'table-row';
    row.classList.add('fade');
    row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

/* ─── Update order total ─── */
function updateTotal() {
  let sum = 0;
  document.querySelectorAll('input[type=checkbox]:checked').forEach(e => {
    sum += parseInt(e.value);
  });
  const totalEl = document.getElementById('total');
  totalEl.textContent = sum;
  // Pulse animation
  totalEl.style.transform = 'scale(1.3)';
  setTimeout(() => { totalEl.style.transform = 'scale(1)'; }, 200);
}

/* ─── Show order form ─── */
function showForm() {
  const form = document.getElementById('formSection');
  if (!form) return;
  // Check at least one meal is selected
  const checked = document.querySelectorAll('input[type=checkbox]:checked');
  if (checked.length === 0) {
    showToast('⚠️ الرجاء اختيار وجبة واحدة على الأقل', 'warn');
    return;
  }
  form.style.display = 'block';
  form.classList.add('fade');
  form.scrollIntoView({ behavior: 'smooth' });
}

/* ─── Validate & submit ─── */
function validateForm() {
  const nameVal     = document.getElementById('name').value.trim();
  const nationalVal = document.getElementById('national').value.trim();
  const phoneVal    = document.getElementById('phone').value.trim();
  const emailVal    = document.getElementById('email').value.trim();
  const dateVal     = document.getElementById('date').value.trim();

  const nameRx     = /^[\p{L}\s]+$/u;
  const nationalRx = /^[0-9]{11}$/;
  const phoneRx    = /^09[0-9]{8}$/;
  const emailRx    = /^\S+@\S+\.\S+$/;
  const dateRx     = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;

  if (!nameRx.test(nameVal))         { showToast('❌ اسم غير صحيح', 'error'); return false; }
  if (!nationalRx.test(nationalVal)) { showToast('❌ الرقم الوطني يجب أن يكون 11 رقماً', 'error'); return false; }
  if (dateVal && !dateRx.test(dateVal)) { showToast('❌ صيغة التاريخ: يوم-شهر-سنة', 'error'); return false; }
  if (!phoneRx.test(phoneVal))       { showToast('❌ رقم الهاتف يجب أن يبدأ بـ 09', 'error'); return false; }
  if (!emailRx.test(emailVal))       { showToast('❌ بريد إلكتروني غير صحيح', 'error'); return false; }

  // Gather selected meals
  const meals = [];
  document.querySelectorAll('input[type=checkbox]:checked').forEach(e => {
    const row = e.closest('tr');
    if (row) {
      const nameCell = row.querySelector('td:nth-child(4)');
      if (nameCell) meals.push(nameCell.innerText.trim());
    }
  });

  showToast('✅ تم إرسال طلبك بنجاح! سيتم التواصل معك قريباً 🍽️', 'success');

  // Reset form
  setTimeout(() => {
    document.getElementById('formSection').style.display = 'none';
    document.querySelectorAll('input[type=checkbox]').forEach(cb => cb.checked = false);
    updateTotal();
  }, 3000);

  return false;
}

/* ─── Toast notifications ─── */
function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.style.cssText = `
      position: fixed; top: 90px; left: 50%; transform: translateX(-50%);
      z-index: 9999; display: flex; flex-direction: column; gap: 10px;
      pointer-events: none;
    `;
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  const colors = {
    success: 'linear-gradient(135deg,#22c55e,#16a34a)',
    error:   'linear-gradient(135deg,#ef4444,#b91c1c)',
    warn:    'linear-gradient(135deg,#f59e0b,#d97706)',
  };
  toast.style.cssText = `
    background: ${colors[type] || colors.success};
    color: #fff;
    padding: 14px 28px;
    border-radius: 50px;
    font-family: 'Cairo', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    box-shadow: 0 8px 30px rgba(0,0,0,0.4);
    opacity: 0;
    transform: translateY(-12px);
    transition: all 0.35s cubic-bezier(.4,0,.2,1);
    direction: rtl;
    white-space: nowrap;
    pointer-events: none;
  `;
  toast.textContent = message;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-12px)';
    setTimeout(() => toast.remove(), 350);
  }, 3200);
}

/* ─── Navigate to home (index) ─── */
function goToSite() {
  window.location.href = 'index.html';
}

/* ─── Animate total span ─── */
document.addEventListener('DOMContentLoaded', () => {
  const totalEl = document.getElementById('total');
  if (totalEl) {
    totalEl.style.transition = 'transform 0.2s ease';
  }
});



