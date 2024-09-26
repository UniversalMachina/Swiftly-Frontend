// Dashboard.js
import React, { useState } from 'react';
import CaseTable from './CaseTable';
import AiProgressCard from './AiProgressCard';
import PropertyInformationCard from './PropertyInformationCard';
import OutreachTrackingCard from './OutreachTrackingCard';

const Dashboard = () => {
  const [cases, setCases] = useState([]);
  const [aiProgress, setAiProgress] = useState(0);
  const [databaseSuppliers, setDatabaseSuppliers] = useState(0);
  const [googleMapsSuppliers, setGoogleMapsSuppliers] = useState(0);
  const [emailsSent, setEmailsSent] = useState(0);
  const [suppliersCalled, setSuppliersCalled] = useState(0);

  // Function to update dashboard data based on inquiry
  const updateDashboardWithInquiryData = (inquiry) => {
    setAiProgress(inquiry.aiProgress);
    setDatabaseSuppliers((prev) => prev + inquiry.propertiesIdentified);
    setGoogleMapsSuppliers((prev) => prev + inquiry.propertiesIdentified);
    setEmailsSent((prev) => prev + inquiry.emailsSent);
    setSuppliersCalled((prev) => prev + inquiry.suppliersCalled);
  };

  // Reset functions
  const resetAIProgress = () => setAiProgress(0);
  const resetSuppliers = () => {
    setDatabaseSuppliers(0);
    setGoogleMapsSuppliers(0);
  };
  const resetOutreach = () => {
    setEmailsSent(0);
    setSuppliersCalled(0);
  };

  return (
    <div className="flex flex-col gap-6 p-8 max-w-[1600px] mx-auto bg-gray-50 self-stretch w-full">
      <CaseTable
        cases={cases}
        setCases={setCases}
        updateDashboardWithInquiryData={updateDashboardWithInquiryData}
      />
      <div className="flex flex-row gap-6">
        <AiProgressCard aiProgress={aiProgress} resetAIProgress={resetAIProgress} />
        <PropertyInformationCard
          databaseSuppliers={databaseSuppliers}
          googleMapsSuppliers={googleMapsSuppliers}
          resetSuppliers={resetSuppliers}
        />
        <OutreachTrackingCard
          emailsSent={emailsSent}
          suppliersCalled={suppliersCalled}
          resetOutreach={resetOutreach}
        />
      </div>
    </div>
  );
};

export default Dashboard;
