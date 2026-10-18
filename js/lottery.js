const MT_LOTTERY_STATE_KEY = 'mt_lottery_state';
const MT_TICKETS_KEY = 'mt_lottery_tickets';
const MT_HISTORY_KEY = 'mt_lottery_history';

const defaultLotteryState = {
  currentDrawId: 'DRAW-WK-2026-42',
  title: 'Weekly Super Cash Bonanza',
  ticketPrice: 50,
  grandPrize: '৳৫০,০০০',
  secondPrize: '৳২০,০০০',
  thirdPrize: '৳১০,০০০',
  drawTime: new Date(Date.now() + 86400000 * 2).toISOString(),
  status: 'OPEN',
  winningTicket: 'TKT-74892',
  winningUserName: 'Kabir Hossain'
};

function getLotteryState() {
  const state = localStorage.getItem(MT_LOTTERY_STATE_KEY);
  if (!state) {
    localStorage.setItem(MT_LOTTERY_STATE_KEY, JSON.stringify(defaultLotteryState));
    return defaultLotteryState;
  }
  return JSON.parse(state);
}

function getTickets() {
  const tickets = localStorage.getItem(MT_TICKETS_KEY);
  return tickets ? JSON.parse(tickets) : [];
}

function startCountdown(targetDateStr) {
  const timerDays = document.getElementById('timer-days');
  const timerHours = document.getElementById('timer-hours');
  const timerMins = document.getElementById('timer-mins');
  const timerSecs = document.getElementById('timer-secs');

  if (!timerDays) return;

  const targetDate = new Date(targetDateStr).getTime();

  function update() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      timerDays.innerText = '00';
      timerHours.innerText = '00';
      timerMins.innerText = '00';
      timerSecs.innerText = '00';
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    timerDays.innerText = String(d).padStart(2, '0');
    timerHours.innerText = String(h).padStart(2, '0');
    timerMins.innerText = String(m).padStart(2, '0');
    timerSecs.innerText = String(s).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
  const state = getLotteryState();
  const allTickets = getTickets();

  const totalEntriesEl = document.getElementById('total-entries-count');
  if (totalEntriesEl) {
    totalEntriesEl.innerText = allTickets.length + 185;
  }

  const statusBadge = document.getElementById('draw-status-badge');
  if (statusBadge) {
    statusBadge.innerText = state.status;
    statusBadge.className = `badge badge-${state.status.toLowerCase()}`;
  }

  if (document.getElementById('timer-days')) {
    startCountdown(state.drawTime);
  }
});
