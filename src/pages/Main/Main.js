import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useLogin } from "../../LoginContext"; // Adjust this path based on the actual location of LoginContext

const Main = () => {
  const navigate = useNavigate();
  const { isLoggedIn, accountType } = useLogin();

  const handleLoginClick = () => {
    if (isLoggedIn) {
      navigate("/expert-dashboard-page"); // Navigate to dashboard if logged in
    } else {
      navigate("/client-signup"); // Redirect to /client-type if not logged in
    }
  };

  return (
    <div className="w-full relative rounded-[24px] bg-[#fff] overflow-hidden flex flex-col items-start justify-start gap-[103px] leading-[normal] tracking-[normal] mq700:gap-[26px] mq975:gap-[51px]">
      <img
        className="w-[1995.8px] relative max-h-full object-cover hidden max-w-full"
        alt=""
        src="/screenshot-20240824-at-101343-pm-1@2x.png"
      />
      <div className="w-[321px] h-[68px] relative shadow-[0px_8px_21px_rgba(0,_0,_0,_0.25)] rounded-[35px] bg-[#fff] hidden max-w-full" />
      <header className="self-stretch [background:linear-gradient(217.64deg,_#9181f4,_#5038ed)] flex flex-row items-start justify-end py-[33px] px-[127px] box-border top-[0] z-[99] sticky max-w-full text-left text-[25px] text-[#fff] font-[Poppins] mq450:pl-[20px] mq450:pr-[20px] mq450:box-border">
        <div className="h-[104px] w-[1920px] relative [background:linear-gradient(217.64deg,_#9181f4,_#5038ed)] hidden max-w-full" />
        <a
          className={`relative font-bold text-[inherit] inline-block min-w-[70px] z-[1]`}
          onClick={handleLoginClick}
        >
          {isLoggedIn ? "Go to Dashboard" : "Login"}
        </a>
      </header>
      <main className="self-stretch flex flex-row items-start justify-center py-[0px] px-[20px] box-border max-w-full">

      </main>
    </div>
  );
};

export default Main;
