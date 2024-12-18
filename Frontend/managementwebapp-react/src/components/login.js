import '../style/login.css';
import CreateAccount from "./createaccount";

function login() {
  return (
    <>
    <div className="login">
      <header className="login-header">
        <form>
            <p>Username or email address</p>
            <input type="text" name="Username" />
            <p>Password</p>
            <input type="text" name="Password" />
            <input type="submit" value="Sign in" />
        </form>
        <CreateAccount />
      </header>
    </div>
  </>
  );
}

export default login;
