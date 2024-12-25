import React from "react";
import Signup from "../signup/Signup";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-950">
          Login <span className="text-blue-600">ChatApp</span>
        </h1>

        <form>
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
              className="w-full input input-bordered h-10"
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
              className="w-full input input-bordered h-10"
            />
          </div>

          {/* Link to Sign up */}
          {/* <Link
            to={"/signup"}
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block cursor-pointer"
          >
            {"Don't have an account?"}
          </Link> */}
          <p className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block cursor-pointer text-gray-800">
            Don't have an account?
          </p>

          {/* Login button */}
          <div>
            <button className="btn btn-block btn-sm mt-2">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
