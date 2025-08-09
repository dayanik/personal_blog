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