import React, { useState } from "react";
import useSignup from "../../hooks/useSignup.js";
import { Toaster, toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const Signup = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    file: null,
  });

  const { signup, loading } = useSignup();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setInputs({ ...inputs, file: files[0] });
    } else {
      setInputs({ ...inputs, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputs.password !== inputs.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    // You can send only the text inputs for now, file is ignored.
    await signup(inputs);
  };

  // HANDLE FILE UPLOADING

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <Toaster />
        <h1 className="text-3xl font-semibold text-center text-gray-950">
          Sign Up <span className="text-blue-600">ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          {/* username input */}
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-800">
                Username
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              name="username"
              className="w-full input input-bordered h-10"
              value={inputs.username}
              onChange={handleChange}
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
              value={inputs.password}
              onChange={handleChange}
            />
          </div>

          {/* confirm password */}
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-800">
                Confirm Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Confirm password"
              name="confirmPassword"
              className="w-full input input-bordered h-10"
              value={inputs.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {/* choose a profile picture - ADD UPLOAD FILE OPTION HERE */}
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-800">
                Choose a Profile Picture
              </span>
            </label>
            <input
              type="file"
              id="fileInput"
              name="file"
              className="w-full h-10 text-gray-800"
              onChange={handleChange}
            />
          </div>

          {/* Link to Login */}
          <Link
            to="/login"
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block cursor-pointer text-gray-800"
          >
            Already have an account? Login.
          </Link>

          {/* Sign up button */}
          <div>
            <button
              type="submit"
              className="btn btn-block btn-sm mt-2"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
