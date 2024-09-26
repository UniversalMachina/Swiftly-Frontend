import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "./FrameComponent2";
import {
  CommunitiesButton,
  CommunityOptions,
} from "../../components/CommunityComponents";
import { useLogin } from "../../LoginContext";
import CommunityCreationModal from "../ExpertAIAvatarPage/CommunityCreationModal";

import { FiUpload } from "react-icons/fi";
import ExpertAIAvatarPage from "../ExpertAIAvatarPage/ExpertAIAvatarPage";

const ExpertDashboardPage = () => {
  const { username, accountType } = useLogin();

  const navigate = useNavigate();

  return (
    <div className="w-full relative rounded-[24px] bg-[#fff] overflow-hidden flex flex-row items-start justify-start  box-border text-[#1c1c1c] font-[Poppins] leading-[normal] tracking-[normal] lg:gap-[65px] lg:pl-[42px] lg:pr-[42px] lg:box-border mq450:gap-[16px] mq750:gap-[33px] mq750:pl-[21px] mq750:pr-[21px] mq750:box-border mq1400:gap-[20px]">
      <div className="shadow-[1000px] z-10 flex flex-col items-start justify-start gap-[0px] min-w-[287px] pt-[120px] px-[45px] mq450:gap-[19px] mq1050:flex-1 mq1400:pt-[70px] self-stretch">
        <CommunityOptions active="Dashboard" className="z-10" />
      </div>

      <Dashboard />
    </div>
  );
};

export default ExpertDashboardPage;
