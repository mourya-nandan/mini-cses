import { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <style>{`
        html, body, #root {
          height: 100%;
          margin: 0;
        }

        * {
          box-sizing: border-box;
          font-family: "Segoe UI", sans-serif;
        }

        .login-page {
          height: 100vh;
          width: 100vw;
          background: linear-gradient(135deg, #6a5cff, #8f7bff);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .login-card {
          width: 900px;
          height: 450px;
          background: #fff;
          border-radius: 12px;
          display: flex;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        /* LEFT */
        .login-left {
          flex: 1;
          padding: 60px;
          color: white;
          background: linear-gradient(135deg, #6a5cff, #ff8fb1);
          position: relative;
        }

        .login-left h1 {
          font-size: 32px;
          margin-bottom: 20px;
        }

        .login-left p {
          font-size: 14px;
          line-height: 1.6;
          opacity: 0.9;
        }

        /* RIGHT */
        .login-right {
          flex: 1;
          padding: 60px 50px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .login-right h2 {
          text-align: center;
          margin-bottom: 30px;
          font-size: 20px;
          color: #7b6cff;
          letter-spacing: 1px;
        }

        .input-group {
          margin-bottom: 15px;
          position: relative;
        }

        .input-group input {
          width: 100%;
          padding: 12px 40px 12px 15px;
          border-radius: 20px;
          border: none;
          background: #f1f1ff;
          outline: none;
          font-size: 14px;
          color: #000;
        }

        .input-group input::placeholder {
          color: #666;
        }

        .input-group input:focus {
          box-shadow: 0 0 0 2px rgba(106, 92, 255, 0.4);
        }

        .eye-btn {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          font-size: 16px;
          color: #666;
          user-select: none;
        }

        .login-options {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          margin: 10px 0 25px;
          color: #777;
        }

        .login-options label {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .forgot {
          cursor: pointer;
        }

        .login-btn {
          padding: 12px;
          border: none;
          border-radius: 20px;
          background: linear-gradient(135deg, #6a5cff, #ff8fb1);
          color: white;
          font-weight: bold;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(106, 92, 255, 0.4);
        }
      `}</style>

      <div className="login-page">
        <div className="login-card">
          {/* Left */}
          <div className="login-left">
            <h1>Welcome to Tharka School</h1>
            <p>
              Master Problems with Tharka School
            </p>
          </div>

          {/* Right */}
          <div className="login-right">
            <h2>USER LOGIN</h2>

            <div className="input-group">
              <input type="text" placeholder="Username" />
            </div>

            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
              />
              <span
                className="eye-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁" : "⌣  "}
              </span>
            </div>

            <div className="login-options">
              <label>
                <input type="checkbox" />
                Remember
              </label>
              <span className="forgot">Forgot password?</span>
            </div>

            <button className="login-btn">LOGIN</button>
          </div>
        </div>
      </div>
    </>
  );
}
