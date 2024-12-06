import { useState } from "react";
import { useCookies } from "react-cookie";
import { Icon } from "@iconify/react";
import TextInput from "../components/shared/TextInput";
import PasswordInput from "../components/shared/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelpers";
import voltkonLogo from "../assets/images/voltkon.svg";

const SignupComponent = () => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const signUp = async () => {
    if (email !== confirmEmail) {
      alert("Email and confirm Email field does not match, Please check again");
      return;
    }
    const data = { email, password, username, firstName, lastName };
    const response = await makeUnauthenticatedPOSTRequest(
      "/auth/register",
      data
    );
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
    <div className="min-h-screen flex flex-col items-center justify-between bg-gray-50">
      <div className="logo py-3 w-full flex justify-between items-center px-11 border-b border-gray-300">
        {/* Left: Logo */}
        <img src={voltkonLogo} alt="Voltkon Logo" className="h-12" />

        {/* Right: Login and Sign Up */}
        <div className="flex space-x-4">
          <Link
            to="/Login"
            className="text-gray-600 font-medium my-auto hover:text-gray-900 transition duration-300"
          >
            Log In
          </Link>
          <Link
            to="/Signup"
            className="bg-green-500 text-white font-semibold px-4 py-2 rounded-full hover:bg-green-600 transition duration-300"
          >
            Sign Up
          </Link>
        </div>
      </div>

      <div className="inputRegion w-full max-w-lg px-6 py-4 flex flex-col items-center">
        <div className="font-bold text-xl mb-4 text-center">
          Sign up for free to start listening.
        </div>

        <TextInput
          label="Email address"
          placeholder="Email"
          className="my-2 w-full"
          value={email}
          setValue={setEmail}
        />
        <TextInput
          label="Confirm Email address"
          placeholder="Confirm Email address"
          className="my-2 w-full"
          value={confirmEmail}
          setValue={setConfirmEmail}
        />
        <TextInput
          label="Username"
          placeholder="Enter your Username"
          className="my-2 w-full"
          value={username}
          setValue={setUsername}
        />
        <PasswordInput
          label="Create Password"
          placeholder="Enter a strong password"
          className="my-2 w-full"
          value={password}
          setValue={setPassword}
        />
        <div className="w-full flex flex-wrap justify-between gap-4">
          <TextInput
            label="First Name"
            placeholder="Enter your first name"
            className="flex-1"
            value={firstName}
            setValue={setFirstName}
          />
          <TextInput
            label="Last Name"
            placeholder="Enter your last name"
            className="flex-1"
            value={lastName}
            setValue={setLastName}
          />
        </div>

        <button
          className="bg-green-500 text-white font-semibold py-3 px-10 rounded-full mt-6 w-full"
          onClick={(e) => {
            e.preventDefault();
            signUp();
          }}
        >
          Sign Up
        </button>

        <div className="border-b border-gray-300 w-full my-6"></div>
        <div className="text-center text-lg font-medium">
          Already have an account?
        </div>
        <div className="mt-4">
          <Link
            to="/Login"
            className="bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-semibold"
          >
            Log in instead
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupComponent;
