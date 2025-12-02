/**
 * Predefined pickup/dropoff locations for Hong Move transportation service
 * Organized by category for better UX
 */

export interface Location {
  id: string;
  nameTh: string;
  nameEn: string;
  category: 'airport' | 'train_station' | 'bus_terminal' | 'hotel' | 'shopping' | 'landmark' | 'port';
  latitude: number;
  longitude: number;
  isActive: boolean;
}

export const LOCATIONS: Location[] = [
  // Airports
  {
    id: 'loc_001',
    nameTh: 'สนามบินสุวรรณภูมิ',
    nameEn: 'Suvarnabhumi Airport',
    category: 'airport',
    latitude: 13.6900,
    longitude: 100.7501,
    isActive: true,
  },
  {
    id: 'loc_002',
    nameTh: 'สนามบินดอนเมือง',
    nameEn: 'Don Mueang Airport',
    category: 'airport',
    latitude: 13.9126,
    longitude: 100.6069,
    isActive: true,
  },
  {
    id: 'loc_003',
    nameTh: 'สนามบินภูเก็ต',
    nameEn: 'Phuket International Airport',
    category: 'airport',
    latitude: 8.1132,
    longitude: 98.3169,
    isActive: true,
  },
  {
    id: 'loc_004',
    nameTh: 'สนามบินเชียงใหม่',
    nameEn: 'Chiang Mai International Airport',
    category: 'airport',
    latitude: 18.7677,
    longitude: 98.9625,
    isActive: true,
  },
  {
    id: 'loc_005',
    nameTh: 'สนามบินหาดใหญ่',
    nameEn: 'Hat Yai International Airport',
    category: 'airport',
    latitude: 6.9332,
    longitude: 100.3929,
    isActive: true,
  },
  {
    id: 'loc_006',
    nameTh: 'สนามบินอู่ตะเภา',
    nameEn: 'U-Tapao International Airport',
    category: 'airport',
    latitude: 12.6799,
    longitude: 101.0051,
    isActive: true,
  },

  // Train Stations
  {
    id: 'loc_007',
    nameTh: 'สถานีรถไฟกรุงเทพ (หัวลำโพง)',
    nameEn: 'Bangkok Railway Station (Hua Lamphong)',
    category: 'train_station',
    latitude: 13.7366,
    longitude: 100.5172,
    isActive: true,
  },
  {
    id: 'loc_008',
    nameTh: 'สถานีรถไฟกรุงเทพอภิวัฒน์ (บางซื่อ)',
    nameEn: 'Krung Thep Aphiwat Central Terminal (Bang Sue)',
    category: 'train_station',
    latitude: 13.8017,
    longitude: 100.5256,
    isActive: true,
  },
  {
    id: 'loc_009',
    nameTh: 'สถานีรถไฟดอนเมือง',
    nameEn: 'Don Mueang Railway Station',
    category: 'train_station',
    latitude: 13.9196,
    longitude: 100.6120,
    isActive: true,
  },
  {
    id: 'loc_010',
    nameTh: 'สถานีรถไฟเชียงใหม่',
    nameEn: 'Chiang Mai Railway Station',
    category: 'train_station',
    latitude: 18.7961,
    longitude: 98.9868,
    isActive: true,
  },

  // Bus Terminals
  {
    id: 'loc_011',
    nameTh: 'สถานีขนส่งสายใต้ใหม่ (บางซื่อ)',
    nameEn: 'Southern Bus Terminal (Sai Tai Mai)',
    category: 'bus_terminal',
    latitude: 13.7706,
    longitude: 100.4606,
    isActive: true,
  },
  {
    id: 'loc_012',
    nameTh: 'สถานีขนส่งหมอชิต 2 (สายเหนือ)',
    nameEn: 'Mo Chit 2 Bus Terminal (Northern)',
    category: 'bus_terminal',
    latitude: 13.8522,
    longitude: 100.5493,
    isActive: true,
  },
  {
    id: 'loc_013',
    nameTh: 'สถานีขนส่งอีกาไม (สายตะวันออก)',
    nameEn: 'Ekkamai Bus Terminal (Eastern)',
    category: 'bus_terminal',
    latitude: 13.7214,
    longitude: 100.5854,
    isActive: true,
  },

  // Major Hotels - Bangkok
  {
    id: 'loc_014',
    nameTh: 'โรงแรมแมนดาริน โอเรียนเต็ล',
    nameEn: 'Mandarin Oriental Bangkok',
    category: 'hotel',
    latitude: 13.7246,
    longitude: 100.5151,
    isActive: true,
  },
  {
    id: 'loc_015',
    nameTh: 'โรงแรมเพนินซูล่า',
    nameEn: 'The Peninsula Bangkok',
    category: 'hotel',
    latitude: 13.7231,
    longitude: 100.5109,
    isActive: true,
  },
  {
    id: 'loc_016',
    nameTh: 'โรงแรมเซ็นทารา แกรนด์',
    nameEn: 'Centara Grand at CentralWorld',
    category: 'hotel',
    latitude: 13.7469,
    longitude: 100.5398,
    isActive: true,
  },
  {
    id: 'loc_017',
    nameTh: 'โรงแรมเดอะ สุโกศล',
    nameEn: 'The Sukosol Hotel',
    category: 'hotel',
    latitude: 13.7557,
    longitude: 100.5395,
    isActive: true,
  },
  {
    id: 'loc_018',
    nameTh: 'โรงแรมรอยัล ออคิด เชอราตัน',
    nameEn: 'Royal Orchid Sheraton Hotel & Towers',
    category: 'hotel',
    latitude: 13.7297,
    longitude: 100.5162,
    isActive: true,
  },

  // Shopping Centers
  {
    id: 'loc_019',
    nameTh: 'ห้างสรรพสินค้าเซ็นทรัลเวิลด์',
    nameEn: 'CentralWorld',
    category: 'shopping',
    latitude: 13.7469,
    longitude: 100.5398,
    isActive: true,
  },
  {
    id: 'loc_020',
    nameTh: 'ห้างสรรพสินค้าสยามพารากอน',
    nameEn: 'Siam Paragon',
    category: 'shopping',
    latitude: 13.7465,
    longitude: 100.5347,
    isActive: true,
  },
  {
    id: 'loc_021',
    nameTh: 'ห้างสรรพสินค้าเอ็มบีเค',
    nameEn: 'MBK Center',
    category: 'shopping',
    latitude: 13.7448,
    longitude: 100.5300,
    isActive: true,
  },
  {
    id: 'loc_022',
    nameTh: 'ห้างสรรพสินค้าไอคอนสยาม',
    nameEn: 'ICONSIAM',
    category: 'shopping',
    latitude: 13.7268,
    longitude: 100.5104,
    isActive: true,
  },
  {
    id: 'loc_023',
    nameTh: 'ห้างสรรพสินค้าเทอร์มินอล 21',
    nameEn: 'Terminal 21',
    category: 'shopping',
    latitude: 13.7376,
    longitude: 100.5601,
    isActive: true,
  },
  {
    id: 'loc_024',
    nameTh: 'ห้างสรรพสินค้าเซ็นทรัล พัทยา',
    nameEn: 'Central Pattaya',
    category: 'shopping',
    latitude: 12.9276,
    longitude: 100.8775,
    isActive: true,
  },

  // Landmarks & Tourist Spots
  {
    id: 'loc_025',
    nameTh: 'วัดพระแก้ว',
    nameEn: 'Temple of the Emerald Buddha (Wat Phra Kaew)',
    category: 'landmark',
    latitude: 13.7515,
    longitude: 100.4925,
    isActive: true,
  },
  {
    id: 'loc_026',
    nameTh: 'วัดโพธิ์',
    nameEn: 'Wat Pho',
    category: 'landmark',
    latitude: 13.7465,
    longitude: 100.4927,
    isActive: true,
  },
  {
    id: 'loc_027',
    nameTh: 'วัดอรุณราชวราราม',
    nameEn: 'Wat Arun (Temple of Dawn)',
    category: 'landmark',
    latitude: 13.7437,
    longitude: 100.4887,
    isActive: true,
  },
  {
    id: 'loc_028',
    nameTh: 'ถนนข้าวสาร',
    nameEn: 'Khao San Road',
    category: 'landmark',
    latitude: 13.7589,
    longitude: 100.4978,
    isActive: true,
  },
  {
    id: 'loc_029',
    nameTh: 'ตลาดน้ำดำเนินสะดวก',
    nameEn: 'Damnoen Saduak Floating Market',
    category: 'landmark',
    latitude: 13.5186,
    longitude: 99.9554,
    isActive: true,
  },
  {
    id: 'loc_030',
    nameTh: 'เยาวราช (ไชน่าทาวน์)',
    nameEn: 'Yaowarat (Chinatown)',
    category: 'landmark',
    latitude: 13.7397,
    longitude: 100.5100,
    isActive: true,
  },

  // Ports & Piers
  {
    id: 'loc_031',
    nameTh: 'ท่าเรือพระราม 8',
    nameEn: 'Rama VIII Pier',
    category: 'port',
    latitude: 13.7701,
    longitude: 100.4968,
    isActive: true,
  },
  {
    id: 'loc_032',
    nameTh: 'ท่าเรือสาทร',
    nameEn: 'Sathorn Pier',
    category: 'port',
    latitude: 13.7246,
    longitude: 100.5151,
    isActive: true,
  },
  {
    id: 'loc_033',
    nameTh: 'ท่าเรือบาหลี หาย',
    nameEn: 'Bali Hai Pier',
    category: 'port',
    latitude: 12.9234,
    longitude: 100.8821,
    isActive: true,
  },

  // Pattaya Area
  {
    id: 'loc_034',
    nameTh: 'หาดพัทยา',
    nameEn: 'Pattaya Beach',
    category: 'landmark',
    latitude: 12.9342,
    longitude: 100.8825,
    isActive: true,
  },
  {
    id: 'loc_035',
    nameTh: 'ถนนคนเดินพัทยา',
    nameEn: 'Walking Street Pattaya',
    category: 'landmark',
    latitude: 12.9276,
    longitude: 100.8745,
    isActive: true,
  },

  // Phuket Area
  {
    id: 'loc_036',
    nameTh: 'หาดป่าตอง',
    nameEn: 'Patong Beach',
    category: 'landmark',
    latitude: 7.8967,
    longitude: 98.2967,
    isActive: true,
  },
  {
    id: 'loc_037',
    nameTh: 'หาดกะตะ',
    nameEn: 'Kata Beach',
    category: 'landmark',
    latitude: 7.8145,
    longitude: 98.2992,
    isActive: true,
  },
  {
    id: 'loc_038',
    nameTh: 'หาดกะรน',
    nameEn: 'Karon Beach',
    category: 'landmark',
    latitude: 7.8390,
    longitude: 98.2960,
    isActive: true,
  },

  // Chiang Mai Area
  {
    id: 'loc_039',
    nameTh: 'ประตูท่าแพ เชียงใหม่',
    nameEn: 'Tha Pae Gate Chiang Mai',
    category: 'landmark',
    latitude: 18.7883,
    longitude: 98.9935,
    isActive: true,
  },
  {
    id: 'loc_040',
    nameTh: 'วัดพระธาตุดอยสุเทพ',
    nameEn: 'Wat Phra That Doi Suthep',
    category: 'landmark',
    latitude: 18.8047,
    longitude: 98.9216,
    isActive: true,
  },
];

