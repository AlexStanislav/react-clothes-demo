import "@/assets/css/pages/LoginPage.css";

function LoginPage({ logIn }: { logIn: (data: boolean) => void }) {
  const apiURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : window.location.origin;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const email = (e.target as HTMLFormElement).email.value;
    const password = (e.target as HTMLFormElement).password.value;

    fetch(`${apiURL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          logIn(true);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="login">
      <div className="login__content">
        <h1 className="login__title">Login</h1>
        <form className="login__form form" onSubmit={handleSubmit}>
          <div className="form-floating">
            <input
              className="login__input form-control"
              type="text"
              name="email"
            ></input>
            <label className="login__label">Email:</label>
          </div>
          <div className="form-floating">
            <input
              className="login__input form-control"
              type="password"
              name="password"
            ></input>
            <label className="login__label">Password:</label>
          </div>
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
