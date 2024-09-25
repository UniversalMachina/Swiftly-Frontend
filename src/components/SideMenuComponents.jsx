import React, { useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";

import { FaUsers, FaHashtag, FaBook, FaPlus, FaUser, FaChevronDown, FaChevronRight, FaArrowLeft, FaClipboard, FaSignOutAlt  } from 'react-icons/fa';
import { FiSearch, FiBell, FiUser, FiHome, FiSettings } from 'react-icons/fi'; // Importing more icons
import { useLogin } from "../LoginContext"; // Adjust the path to your LoginContext

const Avatar = () => {
  const navigate = useNavigate();
  const { communityId } = useParams();

  return (
    <div className="flex flex-col items-start cursor-pointer font-sans">
      {/* AI Avatar Section */}
      <div
        className="flex items-center space-x-3 mb-4 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
        onClick={() => navigate(`/AI-Avatar-Client/${communityId}`)}
      >
        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
          <FaUser className="text-xl text-white" />
        </div>
        <span className="font-medium text-lg text-gray-800">AI Avatar</span>
      </div>

      {/* Community Section (Grayed out) */}
      <div
        className="flex items-center space-x-3 p-2 rounded-lg opacity-50 pointer-events-none"
      >
        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
          <FaUsers className="text-xl text-white" />
        </div>
        <span className="font-medium text-lg text-gray-800">Community</span>
      </div>
    </div>
  );
};



const SideMenu = ({ community, onAddChannel, onAddCourse, onSelectChannel, onSelectCourse }) => {
  const navigate = useNavigate();
  const { communityId } = useParams();
  const { username, accountType, logout } = useLogin(); // Assuming accountType can be 'expert' or something else.

  const copyToClipboard = () => {
    const link = `${window.location.origin}/admin-community-page/${communityId}`;
    navigator.clipboard.writeText(link).then(() => {
      console.log('Link copied to clipboard:', link); // You can replace this with a toast/notification
    });
  };

  const handleBackClick = () => {
    if (accountType === 'expert') {
      navigate('/expert-dashboard-page'); // Redirect to expert dashboard if the user is an expert
    }
  };

  const handleLogoutClick = () => {
    logout(); // Trigger the logout function
  };

  return (
    <div className="w-96 bg-gray-50 flex flex-col items-start justify-start p-8 box-border gap-8 text-sm text-gray-600 font-sans">
      <Avatar />
      <CommunitySection 
        community={community} 
        onAddChannel={onAddChannel} 
        onAddCourse={onAddCourse}
        onSelectChannel={onSelectChannel}
        onSelectCourse={onSelectCourse}
      />
      
      {/* Copy Link to Community styled like AI Avatar */}
      <div
        className="flex items-center space-x-3 mb-4 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 cursor-pointer"
        onClick={copyToClipboard}
      >
        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
          <FaClipboard className="text-xl text-white" />
        </div>
        <span className="font-medium text-lg text-gray-800">Copy Link</span>
      </div>

      {/* Conditionally render the Back button only for expert users */}
      {accountType === 'expert' && (
        <div
          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 cursor-pointer"
          onClick={handleBackClick}
        >
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
            <FaArrowLeft className="text-xl text-white" />
          </div>
          <span className="font-medium text-lg text-gray-800">Back</span>
        </div>
      )}

      {/* Logout Button */}
      <div
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 cursor-pointer"
        onClick={handleLogoutClick}
      >
        <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-700 rounded-full flex items-center justify-center">
          <FaSignOutAlt className="text-xl text-white" />
        </div>
        <span className="font-medium text-lg text-gray-800">Logout</span>
      </div>
    </div>
  );
};


const CommunitySection = ({ community, onAddChannel, onAddCourse, onSelectChannel, onSelectCourse }) => (
  <div className="w-full flex flex-col items-start justify-start gap-6">
    <CollapsibleSection 
      title="Channels" 
      icon={<FaHashtag />} 
      items={community?.channels || []}
      onAdd={onAddChannel}
      onSelect={onSelectChannel}
    />
    <CollapsibleSection 
      title="Courses" 
      icon={<FaBook />} 
      items={community?.courses || []}
      onAdd={onAddCourse}
      onSelect={onSelectCourse}
    />
  </div>
);

const CollapsibleSection = ({ title, icon, items, onAdd, onSelect }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { username, accountType } = useLogin();

  return (
    <div className="w-full">
      <div 
        className="flex items-center justify-between mb-3 cursor-pointer group"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center space-x-2 text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
          {isCollapsed ? <FaChevronRight size={12} /> : <FaChevronDown size={12} />}
          <h3 className="text-sm font-semibold">{title}</h3>
        </div>
        {accountType === 'expert' && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAdd();
            }} 
            className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-500 hover:bg-blue-200 hover:text-blue-700 transition-colors duration-200"
          >
            <FaPlus size={10} />
          </button>
        )}
      </div>
      {!isCollapsed && (
        <div className="ml-4 space-y-2">
          {items.map((item) => (
            <div key={item.id} className="rounded-md overflow-hidden">
              <div 
                className="px-4 py-2 flex items-center space-x-2 text-white cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                onClick={() => onSelect && onSelect(item)}
              >
                {React.cloneElement(icon, { className: "text-white" })}
                <span>{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};




const TopBar = ({ communityName }) => (
  <div className="bg-white border-b border-gray-200 px-6 py-[10px] flex justify-between items-center h-20 font-[Poppins]">
    {/* Community Name */}
    <div className="text-2xl font-bold text-gray-800">{communityName}</div>

    {/* Grayed-out Search Input */}
    <div className="w-1/3 mx-6 opacity-50 pointer-events-none"> {/* Reduced width and grayed out */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-gray-100 rounded-[200px] py-[25px] pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 text-[16px]"
        />
        <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
    </div>

    {/* Grayed-out Icons */}
    <div className="flex items-center space-x-6 opacity-50 pointer-events-none">
      <FiHome className="text-gray-600 w-6 h-6" /> {/* Home icon */}
      <FiSettings className="text-gray-600 w-6 h-6" /> {/* Settings icon */}
      <FiBell className="text-gray-600 w-6 h-6" /> {/* Notification icon */}
      <FiUser className="text-gray-600 w-6 h-6" /> {/* User icon */}
    </div>
  </div>
);


export { SideMenu, CommunitySection, CollapsibleSection, TopBar };