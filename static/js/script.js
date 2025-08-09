let articleId = null; // id статьи для удаления

// Функции для открытия модального окна
function openLoginModal() {
  document.getElementById('loginModal').style.display = 'block';
}

function openDeleteModal() {
  deleteBtn = document.getElementById('deleteBtn');
  articleId = deleteBtn.getAttribute('data-id');
  const articleTitle = deleteBtn.getAttribute('data-title');
  document.getElementById('deleteText').textContent = `Вы уверены, что хотите удалить статью "${articleTitle}"?`;
  document.getElementById('deleteModal').style.display = 'block';
}

// Функция для закрытия модального окна
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'none';
  }
}

// Закрытие модального окна, если кликнуть вне его
window.onclick = function(event) {
  const modals = ['deleteModal', 'loginModal'];
  modals.forEach(id => {
    const modal = document.getElementById(id);
    if (event.target === modal) {
      closeModal(id);
    }
  });
}

// Logout по нажатию кнопки
async function logout() {
  try {
    const response = await fetch("/logout", {
      method: "POST",
      headers: getHeaders("application/json")
    });

    if (!response.ok) throw new Error(`Ошибка выхода: ${response.status}`);

    window.location.href = "/";
  } catch (error) {
    console.error(error);
    alert("Не удалось выйти. Попробуйте позже.");
  }
}
