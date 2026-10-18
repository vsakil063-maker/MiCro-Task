document.addEventListener('DOMContentLoaded', () => {
  const state = getLotteryState();
  const machine = document.getElementById('lottery-machine');
  const revealedBall = document.getElementById('revealed-ball');
  const winnerCard = document.getElementById('winner-card');
  const winnerTicketEl = document.getElementById('winner-ticket-num');
  const winnerUserEl = document.getElementById('winner-user-name');
  const drawActionBtn = document.getElementById('btn-start-animation');

  if (!machine) return;

  drawActionBtn.addEventListener('click', () => {
    drawActionBtn.disabled = true;
    drawActionBtn.innerText = 'ড্র প্রক্রিয়া চলছে...';
    machine.classList.add('spinning');

    setTimeout(() => {
      machine.classList.remove('spinning');
      revealedBall.classList.add('show');
      
      revealedBall.innerText = state.winningTicket.replace('TKT-', '');
      winnerTicketEl.innerText = state.winningTicket;
      winnerUserEl.innerText = state.winningUserName;

      winnerCard.style.display = 'block';
      drawActionBtn.innerText = 'ড্র সম্পন্ন হয়েছে';
      
      runConfetti();

      const myTickets = getTickets();
      let hasWon = false;
      myTickets.forEach(t => {
        if (t.ticketId === state.winningTicket) {
          t.isWinner = true;
          hasWon = true;
        }
      });
      localStorage.setItem(MT_TICKETS_KEY, JSON.stringify(myTickets));

      if (hasWon) {
        alert('🎉 অভিনন্দন! আপনার কেনা টিকিটটি লটারিতে বিজয়ী হয়েছে!');
      }
    }, 3000);
  });
});

function runConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = [];
  const colors = ['#f5a623', '#ffd700', '#7928ca', '#9e5cf7', '#10b981', '#ffffff'];

  for (let i = 0; i < 80; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: Math.random() * 4 + 2,
      speedX: Math.random() * 2 - 1
    });
  }

  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size);
    });
    if (pieces.some(p => p.y < canvas.height)) {
      requestAnimationFrame(frame);
    }
  }
  frame();
}
