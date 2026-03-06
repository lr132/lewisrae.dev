// theme toggle
const themeToggle = document.getElementById('themeToggle');
const iconMoon    = themeToggle.querySelector('.icon-moon');
const iconSun     = themeToggle.querySelector('.icon-sun');

function setTheme(light) {
  document.documentElement.classList.toggle('light', light);
  iconMoon.style.display = light ? ''     : 'none';
  iconSun.style.display  = light ? 'none' : '';
  localStorage.setItem('theme', light ? 'light' : 'dark');
}

setTheme(localStorage.getItem('theme') === 'light');
themeToggle.addEventListener('click', () => {
  setTheme(!document.documentElement.classList.contains('light'));
});

// nav scroll
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.section-title, .about-grid, .projects-grid, .contact-container, .footer')
  .forEach(el => { el.classList.add('reveal'); observer.observe(el); });

// smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// terminal
const terminalWindow = document.getElementById('terminalWindow');
const terminalBody   = document.getElementById('terminalBody');
const terminalInput  = document.getElementById('terminalInput');
const terminalBtn    = document.getElementById('terminalBtn');
const termClose      = document.getElementById('termClose');
const dragBar        = document.getElementById('terminalDragBar');

let isOpen = false;
let cmdHistory = [];
let historyIndex = -1;

function openTerminal() {
  terminalWindow.style.display = 'block';
  terminalBtn.classList.add('active');
  isOpen = true;
  if (terminalBody.children.length === 0) {
    printLines(COMMANDS.help());
  }
  setTimeout(() => terminalInput.focus(), 50);
}

function closeTerminal() {
  terminalWindow.style.display = 'none';
  terminalBtn.classList.remove('active');
  isOpen = false;
}

terminalBtn.addEventListener('click', () => isOpen ? closeTerminal() : openTerminal());
termClose.addEventListener('click', closeTerminal);

// drag
let dragging = false, dragOffX = 0, dragOffY = 0;

dragBar.addEventListener('mousedown', e => {
  if (e.target === termClose) return;
  dragging = true;
  const rect = terminalWindow.getBoundingClientRect();
  dragOffX = e.clientX - rect.left;
  dragOffY = e.clientY - rect.top;
  terminalWindow.style.transition = 'none';
});

document.addEventListener('mousemove', e => {
  if (!dragging) return;
  let x = e.clientX - dragOffX;
  let y = e.clientY - dragOffY;
  x = Math.max(0, Math.min(x, window.innerWidth  - terminalWindow.offsetWidth));
  y = Math.max(0, Math.min(y, window.innerHeight - terminalWindow.offsetHeight));
  terminalWindow.style.right = 'auto';
  terminalWindow.style.left = x + 'px';
  terminalWindow.style.top  = y + 'px';
});

document.addEventListener('mouseup', () => { dragging = false; });

