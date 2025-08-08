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

// Logout по нажатию кнопки
function logout() {
  fetch("/logout",
    {
      method: "POST",
      headers: {
        "X-CSRFToken": getCookie("csrftoken"), // обязательный CSRF токен
        "Content-Type": "application/json"
    }
    })
    .then(response => {
    if (response.ok) {
      window.location.href = "/";  // перенаправление после выхода
    }
  });
}

// Отправка запроса на авторизацию по ajax
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    fetch("/login", {
        method: 'POST',
        body: formData,
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = data.redirect_url;  // редирект
        } else {
            document.getElementById('loginError').innerText = data.message;
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });
});

// получение куки
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Совпадение имени cookie
      if (cookie.substring(0, name.length + 1) === (name + "=")) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

// Функция для открытия модального окна удаления статьи
function openDeleteModal(articleTitle) {
  document.getElementById('articleTitle').innerText = articleTitle;
  document.getElementById('deleteModal').style.display = 'block';
}

// Функция для закрытия модального окна удаления статьи
function closeDeleteModal() {
  document.getElementById('deleteModal').style.display = 'none';
}

// Закрытие модального окна удаления статьи, если кликнуть вне его
window.onclick = function(event) {
  if (event.target === document.getElementById('deleteModal')) {
    closeDeleteModal();
  }
}

// Отправка запроса на удаление статьи по ajax
