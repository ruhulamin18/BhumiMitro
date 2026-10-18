/**
 * Bangladesh Administrative Locations Master Dataset
 * 
 * Complies with the official administrative division of the People's Republic of Bangladesh.
 * Sources:
 * - https://bangladesh.gov.bd/site/view/district-list/
 * - https://bangladesh.gov.bd/site/view/upazila-list/
 * 
 * Total Divisions: 8
 * Total Districts: 64
 * Total Upazilas: 495
 */

export type Division = {
  id: string;
  nameBn: string;
  nameEn: string;
};

export type District = {
  id: string;
  divisionId: string;
  nameBn: string;
  nameEn: string;
};

export type Upazila = {
  id: string;
  districtId: string;
  nameBn: string;
  nameEn: string;
};

export const divisions: Division[] = [
  {
    "id": "DIV_DHAKA",
    "nameBn": "ঢাকা বিভাগ",
    "nameEn": "Dhaka Division"
  },
  {
    "id": "DIV_CHATTOGRAM",
    "nameBn": "চট্টগ্রাম বিভাগ",
    "nameEn": "Chattogram Division"
  },
  {
    "id": "DIV_RAJSHAHI",
    "nameBn": "রাজশাহী বিভাগ",
    "nameEn": "Rajshahi Division"
  },
  {
    "id": "DIV_KHULNA",
    "nameBn": "খুলনা বিভাগ",
    "nameEn": "Khulna Division"
  },
  {
    "id": "DIV_BARISHAL",
    "nameBn": "বরিশাল বিভাগ",
    "nameEn": "Barishal Division"
  },
  {
    "id": "DIV_SYLHET",
    "nameBn": "সিলেট বিভাগ",
    "nameEn": "Sylhet Division"
  },
  {
    "id": "DIV_RANGPUR",
    "nameBn": "রংপুর বিভাগ",
    "nameEn": "Rangpur Division"
  },
  {
    "id": "DIV_MYMENSINGH",
    "nameBn": "ময়মনসিংহ বিভাগ",
    "nameEn": "Mymensingh Division"
  }
];

export const districts: District[] = [
  {
    "id": "DIST_DHAKA",
    "divisionId": "DIV_DHAKA",
    "nameBn": "ঢাকা",
    "nameEn": "Dhaka"
  },
  {
    "id": "DIST_FARIDPUR",
    "divisionId": "DIV_DHAKA",
    "nameBn": "ফরিদপুর",
    "nameEn": "Faridpur"
  },
  {
    "id": "DIST_GAZIPUR",
    "divisionId": "DIV_DHAKA",
    "nameBn": "গাজীপুর",
    "nameEn": "Gazipur"
  },
  {
    "id": "DIST_GOPALGANJ",
    "divisionId": "DIV_DHAKA",
    "nameBn": "গোপালগঞ্জ",
    "nameEn": "Gopalganj"
  },
  {
    "id": "DIST_KISHOREGANJ",
    "divisionId": "DIV_DHAKA",
    "nameBn": "কিশোরগঞ্জ",
    "nameEn": "Kishoreganj"
  },
  {
    "id": "DIST_MADARIPUR",
    "divisionId": "DIV_DHAKA",
    "nameBn": "মাদারীপুর",
    "nameEn": "Madaripur"
  },
  {
    "id": "DIST_MANIKGANJ",
    "divisionId": "DIV_DHAKA",
    "nameBn": "মানিকগঞ্জ",
    "nameEn": "Manikganj"
  },
  {
    "id": "DIST_MUNSHIGANJ",
    "divisionId": "DIV_DHAKA",
    "nameBn": "মুন্সীগঞ্জ",
    "nameEn": "Munshiganj"
  },
  {
    "id": "DIST_NARAYANGANJ",
    "divisionId": "DIV_DHAKA",
    "nameBn": "নারায়ণগঞ্জ",
    "nameEn": "Narayanganj"
  },
  {
    "id": "DIST_NARSINGDI",
    "divisionId": "DIV_DHAKA",
    "nameBn": "নরসিংদী",
    "nameEn": "Narsingdi"
  },
  {
    "id": "DIST_RAJBARI",
    "divisionId": "DIV_DHAKA",
    "nameBn": "রাজবাড়ী",
    "nameEn": "Rajbari"
  },
  {
    "id": "DIST_SHARIATPUR",
    "divisionId": "DIV_DHAKA",
    "nameBn": "শরীয়তপুর",
    "nameEn": "Shariatpur"
  },
  {
    "id": "DIST_TANGAIL",
    "divisionId": "DIV_DHAKA",
    "nameBn": "টাঙ্গাইল",
    "nameEn": "Tangail"
  },
  {
    "id": "DIST_BANDARBAN",
    "divisionId": "DIV_CHATTOGRAM",
    "nameBn": "বান্দরবান",
    "nameEn": "Bandarban"
  },
  {
    "id": "DIST_BRAHMANBARIA",
    "divisionId": "DIV_CHATTOGRAM",
    "nameBn": "ব্রাহ্মণবাড়িয়া",
    "nameEn": "Brahmanbaria"
  },
  {
    "id": "DIST_CHANDPUR",
    "divisionId": "DIV_CHATTOGRAM",
    "nameBn": "চাঁদপুর",
    "nameEn": "Chandpur"
  },
  {
    "id": "DIST_CHATTOGRAM",
    "divisionId": "DIV_CHATTOGRAM",
    "nameBn": "চট্টগ্রাম",
    "nameEn": "Chattogram"
  },
  {
    "id": "DIST_CUMILLA",
    "divisionId": "DIV_CHATTOGRAM",
    "nameBn": "কুমিল্লা",
    "nameEn": "Cumilla"
  },
  {
    "id": "DIST_COXS_BAZAR",
    "divisionId": "DIV_CHATTOGRAM",
    "nameBn": "কক্সবাজার",
    "nameEn": "Cox's Bazar"
  },
  {
    "id": "DIST_FENI",
    "divisionId": "DIV_CHATTOGRAM",
    "nameBn": "ফেনী",
    "nameEn": "Feni"
  },
  {
    "id": "DIST_KHAGRACHHARI",
    "divisionId": "DIV_CHATTOGRAM",
    "nameBn": "খাগড়াছড়ি",
    "nameEn": "Khagrachhari"
  },
  {
    "id": "DIST_LAKSHMIPUR",
    "divisionId": "DIV_CHATTOGRAM",
    "nameBn": "লক্ষ্মীপুর",
    "nameEn": "Lakshmipur"
  },
  {
    "id": "DIST_NOAKHALI",
    "divisionId": "DIV_CHATTOGRAM",
    "nameBn": "নোয়াখালী",
    "nameEn": "Noakhali"
  },
  {
    "id": "DIST_RANGAMATI",
    "divisionId": "DIV_CHATTOGRAM",
    "nameBn": "রাঙামাটি",
    "nameEn": "Rangamati"
  },
  {
    "id": "DIST_BOGURA",
    "divisionId": "DIV_RAJSHAHI",
    "nameBn": "বগুড়া",
    "nameEn": "Bogura"
  },
  {
    "id": "DIST_JOYPURHAT",
    "divisionId": "DIV_RAJSHAHI",
    "nameBn": "জয়পুরহাট",
    "nameEn": "Joypurhat"
  },
  {
    "id": "DIST_NAOGAON",
    "divisionId": "DIV_RAJSHAHI",
    "nameBn": "নওগাঁ",
    "nameEn": "Naogaon"
  },
  {
    "id": "DIST_NATORE",
    "divisionId": "DIV_RAJSHAHI",
    "nameBn": "নাটোর",
    "nameEn": "Natore"
  },
  {
    "id": "DIST_CHAPAINAWABGANJ",
    "divisionId": "DIV_RAJSHAHI",
    "nameBn": "চাঁপাইনবাবগঞ্জ",
    "nameEn": "Chapainawabganj"
  },
  {
    "id": "DIST_PABNA",
    "divisionId": "DIV_RAJSHAHI",
    "nameBn": "পাবনা",
    "nameEn": "Pabna"
  },
  {
    "id": "DIST_RAJSHAHI",
    "divisionId": "DIV_RAJSHAHI",
    "nameBn": "রাজশাহী",
    "nameEn": "Rajshahi"
  },
  {
    "id": "DIST_SIRAJGANJ",
    "divisionId": "DIV_RAJSHAHI",
    "nameBn": "সিরাজগঞ্জ",
    "nameEn": "Sirajganj"
  },
  {
    "id": "DIST_BAGERHAT",
    "divisionId": "DIV_KHULNA",
    "nameBn": "বাগেরহাট",
    "nameEn": "Bagerhat"
  },
  {
    "id": "DIST_CHUADANGA",
    "divisionId": "DIV_KHULNA",
    "nameBn": "চুয়াডাঙ্গা",
    "nameEn": "Chuadanga"
  },
  {
    "id": "DIST_JASHORE",
    "divisionId": "DIV_KHULNA",
    "nameBn": "যশোর",
    "nameEn": "Jashore"
  },
  {
    "id": "DIST_JHENAIDAH",
    "divisionId": "DIV_KHULNA",
    "nameBn": "ঝিনাইদহ",
    "nameEn": "Jhenaidah"
  },
  {
    "id": "DIST_KHULNA",
    "divisionId": "DIV_KHULNA",
    "nameBn": "খুলনা",
    "nameEn": "Khulna"
  },
  {
    "id": "DIST_KUSHTIA",
    "divisionId": "DIV_KHULNA",
    "nameBn": "কুষ্টিয়া",
    "nameEn": "Kushtia"
  },
  {
    "id": "DIST_MAGURA",
    "divisionId": "DIV_KHULNA",
    "nameBn": "মাগুরা",
    "nameEn": "Magura"
  },
  {
    "id": "DIST_MEHERPUR",
    "divisionId": "DIV_KHULNA",
    "nameBn": "মেহেরপুর",
    "nameEn": "Meherpur"
  },
  {
    "id": "DIST_NARAIL",
    "divisionId": "DIV_KHULNA",
    "nameBn": "নড়াইল",
    "nameEn": "Narail"
  },
  {
    "id": "DIST_SATKHIRA",
    "divisionId": "DIV_KHULNA",
    "nameBn": "সাতক্ষীরা",
    "nameEn": "Satkhira"
  },
  {
    "id": "DIST_BARGUNA",
    "divisionId": "DIV_BARISHAL",
    "nameBn": "বরগুনা",
    "nameEn": "Barguna"
  },
  {
    "id": "DIST_BARISHAL",
    "divisionId": "DIV_BARISHAL",
    "nameBn": "বরিশাল",
    "nameEn": "Barishal"
  },
  {
    "id": "DIST_BHOLA",
    "divisionId": "DIV_BARISHAL",
    "nameBn": "ভোলা",
    "nameEn": "Bhola"
  },
  {
    "id": "DIST_JHALOKATHI",
    "divisionId": "DIV_BARISHAL",
    "nameBn": "ঝালকাঠি",
    "nameEn": "Jhalokathi"
  },
  {
    "id": "DIST_PATUAKHALI",
    "divisionId": "DIV_BARISHAL",
    "nameBn": "পটুয়াখালী",
    "nameEn": "Patuakhali"
  },
  {
    "id": "DIST_PIROJPUR",
    "divisionId": "DIV_BARISHAL",
    "nameBn": "পিরোজপুর",
    "nameEn": "Pirojpur"
  },
  {
    "id": "DIST_HABIGANJ",
    "divisionId": "DIV_SYLHET",
    "nameBn": "হবিগঞ্জ",
    "nameEn": "Habiganj"
  },
  {
    "id": "DIST_MOULVIBAZAR",
    "divisionId": "DIV_SYLHET",
    "nameBn": "মৌলভীবাজার",
    "nameEn": "Moulvibazar"
  },
  {
    "id": "DIST_SUNAMGANJ",
    "divisionId": "DIV_SYLHET",
    "nameBn": "সুনামগঞ্জ",
    "nameEn": "Sunamganj"
  },
  {
    "id": "DIST_SYLHET",
    "divisionId": "DIV_SYLHET",
    "nameBn": "সিলেট",
    "nameEn": "Sylhet"
  },
  {
    "id": "DIST_DINAJPUR",
    "divisionId": "DIV_RANGPUR",
    "nameBn": "দিনাজপুর",
    "nameEn": "Dinajpur"
  },
  {
    "id": "DIST_GAIBANDHA",
    "divisionId": "DIV_RANGPUR",
    "nameBn": "গাইবান্ধা",
    "nameEn": "Gaibandha"
  },
  {
    "id": "DIST_KURIGRAM",
    "divisionId": "DIV_RANGPUR",
    "nameBn": "কুড়িগ্রাম",
    "nameEn": "Kurigram"
  },
  {
    "id": "DIST_LALMONIRHAT",
    "divisionId": "DIV_RANGPUR",
    "nameBn": "লালমনিরহাট",
    "nameEn": "Lalmonirhat"
  },
  {
    "id": "DIST_NILPHAMARI",
    "divisionId": "DIV_RANGPUR",
    "nameBn": "নীলফামারী",
    "nameEn": "Nilphamari"
  },
  {
    "id": "DIST_PANCHAGARH",
    "divisionId": "DIV_RANGPUR",
    "nameBn": "পঞ্চগড়",
    "nameEn": "Panchagarh"
  },
  {
    "id": "DIST_RANGPUR",
    "divisionId": "DIV_RANGPUR",
    "nameBn": "রংপুর",
    "nameEn": "Rangpur"
  },
  {
    "id": "DIST_THAKURGAON",
    "divisionId": "DIV_RANGPUR",
    "nameBn": "ঠাকুরগাঁও",
    "nameEn": "Thakurgaon"
  },
  {
    "id": "DIST_JAMALPUR",
    "divisionId": "DIV_MYMENSINGH",
    "nameBn": "জামালপুর",
    "nameEn": "Jamalpur"
  },
  {
    "id": "DIST_MYMENSINGH",
    "divisionId": "DIV_MYMENSINGH",
    "nameBn": "ময়মনসিংহ",
    "nameEn": "Mymensingh"
  },
  {
    "id": "DIST_NETROKONA",
    "divisionId": "DIV_MYMENSINGH",
    "nameBn": "নেত্রকোণা",
    "nameEn": "Netrokona"
  },
  {
    "id": "DIST_SHERPUR",
    "divisionId": "DIV_MYMENSINGH",
    "nameBn": "শেরপুর",
    "nameEn": "Sherpur"
  }
];

