import { useState } from "react";
import { Icon } from "@iconify/react";
import TextInput from "../components/shared/TextInput";
import PasswordInput from "../components/shared/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelpers";
import { useCookies } from "react-cookie";
import voltkonLogo from "../assets/images/voltkon.svg";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const login = async () => {
    const data = { email, password };
    const response = await makeUnauthenticatedPOSTRequest("/auth/login", data);
    if (response && !response.err) {
      const token = response.token;
      const date = new Date();
      date.setDate(date.getDate() + 30);
      setCookie("token", token, { path: "/", expires: date });
      alert("Success");
      navigate("/home");
    } else {
      alert("Failure");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      {/* Header */}
      <div className="logo py-3 w-full flex justify-between items-center px-11 border-b border-gray-300">
        {/* Left: Logo */}
        <img src={voltkonLogo} alt="Voltkon Logo" className="h-12" />

        {/* Right: Links */}
        <div className="flex space-x-4">
          <Link
            to="/Login"
            className="bg-green-500 text-white font-semibold px-4 py-2 rounded-full hover:bg-green-600 transition duration-300"
          >
            Log In
          </Link>
          <Link
            to="/Signup"
            className="text-gray-600 font-medium hover:text-gray-900 my-auto transition duration-300"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Login Form */}
      <div className="inputRegion w-full max-w-lg px-6 py-10 flex flex-col items-center">
        <div className="font-bold text-xl mb-8 text-center">
          To continue, log in to Voltkon
        </div>

        <TextInput
          label="Email address or username"
          placeholder="Email address or username"
          className="my-2 w-full"
          value={email}
          setValue={setEmail}
        />
        <PasswordInput
          label="Password"
          placeholder="Password"
          className="my-2 w-full"
          value={password}
          setValue={setPassword}
        />
        <button
          className="bg-green-500 text-white font-semibold py-3 px-10 rounded-full mt-6 w-full"
          onClick={(e) => {
            e.preventDefault();
            login();
          }}
        >
          LOG IN
        </button>

        <div className="border-b border-gray-300 w-full my-6"></div>
        <div className="text-center text-lg font-medium">
          Don't have an account?
        </div>
        <Link
          to="/Signup"
          className="bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-semibold mt-4 hover:bg-gray-300 transition duration-300"
        >
          SIGN UP FOR VOLTKON
        </Link>
      </div>
    </div>
  );
};

export default LoginComponent;
