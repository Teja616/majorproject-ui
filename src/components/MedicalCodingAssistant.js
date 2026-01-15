import React, { useState } from "react";

const API_URL = " https://cleaning-going-subdivision-pubs.trycloudflare.com/predict"; 
const ADVICE_API_URL = " https://cleaning-going-subdivision-pubs.trycloudflare.com/general-advice";

// Change to your deployed Render/Railway URL later

// ICD-10 code descriptions mapping
const ICD10_DESCRIPTIONS = {
  "A00": "Cholera",
  "A01": "Typhoid and paratyphoid fevers",
  "A02": "Other salmonella infections",
  "A03": "Shigellosis",
  "A04": "Other bacterial intestinal infections",
  "A05": "Other bacterial foodborne intoxications, not elsewhere classified",
  "A06": "Amebiasis",
  "A07": "Other protozoal intestinal diseases",
  "A15": "Respiratory tuberculosis",
  "A17": "Tuberculosis of nervous system",
  "A18": "Tuberculosis of other organs",
  "A19": "Miliary tuberculosis",
  "A20": "Plague",
  "A21": "Tularemia",
  "A22": "Anthrax",
  "A23": "Brucellosis",
  "A24": "Glanders and melioidosis",
  "A25": "Rat-bite fevers",
  "A26": "Erysipeloid",
  "A27": "Leptospirosis",
  "A28": "Other zoonotic bacterial diseases, not elsewhere classified",
  "A30": "Leprosy [Hansen's disease]",
  "A31": "Infection due to other mycobacteria",
  "A32": "Listeriosis",
  "A33": "Tetanus neonatorum",
  "A34": "Obstetrical tetanus",
  "A35": "Other tetanus",
  "A36": "Diphtheria",
  "A37": "Whooping cough",
  "A38": "Scarlet fever",
  "A39": "Meningococcal infection",
  "A40": "Streptococcal sepsis",
  "A41": "Other sepsis",
  "A42": "Actinomycosis",
  "A43": "Nocardiosis",
  "A44": "Bartonellosis",
  "A46": "Erysipelas",
  "A48": "Other bacterial diseases, not elsewhere classified",
  "A49": "Bacterial infection of unspecified site",
  "A50": "Congenital syphilis",
  "A51": "Early syphilis",
  "A52": "Late syphilis",
  "A53": "Other and unspecified syphilis",
  "A54": "Gonococcal infection",
  "A55": "Chlamydial lymphogranuloma (venereum)",
  "A56": "Other sexually transmitted chlamydial diseases",
  "A57": "Chancroid",
  "A58": "Granuloma inguinale",
  "A59": "Trichomoniasis",
  "A60": "Anogenital herpesviral [herpes simplex] infections",
  "A63": "Other predominantly sexually transmitted diseases, not elsewhere classified",
  "A64": "Unspecified sexually transmitted disease",
  "A65": "Nonvenereal syphilis",
  "A66": "Yaws",
  "A67": "Pinta [carate]",
  "A68": "Relapsing fevers",
  "A69": "Other spirochetal infections",
  "A70": "Chlamydia psittaci infections",
  "A71": "Trachoma",
  "A74": "Other diseases caused by chlamydiae",
  "A75": "Typhus fever",
  "A77": "Spotted fever [tick-borne rickettsioses]",
  "A78": "Q fever",
  "A79": "Other rickettsioses",
  "A80": "Acute poliomyelitis",
  "A81": "Atypical virus infections of central nervous system",
  "A82": "Rabies",
  "A83": "Mosquito-borne viral encephalitis",
  "A84": "Tick-borne viral encephalitis",
  "A85": "Other viral encephalitis, not elsewhere classified",
  "A86": "Unspecified viral encephalitis",
  "A87": "Viral meningitis",
  "A88": "Other viral infections of central nervous system, not elsewhere classified",
  "A89": "Unspecified viral infection of central nervous system",
  "A90": "Dengue fever [classical dengue]",
  "A91": "Dengue hemorrhagic fever",
  "A92": "Other mosquito-borne viral fevers",
  "A93": "Other arthropod-borne viral fevers, not elsewhere classified",
  "A94": "Unspecified arthropod-borne viral fever",
  "A95": "Yellow fever",
  "A96": "Arenaviral hemorrhagic fever",
  "A98": "Other viral hemorrhagic fevers, not elsewhere classified",
  "A99": "Unspecified viral hemorrhagic fever"
};

