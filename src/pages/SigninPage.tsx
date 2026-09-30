import { useState } from "react";
import type { SubmitEvent } from "react";
import { Link } from "react-router-dom";
import { signinUser } from "../services/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";

const SigninPage = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSignin = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userData = {
      email: email,
      password: password,
    };

    try {
      setIsLoading(true);

      const responseData = await signinUser(userData);

      dispatch(
        login({
          accessToken: responseData.access_token,
        }),
      );

      toast.success(responseData.message);

      navigate("/todos");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.detail || "Unable to sign in");
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-800">Sign In</h1>

        <p className="mt-2 text-sm text-gray-500">
          Sign in to manage your Todos.
        </p>

        <form onSubmit={handleSignin} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-500">
          Do not have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-blue-600 hover:underline"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SigninPage;
