import React, { useState } from "react";
import { postUser, getAllUsers } from "../data/mongoApi";
import CharacterSelection from "./CharacterSelection";

const CreateAccount = ({ setShowCreateAccount }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const allUsers = await getAllUsers();
      const userExists = allUsers.some((user) => user.username === username);

      if (!userExists) {
        if (selectedImage !== "") {
          await postUser(username, password, selectedImage);
          setSuccessMessage("Account created successfully!");
          setUsername("");
          setPassword("");
          setTimeout(() => {
            setShowCreateAccount(false);
          }, 2000);
        } else {
          setError("Character not selected");
        }
      } else {
        setError("Username already exists. Please choose another.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="create-account-page">
        <h1>Create a New Account</h1>
        <form className="create-account-form" onSubmit={handleSubmit}>
          <input
            className="create-account-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="create-account-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <p className="select-character-text">Select a Character</p>
          <CharacterSelection setSelectedImage={setSelectedImage} />
          <button className="create-account-button" type="submit">
            Create Account
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <button
          className="back-to-login-button"
          onClick={() => setShowCreateAccount(false)}
        >
          Back to Login
        </button>
      </div>
    </>
  );
};

export default CreateAccount;
