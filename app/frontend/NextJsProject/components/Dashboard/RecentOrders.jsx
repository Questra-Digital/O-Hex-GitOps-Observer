import React from 'react';
import { data } from '../../data/data';
import { FaShoppingBag } from 'react-icons/fa';

const RecentOrders = () => {
  return (
    <div className="flex justify-center gap-4">
      {/* 1 */}
      <div className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-8 flex items-center cursor-pointer">
        <div className="bg-purple-100 rounded-lg p-4">
          <FaShoppingBag className="text-purple-800" />
        </div>
        <div className="pl-8">
          <p className="text-gray-800 font-bold text-center">Source</p>
          <div className="flex flex-col items-center">
            <p className="text-gray-400 text-sm">Ali</p>
            <p className="text-gray-400 text-sm">Ali</p>
            <p className="text-gray-400 text-sm">Ali</p>
          </div>
        </div>
      </div>



      {/* 2 */}
      <div className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-8 flex items-center cursor-pointer">
        <div className="bg-purple-100 rounded-lg p-6">
          <FaShoppingBag className="text-purple-800" />
        </div>
        <div className="pl-4">
          <p className="text-gray-800 font-bold">Destination</p>
          <p className="text-gray-400 text-sm">Ali</p>
          <p className="text-gray-400 text-sm">Ali</p>
        </div>

      </div>
  </div>
  
  );
};

export default RecentOrders;
