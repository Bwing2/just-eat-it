import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../utils/mutations";
import Auth from "../../utils/auth";

const LoginForm = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  // Error Handling
  const [error, setError] = useState("");

  const [loginUser] = useMutation(LOGIN);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    console.dir(formData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await loginUser({
        variables: { ...formData },
      });
      Auth.login(data.login.token);
    } catch (error) {
      console.error(error, "Error occurred with user login.");
      setError("Oops 🤔, Please check your username or password.");
    }

    setFormData({
      username: "",
      password: "",
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Login</h2>
      <div className="mb-3">
        <label className="form-label">Username</label>
        <input
          type="text"
          className="form-control"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          required
        />
        <div className="error-message">{error}</div>
      </div>
      <button type="submit" className="btn btn-primary">
        Login
      </button>
      <div>
        <p>
          Don't have an account?
          <Link className="pageLink" to="/signUp">
            Sign Up
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