// commands
const COMMANDS = {
  help: () => [
    'Available commands:',
    '<span class="t-muted">  whoami &nbsp;&nbsp;&nbsp;— about me</span>',
    '<span class="t-muted">  alevels &nbsp;— A Level results</span>',
    '<span class="t-muted">  gcses &nbsp;&nbsp;&nbsp;— GCSE results</span>',
    '<span class="t-muted">  skills &nbsp;&nbsp;— languages &amp; tools</span>',
    '<span class="t-muted">  projects — current projects</span>',
    '<span class="t-muted">  contact &nbsp;— get in touch</span>',
    '<span class="t-muted">  github &nbsp;&nbsp;— open GitHub</span>',
    '<span class="t-muted">  linkedin — open LinkedIn</span>',
    '<span class="t-muted">  clear &nbsp;&nbsp;&nbsp;— clear terminal</span>',
  ],

  whoami: () => [
    'Lewis Rae',
    '<span class="t-muted">Second year Computer Science student.</span>',
    '<span class="t-muted">Passionate about software, always building something.</span>',
  ],

  alevels: () => [
    'A Level Results:',
    '<span class="t-muted">  Computer Science &nbsp;— <span class="t-success">A</span></span>',
    '<span class="t-muted">  Mathematics &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;— <span class="t-success">A</span></span>',
    '<span class="t-muted">  Physics &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;— <span class="t-success">A*</span></span>',
    '',
    'AS Level:',
    '<span class="t-muted">  Further Mathematics — <span class="t-success">A</span></span>',
  ],

  gcses: () => [
    'GCSE Results &nbsp;(10 subjects):',
    '<span class="t-muted">  9 &nbsp;×6 &nbsp;&nbsp;<span class="t-success">██████</span></span>',
    '<span class="t-muted">  8 &nbsp;×2 &nbsp;&nbsp;<span style="color:#9d91f5">██</span></span>',
    '<span class="t-muted">  7 &nbsp;×1 &nbsp;&nbsp;<span class="t-muted">█</span></span>',
    '<span class="t-muted">  6 &nbsp;×1 &nbsp;&nbsp;<span class="t-muted">█</span></span>',
  ],

  skills: () => [
    'Languages: Python, Java, C, JavaScript, Haskell, Rocq',
    'GUI &amp; Data: JavaFX, FXML, SQL',
    'Tools: &nbsp;&nbsp;&nbsp;&nbsp;Git, Linux, VS Code, IntelliJ, Docker, LaTeX',
  ],

  projects: () => [
    'Projects:',
    '<span class="t-muted">  nothing here yet - work in progress.</span>',
    '<span class="t-muted">  check back soon.</span>',
  ],

  contact: () => [
    'GitHub: &nbsp;&nbsp;<a href="https://github.com/lr132" target="_blank" rel="noopener" style="color:var(--accent-light)">github.com/lr132</a>',
    'LinkedIn: <a href="https://www.linkedin.com/in/lewis-rae-lr/" target="_blank" rel="noopener" style="color:var(--accent-light)">linkedin.com/in/lewis-rae-lr</a>',
  ],

  github: () => {
    window.open('https://github.com/lr132', '_blank', 'noopener');
    return ['Opening GitHub...'];
  },

  linkedin: () => {
    window.open('https://www.linkedin.com/in/lewis-rae-lr/', '_blank', 'noopener');
    return ['Opening LinkedIn...'];
  },

  clear: () => {
    terminalBody.innerHTML = '';
    return null;
  },
};

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function printLines(lines) {
  if (!lines) return;
  const out = document.createElement('div');
  out.className = 'terminal-output';
  out.innerHTML = lines.map(l => l === '' ? '&nbsp;' : l).join('<br>');
  terminalBody.appendChild(out);
  terminalBody.scrollTop = terminalBody.scrollHeight;
}

function runCommand(raw) {
  const cmd = raw.trim().replace(/^\//, '').toLowerCase();
  if (!cmd) return;

  cmdHistory.unshift(raw);
  historyIndex = -1;

  const line = document.createElement('div');
  line.className = 'terminal-line';
  line.innerHTML = `<span class="t-accent">lewis@lewisrae.dev</span><span class="t-muted">:~$</span> <span class="t-cmd">${escapeHtml(raw)}</span>`;
  terminalBody.appendChild(line);

  if (cmd in COMMANDS) {
    printLines(COMMANDS[cmd]());
  } else {
    printLines([`<span class="t-error">command not found: ${escapeHtml(cmd)}</span>  (type <span class="t-cmd">help</span>)`]);
  }

  terminalBody.scrollTop = terminalBody.scrollHeight;
}

terminalInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    runCommand(terminalInput.value);
    terminalInput.value = '';
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (historyIndex < cmdHistory.length - 1) {
      terminalInput.value = cmdHistory[++historyIndex];
    }
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (historyIndex > 0) {
      terminalInput.value = cmdHistory[--historyIndex];
    } else {
      historyIndex = -1;
      terminalInput.value = '';
    }
  }
});

terminalWindow.addEventListener('click', () => terminalInput.focus());
