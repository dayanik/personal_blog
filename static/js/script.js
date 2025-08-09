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

// Универсальная функция получения CSRF токена
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(name + "=")) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

// Общие заголовки с CSRF
function getHeaders(contentType = null) {
  const headers = {
    "X-CSRFToken": getCookie("csrftoken"),
  };
  if (contentType) {
    headers["Content-Type"] = contentType;
  }
  return headers;
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

// Отправка запроса на авторизацию по ajax
document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  try {
    const response = await fetch("/login", {
      method: "POST",
      body: formData,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRFToken": getCookie("csrftoken"),
      }
    });

    if (!response.ok) throw new Error(`Ошибка авторизации: ${response.status}`);

    const data = await response.json();

    if (data.success) {
      window.location.href = data.redirect_url;
    } else {
      showLoginError(data.message);
    }
  } catch (error) {
    console.error(error);
    showLoginError("Ошибка сервера. Попробуйте позже.");
  }
});

function showLoginError(message) {
  const errorElem = document.getElementById('loginError');
  if (errorElem) {
    errorElem.innerText = message;
  }
}

// Отправка запроса на удаление статьи по ajax
async function deleteArticle() {
  try {
    const response = await fetch("/delete", {
      method: "POST",
      headers: getHeaders("application/x-www-form-urlencoded"),
      body: `id=${encodeURIComponent(articleId)}`
    });

    if (!response.ok) throw new Error(`Ошибка удаления: ${response.status}`);

    const data = await response.json();

    if (data.success) {
      location.reload();
    } else {
      showDeleteError(data.error);
    }
  } catch (error) {
    showDeleteError(error.message);
  }
}

function showDeleteError(message) {
  const deleteText = document.getElementById('deleteText');
  const deleteYesBtn = document.getElementById('deleteYesBtn');

  if (deleteText) {
    deleteText.textContent = 'Ошибка: ' + message;
  }
  if (deleteYesBtn) {
    deleteYesBtn.style.display = 'none';
  }
}
