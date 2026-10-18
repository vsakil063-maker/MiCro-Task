const MT_USER_KEY = 'mt_lottery_user';

const defaultUser = {
  id: 'USR-78921',
  name: 'Md. Ariful Islam',
  phone: '01712-345678',
  demoBalance: 500,
  joinedDate: '2026-01-10'
};

function getLoggedUser() {
  const user = localStorage.getItem(MT_USER_KEY);
  if (!user) {
    localStorage.setItem(MT_USER_KEY, JSON.stringify(defaultUser));
    return defaultUser;
  }
  return JSON.parse(user);
}

function updateUserData(updatedUser) {
  localStorage.setItem(MT_USER_KEY, JSON.stringify(updatedUser));
  updateUIUserBalance();
}

function updateUIUserBalance() {
  const user = getLoggedUser();
  const balanceElements = document.querySelectorAll('.user-balance-val');
  balanceElements.forEach(el => {
    el.innerText = `৳${user.demoBalance}`;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateUIUserBalance();
});
