import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin.js";

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(usernameOrEmail, password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-950">
          Login <span className="text-blue-600">ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          {/* username or email input */}
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-800">
                Username or Email
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter username or email"
              name="usernameOrEmail"
              className="w-full input input-bordered h-10"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
            />
          </div>

          {/* password */}
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-800">
                Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              name="password"
              className="w-full input input-bordered h-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Link to Sign up */}
          <Link
            to={"/signup"}
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block cursor-pointer text-gray-800"
          >
            Don't have an account? Sign Up.
          </Link>

          {/* Login button */}
          <div>
            <button
              type="submit"
              className="btn btn-block btn-sm mt-2"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
