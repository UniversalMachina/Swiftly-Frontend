import React from 'react';
import { 
  HiOutlineDocumentText, 
  HiOutlineCurrencyDollar, 
  HiOutlineClock, 
  HiOutlineChartBar,
  HiOutlineArrowUp,
  HiOutlineExclamationTriangle
} from 'react-icons/hi2';
import { 
  Line, 
  Pie,
  LineChart,
  PieChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer 
} from 'recharts';

const extractionStats = [
  { icon: HiOutlineDocumentText, title: "Processed Menus", value: "Coming Soon", footer: { value: "+21%", color: "text-emerald-500" } },
  { icon: HiOutlineCurrencyDollar, title: "Avg. Items/Menu", value: "Coming Soon", footer: { value: "+5%", color: "text-emerald-500" } },
  { icon: HiOutlineClock, title: "Avg. Processing Time", value: "Coming Soon", footer: { value: "-0.5s", color: "text-emerald-500" } },
  { icon: HiOutlineChartBar, title: "Accuracy Rate", value: "Coming Soon", footer: { value: "+0.6%", color: "text-emerald-500" } },
];

const extractionChart = {
  data: [
    { name: "Mon", extractions: 10 },
    { name: "Tue", extractions: 15 },
    { name: "Wed", extractions: 8 },
    { name: "Thu", extractions: 12 },
    { name: "Fri", extractions: 18 },
    { name: "Sat", extractions: 20 },
    { name: "Sun", extractions: 16 }
  ]
};

const topPerformingCategories = [
  { name: "Italian", percentage: 95 },
  { name: "Japanese", percentage: 92 },
  { name: "Mexican", percentage: 88 },
  { name: "American", percentage: 85 },
];

const StatisticsCard = ({ icon: Icon, title, value, footer }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between w-full">
    <div className="flex justify-between items-start mb-4">

    <div className="bg-indigo-500 rounded-full p-3 flex items-center justify-center">
  <Icon className="w-6 h-6 text-white" />
</div>
    </div>
    <div>
      <h6 className="text-gray-500 font-medium mb-1 text-sm">{title}</h6>
      <p className="text-2xl font-bold mb-2 text-gray-800">{value}</p>
      <p className="text-sm text-gray-600">
        <span className={`${footer.color} font-semibold`}>{footer.value}</span> since last week
      </p>
    </div>
  </div>
);

const ExtractionOverview = () => (
  <div className="bg-white rounded-xl shadow-lg p-6 w-full">
    <div className="flex justify-between items-center mb-6">
      <h6 className="text-[20px] font-semibold text-gray-800">Extraction Overview</h6>
      <div className="flex items-center text-sm text-gray-600">
        <HiOutlineArrowUp className="w-4 h-4 text-emerald-500 mr-1" />
        <span className="font-semibold text-emerald-500">24%</span>&nbsp;more than last month
      </div>
    </div>
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={extractionChart.data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="name" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="extractions" stroke="#4f46e5" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const CategoryPerformance = () => (
  <div className="bg-white rounded-xl shadow-lg p-6 w-full">
    <h6 className="text-[20px] font-semibold text-gray-800 mb-6">Category Performance</h6>
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={topPerformingCategories}
            dataKey="percentage"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#4f46e5"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="container mx-auto px-[70px] py-[70px] font-[Poppins] bg-gray-50">
      <div className="flex flex-row gap-6 mb-8">
        {extractionStats.map((stat, index) => (
          <StatisticsCard key={index} {...stat} />
        ))}
      </div>
      
      <div className="flex flex-row gap-6 mb-8">
        <ExtractionOverview />
        <CategoryPerformance />
      </div>
    </div>
  );
};

export default Dashboard;