export const upazilas: Upazila[] = [
  {
    "id": "UPZ_DHAKA_DHAMRAI",
    "districtId": "DIST_DHAKA",
    "nameBn": "ধামরাই",
    "nameEn": "Dhamrai"
  },
  {
    "id": "UPZ_DHAKA_DOHAR",
    "districtId": "DIST_DHAKA",
    "nameBn": "দোহার",
    "nameEn": "Dohar"
  },
  {
    "id": "UPZ_DHAKA_KERANIGANJ",
    "districtId": "DIST_DHAKA",
    "nameBn": "কেরানীগঞ্জ",
    "nameEn": "Keraniganj"
  },
  {
    "id": "UPZ_DHAKA_NAWABGANJ",
    "districtId": "DIST_DHAKA",
    "nameBn": "নবাবগঞ্জ",
    "nameEn": "Nawabganj"
  },
  {
    "id": "UPZ_DHAKA_SAVAR",
    "districtId": "DIST_DHAKA",
    "nameBn": "সাভার",
    "nameEn": "Savar"
  },
  {
    "id": "UPZ_FARIDPUR_ALFADANGA",
    "districtId": "DIST_FARIDPUR",
    "nameBn": "আলফাডাঙ্গা",
    "nameEn": "Alfadanga"
  },
  {
    "id": "UPZ_FARIDPUR_BOALMARI",
    "districtId": "DIST_FARIDPUR",
    "nameBn": "বোয়ালমারী",
    "nameEn": "Boalmari"
  },
  {
    "id": "UPZ_FARIDPUR_CHARBHADRASAN",
    "districtId": "DIST_FARIDPUR",
    "nameBn": "চরভদ্রাসন",
    "nameEn": "Charbhadrasan"
  },
  {
    "id": "UPZ_FARIDPUR_FARIDPUR_SADAR",
    "districtId": "DIST_FARIDPUR",
    "nameBn": "ফরিদপুর সদর",
    "nameEn": "Faridpur Sadar"
  },
  {
    "id": "UPZ_FARIDPUR_MADHUKHALI",
    "districtId": "DIST_FARIDPUR",
    "nameBn": "মধুখালী",
    "nameEn": "Madhukhali"
  },
  {
    "id": "UPZ_FARIDPUR_NAGARKANDA",
    "districtId": "DIST_FARIDPUR",
    "nameBn": "নগরকান্দা",
    "nameEn": "Nagarkanda"
  },
  {
    "id": "UPZ_FARIDPUR_BHANGA",
    "districtId": "DIST_FARIDPUR",
    "nameBn": "ভাঙ্গা",
    "nameEn": "Bhanga"
  },
  {
    "id": "UPZ_FARIDPUR_SADARPUR",
    "districtId": "DIST_FARIDPUR",
    "nameBn": "সদরপুর",
    "nameEn": "Sadarpur"
  },
  {
    "id": "UPZ_FARIDPUR_SALTHA",
    "districtId": "DIST_FARIDPUR",
    "nameBn": "সালথা",
    "nameEn": "Saltha"
  },
  {
    "id": "UPZ_GAZIPUR_GAZIPUR_SADAR",
    "districtId": "DIST_GAZIPUR",
    "nameBn": "গাজীপুর সদর",
    "nameEn": "Gazipur Sadar"
  },
  {
    "id": "UPZ_GAZIPUR_KALIAKAIR",
    "districtId": "DIST_GAZIPUR",
    "nameBn": "কালিয়াকৈর",
    "nameEn": "Kaliakair"
  },
  {
    "id": "UPZ_GAZIPUR_KALIGANJ",
    "districtId": "DIST_GAZIPUR",
    "nameBn": "কালীগঞ্জ",
    "nameEn": "Kaliganj"
  },
  {
    "id": "UPZ_GAZIPUR_KAPASIA",
    "districtId": "DIST_GAZIPUR",
    "nameBn": "কাপাসিয়া",
    "nameEn": "Kapasia"
  },
  {
    "id": "UPZ_GAZIPUR_SREEPUR",
    "districtId": "DIST_GAZIPUR",
    "nameBn": "শ্রীপুর",
    "nameEn": "Sreepur"
  },
  {
    "id": "UPZ_GOPALGANJ_GOPALGANJ_SADAR",
    "districtId": "DIST_GOPALGANJ",
    "nameBn": "গোপালগঞ্জ সদর",
    "nameEn": "Gopalganj Sadar"
  },
  {
    "id": "UPZ_GOPALGANJ_KASHIANI",
    "districtId": "DIST_GOPALGANJ",
    "nameBn": "কাশিয়ানী",
    "nameEn": "Kashiani"
  },
  {
    "id": "UPZ_GOPALGANJ_KOTALIPARA",
    "districtId": "DIST_GOPALGANJ",
    "nameBn": "কোটালীপাড়া",
    "nameEn": "Kotalipara"
  },
  {
    "id": "UPZ_GOPALGANJ_MUKSUDPUR",
    "districtId": "DIST_GOPALGANJ",
    "nameBn": "মুকসুদপুর",
    "nameEn": "Muksudpur"
  },
  {
    "id": "UPZ_GOPALGANJ_TUNGIPARA",
    "districtId": "DIST_GOPALGANJ",
    "nameBn": "টুঙ্গিপাড়া",
    "nameEn": "Tungipara"
  },
  {
    "id": "UPZ_KISHOREGANJ_ASHTAGRAM",
    "districtId": "DIST_KISHOREGANJ",
    "nameBn": "অষ্টগ্রাম",
    "nameEn": "Ashtagram"
  },
  {
    "id": "UPZ_KISHOREGANJ_BAJITPUR",
    "districtId": "DIST_KISHOREGANJ",
    "nameBn": "বাজিতপুর",
    "nameEn": "Bajitpur"
  },
  {
    "id": "UPZ_KISHOREGANJ_BHAIRAB",
    "districtId": "DIST_KISHOREGANJ",
    "nameBn": "ভৈরব",
    "nameEn": "Bhairab"
  },
  {
    "id": "UPZ_KISHOREGANJ_HOSSEINPUR",
    "districtId": "DIST_KISHOREGANJ",
    "nameBn": "হোসেনপুর",
    "nameEn": "Hosseinpur"
  },
  {
    "id": "UPZ_KISHOREGANJ_ITNA",
    "districtId": "DIST_KISHOREGANJ",
    "nameBn": "ইটনা",
    "nameEn": "Itna"
  },
  {
    "id": "UPZ_KISHOREGANJ_KARIMGANJ",
    "districtId": "DIST_KISHOREGANJ",
    "nameBn": "করিমগঞ্জ",
    "nameEn": "Karimganj"
  },
  {
    "id": "UPZ_KISHOREGANJ_KATIADI",
    "districtId": "DIST_KISHOREGANJ",
    "nameBn": "কটিয়াদী",
    "nameEn": "Katiadi"
  },
  {
    "id": "UPZ_KISHOREGANJ_KISHOREGANJ_SADAR",
    "districtId": "DIST_KISHOREGANJ",
    "nameBn": "কিশোরগঞ্জ সদর",
    "nameEn": "Kishoreganj Sadar"
  },
  {
    "id": "UPZ_KISHOREGANJ_KULIARCHAR",
    "districtId": "DIST_KISHOREGANJ",
    "nameBn": "কুলিয়ারচর",
    "nameEn": "Kuliarchar"
  },
  {
    "id": "UPZ_KISHOREGANJ_MITHAMAIN",
    "districtId": "DIST_KISHOREGANJ",
    "nameBn": "মিঠামইন",
    "nameEn": "Mithamain"
  },
  {
    "id": "UPZ_KISHOREGANJ_NIKLI",
    "districtId": "DIST_KISHOREGANJ",
    "nameBn": "নিকলী",
    "nameEn": "Nikli"
  },
  {
    "id": "UPZ_KISHOREGANJ_PAKUNDIA",
    "districtId": "DIST_KISHOREGANJ",
    "nameBn": "পাকুন্দিয়া",
    "nameEn": "Pakundia"
  },
  {
    "id": "UPZ_KISHOREGANJ_TARAIL",
    "districtId": "DIST_KISHOREGANJ",
    "nameBn": "তাড়াইল",
    "nameEn": "Tarail"
  },
  {
    "id": "UPZ_MADARIPUR_MADARIPUR_SADAR",
    "districtId": "DIST_MADARIPUR",
    "nameBn": "মাদারীপুর সদর",
    "nameEn": "Madaripur Sadar"
  },
  {
    "id": "UPZ_MADARIPUR_KALKINI",
    "districtId": "DIST_MADARIPUR",
    "nameBn": "কালকিনি",
    "nameEn": "Kalkini"
  },
  {
    "id": "UPZ_MADARIPUR_DASAR",
    "districtId": "DIST_MADARIPUR",
    "nameBn": "ডাসার",
    "nameEn": "Dasar"
  },
  {
    "id": "UPZ_MADARIPUR_RAJOIR",
    "districtId": "DIST_MADARIPUR",
    "nameBn": "রাজৈর",
    "nameEn": "Rajoir"
  },
  {
    "id": "UPZ_MADARIPUR_SHIBCHAR",
    "districtId": "DIST_MADARIPUR",
    "nameBn": "শিবচর",
    "nameEn": "Shibchar"
  },
  {
    "id": "UPZ_MANIKGANJ_DAULATPUR",
    "districtId": "DIST_MANIKGANJ",
    "nameBn": "দৌলতপুর",
    "nameEn": "Daulatpur"
  },
  {
    "id": "UPZ_MANIKGANJ_GHIOR",
    "districtId": "DIST_MANIKGANJ",
    "nameBn": "ঘিওর",
    "nameEn": "Ghior"
  },
  {
    "id": "UPZ_MANIKGANJ_HARIRAMPUR",
    "districtId": "DIST_MANIKGANJ",
    "nameBn": "হরিরামপুর",
    "nameEn": "Harirampur"
  },
  {
    "id": "UPZ_MANIKGANJ_MANIKGANJ_SADAR",
    "districtId": "DIST_MANIKGANJ",
    "nameBn": "মানিকগঞ্জ সদর",
    "nameEn": "Manikganj Sadar"
  },
  {
    "id": "UPZ_MANIKGANJ_SATURIA",
    "districtId": "DIST_MANIKGANJ",
    "nameBn": "সাটুরিয়া",
    "nameEn": "Saturia"
  },
  {
    "id": "UPZ_MANIKGANJ_SHIBALAYA",
    "districtId": "DIST_MANIKGANJ",
    "nameBn": "শিবালয়",
    "nameEn": "Shibalaya"
  },
  {
    "id": "UPZ_MANIKGANJ_SINGAIR",
    "districtId": "DIST_MANIKGANJ",
    "nameBn": "সিংগাইর",
    "nameEn": "Singair"
  },
  {
    "id": "UPZ_MUNSHIGANJ_GAZARIA",
    "districtId": "DIST_MUNSHIGANJ",
    "nameBn": "গজারিয়া",
    "nameEn": "Gazaria"
  },
  {
    "id": "UPZ_MUNSHIGANJ_LOUHAJANG",
    "districtId": "DIST_MUNSHIGANJ",
    "nameBn": "লৌহজং",
    "nameEn": "Louhajang"
  },
  {
    "id": "UPZ_MUNSHIGANJ_MUNSHIGANJ_SADAR",
    "districtId": "DIST_MUNSHIGANJ",
    "nameBn": "মুন্সীগঞ্জ সদর",
    "nameEn": "Munshiganj Sadar"
  },
  {
    "id": "UPZ_MUNSHIGANJ_SIRAJDIKHAN",
    "districtId": "DIST_MUNSHIGANJ",
    "nameBn": "সিরাজদিখান",
    "nameEn": "Sirajdikhan"
  },
  {
    "id": "UPZ_MUNSHIGANJ_SREENAGAR",
    "districtId": "DIST_MUNSHIGANJ",
    "nameBn": "শ্রীনগর",
    "nameEn": "Sreenagar"
  },
  {
    "id": "UPZ_MUNSHIGANJ_TONGIBARI",
    "districtId": "DIST_MUNSHIGANJ",
    "nameBn": "টঙ্গিবাড়ী",
    "nameEn": "Tongibari"
  },
  {
    "id": "UPZ_NARAYANGANJ_ARAIHAZAR",
    "districtId": "DIST_NARAYANGANJ",
    "nameBn": "আড়াইহাজার",
    "nameEn": "Araihazar"
  },
  {
    "id": "UPZ_NARAYANGANJ_BANDAR",
    "districtId": "DIST_NARAYANGANJ",
    "nameBn": "বন্দর",
    "nameEn": "Bandar"
  },
  {
    "id": "UPZ_NARAYANGANJ_NARAYANGANJ_SADAR",
    "districtId": "DIST_NARAYANGANJ",
    "nameBn": "নারায়ণগঞ্জ সদর",
    "nameEn": "Narayanganj Sadar"
  },
  {
    "id": "UPZ_NARAYANGANJ_RUPGANJ",
    "districtId": "DIST_NARAYANGANJ",
    "nameBn": "রূপগঞ্জ",
    "nameEn": "Rupganj"
  },
  {
    "id": "UPZ_NARAYANGANJ_SONARGAON",
    "districtId": "DIST_NARAYANGANJ",
    "nameBn": "সোনারগাঁ",
    "nameEn": "Sonargaon"
  },
  {
    "id": "UPZ_NARSINGDI_BELABO",
    "districtId": "DIST_NARSINGDI",
    "nameBn": "বেলাব",
    "nameEn": "Belabo"
  },
  {
    "id": "UPZ_NARSINGDI_MONOHARDI",
    "districtId": "DIST_NARSINGDI",
    "nameBn": "মনোহরদী",
    "nameEn": "Monohardi"
  },
  {
    "id": "UPZ_NARSINGDI_NARSINGDI_SADAR",
    "districtId": "DIST_NARSINGDI",
    "nameBn": "নরসিংদী সদর",
    "nameEn": "Narsingdi Sadar"
  },
  {
    "id": "UPZ_NARSINGDI_PALASH",
    "districtId": "DIST_NARSINGDI",
    "nameBn": "পলাশ",
    "nameEn": "Palash"
  },
  {
    "id": "UPZ_NARSINGDI_RAIPURA",
    "districtId": "DIST_NARSINGDI",
    "nameBn": "রায়পুরা",
    "nameEn": "Raipura"
  },
  {
    "id": "UPZ_NARSINGDI_SHIBPUR",
    "districtId": "DIST_NARSINGDI",
    "nameBn": "শিবপুর",
    "nameEn": "Shibpur"
  },
  {
    "id": "UPZ_RAJBARI_BALIAKANDI",
    "districtId": "DIST_RAJBARI",
    "nameBn": "বালিয়াকান্দি",
    "nameEn": "Baliakandi"
  },
  {
    "id": "UPZ_RAJBARI_GOALANDA",
    "districtId": "DIST_RAJBARI",
    "nameBn": "গোয়ালন্দ",
    "nameEn": "Goalanda"
  },
  {
    "id": "UPZ_RAJBARI_KALUKHALI",
    "districtId": "DIST_RAJBARI",
    "nameBn": "কালুখালী",
    "nameEn": "Kalukhali"
  },
  {
    "id": "UPZ_RAJBARI_PANGSHA",
    "districtId": "DIST_RAJBARI",
    "nameBn": "পাংশা",
    "nameEn": "Pangsha"
  },
  {
    "id": "UPZ_RAJBARI_RAJBARI_SADAR",
    "districtId": "DIST_RAJBARI",
    "nameBn": "রাজবাড়ী সদর",
    "nameEn": "Rajbari Sadar"
  },
  {
    "id": "UPZ_SHARIATPUR_BHEDARGANJ",
    "districtId": "DIST_SHARIATPUR",
    "nameBn": "ভেদরগঞ্জ",
    "nameEn": "Bhedarganj"
  },
  {
    "id": "UPZ_SHARIATPUR_DAMUDYA",
    "districtId": "DIST_SHARIATPUR",
    "nameBn": "ডামুড্যা",
    "nameEn": "Damudya"
  },
  {
    "id": "UPZ_SHARIATPUR_GOSAIRHAT",
    "districtId": "DIST_SHARIATPUR",
    "nameBn": "গোসাইরহাট",
    "nameEn": "Gosairhat"
  },
  {
    "id": "UPZ_SHARIATPUR_NARIA",
    "districtId": "DIST_SHARIATPUR",
    "nameBn": "নড়িয়া",
    "nameEn": "Naria"
  },
  {
    "id": "UPZ_SHARIATPUR_SHARIATPUR_SADAR",
    "districtId": "DIST_SHARIATPUR",
    "nameBn": "শরীয়তপুর সদর",
    "nameEn": "Shariatpur Sadar"
  },
  {
    "id": "UPZ_SHARIATPUR_ZAJIRA",
    "districtId": "DIST_SHARIATPUR",
    "nameBn": "জাজিরা",
    "nameEn": "Zajira"
  },
  {
    "id": "UPZ_TANGAIL_BASAIL",
    "districtId": "DIST_TANGAIL",
    "nameBn": "বাসাইল",
    "nameEn": "Basail"
  },
  {
    "id": "UPZ_TANGAIL_BHUAPUR",
    "districtId": "DIST_TANGAIL",
    "nameBn": "ভূঞাপুর",
    "nameEn": "Bhuapur"
  },
  {
    "id": "UPZ_TANGAIL_DELDUAR",
    "districtId": "DIST_TANGAIL",
    "nameBn": "দেলদুয়ার",
    "nameEn": "Delduar"
  },
  {
    "id": "UPZ_TANGAIL_DHANBARI",
    "districtId": "DIST_TANGAIL",
    "nameBn": "ধনবাড়ী",
    "nameEn": "Dhanbari"
  },
  {
    "id": "UPZ_TANGAIL_GHATAIL",
    "districtId": "DIST_TANGAIL",
    "nameBn": "ঘাটাইল",
    "nameEn": "Ghatail"
  },
  {
    "id": "UPZ_TANGAIL_GOPALPUR",
    "districtId": "DIST_TANGAIL",
    "nameBn": "গোপালপুর",
    "nameEn": "Gopalpur"
  },
  {
    "id": "UPZ_TANGAIL_KALIHATI",
    "districtId": "DIST_TANGAIL",
    "nameBn": "কালিহাতী",
    "nameEn": "Kalihati"
  },
  {
    "id": "UPZ_TANGAIL_MADHUPUR",
    "districtId": "DIST_TANGAIL",
    "nameBn": "মধুপুর",
    "nameEn": "Madhupur"
  },
  {
    "id": "UPZ_TANGAIL_MIRZAPUR",
    "districtId": "DIST_TANGAIL",
    "nameBn": "মির্জাপুর",
    "nameEn": "Mirzapur"
  },
  {
    "id": "UPZ_TANGAIL_NAGARPUR",
    "districtId": "DIST_TANGAIL",
    "nameBn": "নাগরপুর",
    "nameEn": "Nagarpur"
  },
  {
    "id": "UPZ_TANGAIL_SAKHIPUR",
    "districtId": "DIST_TANGAIL",
    "nameBn": "সখীপুর",
    "nameEn": "Sakhipur"
  },
  {
    "id": "UPZ_TANGAIL_TANGAIL_SADAR",
    "districtId": "DIST_TANGAIL",
    "nameBn": "টাঙ্গাইল সদর",
    "nameEn": "Tangail Sadar"
  },
  {
    "id": "UPZ_BANDARBAN_BANDARBAN_SADAR",
    "districtId": "DIST_BANDARBAN",
    "nameBn": "বান্দরবান সদর",
    "nameEn": "Bandarban Sadar"
  },
  {
    "id": "UPZ_BANDARBAN_ALIKADAM",
    "districtId": "DIST_BANDARBAN",
    "nameBn": "আলীকদম",
    "nameEn": "Alikadam"
  },
  {
    "id": "UPZ_BANDARBAN_NAIKHONGCHHARI",
    "districtId": "DIST_BANDARBAN",
    "nameBn": "নাইক্ষ্যংছড়ি",
    "nameEn": "Naikhongchhari"
  },
  {
    "id": "UPZ_BANDARBAN_ROWANGCHHARI",
    "districtId": "DIST_BANDARBAN",
    "nameBn": "রোয়াংছড়ি",
    "nameEn": "Rowangchhari"
  },
  {
    "id": "UPZ_BANDARBAN_LAMA",
    "districtId": "DIST_BANDARBAN",
    "nameBn": "লামা",
    "nameEn": "Lama"
  },
  {
    "id": "UPZ_BANDARBAN_RUMA",
    "districtId": "DIST_BANDARBAN",
    "nameBn": "রুমা",
    "nameEn": "Ruma"
  },
  {
    "id": "UPZ_BANDARBAN_THANCHI",
    "districtId": "DIST_BANDARBAN",
    "nameBn": "থানচি",
    "nameEn": "Thanchi"
  },
  {
    "id": "UPZ_BRAHMANBARIA_BRAHMANBARIA_SADAR",
    "districtId": "DIST_BRAHMANBARIA",
    "nameBn": "ব্রাহ্মণবাড়িয়া সদর",
    "nameEn": "Brahmanbaria Sadar"
  },
  {
    "id": "UPZ_BRAHMANBARIA_KASBA",
    "districtId": "DIST_BRAHMANBARIA",
    "nameBn": "কসবা",
    "nameEn": "Kasba"
  },
  {
    "id": "UPZ_BRAHMANBARIA_NASIRNAGAR",
    "districtId": "DIST_BRAHMANBARIA",
    "nameBn": "নাসিরনগর",
    "nameEn": "Nasirnagar"
  },
  {
    "id": "UPZ_BRAHMANBARIA_SARAIL",
    "districtId": "DIST_BRAHMANBARIA",
    "nameBn": "সরাইল",
    "nameEn": "Sarail"
  },
  {
    "id": "UPZ_BRAHMANBARIA_ASHUGANJ",
    "districtId": "DIST_BRAHMANBARIA",
    "nameBn": "আশুগঞ্জ",
    "nameEn": "Ashuganj"
  },
  {
    "id": "UPZ_BRAHMANBARIA_AKHAURA",
    "districtId": "DIST_BRAHMANBARIA",
    "nameBn": "আখাউড়া",
    "nameEn": "Akhaura"
  },
  {
    "id": "UPZ_BRAHMANBARIA_NABINAGAR",
    "districtId": "DIST_BRAHMANBARIA",
    "nameBn": "নবীনগর",
    "nameEn": "Nabinagar"
  },
  {
    "id": "UPZ_BRAHMANBARIA_BANCHARAMPUR",
    "districtId": "DIST_BRAHMANBARIA",
    "nameBn": "বাঞ্ছারামপুর",
    "nameEn": "Bancharampur"
  },
  {
    "id": "UPZ_BRAHMANBARIA_BIJOYNAGAR",
    "districtId": "DIST_BRAHMANBARIA",
    "nameBn": "বিজয়নগর",
    "nameEn": "Bijoynagar"
  },
  {
    "id": "UPZ_CHANDPUR_CHANDPUR_SADAR",
    "districtId": "DIST_CHANDPUR",
    "nameBn": "চাঁদপুর সদর",
    "nameEn": "Chandpur Sadar"
  },
  {
    "id": "UPZ_CHANDPUR_FARIDGANJ",
    "districtId": "DIST_CHANDPUR",
    "nameBn": "ফরিদগঞ্জ",
    "nameEn": "Faridganj"
  },
  {
    "id": "UPZ_CHANDPUR_HAIMCHAR",
    "districtId": "DIST_CHANDPUR",
    "nameBn": "হাইমচর",
    "nameEn": "Haimchar"
  },
  {
    "id": "UPZ_CHANDPUR_HAJIGANJ",
    "districtId": "DIST_CHANDPUR",
    "nameBn": "হাজীগঞ্জ",
    "nameEn": "Hajiganj"
  },
  {
    "id": "UPZ_CHANDPUR_KACHUA",
    "districtId": "DIST_CHANDPUR",
    "nameBn": "কচুয়া",
    "nameEn": "Kachua"
  },
  {
    "id": "UPZ_CHANDPUR_MATLAB_UTTAR",
    "districtId": "DIST_CHANDPUR",
    "nameBn": "মতলব উত্তর",
    "nameEn": "Matlab Uttar"
  },
  {
    "id": "UPZ_CHANDPUR_MATLAB_DAKSHIN",
    "districtId": "DIST_CHANDPUR",
    "nameBn": "মতলব দক্ষিণ",
    "nameEn": "Matlab Dakshin"
  },
  {
    "id": "UPZ_CHANDPUR_SHAHRASTI",
    "districtId": "DIST_CHANDPUR",
    "nameBn": "শাহরাস্তি",
    "nameEn": "Shahrasti"
  },
  {
    "id": "UPZ_CHATTOGRAM_ANWARA",
    "districtId": "DIST_CHATTOGRAM",
    "nameBn": "আনোয়ারা",
    "nameEn": "Anwara"
  },
  {
    "id": "UPZ_CHATTOGRAM_BANSHKHALI",
    "districtId": "DIST_CHATTOGRAM",
    "nameBn": "বাঁশখালী",
    "nameEn": "Banshkhali"
  },
  {
    "id": "UPZ_CHATTOGRAM_BOALKHALI",
    "districtId": "DIST_CHATTOGRAM",
    "nameBn": "বোয়ালখালী",
    "nameEn": "Boalkhali"
  },
  {
    "id": "UPZ_CHATTOGRAM_CHANDANPUKUR_CHANDANIS",
    "districtId": "DIST_CHATTOGRAM",
    "nameBn": "চন্দনাইশ",
    "nameEn": "Chandanpukur/Chandanis"
  },
  {
    "id": "UPZ_CHATTOGRAM_FATIKCHHARI",
    "districtId": "DIST_CHATTOGRAM",
    "nameBn": "ফটিকছড়ি",
    "nameEn": "Fatikchhari"
  },
  {
    "id": "UPZ_CHATTOGRAM_HATHAZARI",
    "districtId": "DIST_CHATTOGRAM",
    "nameBn": "হাটহাজারী",
    "nameEn": "Hathazari"
  },
  {
    "id": "UPZ_CHATTOGRAM_LOHAGARA",
    "districtId": "DIST_CHATTOGRAM",
    "nameBn": "লোহাগাড়া",
    "nameEn": "Lohagara"
  },
  {
    "id": "UPZ_CHATTOGRAM_MIRSARAI",
    "districtId": "DIST_CHATTOGRAM",
    "nameBn": "মীরসরাই",
    "nameEn": "Mirsarai"
  },
  {
    "id": "UPZ_CHATTOGRAM_PATIYA",
    "districtId": "DIST_CHATTOGRAM",
    "nameBn": "পটিয়া",
    "nameEn": "Patiya"
  },
  {
    "id": "UPZ_CHATTOGRAM_RANGUNIA",
    "districtId": "DIST_CHATTOGRAM",
    "nameBn": "রাঙ্গুনিয়া",
    "nameEn": "Rangunia"
  },
  {
    "id": "UPZ_CHATTOGRAM_RAOZAN",
    "districtId": "DIST_CHATTOGRAM",
    "nameBn": "রাউজান",
    "nameEn": "Raozan"
  },
  {
    "id": "UPZ_CHATTOGRAM_SANDWIP",
    "districtId": "DIST_CHATTOGRAM",
    "nameBn": "সন্দ্বীপ",
    "nameEn": "Sandwip"
  },
  {
    "id": "UPZ_CHATTOGRAM_SATKANIA",
    "districtId": "DIST_CHATTOGRAM",
    "nameBn": "সাতকানিয়া",
    "nameEn": "Satkania"
  },
  {
    "id": "UPZ_CHATTOGRAM_SITAKUNDA",
    "districtId": "DIST_CHATTOGRAM",
    "nameBn": "সীতাকুণ্ড",
    "nameEn": "Sitakunda"
  },
  {
    "id": "UPZ_CHATTOGRAM_KARNAFULI",
    "districtId": "DIST_CHATTOGRAM",
    "nameBn": "কর্ণফুলী",
    "nameEn": "Karnafuli"
  },
  {
    "id": "UPZ_CUMILLA_DEBIDWAR",
    "districtId": "DIST_CUMILLA",
    "nameBn": "দেবিদ্বার",
    "nameEn": "Debidwar"
  },
  {
    "id": "UPZ_CUMILLA_BARURA",
    "districtId": "DIST_CUMILLA",
    "nameBn": "বরুড়া",
    "nameEn": "Barura"
  },
  {
    "id": "UPZ_CUMILLA_BRAHMANPARA",
    "districtId": "DIST_CUMILLA",
    "nameBn": "ব্রাহ্মণপাড়া",
    "nameEn": "Brahmanpara"
  },
  {
    "id": "UPZ_CUMILLA_CHANDINA",
    "districtId": "DIST_CUMILLA",
    "nameBn": "চান্দিনা",
    "nameEn": "Chandina"
  },
  {
    "id": "UPZ_CUMILLA_CHAUDDAGRAM",
    "districtId": "DIST_CUMILLA",
    "nameBn": "চৌদ্দগ্রাম",
    "nameEn": "Chauddagram"
  },
  {
    "id": "UPZ_CUMILLA_DAUDKANDI",
    "districtId": "DIST_CUMILLA",
    "nameBn": "দাউদকান্দি",
    "nameEn": "Daudkandi"
  },
  {
    "id": "UPZ_CUMILLA_HOMNA",
    "districtId": "DIST_CUMILLA",
    "nameBn": "হোমনা",
    "nameEn": "Homna"
  },
  {
    "id": "UPZ_CUMILLA_LAKSAM",
    "districtId": "DIST_CUMILLA",
    "nameBn": "লাকসাম",
    "nameEn": "Laksam"
  },
  {
    "id": "UPZ_CUMILLA_MURADNAGAR",
    "districtId": "DIST_CUMILLA",
    "nameBn": "মুরাদনগর",
    "nameEn": "Muradnagar"
  },
  {
    "id": "UPZ_CUMILLA_NANGALKOT",
    "districtId": "DIST_CUMILLA",
    "nameBn": "নাঙ্গলকোট",
    "nameEn": "Nangalkot"
  },
  {
    "id": "UPZ_CUMILLA_CUMILLA_ADARSHA_SADAR",
    "districtId": "DIST_CUMILLA",
    "nameBn": "কুমিল্লা আদর্শ সদর",
    "nameEn": "Cumilla Adarsha Sadar"
  },
  {
    "id": "UPZ_CUMILLA_MEGHNA",
    "districtId": "DIST_CUMILLA",
    "nameBn": "মেঘনা",
    "nameEn": "Meghna"
  },
  {
    "id": "UPZ_CUMILLA_MONOHARGANJ",
    "districtId": "DIST_CUMILLA",
    "nameBn": "মনোহরগঞ্জ",
    "nameEn": "Monoharganj"
  },
  {
    "id": "UPZ_CUMILLA_CUMILLA_SADAR_DAKSHIN",
    "districtId": "DIST_CUMILLA",
    "nameBn": "কুমিল্লা সদর দক্ষিণ",
    "nameEn": "Cumilla Sadar Dakshin"
  },
  {
    "id": "UPZ_CUMILLA_TITAS",
    "districtId": "DIST_CUMILLA",
    "nameBn": "তিতাস",
    "nameEn": "Titas"
  },
  {
    "id": "UPZ_CUMILLA_BURICHANG",
    "districtId": "DIST_CUMILLA",
    "nameBn": "বুড়িচং",
    "nameEn": "Burichang"
  },
  {
    "id": "UPZ_CUMILLA_LALMAI",
    "districtId": "DIST_CUMILLA",
    "nameBn": "লালমাই",
    "nameEn": "Lalmai"
  },
  {
    "id": "UPZ_COXS_BAZAR_COX_S_BAZAR_SADAR",
    "districtId": "DIST_COXS_BAZAR",
    "nameBn": "কক্সবাজার সদর",
    "nameEn": "Cox's Bazar Sadar"
  },
  {
    "id": "UPZ_COXS_BAZAR_CHAKARIA",
    "districtId": "DIST_COXS_BAZAR",
    "nameBn": "চকরিয়া",
    "nameEn": "Chakaria"
  },
  {
    "id": "UPZ_COXS_BAZAR_KUTUBDIA",
    "districtId": "DIST_COXS_BAZAR",
    "nameBn": "কুতুবদিয়া",
    "nameEn": "Kutubdia"
  },
  {
    "id": "UPZ_COXS_BAZAR_MAHESHKHALI",
    "districtId": "DIST_COXS_BAZAR",
    "nameBn": "মহেশখালী",
    "nameEn": "Maheshkhali"
  },
  {
    "id": "UPZ_COXS_BAZAR_PEKUA",
    "districtId": "DIST_COXS_BAZAR",
    "nameBn": "পেকুয়া",
    "nameEn": "Pekua"
  },
  {
    "id": "UPZ_COXS_BAZAR_RAMU",
    "districtId": "DIST_COXS_BAZAR",
    "nameBn": "রামু",
    "nameEn": "Ramu"
  },
  {
    "id": "UPZ_COXS_BAZAR_TEKNAF",
    "districtId": "DIST_COXS_BAZAR",
    "nameBn": "টেকনাফ",
    "nameEn": "Teknaf"
  },
  {
    "id": "UPZ_COXS_BAZAR_UKHIA",
    "districtId": "DIST_COXS_BAZAR",
    "nameBn": "উখিয়া",
    "nameEn": "Ukhia"
  },
  {
    "id": "UPZ_COXS_BAZAR_EIDGAON",
    "districtId": "DIST_COXS_BAZAR",
    "nameBn": "ঈদগাঁও",
    "nameEn": "Eidgaon"
  },
  {
    "id": "UPZ_FENI_CHHAGALNAIYA",
    "districtId": "DIST_FENI",
    "nameBn": "ছাগলনাইয়া",
    "nameEn": "Chhagalnaiya"
  },
  {
    "id": "UPZ_FENI_FENI_SADAR",
    "districtId": "DIST_FENI",
    "nameBn": "ফেনী সদর",
    "nameEn": "Feni Sadar"
  },
  {
    "id": "UPZ_FENI_SONAGAZI",
    "districtId": "DIST_FENI",
    "nameBn": "সোনাগাজী",
    "nameEn": "Sonagazi"
  },
  {
    "id": "UPZ_FENI_FULGAZI",
    "districtId": "DIST_FENI",
    "nameBn": "ফুলগাজী",
    "nameEn": "Fulgazi"
  },
  {
    "id": "UPZ_FENI_PARSHURAM",
    "districtId": "DIST_FENI",
    "nameBn": "পরশুরাম",
    "nameEn": "Parshuram"
  },
  {
    "id": "UPZ_FENI_DAGANBHUIYAN",
    "districtId": "DIST_FENI",
    "nameBn": "দাগনভূঞা",
    "nameEn": "Daganbhuiyan"
  },
  {
    "id": "UPZ_KHAGRACHHARI_KHAGRACHHARI_SADAR",
    "districtId": "DIST_KHAGRACHHARI",
    "nameBn": "খাগড়াছড়ি সদর",
    "nameEn": "Khagrachhari Sadar"
  },
  {
    "id": "UPZ_KHAGRACHHARI_DIGHINALA",
    "districtId": "DIST_KHAGRACHHARI",
    "nameBn": "দীঘিনালা",
    "nameEn": "Dighinala"
  },
  {
    "id": "UPZ_KHAGRACHHARI_PANCHHARI",
    "districtId": "DIST_KHAGRACHHARI",
    "nameBn": "পানছড়ি",
    "nameEn": "Panchhari"
  },
  {
    "id": "UPZ_KHAGRACHHARI_LAKSHMICHHARI",
    "districtId": "DIST_KHAGRACHHARI",
    "nameBn": "লক্ষ্মীছড়ি",
    "nameEn": "Lakshmichhari"
  },
  {
    "id": "UPZ_KHAGRACHHARI_MAHALCHHARI",
    "districtId": "DIST_KHAGRACHHARI",
    "nameBn": "মহালছড়ি",
    "nameEn": "Mahalchhari"
  },
  {
    "id": "UPZ_KHAGRACHHARI_MANIKCHHARI",
    "districtId": "DIST_KHAGRACHHARI",
    "nameBn": "মানিকছড়ি",
    "nameEn": "Manikchhari"
  },
  {
    "id": "UPZ_KHAGRACHHARI_RAMGARH",
    "districtId": "DIST_KHAGRACHHARI",
    "nameBn": "রামগড়",
    "nameEn": "Ramgarh"
  },
  {
    "id": "UPZ_KHAGRACHHARI_MATIRANGA",
    "districtId": "DIST_KHAGRACHHARI",
    "nameBn": "মাটিরাঙ্গা",
    "nameEn": "Matiranga"
  },
  {
    "id": "UPZ_KHAGRACHHARI_GUIMARA",
    "districtId": "DIST_KHAGRACHHARI",
    "nameBn": "গুইমারা",
    "nameEn": "Guimara"
  },
  {
    "id": "UPZ_LAKSHMIPUR_LAKSHMIPUR_SADAR",
    "districtId": "DIST_LAKSHMIPUR",
    "nameBn": "লক্ষ্মীপুর সদর",
    "nameEn": "Lakshmipur Sadar"
  },
  {
    "id": "UPZ_LAKSHMIPUR_RAIPUR",
    "districtId": "DIST_LAKSHMIPUR",
    "nameBn": "রায়পুর",
    "nameEn": "Raipur"
  },
  {
    "id": "UPZ_LAKSHMIPUR_RAMGANJ",
    "districtId": "DIST_LAKSHMIPUR",
    "nameBn": "রামগঞ্জ",
    "nameEn": "Ramganj"
  },
  {
    "id": "UPZ_LAKSHMIPUR_RAMGATI",
    "districtId": "DIST_LAKSHMIPUR",
    "nameBn": "রামগতি",
    "nameEn": "Ramgati"
  },
  {
    "id": "UPZ_LAKSHMIPUR_KAMALNAGAR",
    "districtId": "DIST_LAKSHMIPUR",
    "nameBn": "কমলনগর",
    "nameEn": "Kamalnagar"
  },
  {
    "id": "UPZ_NOAKHALI_NOAKHALI_SADAR",
    "districtId": "DIST_NOAKHALI",
    "nameBn": "নোয়াখালী সদর",
    "nameEn": "Noakhali Sadar"
  },
  {
    "id": "UPZ_NOAKHALI_BEGUMGANJ",
    "districtId": "DIST_NOAKHALI",
    "nameBn": "বেগমগঞ্জ",
    "nameEn": "Begumganj"
  },
  {
    "id": "UPZ_NOAKHALI_CHATKHIL",
    "districtId": "DIST_NOAKHALI",
    "nameBn": "চাটখিল",
    "nameEn": "Chatkhil"
  },
  {
    "id": "UPZ_NOAKHALI_COMPANIGANJ",
    "districtId": "DIST_NOAKHALI",
    "nameBn": "কোম্পানীগঞ্জ",
    "nameEn": "Companiganj"
  },
  {
    "id": "UPZ_NOAKHALI_HATIYA",
    "districtId": "DIST_NOAKHALI",
    "nameBn": "হাতিয়া",
    "nameEn": "Hatiya"
  },
  {
    "id": "UPZ_NOAKHALI_SENBAGH",
    "districtId": "DIST_NOAKHALI",
    "nameBn": "সেনবাগ",
    "nameEn": "Senbagh"
  },
  {
    "id": "UPZ_NOAKHALI_SONAIMURI",
    "districtId": "DIST_NOAKHALI",
    "nameBn": "সোনাইমুড়ী",
    "nameEn": "Sonaimuri"
  },
  {
    "id": "UPZ_NOAKHALI_SUBARNACHAR",
    "districtId": "DIST_NOAKHALI",
    "nameBn": "সুবর্ণচর",
    "nameEn": "Subarnachar"
  },
  {
    "id": "UPZ_NOAKHALI_KABIRHAT",
    "districtId": "DIST_NOAKHALI",
    "nameBn": "কবিরহাট",
    "nameEn": "Kabirhat"
  },
  {
    "id": "UPZ_RANGAMATI_RANGAMATI_SADAR",
    "districtId": "DIST_RANGAMATI",
    "nameBn": "রাঙামাটি সদর",
    "nameEn": "Rangamati Sadar"
  },
  {
    "id": "UPZ_RANGAMATI_KAPTAI",
    "districtId": "DIST_RANGAMATI",
    "nameBn": "কাপ্তাই",
    "nameEn": "Kaptai"
  },
  {
    "id": "UPZ_RANGAMATI_KAWKHALI",
    "districtId": "DIST_RANGAMATI",
    "nameBn": "কাউখালী",
    "nameEn": "Kawkhali"
  },
  {
    "id": "UPZ_RANGAMATI_BAGHAICHHARI",
    "districtId": "DIST_RANGAMATI",
    "nameBn": "বাঘাইছড়ি",
    "nameEn": "Baghaichhari"
  },
  {
    "id": "UPZ_RANGAMATI_BARKAL",
    "districtId": "DIST_RANGAMATI",
    "nameBn": "বরকল",
    "nameEn": "Barkal"
  },
  {
    "id": "UPZ_RANGAMATI_LANGADU",
    "districtId": "DIST_RANGAMATI",
    "nameBn": "লংগদু",
    "nameEn": "Langadu"
  },
  {
    "id": "UPZ_RANGAMATI_RAJASTHALI",
    "districtId": "DIST_RANGAMATI",
    "nameBn": "রাজস্থলী",
    "nameEn": "Rajasthali"
  },
  {
    "id": "UPZ_RANGAMATI_BELAICHHARI",
    "districtId": "DIST_RANGAMATI",
    "nameBn": "বিলাইছড়ি",
    "nameEn": "Belaichhari"
  },
  {
    "id": "UPZ_RANGAMATI_JURACHHARI",
    "districtId": "DIST_RANGAMATI",
    "nameBn": "জুরাছড়ি",
    "nameEn": "Jurachhari"
  },
  {
    "id": "UPZ_RANGAMATI_NANIARCHAR",
    "districtId": "DIST_RANGAMATI",
    "nameBn": "নানিয়ারচর",
    "nameEn": "Naniarchar"
  },
  {
    "id": "UPZ_BOGURA_ADAMDIGHI",
    "districtId": "DIST_BOGURA",
    "nameBn": "আদমদীঘি",
    "nameEn": "Adamdighi"
  },
  {
    "id": "UPZ_BOGURA_BOGURA_SADAR",
    "districtId": "DIST_BOGURA",
    "nameBn": "বগুড়া সদর",
    "nameEn": "Bogura Sadar"
  },
  {
    "id": "UPZ_BOGURA_DHUNAT",
    "districtId": "DIST_BOGURA",
    "nameBn": "ধুনট",
    "nameEn": "Dhunat"
  },
  {
    "id": "UPZ_BOGURA_DUPCHANCHIA",
    "districtId": "DIST_BOGURA",
    "nameBn": "দুপচাঁচিয়া",
    "nameEn": "Dupchanchia"
  },
  {
    "id": "UPZ_BOGURA_GABTALI",
    "districtId": "DIST_BOGURA",
    "nameBn": "গাবতলী",
    "nameEn": "Gabtali"
  },
  {
    "id": "UPZ_BOGURA_KAHALU",
    "districtId": "DIST_BOGURA",
    "nameBn": "কাহালু",
    "nameEn": "Kahalu"
  },
  {
    "id": "UPZ_BOGURA_NANDIGRAM",
    "districtId": "DIST_BOGURA",
    "nameBn": "নন্দীগ্রাম",
    "nameEn": "Nandigram"
  },
  {
    "id": "UPZ_BOGURA_SARIAKANDI",
    "districtId": "DIST_BOGURA",
    "nameBn": "সারিয়াকান্দি",
    "nameEn": "Sariakandi"
  },
  {
    "id": "UPZ_BOGURA_SHAJAHANPUR",
    "districtId": "DIST_BOGURA",
    "nameBn": "শাজাহানপুর",
    "nameEn": "Shajahanpur"
  },
  {
    "id": "UPZ_BOGURA_SHERPUR",
    "districtId": "DIST_BOGURA",
    "nameBn": "শেরপুর",
    "nameEn": "Sherpur"
  },
  {
    "id": "UPZ_BOGURA_SHIBGANJ",
    "districtId": "DIST_BOGURA",
    "nameBn": "শিবগঞ্জ",
    "nameEn": "Shibganj"
  },
  {
    "id": "UPZ_BOGURA_SONATALA",
    "districtId": "DIST_BOGURA",
    "nameBn": "সোনাতলা",
    "nameEn": "Sonatala"
  },
  {
    "id": "UPZ_JOYPURHAT_AKKELPUR",
    "districtId": "DIST_JOYPURHAT",
    "nameBn": "আক্কেলপুর",
    "nameEn": "Akkelpur"
  },
  {
    "id": "UPZ_JOYPURHAT_JOYPURHAT_SADAR",
    "districtId": "DIST_JOYPURHAT",
    "nameBn": "জয়পুরহাট সদর",
    "nameEn": "Joypurhat Sadar"
  },
  {
    "id": "UPZ_JOYPURHAT_KALAI",
    "districtId": "DIST_JOYPURHAT",
    "nameBn": "কালাই",
    "nameEn": "Kalai"
  },
  {
    "id": "UPZ_JOYPURHAT_KHETLAL",
    "districtId": "DIST_JOYPURHAT",
    "nameBn": "ক্ষেতলাল",
    "nameEn": "Khetlal"
  },
  {
    "id": "UPZ_JOYPURHAT_PANCHBIBI",
    "districtId": "DIST_JOYPURHAT",
    "nameBn": "পাঁচবিবি",
    "nameEn": "Panchbibi"
  },
  {
    "id": "UPZ_NAOGAON_ATRAI",
    "districtId": "DIST_NAOGAON",
    "nameBn": "আত্রাই",
    "nameEn": "Atrai"
  },
  {
    "id": "UPZ_NAOGAON_BADALGACHHI",
    "districtId": "DIST_NAOGAON",
    "nameBn": "বদলগাছী",
    "nameEn": "Badalgachhi"
  },
  {
    "id": "UPZ_NAOGAON_DHAMOIRHAT",
    "districtId": "DIST_NAOGAON",
    "nameBn": "ধামইরহাট",
    "nameEn": "Dhamoirhat"
  },
  {
    "id": "UPZ_NAOGAON_MANDA",
    "districtId": "DIST_NAOGAON",
    "nameBn": "মান্দা",
    "nameEn": "Manda"
  },
  {
    "id": "UPZ_NAOGAON_MOHADEVPUR",
    "districtId": "DIST_NAOGAON",
    "nameBn": "মহাদেবপুর",
    "nameEn": "Mohadevpur"
  },
  {
    "id": "UPZ_NAOGAON_NAOGAON_SADAR",
    "districtId": "DIST_NAOGAON",
    "nameBn": "নওগাঁ সদর",
    "nameEn": "Naogaon Sadar"
  },
  {
    "id": "UPZ_NAOGAON_NIAMATPUR",
    "districtId": "DIST_NAOGAON",
    "nameBn": "নিয়ামতপুর",
    "nameEn": "Niamatpur"
  },
  {
    "id": "UPZ_NAOGAON_PATNITALA",
    "districtId": "DIST_NAOGAON",
    "nameBn": "পত্নীতলা",
    "nameEn": "Patnitala"
  },
  {
    "id": "UPZ_NAOGAON_PORSHA",
    "districtId": "DIST_NAOGAON",
    "nameBn": "পোরশা",
    "nameEn": "Porsha"
  },
  {
    "id": "UPZ_NAOGAON_RANINAGAR",
    "districtId": "DIST_NAOGAON",
    "nameBn": "রানীনগর",
    "nameEn": "Raninagar"
  },
  {
    "id": "UPZ_NAOGAON_SAPAHAR",
    "districtId": "DIST_NAOGAON",
    "nameBn": "সাপাহার",
    "nameEn": "Sapahar"
  },
  {
    "id": "UPZ_NATORE_BAGATIPARA",
    "districtId": "DIST_NATORE",
    "nameBn": "বাগাতিপাড়া",
    "nameEn": "Bagatipara"
  },
  {
    "id": "UPZ_NATORE_BARAIGRAM",
    "districtId": "DIST_NATORE",
    "nameBn": "বড়াইগ্রাম",
    "nameEn": "Baraigram"
  },
  {
    "id": "UPZ_NATORE_GURUDASPUR",
    "districtId": "DIST_NATORE",
    "nameBn": "গুরুদাসপুর",
    "nameEn": "Gurudaspur"
  },
  {
    "id": "UPZ_NATORE_LALPUR",
    "districtId": "DIST_NATORE",
    "nameBn": "লালপুর",
    "nameEn": "Lalpur"
  },
  {
    "id": "UPZ_NATORE_NATORE_SADAR",
    "districtId": "DIST_NATORE",
    "nameBn": "নাটোর সদর",
    "nameEn": "Natore Sadar"
  },
  {
    "id": "UPZ_NATORE_SINGRA",
    "districtId": "DIST_NATORE",
    "nameBn": "সিংড়া",
    "nameEn": "Singra"
  },
  {
    "id": "UPZ_NATORE_NALDANGA",
    "districtId": "DIST_NATORE",
    "nameBn": "নলডাঙ্গা",
    "nameEn": "Naldanga"
  },
  {
    "id": "UPZ_CHAPAINAWABGANJ_BHOLAHAT",
    "districtId": "DIST_CHAPAINAWABGANJ",
    "nameBn": "ভোলাহাট",
    "nameEn": "Bholahat"
  },
  {
    "id": "UPZ_CHAPAINAWABGANJ_GOMASTAPUR",
    "districtId": "DIST_CHAPAINAWABGANJ",
    "nameBn": "গোমস্তাপুর",
    "nameEn": "Gomastapur"
  },
  {
    "id": "UPZ_CHAPAINAWABGANJ_NACHOLE",
    "districtId": "DIST_CHAPAINAWABGANJ",
    "nameBn": "নাচোল",
    "nameEn": "Nachole"
  },
  {
    "id": "UPZ_CHAPAINAWABGANJ_CHAPAINAWABGANJ_SADAR",
    "districtId": "DIST_CHAPAINAWABGANJ",
    "nameBn": "চাঁপাইনবাবগঞ্জ সদর",
    "nameEn": "Chapainawabganj Sadar"
  },
  {
    "id": "UPZ_CHAPAINAWABGANJ_SHIBGANJ",
    "districtId": "DIST_CHAPAINAWABGANJ",
    "nameBn": "শিবগঞ্জ",
    "nameEn": "Shibganj"
  },
  {
    "id": "UPZ_PABNA_ATGHARIA",
    "districtId": "DIST_PABNA",
    "nameBn": "আটঘরিয়া",
    "nameEn": "Atgharia"
  },
  {
    "id": "UPZ_PABNA_BERA",
    "districtId": "DIST_PABNA",
    "nameBn": "বেড়া",
    "nameEn": "Bera"
  },
  {
    "id": "UPZ_PABNA_BHANGURA",
    "districtId": "DIST_PABNA",
    "nameBn": "ভাঙ্গুড়া",
    "nameEn": "Bhangura"
  },
  {
    "id": "UPZ_PABNA_CHATMOHAR",
    "districtId": "DIST_PABNA",
    "nameBn": "চাটমোহর",
    "nameEn": "Chatmohar"
  },
  {
    "id": "UPZ_PABNA_FARIDPUR",
    "districtId": "DIST_PABNA",
    "nameBn": "ফরিদপুর",
    "nameEn": "Faridpur"
  },
  {
    "id": "UPZ_PABNA_ISHWARDI",
    "districtId": "DIST_PABNA",
    "nameBn": "ঈশ্বরদী",
    "nameEn": "Ishwardi"
  },
  {
    "id": "UPZ_PABNA_PABNA_SADAR",
    "districtId": "DIST_PABNA",
    "nameBn": "পাবনা সদর",
    "nameEn": "Pabna Sadar"
  },
  {
    "id": "UPZ_PABNA_SANTHIA",
    "districtId": "DIST_PABNA",
    "nameBn": "সাঁথিয়া",
    "nameEn": "Santhia"
  },
  {
    "id": "UPZ_PABNA_SUJANAGAR",
    "districtId": "DIST_PABNA",
    "nameBn": "সুজানগর",
    "nameEn": "Sujanagar"
  },
  {
    "id": "UPZ_RAJSHAHI_BAGHA",
    "districtId": "DIST_RAJSHAHI",
    "nameBn": "বাঘা",
    "nameEn": "Bagha"
  },
  {
    "id": "UPZ_RAJSHAHI_BAGMARA",
    "districtId": "DIST_RAJSHAHI",
    "nameBn": "বাগমারা",
    "nameEn": "Bagmara"
  },
  {
    "id": "UPZ_RAJSHAHI_CHARGHAT",
    "districtId": "DIST_RAJSHAHI",
    "nameBn": "চারঘাট",
    "nameEn": "Charghat"
  },
  {
    "id": "UPZ_RAJSHAHI_DURGAPUR",
    "districtId": "DIST_RAJSHAHI",
    "nameBn": "দুর্গাপুর",
    "nameEn": "Durgapur"
  },
  {
    "id": "UPZ_RAJSHAHI_GODAGARI",
    "districtId": "DIST_RAJSHAHI",
    "nameBn": "গোদাগাড়ী",
    "nameEn": "Godagari"
  },
  {
    "id": "UPZ_RAJSHAHI_MOHANPUR",
    "districtId": "DIST_RAJSHAHI",
    "nameBn": "মোহনপুর",
    "nameEn": "Mohanpur"
  },
  {
    "id": "UPZ_RAJSHAHI_PABA",
    "districtId": "DIST_RAJSHAHI",
    "nameBn": "পবা",
    "nameEn": "Paba"
  },
  {
    "id": "UPZ_RAJSHAHI_PUTHIA",
    "districtId": "DIST_RAJSHAHI",
    "nameBn": "পুঠিয়া",
    "nameEn": "Puthia"
  },
  {
    "id": "UPZ_RAJSHAHI_TANOR",
    "districtId": "DIST_RAJSHAHI",
    "nameBn": "তানোর",
    "nameEn": "Tanor"
  },
  {
    "id": "UPZ_SIRAJGANJ_BELKUCHI",
    "districtId": "DIST_SIRAJGANJ",
    "nameBn": "বেলকুচি",
    "nameEn": "Belkuchi"
  },
  {
    "id": "UPZ_SIRAJGANJ_CHAUHALI",
    "districtId": "DIST_SIRAJGANJ",
    "nameBn": "চৌহালি",
    "nameEn": "Chauhali"
  },
  {
    "id": "UPZ_SIRAJGANJ_KAMARKHANDA",
    "districtId": "DIST_SIRAJGANJ",
    "nameBn": "কামারখন্দ",
    "nameEn": "Kamarkhanda"
  },
  {
    "id": "UPZ_SIRAJGANJ_KAZIPUR",
    "districtId": "DIST_SIRAJGANJ",
    "nameBn": "কাজীপুর",
    "nameEn": "Kazipur"
  },
  {
    "id": "UPZ_SIRAJGANJ_RAIGANJ",
    "districtId": "DIST_SIRAJGANJ",
    "nameBn": "রায়গঞ্জ",
    "nameEn": "Raiganj"
  },
  {
    "id": "UPZ_SIRAJGANJ_SHAHJADPUR",
    "districtId": "DIST_SIRAJGANJ",
    "nameBn": "শাহজাদপুর",
    "nameEn": "Shahjadpur"
  },
  {
    "id": "UPZ_SIRAJGANJ_SIRAJGANJ_SADAR",
    "districtId": "DIST_SIRAJGANJ",
    "nameBn": "সিরাজগঞ্জ সদর",
    "nameEn": "Sirajganj Sadar"
  },
  {
    "id": "UPZ_SIRAJGANJ_TARASH",
    "districtId": "DIST_SIRAJGANJ",
    "nameBn": "তাড়াশ",
    "nameEn": "Tarash"
  },
  {
    "id": "UPZ_SIRAJGANJ_ULLAPARA",
    "districtId": "DIST_SIRAJGANJ",
    "nameBn": "উল্লাপাড়া",
    "nameEn": "Ullapara"
  },
  {
    "id": "UPZ_BAGERHAT_BAGERHAT_SADAR",
    "districtId": "DIST_BAGERHAT",
    "nameBn": "বাগেরহাট সদর",
    "nameEn": "Bagerhat Sadar"
  },
  {
    "id": "UPZ_BAGERHAT_CHITALMARI",
    "districtId": "DIST_BAGERHAT",
    "nameBn": "চিতলমারী",
    "nameEn": "Chitalmari"
  },
  {
    "id": "UPZ_BAGERHAT_FAKIRHAT",
    "districtId": "DIST_BAGERHAT",
    "nameBn": "ফকিরহাট",
    "nameEn": "Fakirhat"
  },
  {
    "id": "UPZ_BAGERHAT_KACHUA",
    "districtId": "DIST_BAGERHAT",
    "nameBn": "কচুয়া",
    "nameEn": "Kachua"
  },
  {
    "id": "UPZ_BAGERHAT_MOLLAHAT",
    "districtId": "DIST_BAGERHAT",
    "nameBn": "মোল্লাহাট",
    "nameEn": "Mollahat"
  },
  {
    "id": "UPZ_BAGERHAT_MONGLA",
    "districtId": "DIST_BAGERHAT",
    "nameBn": "মোংলা",
    "nameEn": "Mongla"
  },
  {
    "id": "UPZ_BAGERHAT_MORRELGANJ",
    "districtId": "DIST_BAGERHAT",
    "nameBn": "মোরেলগঞ্জ",
    "nameEn": "Morrelganj"
  },
  {
    "id": "UPZ_BAGERHAT_RAMPAL",
    "districtId": "DIST_BAGERHAT",
    "nameBn": "রামপাল",
    "nameEn": "Rampal"
  },
  {
    "id": "UPZ_BAGERHAT_SARANKHOLA",
    "districtId": "DIST_BAGERHAT",
    "nameBn": "শরণখোলা",
    "nameEn": "Sarankhola"
  },
  {
    "id": "UPZ_CHUADANGA_CHUADANGA_SADAR",
    "districtId": "DIST_CHUADANGA",
    "nameBn": "চুয়াডাঙ্গা সদর",
    "nameEn": "Chuadanga Sadar"
  },
  {
    "id": "UPZ_CHUADANGA_ALAMDANGA",
    "districtId": "DIST_CHUADANGA",
    "nameBn": "আলমডাঙ্গা",
    "nameEn": "Alamdanga"
  },
  {
    "id": "UPZ_CHUADANGA_DAMURHUDA",
    "districtId": "DIST_CHUADANGA",
    "nameBn": "দামুড়হুদা",
    "nameEn": "Damurhuda"
  },
  {
    "id": "UPZ_CHUADANGA_JIBANNAGAR",
    "districtId": "DIST_CHUADANGA",
    "nameBn": "জীবননগর",
    "nameEn": "Jibannagar"
  },
  {
    "id": "UPZ_JASHORE_ABHAYNAGAR",
    "districtId": "DIST_JASHORE",
    "nameBn": "অভয়নগর",
    "nameEn": "Abhaynagar"
  },
  {
    "id": "UPZ_JASHORE_BAGHERPARA",
    "districtId": "DIST_JASHORE",
    "nameBn": "বাঘারপাড়া",
    "nameEn": "Bagherpara"
  },
  {
    "id": "UPZ_JASHORE_CHAUGACHHA",
    "districtId": "DIST_JASHORE",
    "nameBn": "চৌগাছা",
    "nameEn": "Chaugachha"
  },
  {
    "id": "UPZ_JASHORE_JHIKARGACHHA",
    "districtId": "DIST_JASHORE",
    "nameBn": "ঝিকরগাছা",
    "nameEn": "Jhikargachha"
  },
  {
    "id": "UPZ_JASHORE_KESHABPUR",
    "districtId": "DIST_JASHORE",
    "nameBn": "কেশবপুর",
    "nameEn": "Keshabpur"
  },
  {
    "id": "UPZ_JASHORE_JASHORE_SADAR",
    "districtId": "DIST_JASHORE",
    "nameBn": "যশোর সদর",
    "nameEn": "Jashore Sadar"
  },
  {
    "id": "UPZ_JASHORE_MANIRAMPUR",
    "districtId": "DIST_JASHORE",
    "nameBn": "মণিরামপুর",
    "nameEn": "Manirampur"
  },
  {
    "id": "UPZ_JASHORE_SHARSHA",
    "districtId": "DIST_JASHORE",
    "nameBn": "শার্শা",
    "nameEn": "Sharsha"
  },
  {
    "id": "UPZ_JHENAIDAH_JHENAIDAH_SADAR",
    "districtId": "DIST_JHENAIDAH",
    "nameBn": "ঝিনাইদহ সদর",
    "nameEn": "Jhenaidah Sadar"
  },
  {
    "id": "UPZ_JHENAIDAH_SHAILKUPA",
    "districtId": "DIST_JHENAIDAH",
    "nameBn": "শৈলকুপা",
    "nameEn": "Shailkupa"
  },
  {
    "id": "UPZ_JHENAIDAH_HARINAKUNDA",
    "districtId": "DIST_JHENAIDAH",
    "nameBn": "হরিণাকুণ্ডু",
    "nameEn": "Harinakunda"
  },
  {
    "id": "UPZ_JHENAIDAH_KALIGANJ",
    "districtId": "DIST_JHENAIDAH",
    "nameBn": "কালীগঞ্জ",
    "nameEn": "Kaliganj"
  },
  {
    "id": "UPZ_JHENAIDAH_KOTCHANDPUR",
    "districtId": "DIST_JHENAIDAH",
    "nameBn": "কোটচাঁদপুর",
    "nameEn": "Kotchandpur"
  },
  {
    "id": "UPZ_JHENAIDAH_MAHESHPUR",
    "districtId": "DIST_JHENAIDAH",
    "nameBn": "মহেশপুর",
    "nameEn": "Maheshpur"
  },
  {
    "id": "UPZ_KHULNA_BATIAGHATA",
    "districtId": "DIST_KHULNA",
    "nameBn": "বটিয়াঘাটা",
    "nameEn": "Batiaghata"
  },
  {
    "id": "UPZ_KHULNA_DACOPE",
    "districtId": "DIST_KHULNA",
    "nameBn": "দাকোপ",
    "nameEn": "Dacope"
  },
  {
    "id": "UPZ_KHULNA_DIGHALIA",
    "districtId": "DIST_KHULNA",
    "nameBn": "দিঘলিয়া",
    "nameEn": "Dighalia"
  },
  {
    "id": "UPZ_KHULNA_DUMURIA",
    "districtId": "DIST_KHULNA",
    "nameBn": "ডুমুরিয়া",
    "nameEn": "Dumuria"
  },
  {
    "id": "UPZ_KHULNA_KOYRA",
    "districtId": "DIST_KHULNA",
    "nameBn": "কয়রা",
    "nameEn": "Koyra"
  },
  {
    "id": "UPZ_KHULNA_PAIKGACHHA",
    "districtId": "DIST_KHULNA",
    "nameBn": "পাইকগাছা",
    "nameEn": "Paikgachha"
  },
  {
    "id": "UPZ_KHULNA_PHULTALA",
    "districtId": "DIST_KHULNA",
    "nameBn": "ফুলতলা",
    "nameEn": "Phultala"
  },
  {
    "id": "UPZ_KHULNA_RUPSHA",
    "districtId": "DIST_KHULNA",
    "nameBn": "রূপসা",
    "nameEn": "Rupsha"
  },
  {
    "id": "UPZ_KHULNA_TEROKHADA",
    "districtId": "DIST_KHULNA",
    "nameBn": "তেরখাদা",
    "nameEn": "Terokhada"
  },
  {
    "id": "UPZ_KUSHTIA_KUSHTIA_SADAR",
    "districtId": "DIST_KUSHTIA",
    "nameBn": "কুষ্টিয়া সদর",
    "nameEn": "Kushtia Sadar"
  },
  {
    "id": "UPZ_KUSHTIA_KUMARKHALI",
    "districtId": "DIST_KUSHTIA",
    "nameBn": "কুমারখালী",
    "nameEn": "Kumarkhali"
  },
  {
    "id": "UPZ_KUSHTIA_KHOKSA",
    "districtId": "DIST_KUSHTIA",
    "nameBn": "খোকসা",
    "nameEn": "Khoksa"
  },
  {
    "id": "UPZ_KUSHTIA_MIRPUR",
    "districtId": "DIST_KUSHTIA",
    "nameBn": "মিরপুর",
    "nameEn": "Mirpur"
  },
  {
    "id": "UPZ_KUSHTIA_DAULATPUR",
    "districtId": "DIST_KUSHTIA",
    "nameBn": "দৌলতপুর",
    "nameEn": "Daulatpur"
  },
  {
    "id": "UPZ_KUSHTIA_BHERAMARA",
    "districtId": "DIST_KUSHTIA",
    "nameBn": "ভেড়ামারা",
    "nameEn": "Bheramara"
  },
  {
    "id": "UPZ_MAGURA_MAGURA_SADAR",
    "districtId": "DIST_MAGURA",
    "nameBn": "মাগুরা সদর",
    "nameEn": "Magura Sadar"
  },
  {
    "id": "UPZ_MAGURA_MOHAMMADPUR",
    "districtId": "DIST_MAGURA",
    "nameBn": "মহম্মদপুর",
    "nameEn": "Mohammadpur"
  },
  {
    "id": "UPZ_MAGURA_SHALIKHA",
    "districtId": "DIST_MAGURA",
    "nameBn": "শালিখা",
    "nameEn": "Shalikha"
  },
  {
    "id": "UPZ_MAGURA_SREEPUR",
    "districtId": "DIST_MAGURA",
    "nameBn": "শ্রীপুর",
    "nameEn": "Sreepur"
  },
  {
    "id": "UPZ_MEHERPUR_MEHERPUR_SADAR",
    "districtId": "DIST_MEHERPUR",
    "nameBn": "মেহেরপুর সদর",
    "nameEn": "Meherpur Sadar"
  },
  {
    "id": "UPZ_MEHERPUR_GANGNI",
    "districtId": "DIST_MEHERPUR",
    "nameBn": "গাংনী",
    "nameEn": "Gangni"
  },
  {
    "id": "UPZ_MEHERPUR_MUJIBNAGAR",
    "districtId": "DIST_MEHERPUR",
    "nameBn": "মুজিবনগর",
    "nameEn": "Mujibnagar"
  },
  {
    "id": "UPZ_NARAIL_NARAIL_SADAR",
    "districtId": "DIST_NARAIL",
    "nameBn": "নড়াইল সদর",
    "nameEn": "Narail Sadar"
  },
  {
    "id": "UPZ_NARAIL_LOHAGARA",
    "districtId": "DIST_NARAIL",
    "nameBn": "লোহাগড়া",
    "nameEn": "Lohagara"
  },
  {
    "id": "UPZ_NARAIL_KALIA",
    "districtId": "DIST_NARAIL",
    "nameBn": "কালিয়া",
    "nameEn": "Kalia"
  },
  {
    "id": "UPZ_SATKHIRA_ASSASUNI",
    "districtId": "DIST_SATKHIRA",
    "nameBn": "আশাশুনি",
    "nameEn": "Assasuni"
  },
  {
    "id": "UPZ_SATKHIRA_DEBHATA",
    "districtId": "DIST_SATKHIRA",
    "nameBn": "দেবহাটা",
    "nameEn": "Debhata"
  },
  {
    "id": "UPZ_SATKHIRA_KALAROA",
    "districtId": "DIST_SATKHIRA",
    "nameBn": "কলারোয়া",
    "nameEn": "Kalaroa"
  },
  {
    "id": "UPZ_SATKHIRA_KALIGANJ",
    "districtId": "DIST_SATKHIRA",
    "nameBn": "কালীগঞ্জ",
    "nameEn": "Kaliganj"
  },
  {
    "id": "UPZ_SATKHIRA_SATKHIRA_SADAR",
    "districtId": "DIST_SATKHIRA",
    "nameBn": "সাতক্ষীরা সদর",
    "nameEn": "Satkhira Sadar"
  },
  {
    "id": "UPZ_SATKHIRA_SHYAMNAGAR",
    "districtId": "DIST_SATKHIRA",
    "nameBn": "শ্যামনগর",
    "nameEn": "Shyamnagar"
  },
  {
    "id": "UPZ_SATKHIRA_TALA",
    "districtId": "DIST_SATKHIRA",
    "nameBn": "তালা",
    "nameEn": "Tala"
  },
  {
    "id": "UPZ_BARGUNA_BARGUNA_SADAR",
    "districtId": "DIST_BARGUNA",
    "nameBn": "বরগুনা সদর",
    "nameEn": "Barguna Sadar"
  },
  {
    "id": "UPZ_BARGUNA_AMTALI",
    "districtId": "DIST_BARGUNA",
    "nameBn": "আমতলী",
    "nameEn": "Amtali"
  },
  {
    "id": "UPZ_BARGUNA_BAMNA",
    "districtId": "DIST_BARGUNA",
    "nameBn": "বামনা",
    "nameEn": "Bamna"
  },
  {
    "id": "UPZ_BARGUNA_BETAGI",
    "districtId": "DIST_BARGUNA",
    "nameBn": "বেতাগী",
    "nameEn": "Betagi"
  },
  {
    "id": "UPZ_BARGUNA_PATHARGHATA",
    "districtId": "DIST_BARGUNA",
    "nameBn": "পাথরঘাটা",
    "nameEn": "Patharghata"
  },
  {
    "id": "UPZ_BARGUNA_TALTALI",
    "districtId": "DIST_BARGUNA",
    "nameBn": "তালতলী",
    "nameEn": "Taltali"
  },
  {
    "id": "UPZ_BARISHAL_AGAILJHARA",
    "districtId": "DIST_BARISHAL",
    "nameBn": "আগৈলঝাড়া",
    "nameEn": "Agailjhara"
  },
  {
    "id": "UPZ_BARISHAL_BABUGANJ",
    "districtId": "DIST_BARISHAL",
    "nameBn": "বাবুগঞ্জ",
    "nameEn": "Babuganj"
  },
  {
    "id": "UPZ_BARISHAL_BAKERGANJ",
    "districtId": "DIST_BARISHAL",
    "nameBn": "বাকেরগঞ্জ",
    "nameEn": "Bakerganj"
  },
  {
    "id": "UPZ_BARISHAL_BANARIPARA",
    "districtId": "DIST_BARISHAL",
    "nameBn": "বানারীপাড়া",
    "nameEn": "Banaripara"
  },
  {
    "id": "UPZ_BARISHAL_GAURNADI",
    "districtId": "DIST_BARISHAL",
    "nameBn": "গৌরনদী",
    "nameEn": "Gaurnadi"
  },
  {
    "id": "UPZ_BARISHAL_HIZLA",
    "districtId": "DIST_BARISHAL",
    "nameBn": "হিজলা",
    "nameEn": "Hizla"
  },
  {
    "id": "UPZ_BARISHAL_BARISHAL_SADAR",
    "districtId": "DIST_BARISHAL",
    "nameBn": "বরিশাল সদর",
    "nameEn": "Barishal Sadar"
  },
  {
    "id": "UPZ_BARISHAL_MEHENDIGANJ",
    "districtId": "DIST_BARISHAL",
    "nameBn": "মেহেন্দিগঞ্জ",
    "nameEn": "Mehendiganj"
  },
  {
    "id": "UPZ_BARISHAL_MULADI",
    "districtId": "DIST_BARISHAL",
    "nameBn": "মুলাদী",
    "nameEn": "Muladi"
  },
  {
    "id": "UPZ_BARISHAL_WAZIRPUR",
    "districtId": "DIST_BARISHAL",
    "nameBn": "উজিরপুর",
    "nameEn": "Wazirpur"
  },
  {
    "id": "UPZ_BHOLA_BHOLA_SADAR",
    "districtId": "DIST_BHOLA",
    "nameBn": "ভোলা সদর",
    "nameEn": "Bhola Sadar"
  },
  {
    "id": "UPZ_BHOLA_BORHANUDDIN",
    "districtId": "DIST_BHOLA",
    "nameBn": "বোরহানউদ্দিন",
    "nameEn": "Borhanuddin"
  },
  {
    "id": "UPZ_BHOLA_CHARFASSON",
    "districtId": "DIST_BHOLA",
    "nameBn": "চরফ্যাশন",
    "nameEn": "Charfasson"
  },
  {
    "id": "UPZ_BHOLA_DAULATKHAN",
    "districtId": "DIST_BHOLA",
    "nameBn": "দৌলতখান",
    "nameEn": "Daulatkhan"
  },
  {
    "id": "UPZ_BHOLA_LALMOHAN",
    "districtId": "DIST_BHOLA",
    "nameBn": "লালমোহন",
    "nameEn": "Lalmohan"
  },
  {
    "id": "UPZ_BHOLA_MANPURA",
    "districtId": "DIST_BHOLA",
    "nameBn": "মনপুরা",
    "nameEn": "Manpura"
  },
  {
    "id": "UPZ_BHOLA_TAZUMUDDIN",
    "districtId": "DIST_BHOLA",
    "nameBn": "তজুমদ্দিন",
    "nameEn": "Tazumuddin"
  },
  {
    "id": "UPZ_JHALOKATHI_JHALOKATHI_SADAR",
    "districtId": "DIST_JHALOKATHI",
    "nameBn": "ঝালকাঠি সদর",
    "nameEn": "Jhalokathi Sadar"
  },
  {
    "id": "UPZ_JHALOKATHI_KATHALIA",
    "districtId": "DIST_JHALOKATHI",
    "nameBn": "কাঠালিয়া",
    "nameEn": "Kathalia"
  },
  {
    "id": "UPZ_JHALOKATHI_NALCHITY",
    "districtId": "DIST_JHALOKATHI",
    "nameBn": "নলছিটি",
    "nameEn": "Nalchity"
  },
  {
    "id": "UPZ_JHALOKATHI_RAJAPUR",
    "districtId": "DIST_JHALOKATHI",
    "nameBn": "রাজাপুর",
    "nameEn": "Rajapur"
  },
  {
    "id": "UPZ_PATUAKHALI_PATUAKHALI_SADAR",
    "districtId": "DIST_PATUAKHALI",
    "nameBn": "পটুয়াখালী সদর",
    "nameEn": "Patuakhali Sadar"
  },
  {
    "id": "UPZ_PATUAKHALI_BAUPHAL",
    "districtId": "DIST_PATUAKHALI",
    "nameBn": "বাউফল",
    "nameEn": "Bauphal"
  },
  {
    "id": "UPZ_PATUAKHALI_DASHMINA",
    "districtId": "DIST_PATUAKHALI",
    "nameBn": "দশমিনা",
    "nameEn": "Dashmina"
  },
  {
    "id": "UPZ_PATUAKHALI_DUMKI",
    "districtId": "DIST_PATUAKHALI",
    "nameBn": "দুমকি",
    "nameEn": "Dumki"
  },
  {
    "id": "UPZ_PATUAKHALI_GALACHIPA",
    "districtId": "DIST_PATUAKHALI",
    "nameBn": "গলাচিপা",
    "nameEn": "Galachipa"
  },
  {
    "id": "UPZ_PATUAKHALI_KALAPARA",
    "districtId": "DIST_PATUAKHALI",
    "nameBn": "কলাপাড়া",
    "nameEn": "Kalapara"
  },
  {
    "id": "UPZ_PATUAKHALI_MIRZAGANJ",
    "districtId": "DIST_PATUAKHALI",
    "nameBn": "মির্জাগঞ্জ",
    "nameEn": "Mirzaganj"
  },
  {
    "id": "UPZ_PATUAKHALI_RANGABALI",
    "districtId": "DIST_PATUAKHALI",
    "nameBn": "রাঙ্গাবালী",
    "nameEn": "Rangabali"
  },
  {
    "id": "UPZ_PIROJPUR_PIROJPUR_SADAR",
    "districtId": "DIST_PIROJPUR",
    "nameBn": "পিরোজপুর সদর",
    "nameEn": "Pirojpur Sadar"
  },
  {
    "id": "UPZ_PIROJPUR_BHANDARIA",
    "districtId": "DIST_PIROJPUR",
    "nameBn": "ভান্ডারিয়া",
    "nameEn": "Bhandaria"
  },
  {
    "id": "UPZ_PIROJPUR_KAWKHALI",
    "districtId": "DIST_PIROJPUR",
    "nameBn": "কাউখালী",
    "nameEn": "Kawkhali"
  },
  {
    "id": "UPZ_PIROJPUR_MATHBARIA",
    "districtId": "DIST_PIROJPUR",
    "nameBn": "মঠবাড়িয়া",
    "nameEn": "Mathbaria"
  },
  {
    "id": "UPZ_PIROJPUR_NAZIRPUR",
    "districtId": "DIST_PIROJPUR",
    "nameBn": "নাজিরপুর",
    "nameEn": "Nazirpur"
  },
  {
    "id": "UPZ_PIROJPUR_NESARABAD_SWARUPKATI",
    "districtId": "DIST_PIROJPUR",
    "nameBn": "নেছারাবাদ",
    "nameEn": "Nesarabad (Swarupkati)"
  },
  {
    "id": "UPZ_PIROJPUR_INDURKANI",
    "districtId": "DIST_PIROJPUR",
    "nameBn": "ইন্দুরকানী",
    "nameEn": "Indurkani"
  },
  {
    "id": "UPZ_HABIGANJ_AJMIRIGANJ",
    "districtId": "DIST_HABIGANJ",
    "nameBn": "আজমিরীগঞ্জ",
    "nameEn": "Ajmiriganj"
  },
  {
    "id": "UPZ_HABIGANJ_BAHUBAL",
    "districtId": "DIST_HABIGANJ",
    "nameBn": "বাহুবল",
    "nameEn": "Bahubal"
  },
  {
    "id": "UPZ_HABIGANJ_BANIACHONG",
    "districtId": "DIST_HABIGANJ",
    "nameBn": "বানিয়াচং",
    "nameEn": "Baniachong"
  },
  {
    "id": "UPZ_HABIGANJ_CHUNARUGHAT",
    "districtId": "DIST_HABIGANJ",
    "nameBn": "চুনারুঘাট",
    "nameEn": "Chunarughat"
  },
  {
    "id": "UPZ_HABIGANJ_HABIGANJ_SADAR",
    "districtId": "DIST_HABIGANJ",
    "nameBn": "হবিগঞ্জ সদর",
    "nameEn": "Habiganj Sadar"
  },
  {
    "id": "UPZ_HABIGANJ_LAKHAI",
    "districtId": "DIST_HABIGANJ",
    "nameBn": "লাখাই",
    "nameEn": "Lakhai"
  },
  {
    "id": "UPZ_HABIGANJ_MADHABPUR",
    "districtId": "DIST_HABIGANJ",
    "nameBn": "মাধবপুর",
    "nameEn": "Madhabpur"
  },
  {
    "id": "UPZ_HABIGANJ_NABIGANJ",
    "districtId": "DIST_HABIGANJ",
    "nameBn": "নবীগঞ্জ",
    "nameEn": "Nabiganj"
  },
  {
    "id": "UPZ_HABIGANJ_SAYESTAGANJ",
    "districtId": "DIST_HABIGANJ",
    "nameBn": "শায়েস্তাগঞ্জ",
    "nameEn": "Sayestaganj"
  },
  {
    "id": "UPZ_MOULVIBAZAR_BARLEKHA",
    "districtId": "DIST_MOULVIBAZAR",
    "nameBn": "বড়লেখা",
    "nameEn": "Barlekha"
  },
  {
    "id": "UPZ_MOULVIBAZAR_KAMALGANJ",
    "districtId": "DIST_MOULVIBAZAR",
    "nameBn": "কমলগঞ্জ",
    "nameEn": "Kamalganj"
  },
  {
    "id": "UPZ_MOULVIBAZAR_KULAURA",
    "districtId": "DIST_MOULVIBAZAR",
    "nameBn": "কুলাউড়া",
    "nameEn": "Kulaura"
  },
  {
    "id": "UPZ_MOULVIBAZAR_MOULVIBAZAR_SADAR",
    "districtId": "DIST_MOULVIBAZAR",
    "nameBn": "মৌলভীবাজার সদর",
    "nameEn": "Moulvibazar Sadar"
  },
  {
    "id": "UPZ_MOULVIBAZAR_RAJNAGAR",
    "districtId": "DIST_MOULVIBAZAR",
    "nameBn": "রাজনগর",
    "nameEn": "Rajnagar"
  },
  {
    "id": "UPZ_MOULVIBAZAR_SREEMANGAL",
    "districtId": "DIST_MOULVIBAZAR",
    "nameBn": "শ্রীমঙ্গল",
    "nameEn": "Sreemangal"
  },
  {
    "id": "UPZ_MOULVIBAZAR_JURI",
    "districtId": "DIST_MOULVIBAZAR",
    "nameBn": "জুড়ী",
    "nameEn": "Juri"
  },
  {
    "id": "UPZ_SUNAMGANJ_SUNAMGANJ_SADAR",
    "districtId": "DIST_SUNAMGANJ",
    "nameBn": "সুনামগঞ্জ সদর",
    "nameEn": "Sunamganj Sadar"
  },
  {
    "id": "UPZ_SUNAMGANJ_CHHATAK",
    "districtId": "DIST_SUNAMGANJ",
    "nameBn": "ছাতক",
    "nameEn": "Chhatak"
  },
  {
    "id": "UPZ_SUNAMGANJ_DOWARABAZAR",
    "districtId": "DIST_SUNAMGANJ",
    "nameBn": "দোয়ারাবাজার",
    "nameEn": "Dowarabazar"
  },
  {
    "id": "UPZ_SUNAMGANJ_DERAI",
    "districtId": "DIST_SUNAMGANJ",
    "nameBn": "দিরাই",
    "nameEn": "Derai"
  },
  {
    "id": "UPZ_SUNAMGANJ_DHARAMPASHA",
    "districtId": "DIST_SUNAMGANJ",
    "nameBn": "ধর্মপাশা",
    "nameEn": "Dharampasha"
  },
  {
    "id": "UPZ_SUNAMGANJ_JAMALGANJ",
    "districtId": "DIST_SUNAMGANJ",
    "nameBn": "জামালগঞ্জ",
    "nameEn": "Jamalganj"
  },
  {
    "id": "UPZ_SUNAMGANJ_JAGANNATHPUR",
    "districtId": "DIST_SUNAMGANJ",
    "nameBn": "জগন্নাথপুর",
    "nameEn": "Jagannathpur"
  },
  {
    "id": "UPZ_SUNAMGANJ_TAHIRPUR",
    "districtId": "DIST_SUNAMGANJ",
    "nameBn": "তাহিরপুর",
    "nameEn": "Tahirpur"
  },
  {
    "id": "UPZ_SUNAMGANJ_SHANTIGANJ",
    "districtId": "DIST_SUNAMGANJ",
    "nameBn": "শান্তিগঞ্জ",
    "nameEn": "Shantiganj"
  },
  {
    "id": "UPZ_SUNAMGANJ_SULLA",
    "districtId": "DIST_SUNAMGANJ",
    "nameBn": "শাল্লা",
    "nameEn": "Sulla"
  },
  {
    "id": "UPZ_SUNAMGANJ_BISHWAMVARPUR",
    "districtId": "DIST_SUNAMGANJ",
    "nameBn": "বিশ্বম্ভরপুর",
    "nameEn": "Bishwamvarpur"
  },
  {
    "id": "UPZ_SUNAMGANJ_MADHYANAGAR",
    "districtId": "DIST_SUNAMGANJ",
    "nameBn": "মধ্যনগর",
    "nameEn": "Madhyanagar"
  },
  {
    "id": "UPZ_SYLHET_SYLHET_SADAR",
    "districtId": "DIST_SYLHET",
    "nameBn": "সিলেট সদর",
    "nameEn": "Sylhet Sadar"
  },
  {
    "id": "UPZ_SYLHET_BALAGANJ",
    "districtId": "DIST_SYLHET",
    "nameBn": "বালাগঞ্জ",
    "nameEn": "Balaganj"
  },
  {
    "id": "UPZ_SYLHET_BEANIBAZAR",
    "districtId": "DIST_SYLHET",
    "nameBn": "বিয়ানীবাজার",
    "nameEn": "Beanibazar"
  },
  {
    "id": "UPZ_SYLHET_BISHWANATH",
    "districtId": "DIST_SYLHET",
    "nameBn": "বিশ্বনাথ",
    "nameEn": "Bishwanath"
  },
  {
    "id": "UPZ_SYLHET_COMPANIGANJ",
    "districtId": "DIST_SYLHET",
    "nameBn": "কোম্পানীগঞ্জ",
    "nameEn": "Companiganj"
  },
  {
    "id": "UPZ_SYLHET_DAKSHIN_SURMA",
    "districtId": "DIST_SYLHET",
    "nameBn": "দক্ষিণ সুরমা",
    "nameEn": "Dakshin Surma"
  },
  {
    "id": "UPZ_SYLHET_FENCHUGANJ",
    "districtId": "DIST_SYLHET",
    "nameBn": "ফেঞ্চুগঞ্জ",
    "nameEn": "Fenchuganj"
  },
  {
    "id": "UPZ_SYLHET_GOLAPGANJ",
    "districtId": "DIST_SYLHET",
    "nameBn": "গোলাপগঞ্জ",
    "nameEn": "Golapganj"
  },
  {
    "id": "UPZ_SYLHET_GOWAINGHAT",
    "districtId": "DIST_SYLHET",
    "nameBn": "গোয়াইনঘাট",
    "nameEn": "Gowainghat"
  },
  {
    "id": "UPZ_SYLHET_JAINTIAPUR",
    "districtId": "DIST_SYLHET",
    "nameBn": "জৈন্তাপুর",
    "nameEn": "Jaintiapur"
  },
  {
    "id": "UPZ_SYLHET_KANAIGHAT",
    "districtId": "DIST_SYLHET",
    "nameBn": "কানাইঘাট",
    "nameEn": "Kanaighat"
  },
  {
    "id": "UPZ_SYLHET_ZAKIGANJ",
    "districtId": "DIST_SYLHET",
    "nameBn": "জকিগঞ্জ",
    "nameEn": "Zakiganj"
  },
  {
    "id": "UPZ_SYLHET_OSMANINAGAR",
    "districtId": "DIST_SYLHET",
    "nameBn": "ওসমানীনগর",
    "nameEn": "Osmaninagar"
  },
  {
    "id": "UPZ_DINAJPUR_DINAJPUR_SADAR",
    "districtId": "DIST_DINAJPUR",
    "nameBn": "দিনাজপুর সদর",
    "nameEn": "Dinajpur Sadar"
  },
  {
    "id": "UPZ_DINAJPUR_BIRAL",
    "districtId": "DIST_DINAJPUR",
    "nameBn": "বিরল",
    "nameEn": "Biral"
  },
  {
    "id": "UPZ_DINAJPUR_BIRGANJ",
    "districtId": "DIST_DINAJPUR",
    "nameBn": "বীরগঞ্জ",
    "nameEn": "Birganj"
  },
  {
    "id": "UPZ_DINAJPUR_BOCHAGANJ",
    "districtId": "DIST_DINAJPUR",
    "nameBn": "বোচাগঞ্জ",
    "nameEn": "Bochaganj"
  },
  {
    "id": "UPZ_DINAJPUR_BIRAMPUR",
    "districtId": "DIST_DINAJPUR",
    "nameBn": "বিরামপুর",
    "nameEn": "Birampur"
  },
  {
    "id": "UPZ_DINAJPUR_PHULBARI",
    "districtId": "DIST_DINAJPUR",
    "nameBn": "ফুলবাড়ী",
    "nameEn": "Phulbari"
  },
  {
    "id": "UPZ_DINAJPUR_GHORAGHAT",
    "districtId": "DIST_DINAJPUR",
    "nameBn": "ঘোড়াঘাট",
    "nameEn": "Ghoraghat"
  },
  {
    "id": "UPZ_DINAJPUR_HAKIMPUR",
    "districtId": "DIST_DINAJPUR",
    "nameBn": "হাকিমপুর",
    "nameEn": "Hakimpur"
  },
  {
    "id": "UPZ_DINAJPUR_KAHAROLE",
    "districtId": "DIST_DINAJPUR",
    "nameBn": "কাহারোল",
    "nameEn": "Kaharole"
  },
  {
    "id": "UPZ_DINAJPUR_KHANSAMA",
    "districtId": "DIST_DINAJPUR",
    "nameBn": "খানসামা",
    "nameEn": "Khansama"
  },
  {
    "id": "UPZ_DINAJPUR_NAWABGANJ",
    "districtId": "DIST_DINAJPUR",
    "nameBn": "নবাবগঞ্জ",
    "nameEn": "Nawabganj"
  },
  {
    "id": "UPZ_DINAJPUR_PARBATIPUR",
    "districtId": "DIST_DINAJPUR",
    "nameBn": "পার্বতীপুর",
    "nameEn": "Parbatipur"
  },
  {
    "id": "UPZ_DINAJPUR_CHIRIRBANDAR",
    "districtId": "DIST_DINAJPUR",
    "nameBn": "চিরিরবন্দর",
    "nameEn": "Chirirbandar"
  },
  {
    "id": "UPZ_GAIBANDHA_GAIBANDHA_SADAR",
    "districtId": "DIST_GAIBANDHA",
    "nameBn": "গাইবান্ধা সদর",
    "nameEn": "Gaibandha Sadar"
  },
  {
    "id": "UPZ_GAIBANDHA_FULCHHARI",
    "districtId": "DIST_GAIBANDHA",
    "nameBn": "ফুলছড়ি",
    "nameEn": "Fulchhari"
  },
  {
    "id": "UPZ_GAIBANDHA_GOBINDAGANJ",
    "districtId": "DIST_GAIBANDHA",
    "nameBn": "গোবিন্দগঞ্জ",
    "nameEn": "Gobindaganj"
  },
  {
    "id": "UPZ_GAIBANDHA_PALASHBARI",
    "districtId": "DIST_GAIBANDHA",
    "nameBn": "পলাশবাড়ী",
    "nameEn": "Palashbari"
  },
  {
    "id": "UPZ_GAIBANDHA_SADULLAPUR",
    "districtId": "DIST_GAIBANDHA",
    "nameBn": "সাদুল্লাপুর",
    "nameEn": "Sadullapur"
  },
  {
    "id": "UPZ_GAIBANDHA_SAGHATA",
    "districtId": "DIST_GAIBANDHA",
    "nameBn": "সাঘাটা",
    "nameEn": "Saghata"
  },
  {
    "id": "UPZ_GAIBANDHA_SUNDARGANJ",
    "districtId": "DIST_GAIBANDHA",
    "nameBn": "সুন্দরগঞ্জ",
    "nameEn": "Sundarganj"
  },
  {
    "id": "UPZ_KURIGRAM_KURIGRAM_SADAR",
    "districtId": "DIST_KURIGRAM",
    "nameBn": "কুড়িগ্রাম সদর",
    "nameEn": "Kurigram Sadar"
  },
  {
    "id": "UPZ_KURIGRAM_NAGESHWARI",
    "districtId": "DIST_KURIGRAM",
    "nameBn": "নাগেশ্বরী",
    "nameEn": "Nageshwari"
  },
  {
    "id": "UPZ_KURIGRAM_BHURUNGAMARI",
    "districtId": "DIST_KURIGRAM",
    "nameBn": "ভুরুঙ্গামারী",
    "nameEn": "Bhurungamari"
  },
  {
    "id": "UPZ_KURIGRAM_PHULBARI",
    "districtId": "DIST_KURIGRAM",
    "nameBn": "ফুলবাড়ী",
    "nameEn": "Phulbari"
  },
  {
    "id": "UPZ_KURIGRAM_RAJARHAT",
    "districtId": "DIST_KURIGRAM",
    "nameBn": "রাজারহাট",
    "nameEn": "Rajarhat"
  },
  {
    "id": "UPZ_KURIGRAM_ULIPUR",
    "districtId": "DIST_KURIGRAM",
    "nameBn": "উলিপুর",
    "nameEn": "Ulipur"
  },
  {
    "id": "UPZ_KURIGRAM_CHILMARI",
    "districtId": "DIST_KURIGRAM",
    "nameBn": "চিলমারী",
    "nameEn": "Chilmari"
  },
  {
    "id": "UPZ_KURIGRAM_RAOMARI",
    "districtId": "DIST_KURIGRAM",
    "nameBn": "রৌমারী",
    "nameEn": "Raomari"
  },
  {
    "id": "UPZ_KURIGRAM_CHAR_RAJIBPUR",
    "districtId": "DIST_KURIGRAM",
    "nameBn": "চর রাজিবপুর",
    "nameEn": "Char Rajibpur"
  },
  {
    "id": "UPZ_LALMONIRHAT_LALMONIRHAT_SADAR",
    "districtId": "DIST_LALMONIRHAT",
    "nameBn": "লালমনিরহাট সদর",
    "nameEn": "Lalmonirhat Sadar"
  },
  {
    "id": "UPZ_LALMONIRHAT_ADITMARI",
    "districtId": "DIST_LALMONIRHAT",
    "nameBn": "আদিতমারী",
    "nameEn": "Aditmari"
  },
  {
    "id": "UPZ_LALMONIRHAT_HATIBANDHA",
    "districtId": "DIST_LALMONIRHAT",
    "nameBn": "হাতীবান্ধা",
    "nameEn": "Hatibandha"
  },
  {
    "id": "UPZ_LALMONIRHAT_KALIGANJ",
    "districtId": "DIST_LALMONIRHAT",
    "nameBn": "কালীগঞ্জ",
    "nameEn": "Kaliganj"
  },
  {
    "id": "UPZ_LALMONIRHAT_PATGRAM",
    "districtId": "DIST_LALMONIRHAT",
    "nameBn": "পাটগ্রাম",
    "nameEn": "Patgram"
  },
  {
    "id": "UPZ_NILPHAMARI_NILPHAMARI_SADAR",
    "districtId": "DIST_NILPHAMARI",
    "nameBn": "নীলফামারী সদর",
    "nameEn": "Nilphamari Sadar"
  },
  {
    "id": "UPZ_NILPHAMARI_DIMLA",
    "districtId": "DIST_NILPHAMARI",
    "nameBn": "ডিমলা",
    "nameEn": "Dimla"
  },
  {
    "id": "UPZ_NILPHAMARI_DOMAR",
    "districtId": "DIST_NILPHAMARI",
    "nameBn": "ডোমার",
    "nameEn": "Domar"
  },
  {
    "id": "UPZ_NILPHAMARI_JALDHAKA",
    "districtId": "DIST_NILPHAMARI",
    "nameBn": "জলঢাকা",
    "nameEn": "Jaldhaka"
  },
  {
    "id": "UPZ_NILPHAMARI_KISHOREGANJ",
    "districtId": "DIST_NILPHAMARI",
    "nameBn": "কিশোরগঞ্জ",
    "nameEn": "Kishoreganj"
  },
  {
    "id": "UPZ_NILPHAMARI_SAIDPUR",
    "districtId": "DIST_NILPHAMARI",
    "nameBn": "সৈয়দপুর",
    "nameEn": "Saidpur"
  },
  {
    "id": "UPZ_PANCHAGARH_PANCHAGARH_SADAR",
    "districtId": "DIST_PANCHAGARH",
    "nameBn": "পঞ্চগড় সদর",
    "nameEn": "Panchagarh Sadar"
  },
  {
    "id": "UPZ_PANCHAGARH_ATWARI",
    "districtId": "DIST_PANCHAGARH",
    "nameBn": "আটোয়ারী",
    "nameEn": "Atwari"
  },
  {
    "id": "UPZ_PANCHAGARH_BODA",
    "districtId": "DIST_PANCHAGARH",
    "nameBn": "বোদা",
    "nameEn": "Boda"
  },
  {
    "id": "UPZ_PANCHAGARH_DEBIGANJ",
    "districtId": "DIST_PANCHAGARH",
    "nameBn": "দেবীগঞ্জ",
    "nameEn": "Debiganj"
  },
  {
    "id": "UPZ_PANCHAGARH_TETULIA",
    "districtId": "DIST_PANCHAGARH",
    "nameBn": "তেঁতুলিয়া",
    "nameEn": "Tetulia"
  },
  {
    "id": "UPZ_RANGPUR_RANGPUR_SADAR",
    "districtId": "DIST_RANGPUR",
    "nameBn": "রংপুর সদর",
    "nameEn": "Rangpur Sadar"
  },
  {
    "id": "UPZ_RANGPUR_BADARGANJ",
    "districtId": "DIST_RANGPUR",
    "nameBn": "বদরগঞ্জ",
    "nameEn": "Badarganj"
  },
  {
    "id": "UPZ_RANGPUR_KAUNIA",
    "districtId": "DIST_RANGPUR",
    "nameBn": "কাউনিয়া",
    "nameEn": "Kaunia"
  },
  {
    "id": "UPZ_RANGPUR_GANGACHHARA",
    "districtId": "DIST_RANGPUR",
    "nameBn": "গঙ্গাচড়া",
    "nameEn": "Gangachhara"
  },
  {
    "id": "UPZ_RANGPUR_MITHAPUKUR",
    "districtId": "DIST_RANGPUR",
    "nameBn": "মিঠাপুকুর",
    "nameEn": "Mithapukur"
  },
  {
    "id": "UPZ_RANGPUR_PIRGACHHA",
    "districtId": "DIST_RANGPUR",
    "nameBn": "পীরগাছা",
    "nameEn": "Pirgachha"
  },
  {
    "id": "UPZ_RANGPUR_PIRGANJ",
    "districtId": "DIST_RANGPUR",
    "nameBn": "পীরগঞ্জ",
    "nameEn": "Pirganj"
  },
  {
    "id": "UPZ_RANGPUR_TARAGANJ",
    "districtId": "DIST_RANGPUR",
    "nameBn": "তারাগঞ্জ",
    "nameEn": "Taraganj"
  },
  {
    "id": "UPZ_THAKURGAON_THAKURGAON_SADAR",
    "districtId": "DIST_THAKURGAON",
    "nameBn": "ঠাকুরগাঁও সদর",
    "nameEn": "Thakurgaon Sadar"
  },
  {
    "id": "UPZ_THAKURGAON_BALIADANGI",
    "districtId": "DIST_THAKURGAON",
    "nameBn": "বালিয়াডাঙ্গী",
    "nameEn": "Baliadangi"
  },
  {
    "id": "UPZ_THAKURGAON_HARIPUR",
    "districtId": "DIST_THAKURGAON",
    "nameBn": "হরিপুর",
    "nameEn": "Haripur"
  },
  {
    "id": "UPZ_THAKURGAON_PIRGANJ",
    "districtId": "DIST_THAKURGAON",
    "nameBn": "পীরগঞ্জ",
    "nameEn": "Pirganj"
  },
  {
    "id": "UPZ_THAKURGAON_RANISANKAIL",
    "districtId": "DIST_THAKURGAON",
    "nameBn": "রানীশংকৈল",
    "nameEn": "Ranisankail"
  },
  {
    "id": "UPZ_JAMALPUR_JAMALPUR_SADAR",
    "districtId": "DIST_JAMALPUR",
    "nameBn": "জামালপুর সদর",
    "nameEn": "Jamalpur Sadar"
  },
  {
    "id": "UPZ_JAMALPUR_BAKSHIGANJ",
    "districtId": "DIST_JAMALPUR",
    "nameBn": "বকশীগঞ্জ",
    "nameEn": "Bakshiganj"
  },
  {
    "id": "UPZ_JAMALPUR_DEWANGANJ",
    "districtId": "DIST_JAMALPUR",
    "nameBn": "দেওয়ানগঞ্জ",
    "nameEn": "Dewanganj"
  },
  {
    "id": "UPZ_JAMALPUR_ISLAMPUR",
    "districtId": "DIST_JAMALPUR",
    "nameBn": "ইসলামপুর",
    "nameEn": "Islampur"
  },
  {
    "id": "UPZ_JAMALPUR_MADARGANJ",
    "districtId": "DIST_JAMALPUR",
    "nameBn": "মাদারগঞ্জ",
    "nameEn": "Madarganj"
  },
  {
    "id": "UPZ_JAMALPUR_MELANDAHA",
    "districtId": "DIST_JAMALPUR",
    "nameBn": "মেলান্দহ",
    "nameEn": "Melandaha"
  },
  {
    "id": "UPZ_JAMALPUR_SARISHABARI",
    "districtId": "DIST_JAMALPUR",
    "nameBn": "সরিষাবাড়ী",
    "nameEn": "Sarishabari"
  },
  {
    "id": "UPZ_MYMENSINGH_MYMENSINGH_SADAR",
    "districtId": "DIST_MYMENSINGH",
    "nameBn": "ময়মনসিংহ সদর",
    "nameEn": "Mymensingh Sadar"
  },
  {
    "id": "UPZ_MYMENSINGH_BHALUKA",
    "districtId": "DIST_MYMENSINGH",
    "nameBn": "ভালুকা",
    "nameEn": "Bhaluka"
  },
  {
    "id": "UPZ_MYMENSINGH_DHOBAURA",
    "districtId": "DIST_MYMENSINGH",
    "nameBn": "ধোবাউড়া",
    "nameEn": "Dhobaura"
  },
  {
    "id": "UPZ_MYMENSINGH_FULBARIA",
    "districtId": "DIST_MYMENSINGH",
    "nameBn": "ফুলবাড়ীয়া",
    "nameEn": "Fulbaria"
  },
  {
    "id": "UPZ_MYMENSINGH_PHULPUR",
    "districtId": "DIST_MYMENSINGH",
    "nameBn": "ফুলপুর",
    "nameEn": "Phulpur"
  },
  {
    "id": "UPZ_MYMENSINGH_GAFARGAON",
    "districtId": "DIST_MYMENSINGH",
    "nameBn": "গফরগাঁও",
    "nameEn": "Gafargaon"
  },
  {
    "id": "UPZ_MYMENSINGH_GOURIPUR",
    "districtId": "DIST_MYMENSINGH",
    "nameBn": "গৌরীপুর",
    "nameEn": "Gouripur"
  },
  {
    "id": "UPZ_MYMENSINGH_HALUAGHAT",
    "districtId": "DIST_MYMENSINGH",
    "nameBn": "হালুয়াঘাট",
    "nameEn": "Haluaghat"
  },
  {
    "id": "UPZ_MYMENSINGH_ISHWARGANJ",
    "districtId": "DIST_MYMENSINGH",
    "nameBn": "ঈশ্বরগঞ্জ",
    "nameEn": "Ishwarganj"
  },
  {
    "id": "UPZ_MYMENSINGH_MUKTAGACHHA",
    "districtId": "DIST_MYMENSINGH",
    "nameBn": "মুক্তাগাছা",
    "nameEn": "Muktagachha"
  },
  {
    "id": "UPZ_MYMENSINGH_NANDAIL",
    "districtId": "DIST_MYMENSINGH",
    "nameBn": "নান্দাইল",
    "nameEn": "Nandail"
  },
  {
    "id": "UPZ_MYMENSINGH_TRISHAL",
    "districtId": "DIST_MYMENSINGH",
    "nameBn": "ত্রিশাল",
    "nameEn": "Trishal"
  },
  {
    "id": "UPZ_MYMENSINGH_TARAKANDA",
    "districtId": "DIST_MYMENSINGH",
    "nameBn": "তারাকান্দা",
    "nameEn": "Tarakanda"
  },
  {
    "id": "UPZ_NETROKONA_NETROKONA_SADAR",
    "districtId": "DIST_NETROKONA",
    "nameBn": "নেত্রকোণা সদর",
    "nameEn": "Netrokona Sadar"
  },
  {
    "id": "UPZ_NETROKONA_ATPARA",
    "districtId": "DIST_NETROKONA",
    "nameBn": "আটপাড়া",
    "nameEn": "Atpara"
  },
  {
    "id": "UPZ_NETROKONA_BARHATTA",
    "districtId": "DIST_NETROKONA",
    "nameBn": "বারহাট্টা",
    "nameEn": "Barhatta"
  },
  {
    "id": "UPZ_NETROKONA_DURGAPUR",
    "districtId": "DIST_NETROKONA",
    "nameBn": "দুর্গাপুর",
    "nameEn": "Durgapur"
  },
  {
    "id": "UPZ_NETROKONA_KHALIAJURI",
    "districtId": "DIST_NETROKONA",
    "nameBn": "খালিয়াজুরী",
    "nameEn": "Khaliajuri"
  },
  {
    "id": "UPZ_NETROKONA_KALMAKANDA",
    "districtId": "DIST_NETROKONA",
    "nameBn": "কলমাকান্দা",
    "nameEn": "Kalmakanda"
  },
  {
    "id": "UPZ_NETROKONA_KENDUA",
    "districtId": "DIST_NETROKONA",
    "nameBn": "কেন্দুয়া",
    "nameEn": "Kendua"
  },
  {
    "id": "UPZ_NETROKONA_MADAN",
    "districtId": "DIST_NETROKONA",
    "nameBn": "মদন",
    "nameEn": "Madan"
  },
  {
    "id": "UPZ_NETROKONA_MOHANGANJ",
    "districtId": "DIST_NETROKONA",
    "nameBn": "মোহনগঞ্জ",
    "nameEn": "Mohanganj"
  },
  {
    "id": "UPZ_NETROKONA_PURBADHALA",
    "districtId": "DIST_NETROKONA",
    "nameBn": "পূর্বধলা",
    "nameEn": "Purbadhala"
  },
  {
    "id": "UPZ_SHERPUR_SHERPUR_SADAR",
    "districtId": "DIST_SHERPUR",
    "nameBn": "শেরপুর সদর",
    "nameEn": "Sherpur Sadar"
  },
  {
    "id": "UPZ_SHERPUR_NAKLA",
    "districtId": "DIST_SHERPUR",
    "nameBn": "নকলা",
    "nameEn": "Nakla"
  },
  {
    "id": "UPZ_SHERPUR_NALITABARI",
    "districtId": "DIST_SHERPUR",
    "nameBn": "নালিতাবাড়ী",
    "nameEn": "Nalitabari"
  },
  {
    "id": "UPZ_SHERPUR_SREEBARDI",
    "districtId": "DIST_SHERPUR",
    "nameBn": "শ্রীবরদী",
    "nameEn": "Sreebardi"
  },
  {
    "id": "UPZ_SHERPUR_JHENAIGATI",
    "districtId": "DIST_SHERPUR",
    "nameBn": "ঝিনাইগাতী",
    "nameEn": "Jhenaigati"
  }
];

