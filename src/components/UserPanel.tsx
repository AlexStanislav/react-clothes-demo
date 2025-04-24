import "../assets/css/components/UserPanel.css";
import { useState } from "react";
import { useLoggedStatus } from "../store";
import { useComponentVisible } from "../utils/functions";
import { Link } from "react-router-dom";
function UserPanel() {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loggedStatus, setLoggedStatus] = useLoggedStatus() as [
    boolean,
    React.Dispatch<{ type: string; payload: boolean }>
  ];

  const apiUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : window.location.origin;

  const handleLogIn = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "" || password === "") {
      return;
    }

    fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setLoggedStatus({
            type: "SET_LOGGED_IN",
            payload: true,
          });
          setIsComponentVisible(false);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleTestLogin = (e: React.FormEvent) => {
    e.preventDefault();

    fetch(`${apiUrl}/login/test`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setLoggedStatus({
            type: "SET_LOGGED_IN",
            payload: true,
          });
          setIsComponentVisible(false);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleLogOut = () => {
    setLoggedStatus({
      type: "SET_LOGGED_IN",
      payload: false,
    });
  };

  return (
    <div className="panel" ref={ref}>
      <div
        className="panel__icon"
        title="Log in"
        onClick={() => setIsComponentVisible(!isComponentVisible)}
      >
        {loggedStatus ? (
          <i className="pi pi-user"></i>
        ) : (
          <i className="pi pi-sign-in"></i>
        )}
      </div>
      {isComponentVisible && loggedStatus === false && (
        <div className="panel__popup">
          <form className="panel__form">
            <input
              className="form__input"
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="form__input"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="form__button" onClick={(e) => handleTestLogin(e)}>Log In As Test User</button>
            <button className="form__button" onClick={(e) => handleLogIn(e)}>
              Log in
            </button>
          </form>
        </div>
      )}
      {isComponentVisible && loggedStatus === true && (
        <div className="panel__popup">
          <p className="popup__message">You are logged in as {email}</p>
          <div className="popup__orders">
            <Link className="popup__link" to="/orders">
              My Orders
            </Link>
          </div>
          <button
            className="form__button"
            type="submit"
            onClick={() => handleLogOut()}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}

export default UserPanel;
