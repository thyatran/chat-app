import React, { useState } from "react";
import useSignup from "../../hooks/useSignup.js";
import { Toaster, toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const Signup = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { signup, loading } = useSignup();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputs.password !== inputs.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    // handle sign up here
    await signup(inputs);
  };

  // HANDLE FILE UPLOADING
  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file && file.size < 5000000) {
  //     // Example: Limit to 5MB
  //     setFile(file); // Store the file for submission
  //   } else {
  //     toast.error("File size exceeds the limit.");
  //   }
  // };

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
            <label htmlFor="username" className="label p-2">
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

          {/* email input */}
          <div>
            <label htmlFor="email" className="label p-2">
              <span className="text-base label-text text-gray-800">Email</span>
            </label>
            <input
              type="text"
              placeholder="Enter email"
              name="email"
              className="w-full input input-bordered h-10"
              value={inputs.email}
              onChange={handleChange}
            />
          </div>

          {/* password */}
          <div>
            <label htmlFor="password" className="label p-2">
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
            <label htmlFor="confirmpassword" className="label p-2">
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
            />
          </div>

          {/* Link to Login */}
          {/* <Link
            to={"/login"}
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block cursor-pointer text-gray-800"
          >
            {"Already have an account? Login."}
          </Link> */}
          {/* <Link
            to="/login"
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block cursor-pointer text-gray-800"
          >
            Already have an account? Login.
          </Link> */}

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
