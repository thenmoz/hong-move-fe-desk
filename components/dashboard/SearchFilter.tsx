'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { SearchFilters } from '@/types/booking';

interface SearchFilterProps {
  onFilterChange: (filters: SearchFilters) => void;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<SearchFilters>({
    dateFrom: '',
    dateTo: '',
    bookingNumber: '',
    passengerName: '',
    paymentStatus: 'all',
    jobStatus: 'all',
  });

  const handleChange = (field: keyof SearchFilters, value: string) => {
    const updatedFilters = { ...filters, [field]: value };
    setFilters(updatedFilters);
  };

  const handleSearch = () => {
    onFilterChange(filters);
  };

  const handleReset = () => {
    const resetFilters: SearchFilters = {
      dateFrom: '',
      dateTo: '',
      bookingNumber: '',
      passengerName: '',
      paymentStatus: 'all',
      jobStatus: 'all',
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Search className="w-5 h-5 text-gray-500" />
        <h3 className="text-lg font-semibold text-gray-900">ค้นหาและกรองข้อมูล</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {/* วันที่เริ่มต้น */}
        <Input
          type="date"
          label="วันที่เริ่มต้น"
          value={filters.dateFrom || ''}
          onChange={(e) => handleChange('dateFrom', e.target.value)}
        />

        {/* วันที่สิ้นสุด */}
        <Input
          type="date"
          label="วันที่สิ้นสุด"
          value={filters.dateTo || ''}
          onChange={(e) => handleChange('dateTo', e.target.value)}
        />

        {/* Booking Number */}
        <Input
          type="text"
          label="Booking Number"
          placeholder="BK20241101001"
          value={filters.bookingNumber || ''}
          onChange={(e) => handleChange('bookingNumber', e.target.value)}
        />

        {/* ชื่อผู้โดยสาร */}
        <Input
          type="text"
          label="ชื่อผู้โดยสาร"
          placeholder="ชื่อผู้โดยสาร"
          value={filters.passengerName || ''}
          onChange={(e) => handleChange('passengerName', e.target.value)}
        />

        {/* Payment Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            สถานะการชำระ
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.paymentStatus || 'all'}
            onChange={(e) => handleChange('paymentStatus', e.target.value)}
          >
            <option value="all">ทั้งหมด</option>
            <option value="paid">ชำระแล้ว</option>
            <option value="unpaid">ยังไม่ชำระ</option>
          </select>
        </div>

        {/* Job Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            สถานะงาน
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.jobStatus || 'all'}
            onChange={(e) => handleChange('jobStatus', e.target.value)}
          >
            <option value="all">ทั้งหมด</option>
            <option value="pending">รอยืนยัน</option>
            <option value="confirmed">ยืนยันแล้ว</option>
            <option value="in_progress">กำลังเดินทาง</option>
            <option value="completed">เสร็จสิ้น</option>
            <option value="cancelled">ยกเลิก</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={handleSearch}>
          <Search className="w-4 h-4 mr-2" />
          ค้นหา
        </Button>
        <Button variant="secondary" onClick={handleReset}>
          รีเซ็ต
        </Button>
      </div>
    </div>
  );
};
