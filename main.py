from quart import Quart, request, jsonify, render_template, redirect, url_for, Response
from quart_cors import cors
import sqlite3
from config import SECRECT_KEY
import uvicorn
from db import init_db, get_db_connection
import logging
##define logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
#define logging function
def log_info(message):
    logger.info(message)


app = Quart(__name__)
app = cors(app, allow_origin="*")
app.static_folder = "static"
app.template_folder = "templates"
app.secret_key = SECRECT_KEY
init_db()
@app.route("/")
async def home():
    return await render_template("index.html")

@app.route("/demo",methods=["GET","POST"])
async def demo():
    return await render_template("demo.html")

@app.route("/contact_form", methods=["POST"])
async def contact_form():
    data = await request.form
    name = data.get("name")
    email = data.get("email")
    subject = data.get("subject")
    message = data.get("message")

    try:
        print(f"Received: {name}, {email}, {subject}, {message}")
        conn = get_db_connection()
        conn.execute("INSERT INTO contact_request (name, email, subject, message) VALUES (?, ?, ?, ?)",
                     (name, email, subject, message))
        conn.commit()
        conn.close()
        log_info(f"New contact request from {name} ({email}) with subject '{subject}'")
        return {"success": True, "message": "✅ Your message was sent successfully!"}
    except Exception as e:
        log_info(f"Error occurred: {str(e)}")
        return {"success": False, "message": f"❌ Something went wrong. Please try again. Error: {str(e)}"}


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        log_level="info",
        reload=False
    )