// Fast lookup caches
const districtsByDivisionCache = new Map<string, District[]>();
const upazilasByDistrictCache = new Map<string, Upazila[]>();
const divisionByIdCache = new Map<string, Division>();
const districtByIdCache = new Map<string, District>();
const upazilaByIdCache = new Map<string, Upazila>();

for (const div of divisions) {
  divisionByIdCache.set(div.id, div);
}

for (const dist of districts) {
  districtByIdCache.set(dist.id, dist);
  const list = districtsByDivisionCache.get(dist.divisionId) || [];
  list.push(dist);
  districtsByDivisionCache.set(dist.divisionId, list);
}

for (const upz of upazilas) {
  upazilaByIdCache.set(upz.id, upz);
  const list = upazilasByDistrictCache.get(upz.districtId) || [];
  list.push(upz);
  upazilasByDistrictCache.set(upz.districtId, list);
}

/**
 * Get all 8 administrative divisions of Bangladesh
 */
export function getDivisions(): Division[] {
  return divisions;
}

/**
 * Get all districts for a given division ID
 */
export function getDistrictsByDivision(divisionId: string): District[] {
  if (!divisionId) return [];
  return districtsByDivisionCache.get(divisionId) || [];
}

/**
 * Get all upazilas for a given district ID
 */
