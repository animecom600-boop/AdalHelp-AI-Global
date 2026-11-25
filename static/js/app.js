let currentLanguage = "en";

const chatTexts = {
    en: {
        welcome: "Hello! I'm AdalHelp AI. How can I help you?",
        placeholder: "Write your message...",
        send: "Send",
        thinking: "AI is thinking...",
        error: "Something went wrong. Please try again.",
        empty: "Please write a message.",
        back: "← Back",
        community: "Community chat is coming soon!"
    },
    ru: {
        welcome: "Привет! Я AdalHelp AI. Чем могу помочь?",
        placeholder: "Напишите сообщение...",
        send: "Отправить",
        thinking: "AI думает...",
        error: "Ошибка. Попробуйте ещё раз.",
        empty: "Введите сообщение.",
        back: "← Назад",
        community: "Чат сообщества скоро появится!"
    },
    kz: {
        welcome: "Сәлем! Мен AdalHelp AI көмекшісімін. Қалай көмектесе аламын?",
        placeholder: "Хабарламаңызды жазыңыз...",
        send: "Жіберу",
        thinking: "AI ойланып жатыр...",
        error: "Қате орын алды. Қайталап көріңіз.",
        empty: "Хабарлама жазыңыз.",
        back: "← Артқа",
        community: "Қауымдастық чаты жақында ашылады!"
    }
};

function openAI() {
    document.getElementById("aiChat").hidden = false;
    document.getElementById("features").hidden = true;
    document.querySelector(".hero").hidden = true;
    document.getElementById("aiChat").scrollIntoView({
        behavior: "smooth"
    });
}

function closeAI() {
    document.getElementById("aiChat").hidden = true;
    document.getElementById("features").hidden = false;
    document.querySelector(".hero").hidden = false;
}

function openCommunity() {
    alert(chatTexts[currentLanguage].community);
}

function openKnowledge() {
    document.getElementById("about").scrollIntoView({
        behavior: "smooth"
    });
}

function addMessage(sender, message) {
    const container = document.getElementById("chatMessages");
    const item = document.createElement("p");
    const name = document.createElement("strong");

    name.textContent = sender + ": ";
    item.appendChild(name);
    item.appendChild(document.createTextNode(message));

    container.appendChild(item);
    container.scrollTop = container.scrollHeight;

    return item;
}

async function sendMessage(event) {
    event.preventDefault();

    const input = document.getElementById("chatInput");
    const button = document.querySelector("#chatForm button");
    const status = document.getElementById("chatStatus");

    const message = input.value.trim();

    if (!message) {
        status.textContent = chatTexts[currentLanguage].empty;
        return;
    }

    addMessage("You", message);
    input.value = "";

    const oldButtonText = button.textContent;
    button.disabled = true;
    button.textContent = "...";
    status.textContent = chatTexts[currentLanguage].thinking;

    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message,
                language: currentLanguage
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Request failed");
        }

        addMessage("AdalHelp AI", data.reply);
        status.textContent = "";

    } catch (error) {
        status.textContent = chatTexts[currentLanguage].error;
    } finally {
        button.disabled = false;
        button.textContent = oldButtonText;
        input.focus();
    }
}

function changeLanguage() {
    const languages = ["en", "ru", "kz"];
    const index = languages.indexOf(currentLanguage);

    currentLanguage = languages[(index + 1) % languages.length];

    document.getElementById("languageButton").textContent =
        currentLanguage.toUpperCase();

    document.getElementById("chatInput").placeholder =
        chatTexts[currentLanguage].placeholder;

    document.querySelector("#chatForm button").textContent =
        chatTexts[currentLanguage].send;
}

document.getElementById("languageButton")
    .addEventListener("click", changeLanguage);

document.getElementById("chatForm")
    .addEventListener("submit", sendMessage);

document.querySelector("#aiChat > button").textContent =
    chatTexts[currentLanguage].back;

document.getElementById("chatInput").placeholder =
    chatTexts[currentLanguage].placeholder;

document.querySelector("#chatForm button").textContent =
    chatTexts[currentLanguage].send;
