from flask import Flask, request, jsonify
import logging

# ✅ Enable debug logs
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)

@app.route('/', methods=['POST'])
def webhook():
    # 🔍 Get the JSON payload from Dialogflow
    req = request.get_json()
    logging.debug(f"🔔 Received JSON: {req}")

    # ✅ Extract data safely
    query = req['queryResult'].get('queryText', '')
    intent = req['queryResult'].get('intent', {}).get('displayName', '')
    confidence = req['queryResult'].get('intentDetectionConfidence', 1.0)

    logging.debug(f"📌 Query: {query}")
    logging.debug(f"📌 Intent: {intent}")
    logging.debug(f"📌 Confidence: {confidence}")

    # 🧠 Format detailed response
    if confidence < 0.7:
        response_text = (
            f"🤔 I’m not quite sure what you meant.\n"
            f"🧠 Detected Intent: {intent or 'Unknown'}\n"
            f"🎯 Confidence Score: {confidence:.3f}\n"
            f"🗣️ You said: \"{query}\""
        )
    else:
        response_text = (
            f"✅ Intent Matched: {intent}\n"
            f"🎯 Confidence Score: {confidence:.3f}\n"
            f"🗣️ You said: \"{query}\""
        )

    # ✅ Respond in Dialogflow-compatible format
    return jsonify({'fulfillmentText': response_text})

if __name__ == '__main__':
    app.run(port=5000)