export function getUpazilasByDistrict(districtId: string): Upazila[] {
  if (!districtId) return [];
  return upazilasByDistrictCache.get(districtId) || [];
}

/**
 * Find division by its stable ID
 */
export function getDivisionById(divisionId: string): Division | undefined {
  return divisionByIdCache.get(divisionId);
}

/**
 * Find district by its stable ID
 */
export function getDistrictById(districtId: string): District | undefined {
  return districtByIdCache.get(districtId);
}

/**
 * Find upazila by its stable ID
 */
export function getUpazilaById(upazilaId: string): Upazila | undefined {
  return upazilaByIdCache.get(upazilaId);
}

/**
 * Find division by Bangla or English name
 */
export function findDivisionByName(name: string): Division | undefined {
  if (!name) return undefined;
  const q = name.trim().toLowerCase();
  return divisions.find(
    (d) =>
      d.nameBn === name.trim() ||
      d.nameEn.toLowerCase() === q ||
      d.nameBn.includes(name.trim()) ||
      d.nameEn.toLowerCase().includes(q)
  );
}

/**
 * Find district by Bangla or English name, optionally scoped to a division ID
 */
export function findDistrictByName(name: string, divisionId?: string): District[] {
  if (!name) return [];
  const q = name.trim().toLowerCase();
  const candidates = divisionId ? getDistrictsByDivision(divisionId) : districts;
  return candidates.filter(
    (d) =>
      d.nameBn === name.trim() ||
      d.nameEn.toLowerCase() === q ||
      d.nameBn.includes(name.trim()) ||
      d.nameEn.toLowerCase().includes(q)
  );
}