export default function MedicalCodingAssistant() {
  const [clinicalText, setClinicalText] = useState("");
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [advice, setAdvice] = useState("");


  // Helper function to parse and enrich predicted codes with descriptions
  const enrichPredictions = (predictionText) => {
    // Convert to string if it's not already
    const textString = String(predictionText || "");
    
    // Extract ICD-10 codes from the prediction text (handles formats like A00, A01.1, etc.)
    const codePattern = /[A-Z]\d{2}(?:\.\d+)?/g;
    const codes = textString.match(codePattern) || [];
    
    // Create enriched output
    let enrichedText = textString;
    
    codes.forEach(code => {
      // Get base code (e.g., A00 from A00.1)
      const baseCode = code.substring(0, 3);
      const description = ICD10_DESCRIPTIONS[baseCode];
      
      if (description && !enrichedText.includes(description)) {
        // Add description after the code if not already present
        const regex = new RegExp(`(${code.replace('.', '\\.')})(?!.*:)`, 'g');
        enrichedText = enrichedText.replace(regex, `$1 - ${description}`);
      }
    });
    
    return enrichedText;
  };

  const handleGeneralAdvice = async () => {
  if (!clinicalText.trim()) {
    setError("Please enter clinical text.");
    return;
  }

  setLoading(true);
  setError("");
  setAdvice("");

  try {
    const response = await fetch(ADVICE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        clinical_text: clinicalText
      })
    });

    if (!response.ok) {
      throw new Error("Server error. Try again.");
    }

    const data = await response.json();
    setAdvice(data.advice);

  } catch (err) {
    setError(err.message || "Something went wrong.");
  } finally {
    setLoading(false);
  }
};


  const handlePredict = async () => {
    if (!clinicalText.trim()) {
      setError("Please enter clinical text.");
      return;
    }

    setLoading(true);
    setError("");
    setPrediction("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          clinical_text: clinicalText
        })
      });

      if (!response.ok) {
        throw new Error("Server error. Try again.");
      }

      const data = await response.json();
      const enrichedPrediction = enrichPredictions(data.icd_prediction);
      setPrediction(enrichedPrediction);

    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.iconWrapper}>
            <svg style={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
          </div>
          <h1 style={styles.title}>
            Medical Coding Assistant
          </h1>
          <p style={styles.subtitle}>
            AI-powered ICD-10 code prediction from clinical documentation
          </p>
        </div>

        {/* Main Card */}
        <div style={styles.card}>
          {/* Info Banner */}
          <div style={styles.banner}>
            <div style={styles.bannerContent}>
              <svg style={styles.bannerIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
              <div>
                <p style={styles.bannerTitle}>Enter Clinical Documentation</p>
                <p style={styles.bannerText}>
                  Include symptoms, diagnoses, procedures, and relevant medical history for accurate code prediction
                </p>
              </div>
            </div>
          </div>

          {/* Input Section */}
          <div style={styles.inputSection}>
            <label style={styles.label}>
              Clinical Text
            </label>
            <textarea
              style={styles.textarea}
              rows={8}
              placeholder="Example: Patient presents with acute lower back pain radiating to left leg for 3 days. History of lumbar strain. Physical examination shows limited range of motion and tenderness in L4-L5 region..."
              value={clinicalText}
              onChange={(e) => setClinicalText(e.target.value)}
            />

            <button
              style={{
                ...styles.button,
                ...(loading ? styles.buttonDisabled : styles.buttonActive)
              }}
              onClick={() => {
                handlePredict();
                handleGeneralAdvice();
              }}

              disabled={loading}
            >
              {loading ? (
                <div style={styles.buttonContent}>
                  <div style={styles.spinner} />
                  Analyzing Clinical Text...
                </div>
              ) : (
                <div style={styles.buttonContent}>
                  <svg style={styles.buttonIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                  </svg>
                  Predict ICD-10 Codes
                </div>
              )}
            </button>

            {/* Error Message */}
            {error && (
              <div style={styles.errorBox}>
                <div style={styles.errorContent}>
                  <div style={styles.errorIcon}>!</div>
                  <p style={styles.errorText}>{error}</p>
                </div>
              </div>
            )}

            {/* Results */}
            {prediction && (
              <div style={styles.resultContainer}>
                <div style={styles.resultHeader}>
                  <div style={styles.successIcon}>✓</div>
                  <h3 style={styles.resultTitle}>
                    Predicted ICD-10 Codes
                  </h3>
                </div>
                <div style={styles.resultBox}>
                  <p style={styles.resultText}>
                    {prediction}
                  </p>
                </div>
                <p style={styles.disclaimer}>
                  Note: AI predictions should be reviewed by qualified medical coding professionals
                </p>
              </div>
            )}
          </div>
        </div>

        {advice && (
  <div style={{
    marginTop: "24px",
    padding: "24px",
    background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
    border: "2px solid #93c5fd",
    borderRadius: "12px"
  }}>
    <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "12px" }}>
      General Medical Guidance
    </h3>
    <p style={{
      fontSize: "14px",
      lineHeight: "1.6",
      whiteSpace: "pre-wrap",
      color: "#1e3a8a"
    }}>
      {advice}
    </p>
    <p style={styles.disclaimer}>
      This information is for general guidance only and does not replace professional medical advice.
    </p>
  </div>
)}


        {/* Footer */}
        <div style={styles.footer}>
          <p>Powered by advanced natural language processing and medical coding AI</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #eef2ff 100%)",
    padding: "32px 16px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
  },
  wrapper: {
    maxWidth: "896px",
    margin: "0 auto"
  },
  header: {
    textAlign: "center",
    marginBottom: "32px"
  },
  iconWrapper: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2563eb",
    padding: "12px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(37, 99, 235, 0.3)",
    marginBottom: "16px"
  },
  icon: {
    width: "32px",
    height: "32px",
    color: "white"
  },
  title: {
    fontSize: "36px",
    fontWeight: "700",
    color: "#111827",
    marginBottom: "8px",
    margin: "0 0 8px 0"
  },
  subtitle: {
    fontSize: "18px",
    color: "#6b7280",
    margin: "0"
  },
  card: {
    backgroundColor: "white",
    borderRadius: "16px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e5e7eb",
    overflow: "hidden"
  },
  banner: {
    background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
    padding: "16px 24px"
  },
  bannerContent: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    color: "white"
  },
  bannerIcon: {
    width: "20px",
    height: "20px",
    flexShrink: 0,
    marginTop: "2px"
  },
  bannerTitle: {
    fontWeight: "600",
    fontSize: "14px",
    marginBottom: "4px",
    margin: "0 0 4px 0"
  },
  bannerText: {
    fontSize: "12px",
    color: "#bfdbfe",
    margin: "0"
  },
  inputSection: {
    padding: "24px"
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "12px"
  },
  textarea: {
    width: "100%",
    padding: "12px 16px",
    fontSize: "14px",
    color: "#111827",
    border: "2px solid #e5e7eb",
    borderRadius: "12px",
    outline: "none",
    resize: "vertical",
    fontFamily: "inherit",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box"
  },
  button: {
    width: "100%",
    marginTop: "16px",
    padding: "14px 24px",
    borderRadius: "12px",
    fontWeight: "600",
    fontSize: "14px",
    color: "white",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 4px 14px rgba(37, 99, 235, 0.4)"
  },
  buttonActive: {
    background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)"
  },
  buttonDisabled: {
    background: "#9ca3af",
    cursor: "not-allowed",
    boxShadow: "none"
  },
  buttonContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px"
  },
  buttonIcon: {
    width: "20px",
    height: "20px"
  },
  spinner: {
    width: "20px",
    height: "20px",
    border: "2px solid white",
    borderTop: "2px solid transparent",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite"
  },
  errorBox: {
    marginTop: "16px",
    padding: "16px",
    background: "#fef2f2",
    borderLeft: "4px solid #ef4444",
    borderRadius: "8px"
  },
  errorContent: {
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  errorIcon: {
    width: "20px",
    height: "20px",
    backgroundColor: "#ef4444",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "12px",
    fontWeight: "700",
    flexShrink: 0
  },
  errorText: {
    color: "#991b1b",
    fontSize: "14px",
    fontWeight: "500",
    margin: "0"
  },
  resultContainer: {
    marginTop: "24px",
    padding: "24px",
    background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
    border: "2px solid #bbf7d0",
    borderRadius: "12px"
  },
  resultHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "12px"
  },
  successIcon: {
    width: "32px",
    height: "32px",
    backgroundColor: "#16a34a",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "18px",
    fontWeight: "700"
  },
  resultTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#111827",
    margin: "0"
  },
  resultBox: {
    backgroundColor: "white",
    padding: "16px",
    borderRadius: "8px",
    border: "1px solid #bbf7d0"
  },
  resultText: {
    color: "#111827",
    fontFamily: "'Courier New', monospace",
    fontSize: "14px",
    lineHeight: "1.6",
    whiteSpace: "pre-wrap",
    margin: "0"
  },
  disclaimer: {
    fontSize: "12px",
    color: "#6b7280",
    marginTop: "12px",
    fontStyle: "italic",
    margin: "12px 0 0 0"
  },
  footer: {
    marginTop: "24px",
    textAlign: "center",
    fontSize: "14px",
    color: "#6b7280"
  }
};

// Add spinner animation
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  textarea:focus {
    border-color: #3b82f6 !important;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1) !important;
  }
  button:not(:disabled):hover {
    transform: scale(0.98);
  }
`;
document.head.appendChild(styleSheet);
