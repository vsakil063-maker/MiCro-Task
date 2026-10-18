document.addEventListener('DOMContentLoaded', () => {
  const state = getLotteryState();
  const user = getLoggedUser();

  const qtyInput = document.getElementById('ticket-quantity');
  const totalPriceEl = document.getElementById('total-ticket-price');
  const buyBtn = document.getElementById('btn-confirm-buy');
  const statusNote = document.getElementById('ticket-status-note');

  if (qtyInput && totalPriceEl) {
    if (state.status !== 'OPEN') {
      qtyInput.disabled = true;
      if (buyBtn) buyBtn.disabled = true;
      if (statusNote) {
        statusNote.innerText = `লটারি বর্তমানে ${state.status} অবস্থায় আছে। নতুন টিকিট নেওয়া বন্ধ।`;
        statusNote.style.color = '#ef4444';
      }
    }

    function calcPrice() {
      const qty = parseInt(qtyInput.value) || 1;
      const total = qty * state.ticketPrice;
      totalPriceEl.innerText = `৳${total}`;
    }

    qtyInput.addEventListener('input', calcPrice);
    calcPrice();
  }

  let isSubmitting = false;

  window.handleTicketPurchase = function() {
    if (isSubmitting) return;
    if (state.status !== 'OPEN') {
      alert('দুঃখিত, এন্ট্রি এখন লক করা!');
      return;
    }

    const qty = parseInt(document.getElementById('ticket-quantity').value) || 1;
    const totalCost = qty * state.ticketPrice;

    if (user.demoBalance < totalCost) {
      alert('আপনার ডেমো ব্যালেন্স অপর্যাপ্ত! প্রোফাইল থেকে ডেমো ব্যালেন্স যোগ করুন।');
      return;
    }

    isSubmitting = true;
    const buyButton = document.getElementById('btn-confirm-buy');
    if (buyButton) buyButton.innerText = 'প্রক্রিয়াকরণ হচ্ছে...';

    setTimeout(() => {
      user.demoBalance -= totalCost;
      updateUserData(user);

      const existingTickets = getTickets();

      for (let i = 0; i < qty; i++) {
        const randNum = Math.floor(10000 + Math.random() * 90000);
        const ticketId = `TKT-${randNum}`;
        const entryId = `ENT-${Date.now().toString().slice(-5)}${i}`;

        const ticketItem = {
          ticketId: ticketId,
          entryId: entryId,
          drawId: state.currentDrawId,
          drawTitle: state.title,
          purchaseTime: new Date().toLocaleString('bn-BD'),
          price: state.ticketPrice,
          paymentStatus: 'ডেমো পরিশোধিত',
          entryStatus: 'নিশ্চিত',
          isWinner: false
        };
        existingTickets.unshift(ticketItem);
      }

      localStorage.setItem(MT_TICKETS_KEY, JSON.stringify(existingTickets));
      isSubmitting = false;
      document.getElementById('purchase-success-modal').style.display = 'flex';
    }, 600);
  };

  const myTicketsContainer = document.getElementById('my-tickets-container');
  if (myTicketsContainer) {
    const tickets = getTickets();
    if (tickets.length === 0) {
      myTicketsContainer.innerHTML = `
        <div style="text-align:center; padding: 40px 10px; color: var(--text-secondary);">
          <p style="font-size: 2.5rem; margin-bottom: 10px;">🎟️</p>
          <p>আপনার কোনো লটারি টিকিট কেনা নেই!</p>
          <a href="buy-ticket.html" class="btn btn-gold" style="margin-top: 15px;">এখনই টিকিট কাটুন</a>
        </div>
      `;
    } else {
      myTicketsContainer.innerHTML = tickets.map(t => `
        <div class="ticket-badge-card">
          <div>
            <div class="ticket-number">${t.ticketId}</div>
            <div style="font-size: 0.78rem; color: var(--text-secondary); margin: 3px 0;">Draw: ${t.drawId}</div>
            <div style="font-size: 0.72rem; color: var(--text-secondary);">তারিখ: ${t.purchaseTime}</div>
            <div style="font-size: 0.75rem; color: var(--gold-primary); margin-top: 4px;">মূল্য: ৳${t.price} (${t.paymentStatus})</div>
          </div>
          <div style="text-align: right;">
            <span class="badge badge-open">${t.entryStatus}</span>
            <div style="margin-top: 8px; font-size: 0.8rem; font-weight: 700; color: ${t.isWinner ? '#10b981' : 'var(--text-secondary)'}">
              ${t.isWinner ? '🎉 বিজয়ী!' : 'অপেক্ষমাণ'}
            </div>
          </div>
        </div>
      `).join('');
    }
  }
});
