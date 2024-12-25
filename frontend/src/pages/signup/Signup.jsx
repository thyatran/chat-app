import React from "react";

const Signup = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-950">
          Sign Up <span className="text-blue-600">ChatApp</span>
        </h1>

        <form>
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
              className="w-full input input-bordered h-10"
            />
          </div>

          {/* email input */}
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-800">Email</span>
            </label>
            <input
              type="text"
              placeholder="Enter email"
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
              className="w-full input input-bordered h-10"
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

          {/* Sign up button */}
          <div>
            <button className="btn btn-block btn-sm mt-2">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
