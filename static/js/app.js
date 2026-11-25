const translations = {
    en: {
        features: "Features",
        about: "About",
        tag: "✦ AI SUPPORT PLATFORM",
        title: "You are not alone.",
        description: "A safe space to talk, learn, share and find support. Powered by artificial intelligence.",
        start: "Get started →",
        learn: "Learn more",
        section: "Everything you need",
        ai: "AI Assistant",
        aiText: "Talk with an AI assistant anytime.",
        community: "Community",
        communityText: "Share thoughts and connect with others.",
        knowledge: "Knowledge",
        knowledgeText: "Discover useful information and resources.",
        aboutTitle: "About AdalHelp AI",
        aboutText: "Our mission is to make helpful information and supportive conversations accessible to everyone."
    },
    ru: {
        features: "Возможности",
        about: "О проекте",
        tag: "✦ ПЛАТФОРМА AI-ПОДДЕРЖКИ",
        title: "Ты не один.",
        description: "Безопасное пространство для общения, обучения и поддержки с помощью искусственного интеллекта.",
        start: "Начать →",
        learn: "Подробнее",
        section: "Всё необходимое",
        ai: "AI-помощник",
        aiText: "Общайся с AI-помощником в любое время.",
        community: "Сообщество",
        communityText: "Делись мыслями и общайся с другими.",
        knowledge: "Знания",
        knowledgeText: "Изучай полезную информацию и ресурсы.",
        aboutTitle: "О AdalHelp AI",
        aboutText: "Наша цель — сделать полезную информацию и поддержку доступными каждому."
    },
    kz: {
        features: "Мүмкіндіктер",
        about: "Жоба туралы",
        tag: "✦ AI ҚОЛДАУ ПЛАТФОРМАСЫ",
        title: "Сен жалғыз емессің.",
        description: "Сөйлесуге, үйренуге және қолдау табуға арналған қауіпсіз кеңістік.",
        start: "Бастау →",
        learn: "Толығырақ",
        section: "Саған қажетті мүмкіндіктер",
        ai: "AI көмекші",
        aiText: "AI көмекшімен кез келген уақытта сөйлес.",
        community: "Қауымдастық",
        communityText: "Ойларыңмен бөлісіп, басқалармен пікірлес.",
        knowledge: "Білім",
        knowledgeText: "Пайдалы ақпараттар мен ресурстарды зертте.",
        aboutTitle: "AdalHelp AI туралы",
        aboutText: "Біздің мақсатымыз — пайдалы ақпарат пен қолдауды баршаға қолжетімді ету."
    }
};

let currentLanguage = "en";

function changeLanguage() {
    const languages = ["en", "ru", "kz"];
    const currentIndex = languages.indexOf(currentLanguage);
    currentLanguage = languages[(currentIndex + 1) % languages.length];

    const t = translations[currentLanguage];

    document.querySelector("nav a[href='#features']").textContent = t.features;
    document.querySelector("nav a[href='#about']").textContent = t.about;
    document.querySelector(".tag").textContent = t.tag;
    document.querySelector(".hero h1").textContent = t.title;
    document.querySelector(".hero > p").textContent = t.description;
    document.querySelector(".primary-button").textContent = t.start;
    document.querySelector(".secondary-button").textContent = t.learn;
    document.querySelector(".features h2").textContent = t.section;

    const cards = document.querySelectorAll(".card");
    cards[0].querySelector("h3").textContent = t.ai;
    cards[0].querySelector("p").textContent = t.aiText;
    cards[1].querySelector("h3").textContent = t.community;
    cards[1].querySelector("p").textContent = t.communityText;
    cards[2].querySelector("h3").textContent = t.knowledge;
    cards[2].querySelector("p").textContent = t.knowledgeText;

    document.querySelector(".about h2").textContent = t.aboutTitle;
    document.querySelector(".about p").textContent = t.aboutText;
    document.getElementById("languageButton").textContent =
        currentLanguage.toUpperCase();
}

function openAI() {
    alert("AI Assistant is coming soon!");
}

function openCommunity() {
    alert("Community chat is coming soon!");
}

function openKnowledge() {
    document.getElementById("about").scrollIntoView({
        behavior: "smooth"
    });
}

document.getElementById("languageButton")
    .addEventListener("click", changeLanguage);
