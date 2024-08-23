import React, { useState } from "react";
import Input from "../../Components/atoms/Input/Input";
import {  toast, ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSiginClick = () => {

    // Verify password and email
    
    if(email === "" || password === "") {
      alert("Please enter email and password")
      return
    }
    console.log(email, password);
    
    // toast.success("Login Successful",{
    //   position: "bottom-right",
    //   autoClose: 1800,
    //   closeOnClick: true,
    //   progress: undefined,
    //   theme: "dark"
    //   });
    
    alert("Login Successful");

    // navigate("/dashboard");
  };

  return (
    <>
        <div className="flex justify-center items-center h-screen w-screen ">
      <section className="rounded-md bg-black/70 p-2 min-w-1/2 scale-110 xl:scale-125 2xl:scale-150">
        <div className="flex items-center justify-center bg-white px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-4xl font-bold leading-tight text-black">
              Sign in to your account
            </h2>
            <form action="#" method="POST" className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="text-xl font-medium text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-xl font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    title=""
                    className="text-lg font-semibold text-black hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="mt-2">
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    className=""
                  />
                </div>
              </div>
              <div>
                <button
                  type="button"
                  onClick={handleSiginClick}
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
    
    </>

  );
};

export default LoginPage;
