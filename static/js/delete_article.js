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