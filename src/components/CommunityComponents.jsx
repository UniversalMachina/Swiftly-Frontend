import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaRobot,
  FaEnvelope,
  FaChartLine,
  FaHandshake,
} from "react-icons/fa";
import { RiRobot2Fill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { AiOutlineMonitor } from "react-icons/ai";
import { BsPlusCircleFill } from "react-icons/bs";
import { useLogin } from "../LoginContext";

const communityOptions = [
  { label: "Dashboard", icon: FaUser, route: "/expert-dashboard-page" },
];

export const CommunityOptions = ({ active = "MultiMiner" }) => {
  const navigate = useNavigate();
  const { logout } = useLogin();

  return (
    <div>
      <div className="flex flex-col gap-[39px]">
        {communityOptions.map((option, index) => {
          const Icon = option.icon;
          const isGreyedOut =
            option.label !== "Dashboard" && option.label !== "MultiMiner";

          if (active === option.label) {
            return (
              <button
                key={index}
                className="cursor-pointer [border:none] px-[67px] py-[20px] bg-[transparent] shadow-[0px_8px_21px_rgba(0,_0,_0,0.16)] rounded-[16px] [background:linear-gradient(99.78deg,#9181f4,_#5038ed)] flex flex-row items-start justify-start gap-[22px] mq450:pl-[20px] mq450:pr-[20px] mq450:box-border"
                onClick={() => navigate(option.route)}
              >
                <Icon className="h-[25px] w-[25px] text-white z-[1]" />
                <div className="flex flex-col items-start justify-start pt-[1px] px-[0px] pb-[0px]">
                  <b className="relative text-[15px] inline-block font-[Poppins] text-[#fff] text-center min-w-[106px] z-[1]">
                    {option.label}
                  </b>
                </div>
              </button>
            );
          } else {
            return (
              <div
                key={index}
                className={`flex flex-row items-center justify-start cursor-pointer text-black px-4 py-2 rounded-lg ${
                  isGreyedOut ? "opacity-50 pointer-events-none" : ""
                }`}
                onClick={() => !isGreyedOut && navigate(option.route)}
              >
                <Icon
                  className={`w-[25px] h-[25px] ${
                    isGreyedOut ? "text-gray-400" : ""
                  }`}
                />
                <b
                  className={`ml-[10px] relative inline-block min-w-[100px] ${
                    isGreyedOut ? "text-gray-400" : ""
                  }`}
                >
                  {option.label}
                </b>
              </div>
            );
          }
        })}
      </div>

      <div
        className={`flex flex-row items-start justify-start py-[0px] px-[18px] pt-[400px] text-center text-[15px] text-[#1c1c1c] font-[Poppins]`}
      >
        <div className="flex flex-col items-start justify-start gap-[45px]">
          {/* Greyed-out Settings */}
          <div className="flex flex-row items-start justify-start gap-[22px] opacity-50 pointer-events-none">
            <img
              className="h-[25px] w-[25px] relative overflow-hidden shrink-0 object-cover min-h-[25px]"
              loading="lazy"
              alt=""
              src="/iconparksolidsetting@2x.png"
            />
            <div className="flex flex-col items-start justify-start pt-[1px] px-[0px] pb-[0px]">
              <b className="relative inline-block min-w-[64px] text-gray-400">
                Settings
              </b>
            </div>
          </div>

          {/* Logout Button with Functionality */}
          <div
            className="flex flex-row items-start justify-start gap-[22px] cursor-pointer"
            onClick={() => logout()}
          >
            <img
              className="h-[25px] w-[25px] relative overflow-hidden shrink-0 min-h-[25px]"
              loading="lazy"
              alt="Sign Out"
              src="/uissignout.svg"
            />
            <div className="flex flex-col items-start justify-start pt-[1px] px-[0px] pb-[0px]">
              <b className="relative inline-block min-w-[66px]">Sign Out</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CommunityCard = ({ title, description }) => (
  <div className="flex-1 rounded-[20px] bg-[#d9d9d9] flex flex-row items-start justify-start pt-[123px] px-[0px] pb-[0px] box-border min-w-[141px]">
    <div className="h-[123px] flex-1 rounded-t-[0px] rounded-b-[20px] bg-[#fff] flex flex-col items-start justify-start py-[11px] px-[14px] box-border z-[1]">
      <b className="relative inline-block min-w-[34px] z-[2]">{title}</b>
      <div className="relative text-[10px] inline-block min-w-[57px] z-[3]">
        {description}
      </div>
    </div>
  </div>
);

export const PlusIconCard = () => (
  <div className="flex-[0.3687] rounded-[20px] bg-[#d9d9d9] flex flex-row items-start justify-center py-[83px] pl-[69px] pr-[68px] box-border min-w-[141px] mq450:flex-1">
    <div className="flex-1 flex flex-row items-center justify-center">
      <BsPlusCircleFill className="h-[80px] w-[80px] text-white" />
    </div>
  </div>
);
