const button = document.getElementById("changeButton");
const clearButton = document.getElementById("clearButton");
const input = document.getElementById("userInput");
const dynamicText = document.getElementById("dynamicText");
const heroNote = document.getElementById("heroNote");
const messageBoard = document.getElementById("messageBoard");

let messages = JSON.parse(localStorage.getItem("blogMessages")) || [];

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

function renderMessages() {
    if (messages.length === 0) {
        messageBoard.innerHTML = `
      <div class="empty-message">
        No posts yet. Write your first message above.
      </div>
    `;
        return;
    }

    messageBoard.innerHTML = messages
        .map(
            (message) => `
        <div class="post-card">
          <div class="post-date">${message.date}</div>
          <div class="post-text">${escapeHtml(message.text)}</div>
        </div>
      `
        )
        .join("");
}

button.addEventListener("click", function () {
    const text = input.value.trim();

    if (text === "") {
        dynamicText.textContent = "Please write something before posting.";
        dynamicText.className = "alert alert-warning mt-4 mb-3";
        return;
    }

    const newMessage = {
        text: text,
        date: new Date().toLocaleString()
    };

    messages.unshift(newMessage);
    localStorage.setItem("blogMessages", JSON.stringify(messages));

    dynamicText.textContent = "Post published successfully.";
    dynamicText.className = "alert alert-success mt-4 mb-3";
    heroNote.textContent = "Latest post: " + text;

    input.value = "";
    renderMessages();
});

clearButton.addEventListener("click", function () {
    messages = [];
    localStorage.removeItem("blogMessages");
    dynamicText.textContent = "All posts were removed.";
    dynamicText.className = "alert alert-secondary mt-4 mb-3";
    heroNote.textContent = "Personal note: motivated by data, innovation, and real-world impact.";
    renderMessages();
});

renderMessages();