/**
 * Find upazila by Bangla or English name, optionally scoped to a district ID
 */
export function findUpazilaByName(name: string, districtId?: string): Upazila[] {
  if (!name) return [];
  const q = name.trim().toLowerCase();
  const candidates = districtId ? getUpazilasByDistrict(districtId) : upazilas;
  return candidates.filter(
    (u) =>
      u.nameBn === name.trim() ||
      u.nameEn.toLowerCase() === q ||
      u.nameBn.includes(name.trim()) ||
      u.nameEn.toLowerCase().includes(q)
  );
}

/**
 * Validates administrative parent-child integrity
 */
export function validateLocationHierarchy(
  divisionId?: string,
  districtId?: string,
  upazilaId?: string
): { isValid: boolean; error?: string } {
  if (divisionId) {
    const div = getDivisionById(divisionId);
    if (!div) {
      return { isValid: false, error: 'নির্বাচিত বিভাগটি সঠিক নয়।' };
    }
  }

  if (districtId) {
    const dist = getDistrictById(districtId);
    if (!dist) {
      return { isValid: false, error: 'নির্বাচিত জেলাটি সঠিক নয়।' };
    }
    if (divisionId && dist.divisionId !== divisionId) {
      return { isValid: false, error: 'নির্বাচিত জেলাটি সংশ্লিষ্ট বিভাগের অধীন নয়।' };
    }
  }

  if (upazilaId) {
    const upz = getUpazilaById(upazilaId);
    if (!upz) {
      return { isValid: false, error: 'নির্বাচিত উপজেলাটি সঠিক নয়।' };
    }
    if (districtId && upz.districtId !== districtId) {
      return { isValid: false, error: 'নির্বাচিত উপজেলাটি সংশ্লিষ্ট জেলার অধীন নয়।' };
    }
  }

  return { isValid: true };
}

