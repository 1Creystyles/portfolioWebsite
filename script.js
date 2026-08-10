
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (window.matchMedia('(pointer: fine)').matches && !prefersReducedMotion) {
  const light = document.getElementById('cursorLight');
  let ticking = false;
  window.addEventListener('mousemove', (e) => {
    if (!ticking) {
      requestAnimationFrame(() => {
        light.style.background = `radial-gradient(650px circle at ${e.clientX}px ${e.clientY}px, rgba(74, 127, 181, 0.12), transparent 40%)`;
        ticking = false;
      });
      ticking = true;
    }
  });
}

// Tab buttons
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// Terminal
const terminalLogs = document.getElementById('terminalLogs');
const terminalForm = document.getElementById('terminalForm');
const terminalInput = document.getElementById('terminalInput');

const responses = {
  help: 'Available commands: skills, projects, contact, clear, whoami',
  skills: 'Languages: TypeScript, JavaScript, Python, C++, SQL | Frameworks: Next.js, React, Tailwind, Three.js',
  projects: 'Featured: Synex Wealth Engine, Apex 3D Configurator, Neural Analytics Dashboard.',
  whoami: 'Obinna Armstrong Obinna — CS Student, Creative Engineer & WebGL Developer.',
  contact: 'Email: obinna@example.com | LinkedIn: linkedin.com/in/obinna-armstrong',
};

terminalForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const raw = terminalInput.value;
  const cmd = raw.trim().toLowerCase();

  if (cmd === 'clear') {
    terminalLogs.innerHTML = '';
    terminalInput.value = '';
    return;
  }

  const response = responses[cmd] || `Command not recognized: "${cmd}". Type "help" for a list of commands.`;

  const cmdLine = document.createElement('div');
  cmdLine.className = 'term-cmd';
  cmdLine.textContent = `> ${raw}`;
  terminalLogs.appendChild(cmdLine);

  const respLine = document.createElement('div');
  respLine.className = 'term-resp';
  respLine.textContent = response;
  terminalLogs.appendChild(respLine);

  terminalInput.value = '';
  terminalLogs.scrollTop = terminalLogs.scrollHeight;
});