/**
 * Get active locations only
 */
export const getActiveLocations = (): Location[] => {
  return LOCATIONS.filter((loc) => loc.isActive);
};

/**
 * Get locations by category
 */
export const getLocationsByCategory = (
  category: Location['category']
): Location[] => {
  return LOCATIONS.filter((loc) => loc.isActive && loc.category === category);
};

/**
 * Search locations by query (Thai or English)
 */
export const searchLocations = (query: string): Location[] => {
  if (!query.trim()) return getActiveLocations();

  const searchTerm = query.toLowerCase().trim();
  return LOCATIONS.filter(
    (loc) =>
      loc.isActive &&
      (loc.nameTh.includes(query) ||
        loc.nameEn.toLowerCase().includes(searchTerm))
  );
};

/**
 * Get location display name (Thai + English)
 */
export const getLocationDisplayName = (location: Location): string => {
  return `${location.nameTh} (${location.nameEn})`;
};

/**
 * Find location by either Thai or English name
 */
export const findLocationByName = (name: string): Location | undefined => {
  return LOCATIONS.find(
    (loc) =>
      loc.isActive && (loc.nameTh === name || loc.nameEn === name)
  );
};

/**
 * Category labels for UI
 */
export const CATEGORY_LABELS: Record<Location['category'], { th: string; en: string }> = {
  airport: { th: 'สนามบิน', en: 'Airports' },
  train_station: { th: 'สถานีรถไฟ', en: 'Train Stations' },
  bus_terminal: { th: 'สถานีขนส่ง', en: 'Bus Terminals' },
  hotel: { th: 'โรงแรม', en: 'Hotels' },
  shopping: { th: 'ห้างสรรพสินค้า', en: 'Shopping Centers' },
  landmark: { th: 'สถานที่ท่องเที่ยว', en: 'Landmarks' },
  port: { th: 'ท่าเรือ', en: 'Ports & Piers' },
};
