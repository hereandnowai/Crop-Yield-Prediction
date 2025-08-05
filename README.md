# 🌿 Crop Yield Prediction AI

An AI-powered web application that forecasts crop yield by analyzing satellite imagery, weather patterns, and soil conditions. This tool is designed to help farmers, agronomists, and agribusinesses make data-driven decisions to optimize agricultural outcomes.

![Crop Yield Prediction App Screenshot](https://storage.googleapis.com/proud-booth-333202/crop-yield.png)
*(Note: This is a representative screenshot. The UI may vary slightly.)*

---

## ✨ Key Features

*   **🤖 AI-Powered Analysis:** Leverages the multi-modal capabilities of the Google Gemini model to process and interpret complex agricultural data.
*   **🛰️ Satellite Image Upload:** Users can upload satellite or drone imagery of their fields for visual analysis of crop health and density. Supports drag-and-drop for an easy user experience.
*   **🎛️ Interactive Data Sliders:** Easily input key metrics for weather (temperature, rainfall, sunshine) and soil conditions (NPK levels, pH) using intuitive sliders.
*   **📊 Detailed Forecasts:** Receive a comprehensive prediction including:
    *   Predicted yield in tons/hectare.
    *   A confidence score for the prediction.
    *   An AI-generated summary of the findings.
    *   A breakdown of positive and negative contributing factors.
*   **📱 Responsive Design:** Fully responsive interface that works seamlessly on desktops, tablets, and mobile devices.
*   **⚡ Fast & Modern:** Built with React and Tailwind CSS for a fast, modern, and user-friendly experience with no build step required.

---

## 🛠️ Tech Stack

*   **Frontend:** [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/)
*   **AI Engine:** [Google Gemini API](https://ai.google.dev/) (`@google/genai`)
*   **Module System:** Native ES Modules with [Import Maps](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap)

---

## ⚙️ How It Works

The application captures various data points from the user:
1.  **Crop Type:** Selected from a predefined list.
2.  **Satellite Image:** Uploaded by the user.
3.  **Weather & Soil Data:** Input via interactive sliders.

This information is compiled into a multi-modal prompt, which combines the user-provided text data with the satellite image. This prompt is then sent to the Google Gemini API. The AI model analyzes all inputs and returns a structured JSON object containing the detailed crop yield forecast. The frontend then parses this JSON and presents it to the user in an easy-to-understand and visually appealing format.

---

## 🚀 Local Setup and Installation

This project is built with a modern, no-build-step setup.

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/crop-yield-prediction-ai.git
cd crop-yield-prediction-ai
```
*(Replace `your-username` with the actual GitHub username or organization.)*

### 2. Environment Variable
This application requires the `API_KEY` environment variable to be present in its execution environment. This variable must contain a valid Google Gemini API key. The application is pre-configured to use this variable for all API requests.

### 3. Run the Application
Because there's no build step, you can run the application by serving the files with a simple local web server.

**Using `npx` (requires Node.js):**
```bash
npx serve
```

**Using Python:**
```bash
# For Python 3
python -m http.server
```

Once the server is running, open your browser and navigate to the provided local URL (e.g., `http://localhost:3000` or `http://localhost:8000`).

---

## 📄 License

This project is licensed under the MIT License.
