import os
import requests
from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/chat")
def chat_page():

    return render_template("index.html")@app.route("/health")
def health():
    return {"status": "ok", "project": "AdalHelp AI Global"}

@app.route("/api/chat", methods=["POST"])
def chat():
    api_key = os.getenv("GROQ_API_KEY")

    if not api_key:
        return jsonify({"error": "AI қызметі әлі бапталмаған."}), 503

    data = request.get_json(silent=True) or {}
    message = str(data.get("message", "")).strip()
    language = data.get("language", "en")

    if not message:
        return jsonify({"error": "Хабарлама бос болмауы керек."}), 400

    if len(message) > 4000:
        return jsonify({"error": "Хабарлама тым ұзын."}), 400

    language_names = {
        "en": "English",
        "ru": "Russian",
        "kz": "Kazakh"
    }
    selected_language = language_names.get(language, "English")

    try:
        response = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json"
            },
            json={
               "model": "openai/gpt-oss-120b",
                "messages": [
                    {
                        "role": "system",
                        "content": (
                            "You are AdalHelp AI, a friendly and respectful "
                            "support assistant. Reply in " + selected_language +
                            ". Be clear, supportive and honest. You are not "
                            "a doctor or therapist. Do not claim to replace "
                            "professional help. Encourage users to contact "
                            "a trusted adult or emergency services when "
                            "they may be in immediate danger. Protect privacy."
                        )
                    },
                    {"role": "user", "content": message}
                ],
                "temperature": 0.7,
                "max_tokens": 800
            },
            timeout=40
        )

        if response.status_code != 200:
            app.logger.error("Groq response: %s", response.text[:1000])
            app.logger.error("Groq API error: %s", response.status_code)
            return jsonify({"error": "AI уақытша жауап бере алмай тұр."}), 502

        answer = response.json()["choices"][0]["message"]["content"]
        return jsonify({"reply": answer})

    except requests.Timeout:
        return jsonify({"error": "Жауап кешікті. Қайта көріңіз."}), 504
    except requests.RequestException:
        return jsonify({"error": "Сервермен байланыс қатесі."}), 502
    except (KeyError, IndexError, ValueError):
        return jsonify({"error": "AI жауабын оқу мүмкін болмады."}), 502

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)
