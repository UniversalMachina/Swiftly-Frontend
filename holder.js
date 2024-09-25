import { useNavigate } from "react-router-dom";

const ExpertClient = () => {
  const navigate = useNavigate();

  const handleExpertClick = () => {
    navigate("/expert-signup"); // Redirect to the expert login page
  };

  const handleClientClick = () => {
    // Make this inactive, so don't navigate anywhere
  };

  return (
    <div className="w-full relative rounded-[24px] bg-[#fff] overflow-hidden flex flex-col items-start justify-start pt-[0px] pb-[50px] pl-[563px] pr-[2px] box-border gap-[110px] leading-[normal] tracking-[normal] text-left text-[65px] text-[#000] font-[Poppins] lg:pl-[281px] lg:box-border mq450:gap-[27px] mq450:pl-[20px] mq450:box-border mq750:gap-[55px] mq750:pl-[140px] mq750:box-border">
      <header className="ml-[-565px] w-[1920px] h-[104px] relative [background:linear-gradient(217.64deg,#9181f4,#5038ed)] max-w-[142%] shrink-0" />
      <h1 className="m-[0px] relative text-inherit font-bold font-[inherit] inline-block max-w-full mq450:text-[39px] mq1050:text-[52px]">
        Who are you joining as?
      </h1>
      <div className="w-[789.4px] flex flex-row items-start justify-center py-[0px] px-[20px] box-border max-w-full">
        <div className="w-[479.4px] flex flex-col items-start justify-start gap-[20.2px] max-w-full">
          <div className="self-stretch flex flex-row items-start justify-start py-[0px] pl-[1px] pr-[0px] box-border max-w-full">
            <button
              className="cursor-pointer [border:none] pt-[25.6px] px-[42px] pb-[27.2px] bg-[transparent] flex-1 shadow-[0px_8px_21px_rgba(0,_0,_0,0.16)] rounded-[16px] [background:linear-gradient(99.78deg,#9181f4,_#5038ed)] flex flex-row items-start justify-start box-border whitespace-nowrap max-w-full mq750:pl-[21px] mq750:pr-[21px] mq750:box-border"
              onClick={handleExpertClick}
            >
              <div className="h-[79.8px] w-[478.4px] relative shadow-[0px_8px_21px_rgba(0,_0,_0,0.16)] rounded-[16px] [background:linear-gradient(99.78deg,#9181f4,_#5038ed)] hidden max-w-full" />
              <b className="flex-1 relative text-[20px] leading-[27px] inline-block font-[Poppins] text-[#fff] text-center max-w-full z-[1]">
                I am an expert
              </b>
            </button>
          </div>
          <button
            className="cursor-default [border:none] pt-[25.6px] px-[42px] pb-[27.2px] bg-[#e0e0e0] self-stretch shadow-none rounded-[16px] flex flex-row items-start justify-start box-border whitespace-nowrap max-w-full mq750:pl-[21px] mq750:pr-[21px] mq750:box-border"
            onClick={handleClientClick}
            disabled // Disable the button
          >
            <div className="h-[79.8px] w-[478.4px] relative rounded-[16px] bg-[#e0e0e0] hidden max-w-full" />
            <b className="flex-1 relative text-[20px] leading-[27px] inline-block font-[Poppins] text-[#a0a0a0] text-center max-w-full z-[1]">
              I am a client
            </b>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpertClient;

