
import React, { useState } from "react";
import { findUser } from "../data/mongoApi";
import CreateAccount from "./CreateAccount";

const LoginAccount = ({
  onStart,
  username,
  setUsername,
  password,
  setPassword,
  setSaveData,
  setCharacterSelected,
}) => {
  const [error, setError] = useState("");
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await findUser(username, password);

      if (response && response.data) {
        setSaveData(response.data.saveData);
        setCharacterSelected(response.data.selectedImage);
        onStart();
      } else {
        setError("User not found. Please check your username and password.");
        setUsername("");
        setPassword("");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccountClick = () => {
    setShowCreateAccount(true);
  };

  if (showCreateAccount) {
    return <CreateAccount setShowCreateAccount={setShowCreateAccount} />;
  }

  return (
    <div className="login-page">
     
      <img src = "../../public/logo.png"/>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          className="login-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          Login
        </button>
       
      </form>
      {error && <p className="error-message">{error}</p>}
      {loading && <p className="loading-text">Loading...</p>}
      <p className="create-account-text">Don't have an account?</p>
      <button className="account-button" onClick={handleCreateAccountClick}>Create Account Here</button>
    </div>
  );
};

export default LoginAccount;
