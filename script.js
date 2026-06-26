/* =========================================================
   LeaveTrack — script.js
   Central JS for all pages. No backend, no external deps.
   All data stored in localStorage.
   ========================================================= */

// ── Auth ─────────────────────────────────────────────────

function requireLogin() {
  if (!sessionStorage.getItem('loggedIn')) {
    window.location.href = 'index.html';
  }
}

function logout() {
  sessionStorage.removeItem('loggedIn');
  window.location.href = 'index.html';
}

// ── Sidebar toggle (mobile) ───────────────────────────────

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.classList.toggle('open');
}

// Close sidebar when clicking outside on mobile
document.addEventListener('click', function (e) {
  const sidebar = document.getElementById('sidebar');
  const toggle  = document.querySelector('.sidebar-toggle');
  if (sidebar && sidebar.classList.contains('open') &&
      !sidebar.contains(e.target) && e.target !== toggle &&
      !(toggle && toggle.contains(e.target))) {
    sidebar.classList.remove('open');
  }
});

// ── Employee storage helpers ──────────────────────────────

function getEmployees() {
  try {
    return JSON.parse(localStorage.getItem('elm_employees') || '[]');
  } catch (e) {
    return [];
  }
}

function saveEmployees(arr) {
  localStorage.setItem('elm_employees', JSON.stringify(arr));
}

// ── Leave storage helpers ─────────────────────────────────

function getLeaves() {
  try {
    return JSON.parse(localStorage.getItem('elm_leaves') || '[]');
  } catch (e) {
    return [];
  }
}

function saveLeaves(arr) {
  localStorage.setItem('elm_leaves', JSON.stringify(arr));
}

// ── Utility: status badge class ───────────────────────────

function statusBadge(status) {
  switch (status) {
    case 'Approved': return 'bg-success-soft text-success';
    case 'Rejected': return 'bg-danger-soft text-danger';
    case 'Pending':  return 'bg-warning-soft text-warning';
    default:         return 'bg-secondary text-white';
  }
}

// ── Seed demo data on first load ──────────────────────────

(function seedDemoData() {
  if (localStorage.getItem('elm_seeded')) return;

  const employees = [
    { id: '1001', empId: 'EMP001', name: 'Ravi Kumar',    dept: 'Engineering',      desig: 'Software Engineer',  email: 'ravi@company.com',    phone: '9876543210' },
    { id: '1002', empId: 'EMP002', name: 'Priya Sharma',  dept: 'Human Resources',  desig: 'HR Manager',         email: 'priya@company.com',   phone: '9876543211' },
    { id: '1003', empId: 'EMP003', name: 'Arjun Nair',    dept: 'Finance',          desig: 'Accountant',         email: 'arjun@company.com',   phone: '9876543212' },
    { id: '1004', empId: 'EMP004', name: 'Sneha Reddy',   dept: 'Marketing',        desig: 'Marketing Executive',email: 'sneha@company.com',   phone: '9876543213' },
    { id: '1005', empId: 'EMP005', name: 'Karan Mehta',   dept: 'Operations',       desig: 'Operations Lead',    email: 'karan@company.com',   phone: '9876543214' },
  ];

  const today = new Date();
  const fmt   = d => d.toISOString().split('T')[0];
  const dPlus = n => { const d = new Date(today); d.setDate(d.getDate() + n); return fmt(d); };
  const dMinus= n => { const d = new Date(today); d.setDate(d.getDate() - n); return fmt(d); };

  const leaves = [
    { id: '2001', empLocalId:'1001', empName:'Ravi Kumar',   leaveType:'Casual Leave',  from:dPlus(3),  to:dPlus(5),   days:3, reason:'Family function',     status:'Pending',  appliedOn:fmt(today) },
    { id: '2002', empLocalId:'1002', empName:'Priya Sharma', leaveType:'Sick Leave',    from:dMinus(2), to:dMinus(1),  days:2, reason:'Fever and cold',       status:'Approved', appliedOn:dMinus(3) },
    { id: '2003', empLocalId:'1003', empName:'Arjun Nair',   leaveType:'Earned Leave',  from:dPlus(10), to:dPlus(14),  days:5, reason:'Vacation',             status:'Pending',  appliedOn:fmt(today) },
    { id: '2004', empLocalId:'1004', empName:'Sneha Reddy',  leaveType:'Emergency Leave',from:dMinus(5),to:dMinus(5),  days:1, reason:'Medical emergency',    status:'Approved', appliedOn:dMinus(6) },
    { id: '2005', empLocalId:'1005', empName:'Karan Mehta',  leaveType:'Unpaid Leave',  from:dPlus(1),  to:dPlus(2),   days:2, reason:'Personal work',        status:'Rejected', appliedOn:dMinus(1) },
  ];

  saveEmployees(employees);
  saveLeaves(leaves);
  localStorage.setItem('elm_seeded', '1');
})();
