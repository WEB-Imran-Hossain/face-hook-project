import { Link } from "react-router-dom";
import AuthIllustration from "../assets/images/auth_illustration.png";
import LoginForm from "../components/auth/LoginForm";

const LoginPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-deepDark py-8">
      <div className="w-full px-4 md:px-6 lg:px-0 max-w-[1368px] flex-1">
        <div className="grid gap-8 items-center lg:grid-cols-2">
          {/* Left Side: Illustration and Title */}
          <div className="flex flex-col justify-center items-start">
            {/* Illustration: Hidden on small screens */}
            <img
              className="mb-12 max-w-full hidden lg:block"
              src={AuthIllustration}
              alt="auth_illustration"
            />
            <div>
              <h1 className="mb-3 text-3xl font-bold lg:text-[40px]">
                Facehook
              </h1>
              <p className="max-w-[452px] text-gray-600/95 text-sm md:text-base lg:text-lg">
                Create a social media app with features like showing posts, post
                details, reactions, comments, and profiles.
              </p>
            </div>
          </div>

          {/* Right Side: Login Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="card p-6">
              <LoginForm />
            </div>

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
