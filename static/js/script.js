// Функция для открытия модального окна
function openLoginModal() {
  document.getElementById('loginModal').style.display = 'block';
}

// Функция для закрытия модального окна
function closeLoginModal() {
  document.getElementById('loginModal').style.display = 'none';
}

// Закрытие модального окна, если кликнуть вне его
window.onclick = function(event) {
  if (event.target === document.getElementById('loginModal')) {
    closeLoginModal();
  }
}
