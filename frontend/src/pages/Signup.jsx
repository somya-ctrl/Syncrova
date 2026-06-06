import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignupPage() {
   const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setSuccessMessage("");
  setErrorMessage("");

  if (!formData.terms) {
    setErrorMessage("Please accept Terms and Conditions");
    return;
  }

  setLoading(true);

  try {
    const response = await fetch(
      "http://localhost:3000/api/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: formData.full_name,
          email: formData.email,
          password: formData.password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Signup failed");
    }

    // Save JWT token
    if (data.accesstoken) {
      localStorage.setItem("token", data.accesstoken);
    }

    // Save user data if returned
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    setSuccessMessage("Account created successfully! Redirecting...");

    // Navigate to home after a short delay so user sees the success message
    setTimeout(() => {
      navigate("/home");
    }, 2000);
  } catch (error) {
    console.error(error);
    setErrorMessage(error.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          font-family: 'Material Symbols Outlined';
          font-style: normal;
          line-height: 1;
          display: inline-block;
          white-space: nowrap;
          vertical-align: middle;
        }
        .signup-input:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(59, 43, 238, 0.2);
        }
        .btn-primary:hover { background-color: #2b0ae2; }
        .btn-primary:active { transform: scale(0.98); }
        .social-btn:hover { background-color: #f1f5f9; }
        .social-btn:active { transform: scale(0.98); }
        @media (max-width: 1024px) {
          .branding-panel { display: none; }
          .form-panel { width: 100%; }
        }
      `}</style>

      <div
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          backgroundColor: "#f6f6f8",
          color: "#0f172a",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <header
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 50,
            padding: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pointerEvents: "none",
          }}
        >
          <div style={{ pointerEvents: "auto" }}>
            <span
              style={{
                fontSize: "1.5rem",
                fontWeight: 800,
                letterSpacing: "-0.05em",
                color: "#3b2bee",
              }}
            >
              Syncrova
            </span>
          </div>
          <div style={{ pointerEvents: "auto" }}>
            <a
              href="#"
              style={{
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "#475569",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#3b2bee")}
              onMouseLeave={(e) => (e.target.style.color = "#475569")}
            >
              Help Center
            </a>
          </div>
        </header>

        {/* Main */}
        <main style={{ flexGrow: 1, display: "flex", minHeight: "100vh" }}>
          {/* Left Branding Panel */}
          <div
            className="branding-panel"
            style={{
              width: "50%",
              position: "relative",
              backgroundColor: "#3b2bee",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {/* Background image */}
            <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
              <img
                alt="Futuristic digital network interface"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZkbijelm1a3sopliwvrlLlbP5ddP88Fl3pkkeUVgdxiTopl5RTnP845khF88KCH3P0uNI5Vt4bhzXcX_dVoHedriJaY0XYdmZvSkvHMdrhMaOgwjF2L0HIMVNqSjFyzTf861w9tW2rXbTilOHl_uCg_crPIGPq5GuJeoxGWgTfUGNUvdjiA48YrAT5RiBi2A6qpUg2vmeywSj1AlwXTAXAzISGTFFbwcG6-4oGmPxAG7rCPGGD6M0Vh3fogHuO-zRM9PAK7OlHTAE"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: 0.4,
                  mixBlendMode: "overlay",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to bottom right, #3b2bee, rgba(59,43,238,0.8), rgba(129,140,248,0.4))",
                }}
              />
            </div>

            {/* Content */}
            <div
              style={{
                position: "relative",
                zIndex: 10,
                padding: "64px",
                maxWidth: "480px",
              }}
            >
              <div
                style={{
                  marginBottom: "32px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "12px",
                  borderRadius: "16px",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ color: "white", fontSize: "30px" }}
                >
                  hub
                </span>
              </div>
              <h1
                style={{
                  fontSize: "3rem",
                  fontWeight: 800,
                  color: "white",
                  lineHeight: 1.15,
                  marginBottom: "24px",
                  letterSpacing: "-0.03em",
                }}
              >
                Powering the next generation of digital synergy.
              </h1>
              <p
                style={{
                  color: "#c2c1ff",
                  fontSize: "1.125rem",
                  lineHeight: 1.7,
                  marginBottom: "32px",
                }}
              >
                Syncrova integrates your entire workflow into a single,
                intelligent ecosystem. Join 10,000+ professionals optimizing
                their output every day.
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "24px",
                }}
              >
                {[
                  { value: "99.9%", label: "System Uptime" },
                  { value: "24/7", label: "Expert Support" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    style={{
                      padding: "16px",
                      borderRadius: "12px",
                      backgroundColor: "rgba(255,255,255,0.05)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <div
                      style={{
                        color: "white",
                        fontWeight: 700,
                        fontSize: "1.5rem",
                        marginBottom: "4px",
                      }}
                    >
                      {stat.value}
                    </div>
                    <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem" }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom decorative text */}
            <div
              style={{
                position: "absolute",
                bottom: "48px",
                left: "48px",
                right: "48px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "rgba(255,255,255,0.4)",
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              <span>Enterprise Grade Security</span>
              <span>ISO 27001 Certified</span>
            </div>
          </div>

          {/* Right Form Panel */}
          <div
            className="form-panel"
            style={{
              width: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "96px 48px",
              backgroundColor: "#ffffff",
            }}
          >
            <div style={{ width: "100%", maxWidth: "448px" }}>
              {/* Heading */}
              <div style={{ marginBottom: "40px" }}>
                <h2
                  style={{
                    fontSize: "1.875rem",
                    fontWeight: 800,
                    color: "#0f172a",
                    letterSpacing: "-0.03em",
                    marginBottom: "8px",
                  }}
                >
                  Join the Syncrova Network
                </h2>
                <p style={{ color: "#475569", fontSize: "0.9rem" }}>
                  Start your 14-day free trial. No credit card required.
                </p>
              </div>

              {/* Social Buttons */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                  marginBottom: "32px",
                }}
              >
                {[
                  {
                    label: "Google",
                    icon: (
                      <img
                        alt="Google"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCta2R5MSofsW1qncAMkTwCQeRSklMySlFMbGmWWBZNaXRYeiEbw-4fq-XnFbKx66akvrO5gyYzvbkW1blN_hza7DCriD5tcRamacMmam_n1DO-0GOQba7YrKPAfFNSZSKHfj-A1tMsNEgCGiE95bJeP2G3MBqQmFxscIKNGhHYbHp7j45zc559adPPogZSUOMw1wQrpS9mPYPQSx4cCXo0mfClySheRVs6xKjauXEMyhg90f7PbXckcweVdp6ENSZ42xzmZji5bAxo"
                        style={{ width: "20px", height: "20px" }}
                      />
                    ),
                  },
                  {
                    label: "Apple",
                    icon: (
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: "20px", color: "#0f172a" }}
                      >
                        ios
                      </span>
                    ),
                  },
                ].map((btn) => (
                  <button
                    key={btn.label}
                    className="social-btn"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      padding: "12px 16px",
                      borderRadius: "12px",
                      border: "1px solid #cbd5e1",
                      backgroundColor: "transparent",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    {btn.icon}
                    <span
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "#0f172a",
                      }}
                    >
                      {btn.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Divider */}
              <div
                style={{
                  position: "relative",
                  marginBottom: "32px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{ flexGrow: 1, borderTop: "1px solid #cbd5e1" }}
                />
                <span
                  style={{
                    backgroundColor: "#ffffff",
                    padding: "0 16px",
                    color: "#475569",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Or continue with email
                </span>
                <div
                  style={{ flexGrow: 1, borderTop: "1px solid #cbd5e1" }}
                />
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {/* Full Name */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label
                    htmlFor="full_name"
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 700,
                      color: "#0f172a",
                      marginLeft: "4px",
                    }}
                  >
                    Full Name
                  </label>
                  <div style={{ position: "relative" }}>
                    <span
                      className="material-symbols-outlined"
                      style={{
                        position: "absolute",
                        left: "16px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#cbd5e1",
                        fontSize: "20px",
                        pointerEvents: "none",
                      }}
                    >
                      person
                    </span>
                    <input
                      className="signup-input"
                      id="full_name"
                      name="full_name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.full_name}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        paddingLeft: "48px",
                        paddingRight: "16px",
                        paddingTop: "14px",
                        paddingBottom: "14px",
                        backgroundColor: "#f8f9ff",
                        border: "none",
                        borderRadius: "12px",
                        color: "#0f172a",
                        fontSize: "0.9rem",
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        transition: "all 0.2s",
                      }}
                    />
                  </div>
                </div>

                {/* Email */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label
                    htmlFor="email"
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 700,
                      color: "#0f172a",
                      marginLeft: "4px",
                    }}
                  >
                    Email Address
                  </label>
                  <div style={{ position: "relative" }}>
                    <span
                      className="material-symbols-outlined"
                      style={{
                        position: "absolute",
                        left: "16px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#cbd5e1",
                        fontSize: "20px",
                        pointerEvents: "none",
                      }}
                    >
                      mail
                    </span>
                    <input
                      className="signup-input"
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        paddingLeft: "48px",
                        paddingRight: "16px",
                        paddingTop: "14px",
                        paddingBottom: "14px",
                        backgroundColor: "#f8f9ff",
                        border: "none",
                        borderRadius: "12px",
                        color: "#0f172a",
                        fontSize: "0.9rem",
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        transition: "all 0.2s",
                      }}
                    />
                  </div>
                </div>

                {/* Password */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label
                    htmlFor="password"
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 700,
                      color: "#0f172a",
                      marginLeft: "4px",
                    }}
                  >
                    Password
                  </label>
                  <div style={{ position: "relative" }}>
                    <span
                      className="material-symbols-outlined"
                      style={{
                        position: "absolute",
                        left: "16px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#cbd5e1",
                        fontSize: "20px",
                        pointerEvents: "none",
                      }}
                    >
                      lock
                    </span>
                    <input
                      className="signup-input"
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        paddingLeft: "48px",
                        paddingRight: "48px",
                        paddingTop: "14px",
                        paddingBottom: "14px",
                        backgroundColor: "#f8f9ff",
                        border: "none",
                        borderRadius: "12px",
                        color: "#0f172a",
                        fontSize: "0.9rem",
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        transition: "all 0.2s",
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      style={{
                        position: "absolute",
                        right: "16px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#cbd5e1",
                        display: "flex",
                        alignItems: "center",
                        padding: 0,
                      }}
                    >
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: "20px" }}
                      >
                        {showPassword ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                  <p
                    style={{
                      fontSize: "0.625rem",
                      color: "#475569",
                      paddingLeft: "4px",
                      fontStyle: "italic",
                    }}
                  >
                    Must be at least 8 characters with one special symbol.
                  </p>
                </div>

                {/* Terms Checkbox */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    padding: "8px 0",
                  }}
                >
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={formData.terms}
                    onChange={handleChange}
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "4px",
                      border: "1px solid #cbd5e1",
                      accentColor: "#3b2bee",
                      cursor: "pointer",
                      flexShrink: 0,
                      marginTop: "1px",
                    }}
                  />
                  <label
                    htmlFor="terms"
                    style={{
                      fontSize: "0.875rem",
                      color: "#475569",
                      lineHeight: 1.5,
                      cursor: "pointer",
                    }}
                  >
                    I agree to the{" "}
                    <a
                      href="#"
                      style={{ color: "#3b2bee", fontWeight: 700, textDecoration: "none" }}
                    >
                      Terms and Conditions
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      style={{ color: "#3b2bee", fontWeight: 700, textDecoration: "none" }}
                    >
                      Privacy Policy
                    </a>
                    .
                  </label>
                </div>

                {/* Success Message */}
                {successMessage && (
                  <div
                    style={{
                      padding: "14px 16px",
                      borderRadius: "12px",
                      backgroundColor: "#ecfdf5",
                      border: "1px solid #6ee7b7",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ color: "#059669", fontSize: "22px" }}
                    >
                      check_circle
                    </span>
                    <span style={{ color: "#065f46", fontWeight: 600, fontSize: "0.9rem" }}>
                      {successMessage}
                    </span>
                  </div>
                )}

                {/* Error Message */}
                {errorMessage && (
                  <div
                    style={{
                      padding: "14px 16px",
                      borderRadius: "12px",
                      backgroundColor: "#fef2f2",
                      border: "1px solid #fca5a5",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ color: "#dc2626", fontSize: "22px" }}
                    >
                      error
                    </span>
                    <span style={{ color: "#991b1b", fontWeight: 600, fontSize: "0.9rem" }}>
                      {errorMessage}
                    </span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: "16px",
                    backgroundColor: loading ? "#818cf8" : "#3b2bee",
                    color: "white",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 25px rgba(59,43,238,0.2)",
                    cursor: loading ? "not-allowed" : "pointer",
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    marginTop: "4px",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    opacity: loading ? 0.7 : 1,
                  }}
                >
                  <span>{loading ? "Creating Account..." : "Create Account"}</span>
                  <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                    {loading ? "hourglass_empty" : "arrow_forward"}
                  </span>
                </button>
              </form>

              {/* Login Link */}
              <div style={{ marginTop: "32px", textAlign: "center" }}>
                <p style={{ color: "#475569", fontSize: "0.875rem", fontWeight: 500 }}>
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    style={{
                      color: "#3b2bee",
                      fontWeight: 700,
                      textDecoration: "none",
                      marginLeft: "4px",
                    }}
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer
          style={{
            width: "100%",
            padding: "32px 24px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            borderTop: "1px solid #e2e8f0",
            backgroundColor: "#f8fafc",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <span style={{ fontSize: "1.125rem", fontWeight: 700, color: "#4f46e5" }}>
              Syncrova
            </span>
            <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
              © 2024 Syncrova Inc. All rights reserved.
            </span>
          </div>
          <div style={{ display: "flex", gap: "24px" }}>
            {["Privacy Policy", "Terms of Service", "Help Center"].map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  fontSize: "0.75rem",
                  color: "#64748b",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#4f46e5")}
                onMouseLeave={(e) => (e.target.style.color = "#64748b")}
              >
                {link}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </>
  );
}