/**
 * Search locations across Division, District, and Upazila
 */
export function searchLocations(query: string, limit: number = 10) {
  if (!query || !query.trim()) return [];
  const q = query.trim().toLowerCase();

  const results: Array<{
    type: 'division' | 'district' | 'upazila';
    id: string;
    nameBn: string;
    nameEn: string;
    hierarchyLabelBn: string;
    hierarchyLabelEn: string;
    divisionId: string;
    districtId?: string;
    upazilaId?: string;
  }> = [];

  // Match divisions
  for (const div of divisions) {
    if (div.nameBn.includes(query) || div.nameEn.toLowerCase().includes(q)) {
      results.push({
        type: 'division',
        id: div.id,
        nameBn: div.nameBn,
        nameEn: div.nameEn,
        hierarchyLabelBn: div.nameBn,
        hierarchyLabelEn: div.nameEn,
        divisionId: div.id,
      });
      if (results.length >= limit) return results;
    }
  }

  // Match districts
  for (const dist of districts) {
    if (dist.nameBn.includes(query) || dist.nameEn.toLowerCase().includes(q)) {
      const div = getDivisionById(dist.divisionId);
      results.push({
        type: 'district',
        id: dist.id,
        nameBn: dist.nameBn,
        nameEn: dist.nameEn,
        hierarchyLabelBn: `${dist.nameBn}, ${div?.nameBn || ''}`,
        hierarchyLabelEn: `${dist.nameEn}, ${div?.nameEn || ''}`,
        divisionId: dist.divisionId,
        districtId: dist.id,
      });
      if (results.length >= limit) return results;
    }
  }

  // Match upazilas
  for (const upz of upazilas) {
    if (upz.nameBn.includes(query) || upz.nameEn.toLowerCase().includes(q)) {
      const dist = getDistrictById(upz.districtId);
      const div = dist ? getDivisionById(dist.divisionId) : undefined;
      results.push({
        type: 'upazila',
        id: upz.id,
        nameBn: upz.nameBn,
        nameEn: upz.nameEn,
        hierarchyLabelBn: `${upz.nameBn}, ${dist?.nameBn || ''}, ${div?.nameBn || ''}`,
        hierarchyLabelEn: `${upz.nameEn}, ${dist?.nameEn || ''}, ${div?.nameEn || ''}`,
        divisionId: dist?.divisionId || '',
        districtId: upz.districtId,
        upazilaId: upz.id,
      });
      if (results.length >= limit) return results;
    }
  }

  return results;
}
