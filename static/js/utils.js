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
