const mockHistoryData = [
  {
    drawId: 'DRAW-WK-2026-41',
    title: 'Weekly Grand Festival 41',
    date: '2026-10-11',
    winningTicket: 'TKT-88492',
    winnerName: 'Sumon Ahmed',
    prize: '৳৫০,০০০'
  },
  {
    drawId: 'DRAW-WK-2026-40',
    title: 'Weekly Cash Surge 40',
    date: '2026-10-04',
    winningTicket: 'TKT-19284',
    winnerName: 'Tanzila Akter',
    prize: '৳৫০,০০০'
  },
  {
    drawId: 'DRAW-WK-2026-39',
    title: 'Weekly Wealth Drop 39',
    date: '2026-09-27',
    winningTicket: 'TKT-55201',
    winnerName: 'Mehedi Hasan',
    prize: '৳৫০,০০০'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const historyListContainer = document.getElementById('history-list-container');
  if (!historyListContainer) return;

  const userTickets = getTickets();

  historyListContainer.innerHTML = mockHistoryData.map(h => {
    const isUserParticipant = userTickets.some(t => t.drawId === h.drawId);
    return `
      <div class="stat-item" style="text-align: left; margin-bottom: 12px; background: var(--bg-card); border: 1px solid var(--border-color); padding: 14px; border-radius: 14px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <strong style="color: var(--gold-primary); font-size: 0.95rem;">${h.title}</strong>
          <span style="font-size: 0.75rem; color: var(--text-secondary);">${h.date}</span>
        </div>
        <div style="margin: 8px 0; font-size: 0.82rem; color: var(--text-secondary);">
          ড্র আইডি: <span style="color:#fff;">${h.drawId}</span>
        </div>
        <div style="background: rgba(0,0,0,0.25); padding: 8px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-size: 0.72rem; color: var(--text-secondary);">বিজয়ী টিকিট</div>
            <div style="color: var(--gold-primary); font-weight: 800;">${h.winningTicket}</div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 0.72rem; color: var(--text-secondary);">পুরস্কার ও বিজেতা</div>
            <div style="font-size: 0.85rem; font-weight: 600;">${h.prize} - ${h.winnerName}</div>
          </div>
        </div>
        <div style="margin-top: 8px; font-size: 0.75rem; color: ${isUserParticipant ? '#10b981' : '#94a3b8'};">
          ${isUserParticipant ? '✓ আপনি এই ড্র-তে অংশগ্রহণ করেছিলেন' : 'অংশগ্রহণ করেননি'}
        </div>
      </div>
    `;
  }).join('');
});
