
import { useState } from "react";

const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="progress-bar">
    <div className="progress" style={{ width: `${progress}%` }} />
  </div>
);

const TokenChecker = () => {
  const [token, setToken] = useState("");
  const [valid, setValid] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [progress, setProgress] = useState(0);

  const checkToken = async () => {
    setFetching(true);
    setProgress(20);
    // perform token validation logic here
    // replace this with your actual token validation logic
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setProgress(40);
    const isValid = true; // replace this with your actual validity check
    setValid(isValid);
    setProgress(60);
    if (isValid) {
      // perform data fetching logic here
      // replace this with your actual data fetching logic
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setProgress(100);
      setFetching(false);
    } else {
      setFetching(false);
    }
  };

  return (
    <div className="container">
      <h1>Token Checker</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter web token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <button onClick={checkToken}>Check Token</button>
      </div>

      <div className="progress-container">
        {fetching && <ProgressBar progress={progress} />}
        <hr className="line"/>
        {valid && (
          <div className="success-message">
            <span>Token is valid</span>
            <div className="inner-line"/>
          </div>
        )}
        {!valid && fetching && (
          <div className="fetching-message">
            <span>Fetching data...</span>
            <div className="inner-line .half-inner" style={{ width: "50%" }} />
          </div>
        )}
        {!valid && !fetching && (
          
          <div className="error-message">
            <span>Unable to validate token</span>
            <div className="inner-line .full-inner" />
          </div>
        )}
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          font-family: sans-serif;
          background-color: white;
        }
        h1 {
          margin-bottom: 30px;
          font-size: 2rem;
          font-weight: bold;
        }
        .input-container {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          padding: 10px;
          font-size: 1rem;
          
        }
        input {
          padding: 10px;
          font-size: 1rem;
          border: none;
          border-radius: 5px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          background-color: #f2f2f2;
          color: #333;
        }
        input::placeholder {
          color: #999;
          font-style: italic;
        }
        button {
          padding: 10px;
          font-size: 1rem;
          border: none;
          border-radius: 5px;
          background-color: #2196f3; ;
          color: white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          cursor: pointer;
          margin-left: 10px;
        }
        button:hover {
          background-color: #3e8e41;
        }
        .progress-bar {
          width: 100%;
          height: 20px;
          background-color: #f2f2f2;
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 20px;
          //color: black;
          position: relative;
        }
        .progress {
          height: 100%;
          background-color: #4caf50;
        }
        .inner-line {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          background-color:#2196f3;
          opacity: 0;
          transition: all 0.1s ease;
        }
        
        .show-inner .inner-line {
          opacity: 1;
        }
        
        .half-inner .inner-line {
          width: 50%;
        }
        
        .full-inner .inner-line {
          width: 100%;
        }
        
        .line {
          height: 1px;
          width: 100%;
          margin: 20px 0;
          background-color:#4caf50;
          color: #4caf50;
          border: none;
        }
        .success-message {
          color: #4caf50;
          margin-top: 10px;
        }
        
        .error-message {
          color: #f44336;
          margin-top: 10px;
        }
        .fetching-message {
          color: #4caf50;
          margin-top: 10px;
        }
        `}</style>
        </div>
      );
    };
export default TokenChecker;