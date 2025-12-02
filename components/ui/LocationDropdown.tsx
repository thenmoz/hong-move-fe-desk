'use client';

import React, { useState, useMemo } from 'react';
import * as Select from '@radix-ui/react-select';
import {
  LOCATIONS,
  getLocationDisplayName,
  type Location,
} from '@/lib/data/locations';

interface LocationDropdownProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
}

export const LocationDropdown: React.FC<LocationDropdownProps> = ({
  value,
  onChange,
  label,
  placeholder = 'เลือกสถานที่',
  required = false,
  error,
  className = '',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);

  // Filter locations based on search query
  const filteredLocations = useMemo(() => {
    if (!searchQuery.trim()) return LOCATIONS.filter((loc) => loc.isActive);

    const query = searchQuery.toLowerCase().trim();
    return LOCATIONS.filter(
      (loc) =>
        loc.isActive &&
        (loc.nameTh.includes(searchQuery) ||
          loc.nameEn.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  // Group locations by category
  const groupedLocations = useMemo(() => {
    const groups: Record<string, Location[]> = {};
    filteredLocations.forEach((loc) => {
      if (!groups[loc.category]) {
        groups[loc.category] = [];
      }
      groups[loc.category].push(loc);
    });
    return groups;
  }, [filteredLocations]);

  const categoryLabels: Record<string, string> = {
    airport: 'สนามบิน',
    train_station: 'สถานีรถไฟ',
    bus_terminal: 'สถานีขนส่ง',
    hotel: 'โรงแรม',
    shopping: 'ห้างสรรพสินค้า',
    landmark: 'สถานที่ท่องเที่ยว',
    port: 'ท่าเรือ',
  };

  // Find current selected location for display
  const selectedLocation = LOCATIONS.find(
    (loc) => loc.nameTh === value || loc.nameEn === value
  );

  const displayValue = selectedLocation
    ? getLocationDisplayName(selectedLocation)
    : value || '';

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <Select.Root
        value={value}
        onValueChange={onChange}
        open={open}
        onOpenChange={setOpen}
      >
        <Select.Trigger
          className={`w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7a0a0a]/40 focus:border-[#7a0a0a] ${
            error ? 'border-red-500' : 'border-gray-200'
          } bg-white text-left flex items-center justify-between`}
          aria-label={label || 'Location'}
        >
          <Select.Value placeholder={placeholder}>
            <span className="text-gray-900">{displayValue || placeholder}</span>
          </Select.Value>
          <Select.Icon className="ml-2">
            <svg
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-400"
            >
              <path
                d="M1 1.5L6 6.5L11 1.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            className="overflow-hidden bg-white rounded-xl shadow-lg border border-gray-200 z-50"
            position="popper"
            sideOffset={4}
          >
            {/* Search Input */}
            <div className="p-2 border-b border-gray-200 sticky top-0 bg-white">
              <input
                type="text"
                placeholder="ค้นหาสถานที่..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7a0a0a]/40 focus:border-[#7a0a0a]"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            <Select.Viewport className="p-1 max-h-[300px] overflow-y-auto">
              {Object.keys(groupedLocations).length === 0 ? (
                <div className="px-4 py-6 text-center text-sm text-gray-500">
                  ไม่พบสถานที่ที่ค้นหา
                </div>
              ) : (
                Object.entries(groupedLocations).map(([category, locations]) => (
                  <Select.Group key={category}>
                    <Select.Label className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
                      {categoryLabels[category] || category}
                    </Select.Label>
                    {locations.map((location) => (
                      <Select.Item
                        key={location.id}
                        value={location.nameTh}
                        className="relative flex items-center px-3 py-2 text-sm rounded-md cursor-pointer outline-none hover:bg-gray-100 focus:bg-gray-100 data-[state=checked]:bg-[#7a0a0a]/10 data-[state=checked]:text-[#7a0a0a]"
                      >
                        <Select.ItemText>
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-900">
                              {location.nameTh}
                            </span>
                            <span className="text-xs text-gray-500">
                              {location.nameEn}
                            </span>
                          </div>
                        </Select.ItemText>
                        <Select.ItemIndicator className="absolute right-2 flex items-center">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13 4L6 11L3 8"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Select.ItemIndicator>
                      </Select.Item>
                    ))}
                  </Select.Group>
                ))
              )}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
