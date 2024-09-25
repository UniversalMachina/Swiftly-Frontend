import { useState } from "react";
import { useLogin } from "../../LoginContext";


const ExpertLogin = () => {
  return (
    <div className="w-full h-[1080px] relative rounded-[24px] bg-[#fff] overflow-hidden leading-[normal] tracking-[normal] mq450:h-auto mq450:min-h-[1080]">

      
<div className={`absolute h-[1100px] top-0 bottom-0 left-[960px] w-[960px]`}>
      <img
        className="absolute top-[-6px] left-0 w-full h-full object-cover z-1"
        alt=""
        src="/rectangle-4@2x.png"
      />
    </div>
      <FrameComponent />
    </div>
  );
};

export default ExpertLogin;




const GroupComponent = ({ className = "", label, type = "text", iconSrc, value, onChange }) => {
  return (
    <div
      className={`self-stretch rounded-[16px] bg-[rgba(240,237,255,0.8)] flex flex-row items-center justify-start shrink-0 max-w-full text-left text-[17px] text-[#1c1c1c] font-[Poppins] ${className}`}
    >
      <div className="flex-1 flex flex-row items-start justify-start flex-wrap content-start py-[21.5px] px-[27px] box-border relative gap-[9.5px] max-w-full z-[2]">
        <div className="h-[36.8px] w-[36.3px] relative flex items-center justify-center">
          <img
            className="absolute top-[0px] left-[0px] w-full h-full object-cover z-[1]"
            alt={`${label} icon`}
            src={iconSrc}
          />
        </div>
        <input
          type={type}
          placeholder={label}
          required
          value={value}
          onChange={onChange}
          className="flex-1 bg-transparent border-none outline-none text-[#1c1c1c] placeholder-[#1c1c1c] text-[17px] font-[Poppins] rounded-[16px] p-[10px] px-[20px]"
        />
      </div>
    </div>
  );
};

const LoginHeader = () => {
  return (
    <div className="self-stretch flex flex-row items-start justify-center py-0 pl-[20px] pr-[22px]">
      <div className="w-[140.5px] flex flex-row items-start justify-start">
        <h1 className="m-0 h-[32.2px] flex-1 relative text-inherit uppercase font-bold font-inherit inline-block mq450:text-[24px] mq750:text-[32px]">
          Login
        </h1>
      </div>
    </div>
  );
};

const ExpertLoginNotice = () => {
  return (
    <div className="self-stretch flex flex-row items-start justify-start max-w-full text-[16px] text-[#525252]">
      <div className="flex-1 relative inline-block shrink-0 max-w-full">
        Are you an expert? Log in as an expert.
      </div>
    </div>
  );
};

const LoginButton = ({ onClick }) => {
  return (
    <div className="self-stretch flex flex-row items-start justify-center py-0 px-[20px]">
      <button
        onClick={onClick}
        className="cursor-pointer border-none p-0 bg-transparent w-[187.4px] shadow-[0px_8px_21px_rgba(0,_0,_0,_0.16)] rounded-[16px] bg-gradient-to-r from-[#9181f4] to-[#5038ed] flex flex-row items-start justify-start shrink-0"
      >
        <div className="flex-1 shadow-[0px_8px_21px_rgba(0,_0,_0,_0.16)] rounded-[16px] bg-gradient-to-r from-[#9181f4] to-[#5038ed] flex flex-row items-start justify-start pt-[25.6px] px-[16px] pb-[27.2px] z-2">
          <b className="flex-1 relative text-[20px] leading-[27px] font-[Poppins] text-white text-center z-1 mq450:text-[16px] mq450:leading-[22px]">
            Login Now
          </b>
        </div>
      </button>
    </div>
  );
};

const SocialLoginButton = ({ imageSrc, altText, provider, onClick }) => {
  return (
    <div className="self-stretch flex flex-row items-center justify-center">
      <button
        onClick={onClick}
        className="cursor-pointer flex flex-row items-center justify-center border-none bg-transparent py-[15px] px-[20px] rounded-[16px] border-[#f0edff] border-[1px] shadow-[0px_8px_21px_rgba(0,_0,_0,_0.16)] bg-[rgba(240,237,255,0.8)]"
      >
        <img
          src={imageSrc}
          alt={altText}
          className="h-[36px] w-[36px] mr-[10px]"
        />
        <b className="text-[16px] font-[Poppins]">{`Login with ${provider}`}</b>
      </button>
    </div>
  );
};


const FrameComponent = ({ className = "" }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [attempts, setAttempts] = useState(0); // To track retry attempts
  const [errorMessage, setErrorMessage] = useState(""); // To store error message

  const maxAttempts = 3; // Maximum number of retries

  const handleLoginClick = async () => {
    let success = false;
    let currentAttempts = 0;
    
    while (!success && currentAttempts < maxAttempts) {
      try {
        // Simulate a login fetch request
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
          // Login was successful
          success = true;
          setErrorMessage(""); // Clear any previous error message
          // alert(`Login successful for Username: ${username}`);
        } else {
          throw new Error("Login failed");
        }
      } catch (error) {
        currentAttempts++;
        setAttempts(currentAttempts);
        console.error("Login attempt failed. Retrying...");
      }
    }

    if (!success) {
      setErrorMessage("Failed to login. Please try again later.");
    }
  };

  return (
    <div
      className={`absolute top-[80px] left-[180px] w-[550px] flex flex-col items-end justify-start gap-[36.9px] max-w-full text-center text-[40px] text-[#1c1c1c] font-[Poppins] ${className}`}
    >
      <div className="self-stretch flex flex-row items-start justify-end pt-0 px-[21px] pb-[11.8px] box-border max-w-full text-[#000]">
        <div className="flex-1 flex flex-col items-start justify-start gap-[27.4px] max-w-full shrink-0">
          <LoginHeader />
          <ExpertLoginNotice />
        </div>
      </div>

      <div className="self-stretch flex flex-col items-start justify-start gap-[36.9px] max-w-full text-left text-[17px]">
        <div className="self-stretch flex flex-col items-start justify-start gap-[27.6px] shrink-0 max-w-full">
          <GroupComponent
            label="Username"
            iconSrc="/frame.svg"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <GroupComponent
            label="Password"
            type="password"
            iconSrc="/frame-2.svg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <LoginButton onClick={handleLoginClick} />
      </div>

      {/* Display red error message if login fails after retries */}
      {errorMessage && (
        <div className="text-red-500 mt-4 text-center">{errorMessage}</div>
      )}

      {/* Optionally show the number of attempts */}
      {attempts > 0 && (
        <div className="text-red-500 mt-2 text-center">
          Attempt {attempts} of {maxAttempts}
        </div>
      )}

      <div className="self-stretch flex flex-col items-center justify-start gap-[36.9px] max-w-full text-[16px]">
        <div className="flex flex-col items-center text-center">
          <b>Login</b>
          <span className="text-[#525252]">with Others</span>
        </div>
        <div className="self-stretch flex flex-col items-center justify-start gap-[24.6px] max-w-full text-left text-[15px]">
          <SocialLoginButton
            imageSrc="/google-1@2x.png"
            altText="Google logo"
            provider="Google"
            onClick={handleGoogleLoginClick}
          />
        </div>
      </div>
    </div>
  );
};
