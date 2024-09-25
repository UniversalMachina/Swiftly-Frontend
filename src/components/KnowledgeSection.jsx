import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa"; // Importing the back arrow icon from react-icons

const KnowledgeSection = () => {
  const navigate = useNavigate();

  return (
    <div className="text-[#1c1c1c] font-[Poppins] w-[287px] flex flex-col items-start justify-start gap-[78px] mq450:gap-[39px]">
      <div
        className="flex flex-row items-start justify-start py-[0px] px-[45px] mq450:pl-[20px] mq450:pr-[20px] mq450:box-border cursor-pointer"
        onClick={() => navigate("/Knowledgebase")}
      >
        <div className="flex flex-row items-start justify-start gap-[25px]">
          <img
            className="h-[25px] w-[25px] relative overflow-hidden shrink-0 min-h-[25px]"
            loading="lazy"
            alt="Knowledge base"
            src="/fa6solidbrain.svg"
          />
          <div className="flex flex-col items-start justify-start pt-[1px] px-[0px] pb-[0px]">
            <b className="relative inline-block min-w-[128px]">Knowledge base</b>
          </div>
        </div>
      </div>

      <div className="self-stretch flex flex-col items-start justify-start gap-[74px] mq450:gap-[37px]">
        <div
          className="w-[198px] flex flex-row items-start justify-start py-[0px] px-[45px] box-border cursor-pointer"
          onClick={() => navigate("/Prompt")}
        >
          <div className="flex-1 flex flex-row items-start justify-between gap-[20px]">
            <img
              className="h-[25px] w-[25px] relative min-h-[25px]"
              loading="lazy"
              alt="Prompt"
              src="/vector1.svg"
            />
            <div className="flex flex-col items-start justify-start pt-[1px] px-[0px] pb-[0px]">
              <b className="relative inline-block min-w-[58px]">Prompt</b>
            </div>
          </div>
        </div>

        {/* Grayed-out Speech Style */}
        <div
          className="flex flex-row items-start justify-start py-[0px] px-[45px] cursor-pointer opacity-50 pointer-events-none"
        >
          <div className="flex flex-row items-start justify-start gap-[25px]">
            <div className="flex flex-col items-start justify-start pt-[4px] px-[0px] pb-[0px]">
              <img
                className="w-[25px] h-[25px] relative"
                loading="lazy"
                alt="Speech style"
                src="/vector-11.svg"
              />
            </div>
            <b className="relative inline-block min-w-[98px] text-gray-400">Speech style</b>
          </div>
        </div>

        {/* Grayed-out Model */}
        <button
          className="cursor-pointer [border:none] pt-[17px] pb-[18px] pl-[21px] pr-[20px] bg-[transparent] self-stretch shadow-[0px_8px_21px_rgba(0,_0,_0,_0.16)] rounded-[50px] [background:linear-gradient(99.78deg,_#9181f4,_#5038ed)] flex flex-row items-start justify-center opacity-50 pointer-events-none"
        >
          <b className="relative text-[15px] inline-block font-[Poppins] text-[#fff] text-center min-w-[48px] z-[1]">
            Model
          </b>
        </button>
      </div>

      <div
        className="flex flex-row items-center justify-start py-[0px] px-[20px] cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft className="h-[25px] w-[25px]" />
        <span className="ml-[10px] text-[16px]">Back</span>
      </div>
    </div>
  );
};

export default KnowledgeSection;
