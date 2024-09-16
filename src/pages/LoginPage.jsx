import { Link } from "react-router-dom";
import AuthIllustration from "../assets/images/auth_illustration.png";

const LoginPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-deepDark py-8">
      <div className="max-w-[1368px] flex-1">
        <div className="container grid items-center gap-8 lg:grid-cols-2">
          {/* Left Side: Illustration and Title */}
          <div className="flex flex-col justify-center items-start">
            <img
              className="mb-12 max-w-full max-lg:hidden"
              src={AuthIllustration}
              alt="auth_illustration"
            />
            <div>
              <h1 className="mb-3 text-4xl font-bold lg:text-[40px]">
                Facehook
              </h1>
              <p className="max-w-[452px] text-gray-600/95 lg:text-lg">
                Create a social media app with features like showing posts, post details, reactions, comments, and profiles.
              </p>
            </div>
          </div>

          {/* Right Side: Login Form */}
          <div className="card ">
            <form className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]">
              {/* email */}
              <div className="form-control mb-6">
                <label className="auth-label" htmlFor="email">
                  Email
                </label>
                <input
                  className="auth-input"
                  name="email"
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                />
              </div>
              {/* password */}
              <div className="form-control mb-6">
                <label className="auth-label" htmlFor="password">
                  Password
                </label>
                <input
                  className="auth-input"
                  name="password"
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                />
              </div>
              {/* Submit */}
              <button
                className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90 w-full"
                type="submit"
              >
                Login
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="py-4 lg:py-6">
              <p className="text-center text-xs text-gray-600/95 lg:text-sm">
                Don’t have an account?
                <Link
                  className="text-lwsGreen hover:underline ml-2"
                  to="/register"
                >
                  Create New
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;

