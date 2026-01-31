# 🏥 Mapping Outpatient Department (OPD) Notes to ICD-10 Codes Using Fine Tuned Language Models - UI

An AI-powered web application that automatically predicts ICD-10 medical codes from clinical documentation using advanced natural language processing leveraging LLM fine tuning.
Built as a part of major project of CMRIT, Hyderabad

<img width="1869" height="843" alt="image" src="https://github.com/user-attachments/assets/81588125-9d4c-4ec4-b00c-29d306513b22" />


## 📋 About The Project

Medical Coding Assistant streamlines the healthcare coding process by leveraging machine learning to analyze clinical text and predict appropriate ICD-10 codes. This tool helps medical coders, healthcare providers, and billing professionals save time while improving coding accuracy.

### Key Features

- 🤖 **AI-Powered Predictions** - Advanced LLM model trained on clinical documentation(domain specific training)
- 📝 **Intelligent Code Descriptions** - Automatic display of ICD-10 code descriptions
- ⚡ **Real-time Processing** - Instant code predictions from clinical text
- 🎨 **Modern UI** - Clean, intuitive interface built with React
- 🔒 **HIPAA Considerations** - Designed with healthcare data privacy in mind

### Built With

**Frontend:**
- React 18.x
- Modern CSS with gradients and animations
- Responsive design for all devices

**Backend:**
- Python 3.8+
- FastAPI / Flask (for API endpoint)
- Machine Learning model (TensorFlow/PyTorch/Scikit-learn)
- Natural Language Processing

## 🚀 Live Demo

**Production URL:** [https://majorproject-ui.vercel.app](https://majorproject-ui.vercel.app/)  

## 💻 Running Locally

### Prerequisites

- Node.js 16.x or higher
- npm or yarn
- Python 3.8 or higher
- pip (Python package manager)

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/medical-coding-assistant.git
   cd medical-coding-assistant
   ```

2. **Navigate to backend directory**
   ```bash
   cd backend
   ```

3. **Create a virtual environment**
   ```bash
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

4. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Start the backend server**
   ```bash
   # If using FastAPI
   uvicorn main:app --reload --port 8000
   
   # If using Flask
   python app.py
   ```

   The backend API will be available at `http://localhost:8000`

### Frontend Setup

1. **Open a new terminal and navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

   The application will open at `http://localhost:3000`

### Configuration

Update the API URL in the frontend code if needed:

```javascript
// In src/MedicalCodingAssistant.jsx (or your component file)
const API_URL = "http://localhost:8000/predict";
```

## 📖 Usage

1. **Enter Clinical Text**: Paste or type clinical documentation including symptoms, diagnoses, procedures, and medical history

2. **Click "Predict ICD-10 Codes"**: The AI model will analyze the text

3. **Review Results**: The predicted ICD-10 codes will appear with their descriptions

4. **Verify Codes**: Always review AI predictions with qualified medical coding professionals

### Example Input

```
Patient presents with acute lower back pain radiating to left leg for 3 days. 
History of lumbar strain. Physical examination shows limited range of motion 
and tenderness in L4-L5 region. Patient reports pain worsens with sitting.
```


## 🏗️ Project Structure

```
medical-coding-assistant/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── MedicalCodingAssistant.jsx
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── README.md
├── backend/
│   ├── models/
│   │   └── icd_model.pkl
│   ├── main.py (or app.py)
│   ├── requirements.txt
│   └── README.md
├── LICENSE
└── README.md
```

## 🌐 Deployment

### Frontend (Vercel/Netlify)

1. Push your code to GitHub
2. Connect your repository to Vercel or Netlify
3. Set build command: `npm run build`
4. Set publish directory: `build`
5. Update API URL to your backend production URL

### Backend (Render/Railway/Heroku)

1. Push your backend code to GitHub
2. Connect to your hosting platform
3. Set start command (e.g., `uvicorn main:app --host 0.0.0.0 --port $PORT`)
4. Add environment variables if needed
5. Deploy and note the production URL

## 🔧 API Endpoints

### POST `/predict`

Predicts ICD-10 codes from clinical text.

**Request Body:**
```json
{
  "clinical_text": "Patient presents with acute bronchitis..."
}
```

**Response:**
```json
{
  "icd_prediction": "J20.9"
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ⚠️ Disclaimer

This tool is designed to assist medical coding professionals and should NOT be used as the sole method for medical coding. All AI predictions must be reviewed and verified by qualified healthcare professionals. This application is for educational and assistive purposes only.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📧 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter) - your.email@example.com

Project Link: [https://github.com/yourusername/medical-coding-assistant](https://github.com/yourusername/medical-coding-assistant)

## 🙏 Acknowledgments

- ICD-10 code database
- Open-source NLP libraries
- Healthcare coding community
- [React](https://reactjs.org/)
- [FastAPI](https://fastapi.tiangolo.com/) / [Flask](https://flask.palletsprojects.com/)

---

**⭐ Star this repo if you find it helpful!**
