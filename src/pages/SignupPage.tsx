import { useState } from "react";
import type { SubmitEvent } from "react";
import { Link } from "react-router-dom";
import { signupUser } from "../services/authApi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const SignupPage = () => {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userData = {
      name: name,
      email: email,
      password: password,
    };

    try {
      setIsLoading(true);

      const responseData = await signupUser(userData);

      toast.success(responseData.message);

      navigate("/signin");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.detail || "Unable to create account");
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-800">Create Account</h1>

        <p className="mt-2 text-sm text-gray-500">
          Create an account to manage your Todos.
        </p>

        <form onSubmit={handleSignup} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Name
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>

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
            {isLoading ? "Creating Account" : "Create Account"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
