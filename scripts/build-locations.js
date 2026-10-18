const fs = require('fs');
const path = require('path');

// Raw dataset mapping matching the specification exactly
const rawData = [
  {
    division: { id: 'DIV_DHAKA', nameBn: 'ঢাকা বিভাগ', nameEn: 'Dhaka Division' },
    districts: [
      {
        id: 'DIST_DHAKA',
        nameBn: 'ঢাকা',
        nameEn: 'Dhaka',
        upazilas: [
          { bn: 'ধামরাই', en: 'Dhamrai' },
          { bn: 'দোহার', en: 'Dohar' },
          { bn: 'কেরানীগঞ্জ', en: 'Keraniganj' },
          { bn: 'নবাবগঞ্জ', en: 'Nawabganj' },
          { bn: 'সাভার', en: 'Savar' }
        ]
      },
      {
        id: 'DIST_FARIDPUR',
        nameBn: 'ফরিদপুর',
        nameEn: 'Faridpur',
        upazilas: [
          { bn: 'আলফাডাঙ্গা', en: 'Alfadanga' },
          { bn: 'বোয়ালমারী', en: 'Boalmari' },
          { bn: 'চরভদ্রাসন', en: 'Charbhadrasan' },
          { bn: 'ফরিদপুর সদর', en: 'Faridpur Sadar' },
          { bn: 'মধুখালী', en: 'Madhukhali' },
          { bn: 'নগরকান্দা', en: 'Nagarkanda' },
          { bn: 'ভাঙ্গা', en: 'Bhanga' },
          { bn: 'সদরপুর', en: 'Sadarpur' },
          { bn: 'সালথা', en: 'Saltha' }
        ]
      },
      {
        id: 'DIST_GAZIPUR',
        nameBn: 'গাজীপুর',
        nameEn: 'Gazipur',
        upazilas: [
          { bn: 'গাজীপুর সদর', en: 'Gazipur Sadar' },
          { bn: 'কালিয়াকৈর', en: 'Kaliakair' },
          { bn: 'কালীগঞ্জ', en: 'Kaliganj' },
          { bn: 'কাপাসিয়া', en: 'Kapasia' },
          { bn: 'শ্রীপুর', en: 'Sreepur' }
        ]
      },
      {
        id: 'DIST_GOPALGANJ',
        nameBn: 'গোপালগঞ্জ',
        nameEn: 'Gopalganj',
        upazilas: [
          { bn: 'গোপালগঞ্জ সদর', en: 'Gopalganj Sadar' },
          { bn: 'কাশিয়ানী', en: 'Kashiani' },
          { bn: 'কোটালীপাড়া', en: 'Kotalipara' },
          { bn: 'মুকসুদপুর', en: 'Muksudpur' },
          { bn: 'টুঙ্গিপাড়া', en: 'Tungipara' }
        ]
      },
      {
        id: 'DIST_KISHOREGANJ',
        nameBn: 'কিশোরগঞ্জ',
        nameEn: 'Kishoreganj',
        upazilas: [
          { bn: 'অষ্টগ্রাম', en: 'Ashtagram' },
          { bn: 'বাজিতপুর', en: 'Bajitpur' },
          { bn: 'ভৈরব', en: 'Bhairab' },
          { bn: 'হোসেনপুর', en: 'Hosseinpur' },
          { bn: 'ইটনা', en: 'Itna' },
          { bn: 'করিমগঞ্জ', en: 'Karimganj' },
          { bn: 'কটিয়াদী', en: 'Katiadi' },
          { bn: 'কিশোরগঞ্জ সদর', en: 'Kishoreganj Sadar' },
          { bn: 'কুলিয়ারচর', en: 'Kuliarchar' },
          { bn: 'মিঠামইন', en: 'Mithamain' },
          { bn: 'নিকলী', en: 'Nikli' },
          { bn: 'পাকুন্দিয়া', en: 'Pakundia' },
          { bn: 'তাড়াইল', en: 'Tarail' }
        ]
      },
      {
        id: 'DIST_MADARIPUR',
        nameBn: 'মাদারীপুর',
        nameEn: 'Madaripur',
        upazilas: [
          { bn: 'মাদারীপুর সদর', en: 'Madaripur Sadar' },
          { bn: 'কালকিনি', en: 'Kalkini' },
          { bn: 'ডাসার', en: 'Dasar' },
          { bn: 'রাজৈর', en: 'Rajoir' },
          { bn: 'শিবচর', en: 'Shibchar' }
        ]
      },
      {
        id: 'DIST_MANIKGANJ',
        nameBn: 'মানিকগঞ্জ',
        nameEn: 'Manikganj',
        upazilas: [
          { bn: 'দৌলতপুর', en: 'Daulatpur' },
          { bn: 'ঘিওর', en: 'Ghior' },
          { bn: 'হরিরামপুর', en: 'Harirampur' },
          { bn: 'মানিকগঞ্জ সদর', en: 'Manikganj Sadar' },
          { bn: 'সাটুরিয়া', en: 'Saturia' },
          { bn: 'শিবালয়', en: 'Shibalaya' },
          { bn: 'সিংগাইর', en: 'Singair' }
        ]
      },
      {
        id: 'DIST_MUNSHIGANJ',
        nameBn: 'মুন্সীগঞ্জ',
        nameEn: 'Munshiganj',
        upazilas: [
          { bn: 'গজারিয়া', en: 'Gazaria' },
          { bn: 'লৌহজং', en: 'Louhajang' },
          { bn: 'মুন্সীগঞ্জ সদর', en: 'Munshiganj Sadar' },
          { bn: 'সিরাজদিখান', en: 'Sirajdikhan' },
          { bn: 'শ্রীনগর', en: 'Sreenagar' },
          { bn: 'টঙ্গিবাড়ী', en: 'Tongibari' }
        ]
      },
      {
        id: 'DIST_NARAYANGANJ',
        nameBn: 'নারায়ণগঞ্জ',
        nameEn: 'Narayanganj',
        upazilas: [
          { bn: 'আড়াইহাজার', en: 'Araihazar' },
          { bn: 'বন্দর', en: 'Bandar' },
          { bn: 'নারায়ণগঞ্জ সদর', en: 'Narayanganj Sadar' },
          { bn: 'রূপগঞ্জ', en: 'Rupganj' },
          { bn: 'সোনারগাঁ', en: 'Sonargaon' }
        ]
      },
      {
        id: 'DIST_NARSINGDI',
        nameBn: 'নরসিংদী',
        nameEn: 'Narsingdi',
        upazilas: [
          { bn: 'বেলাব', en: 'Belabo' },
          { bn: 'মনোহরদী', en: 'Monohardi' },
          { bn: 'নরসিংদী সদর', en: 'Narsingdi Sadar' },
          { bn: 'পলাশ', en: 'Palash' },
          { bn: 'রায়পুরা', en: 'Raipura' },
          { bn: 'শিবপুর', en: 'Shibpur' }
        ]
      },
      {
        id: 'DIST_RAJBARI',
        nameBn: 'রাজবাড়ী',
        nameEn: 'Rajbari',
        upazilas: [
          { bn: 'বালিয়াকান্দি', en: 'Baliakandi' },
          { bn: 'গোয়ালন্দ', en: 'Goalanda' },
          { bn: 'কালুখালী', en: 'Kalukhali' },
          { bn: 'পাংশা', en: 'Pangsha' },
          { bn: 'রাজবাড়ী সদর', en: 'Rajbari Sadar' }
        ]
      },
      {
        id: 'DIST_SHARIATPUR',
        nameBn: 'শরীয়তপুর',
        nameEn: 'Shariatpur',
        upazilas: [
          { bn: 'ভেদরগঞ্জ', en: 'Bhedarganj' },
          { bn: 'ডামুড্যা', en: 'Damudya' },
          { bn: 'গোসাইরহাট', en: 'Gosairhat' },
          { bn: 'নড়িয়া', en: 'Naria' },
          { bn: 'শরীয়তপুর সদর', en: 'Shariatpur Sadar' },
          { bn: 'জাজিরা', en: 'Zajira' }
        ]
      },
      {
        id: 'DIST_TANGAIL',
        nameBn: 'টাঙ্গাইল',
        nameEn: 'Tangail',
        upazilas: [
          { bn: 'বাসাইল', en: 'Basail' },
          { bn: 'ভূঞাপুর', en: 'Bhuapur' },
          { bn: 'দেলদুয়ার', en: 'Delduar' },
          { bn: 'ধনবাড়ী', en: 'Dhanbari' },
          { bn: 'ঘাটাইল', en: 'Ghatail' },
          { bn: 'গোপালপুর', en: 'Gopalpur' },
          { bn: 'কালিহাতী', en: 'Kalihati' },
          { bn: 'মধুপুর', en: 'Madhupur' },
          { bn: 'মির্জাপুর', en: 'Mirzapur' },
          { bn: 'নাগরপুর', en: 'Nagarpur' },
          { bn: 'সখীপুর', en: 'Sakhipur' },
          { bn: 'টাঙ্গাইল সদর', en: 'Tangail Sadar' }
        ]
      }
    ]
  },
  {
    division: { id: 'DIV_CHATTOGRAM', nameBn: 'চট্টগ্রাম বিভাগ', nameEn: 'Chattogram Division' },
    districts: [
      {
        id: 'DIST_BANDARBAN',
        nameBn: 'বান্দরবান',
        nameEn: 'Bandarban',
        upazilas: [
          { bn: 'বান্দরবান সদর', en: 'Bandarban Sadar' },
          { bn: 'আলীকদম', en: 'Alikadam' },
          { bn: 'নাইক্ষ্যংছড়ি', en: 'Naikhongchhari' },
          { bn: 'রোয়াংছড়ি', en: 'Rowangchhari' },
          { bn: 'লামা', en: 'Lama' },
          { bn: 'রুমা', en: 'Ruma' },
          { bn: 'থানচি', en: 'Thanchi' }
        ]
      },
      {
        id: 'DIST_BRAHMANBARIA',
        nameBn: 'ব্রাহ্মণবাড়িয়া',
        nameEn: 'Brahmanbaria',
        upazilas: [
          { bn: 'ব্রাহ্মণবাড়িয়া সদর', en: 'Brahmanbaria Sadar' },
          { bn: 'কসবা', en: 'Kasba' },
          { bn: 'নাসিরনগর', en: 'Nasirnagar' },
          { bn: 'সরাইল', en: 'Sarail' },
          { bn: 'আশুগঞ্জ', en: 'Ashuganj' },
          { bn: 'আখাউড়া', en: 'Akhaura' },
          { bn: 'নবীনগর', en: 'Nabinagar' },
          { bn: 'বাঞ্ছারামপুর', en: 'Bancharampur' },
          { bn: 'বিজয়নগর', en: 'Bijoynagar' }
        ]
      },
      {
        id: 'DIST_CHANDPUR',
        nameBn: 'চাঁদপুর',
        nameEn: 'Chandpur',
        upazilas: [
          { bn: 'চাঁদপুর সদর', en: 'Chandpur Sadar' },
          { bn: 'ফরিদগঞ্জ', en: 'Faridganj' },
          { bn: 'হাইমচর', en: 'Haimchar' },
          { bn: 'হাজীগঞ্জ', en: 'Hajiganj' },
          { bn: 'কচুয়া', en: 'Kachua' },
          { bn: 'মতলব উত্তর', en: 'Matlab Uttar' },
          { bn: 'মতলব দক্ষিণ', en: 'Matlab Dakshin' },
          { bn: 'শাহরাস্তি', en: 'Shahrasti' }
        ]
      },
      {
        id: 'DIST_CHATTOGRAM',
        nameBn: 'চট্টগ্রাম',
        nameEn: 'Chattogram',
        upazilas: [
          { bn: 'আনোয়ারা', en: 'Anwara' },
          { bn: 'বাঁশখালী', en: 'Banshkhali' },
          { bn: 'বোয়ালখালী', en: 'Boalkhali' },
          { bn: 'চন্দনাইশ', en: 'Chandanpukur/Chandanis' },
          { bn: 'ফটিকছড়ি', en: 'Fatikchhari' },
          { bn: 'হাটহাজারী', en: 'Hathazari' },
          { bn: 'লোহাগাড়া', en: 'Lohagara' },
          { bn: 'মীরসরাই', en: 'Mirsarai' },
          { bn: 'পটিয়া', en: 'Patiya' },
          { bn: 'রাঙ্গুনিয়া', en: 'Rangunia' },
          { bn: 'রাউজান', en: 'Raozan' },
          { bn: 'সন্দ্বীপ', en: 'Sandwip' },
          { bn: 'সাতকানিয়া', en: 'Satkania' },
          { bn: 'সীতাকুণ্ড', en: 'Sitakunda' },
          { bn: 'কর্ণফুলী', en: 'Karnafuli' }
        ]
      },
      {
        id: 'DIST_CUMILLA',
        nameBn: 'কুমিল্লা',
        nameEn: 'Cumilla',
        upazilas: [
          { bn: 'দেবিদ্বার', en: 'Debidwar' },
          { bn: 'বরুড়া', en: 'Barura' },
          { bn: 'ব্রাহ্মণপাড়া', en: 'Brahmanpara' },
          { bn: 'চান্দিনা', en: 'Chandina' },
          { bn: 'চৌদ্দগ্রাম', en: 'Chauddagram' },
          { bn: 'দাউদকান্দি', en: 'Daudkandi' },
          { bn: 'হোমনা', en: 'Homna' },
          { bn: 'লাকসাম', en: 'Laksam' },
          { bn: 'মুরাদনগর', en: 'Muradnagar' },
          { bn: 'নাঙ্গলকোট', en: 'Nangalkot' },
          { bn: 'কুমিল্লা আদর্শ সদর', en: 'Cumilla Adarsha Sadar' },
          { bn: 'মেঘনা', en: 'Meghna' },
          { bn: 'মনোহরগঞ্জ', en: 'Monoharganj' },
          { bn: 'কুমিল্লা সদর দক্ষিণ', en: 'Cumilla Sadar Dakshin' },
          { bn: 'তিতাস', en: 'Titas' },
          { bn: 'বুড়িচং', en: 'Burichang' },
          { bn: 'লালমাই', en: 'Lalmai' }
        ]
      },
      {
        id: 'DIST_COXS_BAZAR',
        nameBn: "কক্সবাজার",
        nameEn: "Cox's Bazar",
        upazilas: [
          { bn: 'কক্সবাজার সদর', en: "Cox's Bazar Sadar" },
          { bn: 'চকরিয়া', en: 'Chakaria' },
          { bn: 'কুতুবদিয়া', en: 'Kutubdia' },
          { bn: 'মহেশখালী', en: 'Maheshkhali' },
          { bn: 'পেকুয়া', en: 'Pekua' },
          { bn: 'রামু', en: 'Ramu' },
          { bn: 'টেকনাফ', en: 'Teknaf' },
          { bn: 'উখিয়া', en: 'Ukhia' },
          { bn: 'ঈদগাঁও', en: 'Eidgaon' }
        ]
      },
      {
        id: 'DIST_FENI',
        nameBn: 'ফেনী',
        nameEn: 'Feni',
        upazilas: [
          { bn: 'ছাগলনাইয়া', en: 'Chhagalnaiya' },
          { bn: 'ফেনী সদর', en: 'Feni Sadar' },
          { bn: 'সোনাগাজী', en: 'Sonagazi' },
          { bn: 'ফুলগাজী', en: 'Fulgazi' },
          { bn: 'পরশুরাম', en: 'Parshuram' },
          { bn: 'দাগনভূঞা', en: 'Daganbhuiyan' }
        ]
      },
      {
        id: 'DIST_KHAGRACHHARI',
        nameBn: 'খাগড়াছড়ি',
        nameEn: 'Khagrachhari',
        upazilas: [
          { bn: 'খাগড়াছড়ি সদর', en: 'Khagrachhari Sadar' },
          { bn: 'দীঘিনালা', en: 'Dighinala' },
          { bn: 'পানছড়ি', en: 'Panchhari' },
          { bn: 'লক্ষ্মীছড়ি', en: 'Lakshmichhari' },
          { bn: 'মহালছড়ি', en: 'Mahalchhari' },
          { bn: 'মানিকছড়ি', en: 'Manikchhari' },
          { bn: 'রামগড়', en: 'Ramgarh' },
          { bn: 'মাটিরাঙ্গা', en: 'Matiranga' },
          { bn: 'গুইমারা', en: 'Guimara' }
        ]
      },
      {
        id: 'DIST_LAKSHMIPUR',
        nameBn: 'লক্ষ্মীপুর',
        nameEn: 'Lakshmipur',
        upazilas: [
          { bn: 'লক্ষ্মীপুর সদর', en: 'Lakshmipur Sadar' },
          { bn: 'রায়পুর', en: 'Raipur' },
          { bn: 'রামগঞ্জ', en: 'Ramganj' },
          { bn: 'রামগতি', en: 'Ramgati' },
          { bn: 'কমলনগর', en: 'Kamalnagar' }
        ]
      },
      {
        id: 'DIST_NOAKHALI',
        nameBn: 'নোয়াখালী',
        nameEn: 'Noakhali',
        upazilas: [
          { bn: 'নোয়াখালী সদর', en: 'Noakhali Sadar' },
          { bn: 'বেগমগঞ্জ', en: 'Begumganj' },
          { bn: 'চাটখিল', en: 'Chatkhil' },
          { bn: 'কোম্পানীগঞ্জ', en: 'Companiganj' },
          { bn: 'হাতিয়া', en: 'Hatiya' },
          { bn: 'সেনবাগ', en: 'Senbagh' },
          { bn: 'সোনাইমুড়ী', en: 'Sonaimuri' },
          { bn: 'সুবর্ণচর', en: 'Subarnachar' },
          { bn: 'কবিরহাট', en: 'Kabirhat' }
        ]
      },
      {
        id: 'DIST_RANGAMATI',
        nameBn: 'রাঙামাটি',
        nameEn: 'Rangamati',
        upazilas: [
          { bn: 'রাঙামাটি সদর', en: 'Rangamati Sadar' },
          { bn: 'কাপ্তাই', en: 'Kaptai' },
          { bn: 'কাউখালী', en: 'Kawkhali' },
          { bn: 'বাঘাইছড়ি', en: 'Baghaichhari' },
          { bn: 'বরকল', en: 'Barkal' },
          { bn: 'লংগদু', en: 'Langadu' },
          { bn: 'রাজস্থলী', en: 'Rajasthali' },
          { bn: 'বিলাইছড়ি', en: 'Belaichhari' },
          { bn: 'জুরাছড়ি', en: 'Jurachhari' },
          { bn: 'নানিয়ারচর', en: 'Naniarchar' }
        ]
      }
    ]
  },
  {
    division: { id: 'DIV_RAJSHAHI', nameBn: 'রাজশাহী বিভাগ', nameEn: 'Rajshahi Division' },
    districts: [
      {
        id: 'DIST_BOGURA',
        nameBn: 'বগুড়া',
        nameEn: 'Bogura',
        upazilas: [
          { bn: 'আদমদীঘি', en: 'Adamdighi' },
          { bn: 'বগুড়া সদর', en: 'Bogura Sadar' },
          { bn: 'ধুনট', en: 'Dhunat' },
          { bn: 'দুপচাঁচিয়া', en: 'Dupchanchia' },
          { bn: 'গাবতলী', en: 'Gabtali' },
          { bn: 'কাহালু', en: 'Kahalu' },
          { bn: 'নন্দীগ্রাম', en: 'Nandigram' },
          { bn: 'সারিয়াকান্দি', en: 'Sariakandi' },
          { bn: 'শাজাহানপুর', en: 'Shajahanpur' },
          { bn: 'শেরপুর', en: 'Sherpur' },
          { bn: 'শিবগঞ্জ', en: 'Shibganj' },
          { bn: 'সোনাতলা', en: 'Sonatala' }
        ]
      },
      {
        id: 'DIST_JOYPURHAT',
        nameBn: 'জয়পুরহাট',
        nameEn: 'Joypurhat',
        upazilas: [
          { bn: 'আক্কেলপুর', en: 'Akkelpur' },
          { bn: 'জয়পুরহাট সদর', en: 'Joypurhat Sadar' },
          { bn: 'কালাই', en: 'Kalai' },
          { bn: 'ক্ষেতলাল', en: 'Khetlal' },
          { bn: 'পাঁচবিবি', en: 'Panchbibi' }
        ]
      },
      {
        id: 'DIST_NAOGAON',
        nameBn: 'নওগাঁ',
        nameEn: 'Naogaon',
        upazilas: [
          { bn: 'আত্রাই', en: 'Atrai' },
          { bn: 'বদলগাছী', en: 'Badalgachhi' },
          { bn: 'ধামইরহাট', en: 'Dhamoirhat' },
          { bn: 'মান্দা', en: 'Manda' },
          { bn: 'মহাদেবপুর', en: 'Mohadevpur' },
          { bn: 'নওগাঁ সদর', en: 'Naogaon Sadar' },
          { bn: 'নিয়ামতপুর', en: 'Niamatpur' },
          { bn: 'পত্নীতলা', en: 'Patnitala' },
          { bn: 'পোরশা', en: 'Porsha' },
          { bn: 'রানীনগর', en: 'Raninagar' },
          { bn: 'সাপাহার', en: 'Sapahar' }
        ]
      },
      {
        id: 'DIST_NATORE',
        nameBn: 'নাটোর',
        nameEn: 'Natore',
        upazilas: [
          { bn: 'বাগাতিপাড়া', en: 'Bagatipara' },
          { bn: 'বড়াইগ্রাম', en: 'Baraigram' },
          { bn: 'গুরুদাসপুর', en: 'Gurudaspur' },
          { bn: 'লালপুর', en: 'Lalpur' },
          { bn: 'নাটোর সদর', en: 'Natore Sadar' },
          { bn: 'সিংড়া', en: 'Singra' },
          { bn: 'নলডাঙ্গা', en: 'Naldanga' }
        ]
      },
      {
        id: 'DIST_CHAPAINAWABGANJ',
        nameBn: 'চাঁপাইনবাবগঞ্জ',
        nameEn: 'Chapainawabganj',
        upazilas: [
          { bn: 'ভোলাহাট', en: 'Bholahat' },
          { bn: 'গোমস্তাপুর', en: 'Gomastapur' },
          { bn: 'নাচোল', en: 'Nachole' },
          { bn: 'চাঁপাইনবাবগঞ্জ সদর', en: 'Chapainawabganj Sadar' },
          { bn: 'শিবগঞ্জ', en: 'Shibganj' }
        ]
      },
      {
        id: 'DIST_PABNA',
        nameBn: 'পাবনা',
        nameEn: 'Pabna',
        upazilas: [
          { bn: 'আটঘরিয়া', en: 'Atgharia' },
          { bn: 'বেড়া', en: 'Bera' },
          { bn: 'ভাঙ্গুড়া', en: 'Bhangura' },
          { bn: 'চাটমোহর', en: 'Chatmohar' },
          { bn: 'ফরিদপুর', en: 'Faridpur' },
          { bn: 'ঈশ্বরদী', en: 'Ishwardi' },
          { bn: 'পাবনা সদর', en: 'Pabna Sadar' },
          { bn: 'সাঁথিয়া', en: 'Santhia' },
          { bn: 'সুজানগর', en: 'Sujanagar' }
        ]
      },
      {
        id: 'DIST_RAJSHAHI',
        nameBn: 'রাজশাহী',
        nameEn: 'Rajshahi',
        upazilas: [
          { bn: 'বাঘা', en: 'Bagha' },
          { bn: 'বাগমারা', en: 'Bagmara' },
          { bn: 'চারঘাট', en: 'Charghat' },
          { bn: 'দুর্গাপুর', en: 'Durgapur' },
          { bn: 'গোদাগাড়ী', en: 'Godagari' },
          { bn: 'মোহনপুর', en: 'Mohanpur' },
          { bn: 'পবা', en: 'Paba' },
          { bn: 'পুঠিয়া', en: 'Puthia' },
          { bn: 'তানোর', en: 'Tanor' }
        ]
      },
      {
        id: 'DIST_SIRAJGANJ',
        nameBn: 'সিরাজগঞ্জ',
        nameEn: 'Sirajganj',
        upazilas: [
          { bn: 'বেলকুচি', en: 'Belkuchi' },
          { bn: 'চৌহালি', en: 'Chauhali' },
          { bn: 'কামারখন্দ', en: 'Kamarkhanda' },
          { bn: 'কাজীপুর', en: 'Kazipur' },
          { bn: 'রায়গঞ্জ', en: 'Raiganj' },
          { bn: 'শাহজাদপুর', en: 'Shahjadpur' },
          { bn: 'সিরাজগঞ্জ সদর', en: 'Sirajganj Sadar' },
          { bn: 'তাড়াশ', en: 'Tarash' },
          { bn: 'উল্লাপাড়া', en: 'Ullapara' }
        ]
      }
    ]
  },
  {
    division: { id: 'DIV_KHULNA', nameBn: 'খুলনা বিভাগ', nameEn: 'Khulna Division' },
    districts: [
      {
        id: 'DIST_BAGERHAT',
        nameBn: 'বাগেরহাট',
        nameEn: 'Bagerhat',
        upazilas: [
          { bn: 'বাগেরহাট সদর', en: 'Bagerhat Sadar' },
          { bn: 'চিতলমারী', en: 'Chitalmari' },
          { bn: 'ফকিরহাট', en: 'Fakirhat' },
          { bn: 'কচুয়া', en: 'Kachua' },
          { bn: 'মোল্লাহাট', en: 'Mollahat' },
          { bn: 'মোংলা', en: 'Mongla' },
          { bn: 'মোরেলগঞ্জ', en: 'Morrelganj' },
          { bn: 'রামপাল', en: 'Rampal' },
          { bn: 'শরণখোলা', en: 'Sarankhola' }
        ]
      },
      {
        id: 'DIST_CHUADANGA',
        nameBn: 'চুয়াডাঙ্গা',
        nameEn: 'Chuadanga',
        upazilas: [
          { bn: 'চুয়াডাঙ্গা সদর', en: 'Chuadanga Sadar' },
          { bn: 'আলমডাঙ্গা', en: 'Alamdanga' },
          { bn: 'দামুড়হুদা', en: 'Damurhuda' },
          { bn: 'জীবননগর', en: 'Jibannagar' }
        ]
      },
      {
        id: 'DIST_JASHORE',
        nameBn: 'যশোর',
        nameEn: 'Jashore',
        upazilas: [
          { bn: 'অভয়নগর', en: 'Abhaynagar' },
          { bn: 'বাঘারপাড়া', en: 'Bagherpara' },
          { bn: 'চৌগাছা', en: 'Chaugachha' },
          { bn: 'ঝিকরগাছা', en: 'Jhikargachha' },
          { bn: 'কেশবপুর', en: 'Keshabpur' },
          { bn: 'যশোর সদর', en: 'Jashore Sadar' },
          { bn: 'মণিরামপুর', en: 'Manirampur' },
          { bn: 'শার্শা', en: 'Sharsha' }
        ]
      },
      {
        id: 'DIST_JHENAIDAH',
        nameBn: 'ঝিনাইদহ',
        nameEn: 'Jhenaidah',
        upazilas: [
          { bn: 'ঝিনাইদহ সদর', en: 'Jhenaidah Sadar' },
          { bn: 'শৈলকুপা', en: 'Shailkupa' },
          { bn: 'হরিণাকুণ্ডু', en: 'Harinakunda' },
          { bn: 'কালীগঞ্জ', en: 'Kaliganj' },
          { bn: 'কোটচাঁদপুর', en: 'Kotchandpur' },
          { bn: 'মহেশপুর', en: 'Maheshpur' }
        ]
      },
      {
        id: 'DIST_KHULNA',
        nameBn: 'খুলনা',
        nameEn: 'Khulna',
        upazilas: [
          { bn: 'বটিয়াঘাটা', en: 'Batiaghata' },
          { bn: 'দাকোপ', en: 'Dacope' },
          { bn: 'দিঘলিয়া', en: 'Dighalia' },
          { bn: 'ডুমুরিয়া', en: 'Dumuria' },
          { bn: 'কয়রা', en: 'Koyra' },
          { bn: 'পাইকগাছা', en: 'Paikgachha' },
          { bn: 'ফুলতলা', en: 'Phultala' },
          { bn: 'রূপসা', en: 'Rupsha' },
          { bn: 'তেরখাদা', en: 'Terokhada' }
        ]
      },
      {
        id: 'DIST_KUSHTIA',
        nameBn: 'কুষ্টিয়া',
        nameEn: 'Kushtia',
        upazilas: [
          { bn: 'কুষ্টিয়া সদর', en: 'Kushtia Sadar' },
          { bn: 'কুমারখালী', en: 'Kumarkhali' },
          { bn: 'খোকসা', en: 'Khoksa' },
          { bn: 'মিরপুর', en: 'Mirpur' },
          { bn: 'দৌলতপুর', en: 'Daulatpur' },
          { bn: 'ভেড়ামারা', en: 'Bheramara' }
        ]
      },
      {
        id: 'DIST_MAGURA',
        nameBn: 'মাগুরা',
        nameEn: 'Magura',
        upazilas: [
          { bn: 'মাগুরা সদর', en: 'Magura Sadar' },
          { bn: 'মহম্মদপুর', en: 'Mohammadpur' },
          { bn: 'শালিখা', en: 'Shalikha' },
          { bn: 'শ্রীপুর', en: 'Sreepur' }
        ]
      },
      {
        id: 'DIST_MEHERPUR',
        nameBn: 'মেহেরপুর',
        nameEn: 'Meherpur',
        upazilas: [
          { bn: 'মেহেরপুর সদর', en: 'Meherpur Sadar' },
          { bn: 'গাংনী', en: 'Gangni' },
          { bn: 'মুজিবনগর', en: 'Mujibnagar' }
        ]
      },
      {
        id: 'DIST_NARAIL',
        nameBn: 'নড়াইল',
        nameEn: 'Narail',
        upazilas: [
          { bn: 'নড়াইল সদর', en: 'Narail Sadar' },
          { bn: 'লোহাগড়া', en: 'Lohagara' },
          { bn: 'কালিয়া', en: 'Kalia' }
        ]
      },
      {
        id: 'DIST_SATKHIRA',
        nameBn: 'সাতক্ষীরা',
        nameEn: 'Satkhira',
        upazilas: [
          { bn: 'আশাশুনি', en: 'Assasuni' },
          { bn: 'দেবহাটা', en: 'Debhata' },
          { bn: 'কলারোয়া', en: 'Kalaroa' },
          { bn: 'কালীগঞ্জ', en: 'Kaliganj' },
          { bn: 'সাতক্ষীরা সদর', en: 'Satkhira Sadar' },
          { bn: 'শ্যামনগর', en: 'Shyamnagar' },
          { bn: 'তালা', en: 'Tala' }
        ]
      }
    ]
  },
  {
    division: { id: 'DIV_BARISHAL', nameBn: 'বরিশাল বিভাগ', nameEn: 'Barishal Division' },
    districts: [
      {
        id: 'DIST_BARGUNA',
        nameBn: 'বরগুনা',
        nameEn: 'Barguna',
        upazilas: [
          { bn: 'বরগুনা সদর', en: 'Barguna Sadar' },
          { bn: 'আমতলী', en: 'Amtali' },
          { bn: 'বামনা', en: 'Bamna' },
          { bn: 'বেতাগী', en: 'Betagi' },
          { bn: 'পাথরঘাটা', en: 'Patharghata' },
          { bn: 'তালতলী', en: 'Taltali' }
        ]
      },
      {
        id: 'DIST_BARISHAL',
        nameBn: 'বরিশাল',
        nameEn: 'Barishal',
        upazilas: [
          { bn: 'আগৈলঝাড়া', en: 'Agailjhara' },
          { bn: 'বাবুগঞ্জ', en: 'Babuganj' },
          { bn: 'বাকেরগঞ্জ', en: 'Bakerganj' },
          { bn: 'বানারীপাড়া', en: 'Banaripara' },
          { bn: 'গৌরনদী', en: 'Gaurnadi' },
          { bn: 'হিজলা', en: 'Hizla' },
          { bn: 'বরিশাল সদর', en: 'Barishal Sadar' },
          { bn: 'মেহেন্দিগঞ্জ', en: 'Mehendiganj' },
          { bn: 'মুলাদী', en: 'Muladi' },
          { bn: 'উজিরপুর', en: 'Wazirpur' }
        ]
      },
      {
        id: 'DIST_BHOLA',
        nameBn: 'ভোলা',
        nameEn: 'Bhola',
        upazilas: [
          { bn: 'ভোলা সদর', en: 'Bhola Sadar' },
          { bn: 'বোরহানউদ্দিন', en: 'Borhanuddin' },
          { bn: 'চরফ্যাশন', en: 'Charfasson' },
          { bn: 'দৌলতখান', en: 'Daulatkhan' },
          { bn: 'লালমোহন', en: 'Lalmohan' },
          { bn: 'মনপুরা', en: 'Manpura' },
          { bn: 'তজুমদ্দিন', en: 'Tazumuddin' }
        ]
      },
      {
        id: 'DIST_JHALOKATHI',
        nameBn: 'ঝালকাঠি',
        nameEn: 'Jhalokathi',
        upazilas: [
          { bn: 'ঝালকাঠি সদর', en: 'Jhalokathi Sadar' },
          { bn: 'কাঠালিয়া', en: 'Kathalia' },
          { bn: 'নলছিটি', en: 'Nalchity' },
          { bn: 'রাজাপুর', en: 'Rajapur' }
        ]
      },
      {
        id: 'DIST_PATUAKHALI',
        nameBn: 'পটুয়াখালী',
        nameEn: 'Patuakhali',
        upazilas: [
          { bn: 'পটুয়াখালী সদর', en: 'Patuakhali Sadar' },
          { bn: 'বাউফল', en: 'Bauphal' },
          { bn: 'দশমিনা', en: 'Dashmina' },
          { bn: 'দুমকি', en: 'Dumki' },
          { bn: 'গলাচিপা', en: 'Galachipa' },
          { bn: 'কলাপাড়া', en: 'Kalapara' },
          { bn: 'মির্জাগঞ্জ', en: 'Mirzaganj' },
          { bn: 'রাঙ্গাবালী', en: 'Rangabali' }
        ]
      },
      {
        id: 'DIST_PIROJPUR',
        nameBn: 'পিরোজপুর',
        nameEn: 'Pirojpur',
        upazilas: [
          { bn: 'পিরোজপুর সদর', en: 'Pirojpur Sadar' },
          { bn: 'ভান্ডারিয়া', en: 'Bhandaria' },
          { bn: 'কাউখালী', en: 'Kawkhali' },
          { bn: 'মঠবাড়িয়া', en: 'Mathbaria' },
          { bn: 'নাজিরপুর', en: 'Nazirpur' },
          { bn: 'নেছারাবাদ', en: 'Nesarabad (Swarupkati)' },
          { bn: 'ইন্দুরকানী', en: 'Indurkani' }
        ]
      }
    ]
  },
  {
    division: { id: 'DIV_SYLHET', nameBn: 'সিলেট বিভাগ', nameEn: 'Sylhet Division' },
    districts: [
      {
        id: 'DIST_HABIGANJ',
        nameBn: 'হবিগঞ্জ',
        nameEn: 'Habiganj',
        upazilas: [
          { bn: 'আজমিরীগঞ্জ', en: 'Ajmiriganj' },
          { bn: 'বাহুবল', en: 'Bahubal' },
          { bn: 'বানিয়াচং', en: 'Baniachong' },
          { bn: 'চুনারুঘাট', en: 'Chunarughat' },
          { bn: 'হবিগঞ্জ সদর', en: 'Habiganj Sadar' },
          { bn: 'লাখাই', en: 'Lakhai' },
          { bn: 'মাধবপুর', en: 'Madhabpur' },
          { bn: 'নবীগঞ্জ', en: 'Nabiganj' },
          { bn: 'শায়েস্তাগঞ্জ', en: 'Sayestaganj' }
        ]
      },
      {
        id: 'DIST_MOULVIBAZAR',
        nameBn: 'মৌলভীবাজার',
        nameEn: 'Moulvibazar',
        upazilas: [
          { bn: 'বড়লেখা', en: 'Barlekha' },
          { bn: 'কমলগঞ্জ', en: 'Kamalganj' },
          { bn: 'কুলাউড়া', en: 'Kulaura' },
          { bn: 'মৌলভীবাজার সদর', en: 'Moulvibazar Sadar' },
          { bn: 'রাজনগর', en: 'Rajnagar' },
          { bn: 'শ্রীমঙ্গল', en: 'Sreemangal' },
          { bn: 'জুড়ী', en: 'Juri' }
        ]
      },
      {
        id: 'DIST_SUNAMGANJ',
        nameBn: 'সুনামগঞ্জ',
        nameEn: 'Sunamganj',
        upazilas: [
          { bn: 'সুনামগঞ্জ সদর', en: 'Sunamganj Sadar' },
          { bn: 'ছাতক', en: 'Chhatak' },
          { bn: 'দোয়ারাবাজার', en: 'Dowarabazar' },
          { bn: 'দিরাই', en: 'Derai' },
          { bn: 'ধর্মপাশা', en: 'Dharampasha' },
          { bn: 'জামালগঞ্জ', en: 'Jamalganj' },
          { bn: 'জগন্নাথপুর', en: 'Jagannathpur' },
          { bn: 'তাহিরপুর', en: 'Tahirpur' },
          { bn: 'শান্তিগঞ্জ', en: 'Shantiganj' },
          { bn: 'শাল্লা', en: 'Sulla' },
          { bn: 'বিশ্বম্ভরপুর', en: 'Bishwamvarpur' },
          { bn: 'মধ্যনগর', en: 'Madhyanagar' }
        ]
      },
      {
        id: 'DIST_SYLHET',
        nameBn: 'সিলেট',
        nameEn: 'Sylhet',
        upazilas: [
          { bn: 'সিলেট সদর', en: 'Sylhet Sadar' },
          { bn: 'বালাগঞ্জ', en: 'Balaganj' },
          { bn: 'বিয়ানীবাজার', en: 'Beanibazar' },
          { bn: 'বিশ্বনাথ', en: 'Bishwanath' },
          { bn: 'কোম্পানীগঞ্জ', en: 'Companiganj' },
          { bn: 'দক্ষিণ সুরমা', en: 'Dakshin Surma' },
          { bn: 'ফেঞ্চুগঞ্জ', en: 'Fenchuganj' },
          { bn: 'গোলাপগঞ্জ', en: 'Golapganj' },
          { bn: 'গোয়াইনঘাট', en: 'Gowainghat' },
          { bn: 'জৈন্তাপুর', en: 'Jaintiapur' },
          { bn: 'কানাইঘাট', en: 'Kanaighat' },
          { bn: 'জকিগঞ্জ', en: 'Zakiganj' },
          { bn: 'ওসমানীনগর', en: 'Osmaninagar' }
        ]
      }
    ]
  },
  {
    division: { id: 'DIV_RANGPUR', nameBn: 'রংপুর বিভাগ', nameEn: 'Rangpur Division' },
    districts: [
      {
        id: 'DIST_DINAJPUR',
        nameBn: 'দিনাজপুর',
        nameEn: 'Dinajpur',
        upazilas: [
          { bn: 'দিনাজপুর সদর', en: 'Dinajpur Sadar' },
          { bn: 'বিরল', en: 'Biral' },
          { bn: 'বীরগঞ্জ', en: 'Birganj' },
          { bn: 'বোচাগঞ্জ', en: 'Bochaganj' },
          { bn: 'বিরামপুর', en: 'Birampur' },
          { bn: 'ফুলবাড়ী', en: 'Phulbari' },
          { bn: 'ঘোড়াঘাট', en: 'Ghoraghat' },
          { bn: 'হাকিমপুর', en: 'Hakimpur' },
          { bn: 'কাহারোল', en: 'Kaharole' },
          { bn: 'খানসামা', en: 'Khansama' },
          { bn: 'নবাবগঞ্জ', en: 'Nawabganj' },
          { bn: 'পার্বতীপুর', en: 'Parbatipur' },
          { bn: 'চিরিরবন্দর', en: 'Chirirbandar' }
        ]
      },
      {
        id: 'DIST_GAIBANDHA',
        nameBn: 'গাইবান্ধা',
        nameEn: 'Gaibandha',
        upazilas: [
          { bn: 'গাইবান্ধা সদর', en: 'Gaibandha Sadar' },
          { bn: 'ফুলছড়ি', en: 'Fulchhari' },
          { bn: 'গোবিন্দগঞ্জ', en: 'Gobindaganj' },
          { bn: 'পলাশবাড়ী', en: 'Palashbari' },
          { bn: 'সাদুল্লাপুর', en: 'Sadullapur' },
          { bn: 'সাঘাটা', en: 'Saghata' },
          { bn: 'সুন্দরগঞ্জ', en: 'Sundarganj' }
        ]
      },
      {
        id: 'DIST_KURIGRAM',
        nameBn: 'কুড়িগ্রাম',
        nameEn: 'Kurigram',
        upazilas: [
          { bn: 'কুড়িগ্রাম সদর', en: 'Kurigram Sadar' },
          { bn: 'নাগেশ্বরী', en: 'Nageshwari' },
          { bn: 'ভুরুঙ্গামারী', en: 'Bhurungamari' },
          { bn: 'ফুলবাড়ী', en: 'Phulbari' },
          { bn: 'রাজারহাট', en: 'Rajarhat' },
          { bn: 'উলিপুর', en: 'Ulipur' },
          { bn: 'চিলমারী', en: 'Chilmari' },
          { bn: 'রৌমারী', en: 'Raomari' },
          { bn: 'চর রাজিবপুর', en: 'Char Rajibpur' }
        ]
      },
      {
        id: 'DIST_LALMONIRHAT',
        nameBn: 'লালমনিরহাট',
        nameEn: 'Lalmonirhat',
        upazilas: [
          { bn: 'লালমনিরহাট সদর', en: 'Lalmonirhat Sadar' },
          { bn: 'আদিতমারী', en: 'Aditmari' },
          { bn: 'হাতীবান্ধা', en: 'Hatibandha' },
          { bn: 'কালীগঞ্জ', en: 'Kaliganj' },
          { bn: 'পাটগ্রাম', en: 'Patgram' }
        ]
      },
      {
        id: 'DIST_NILPHAMARI',
        nameBn: 'নীলফামারী',
        nameEn: 'Nilphamari',
        upazilas: [
          { bn: 'নীলফামারী সদর', en: 'Nilphamari Sadar' },
          { bn: 'ডিমলা', en: 'Dimla' },
          { bn: 'ডোমার', en: 'Domar' },
          { bn: 'জলঢাকা', en: 'Jaldhaka' },
          { bn: 'কিশোরগঞ্জ', en: 'Kishoreganj' },
          { bn: 'সৈয়দপুর', en: 'Saidpur' }
        ]
      },
      {
        id: 'DIST_PANCHAGARH',
        nameBn: 'পঞ্চগড়',
        nameEn: 'Panchagarh',
        upazilas: [
          { bn: 'পঞ্চগড় সদর', en: 'Panchagarh Sadar' },
          { bn: 'আটোয়ারী', en: 'Atwari' },
          { bn: 'বোদা', en: 'Boda' },
          { bn: 'দেবীগঞ্জ', en: 'Debiganj' },
          { bn: 'তেঁতুলিয়া', en: 'Tetulia' }
        ]
      },
      {
        id: 'DIST_RANGPUR',
        nameBn: 'রংপুর',
        nameEn: 'Rangpur',
        upazilas: [
          { bn: 'রংপুর সদর', en: 'Rangpur Sadar' },
          { bn: 'বদরগঞ্জ', en: 'Badarganj' },
          { bn: 'কাউনিয়া', en: 'Kaunia' },
          { bn: 'গঙ্গাচড়া', en: 'Gangachhara' },
          { bn: 'মিঠাপুকুর', en: 'Mithapukur' },
          { bn: 'পীরগাছা', en: 'Pirgachha' },
          { bn: 'পীরগঞ্জ', en: 'Pirganj' },
          { bn: 'তারাগঞ্জ', en: 'Taraganj' }
        ]
      },
      {
        id: 'DIST_THAKURGAON',
        nameBn: 'ঠাকুরগাঁও',
        nameEn: 'Thakurgaon',
        upazilas: [
          { bn: 'ঠাকুরগাঁও সদর', en: 'Thakurgaon Sadar' },
          { bn: 'বালিয়াডাঙ্গী', en: 'Baliadangi' },
          { bn: 'হরিপুর', en: 'Haripur' },
          { bn: 'পীরগঞ্জ', en: 'Pirganj' },
          { bn: 'রানীশংকৈল', en: 'Ranisankail' }
        ]
      }
    ]
  },
  {
    division: { id: 'DIV_MYMENSINGH', nameBn: 'ময়মনসিংহ বিভাগ', nameEn: 'Mymensingh Division' },
    districts: [
      {
        id: 'DIST_JAMALPUR',
        nameBn: 'জামালপুর',
        nameEn: 'Jamalpur',
        upazilas: [
          { bn: 'জামালপুর সদর', en: 'Jamalpur Sadar' },
          { bn: 'বকশীগঞ্জ', en: 'Bakshiganj' },
          { bn: 'দেওয়ানগঞ্জ', en: 'Dewanganj' },
          { bn: 'ইসলামপুর', en: 'Islampur' },
          { bn: 'মাদারগঞ্জ', en: 'Madarganj' },
          { bn: 'মেলান্দহ', en: 'Melandaha' },
          { bn: 'সরিষাবাড়ী', en: 'Sarishabari' }
        ]
      },
      {
        id: 'DIST_MYMENSINGH',
        nameBn: 'ময়মনসিংহ',
        nameEn: 'Mymensingh',
        upazilas: [
          { bn: 'ময়মনসিংহ সদর', en: 'Mymensingh Sadar' },
          { bn: 'ভালুকা', en: 'Bhaluka' },
          { bn: 'ধোবাউড়া', en: 'Dhobaura' },
          { bn: 'ফুলবাড়ীয়া', en: 'Fulbaria' },
          { bn: 'ফুলপুর', en: 'Phulpur' },
          { bn: 'গফরগাঁও', en: 'Gafargaon' },
          { bn: 'গৌরীপুর', en: 'Gouripur' },
          { bn: 'হালুয়াঘাট', en: 'Haluaghat' },
          { bn: 'ঈশ্বরগঞ্জ', en: 'Ishwarganj' },
          { bn: 'মুক্তাগাছা', en: 'Muktagachha' },
          { bn: 'নান্দাইল', en: 'Nandail' },
          { bn: 'ত্রিশাল', en: 'Trishal' },
          { bn: 'তারাকান্দা', en: 'Tarakanda' }
        ]
      },
      {
        id: 'DIST_NETROKONA',
        nameBn: 'নেত্রকোণা',
        nameEn: 'Netrokona',
        upazilas: [
          { bn: 'নেত্রকোণা সদর', en: 'Netrokona Sadar' },
          { bn: 'আটপাড়া', en: 'Atpara' },
          { bn: 'বারহাট্টা', en: 'Barhatta' },
          { bn: 'দুর্গাপুর', en: 'Durgapur' },
          { bn: 'খালিয়াজুরী', en: 'Khaliajuri' },
          { bn: 'কলমাকান্দা', en: 'Kalmakanda' },
          { bn: 'কেন্দুয়া', en: 'Kendua' },
          { bn: 'মদন', en: 'Madan' },
          { bn: 'মোহনগঞ্জ', en: 'Mohanganj' },
          { bn: 'পূর্বধলা', en: 'Purbadhala' }
        ]
      },
      {
        id: 'DIST_SHERPUR',
        nameBn: 'শেরপুর',
        nameEn: 'Sherpur',
        upazilas: [
          { bn: 'শেরপুর সদর', en: 'Sherpur Sadar' },
          { bn: 'নকলা', en: 'Nakla' },
          { bn: 'নালিতাবাড়ী', en: 'Nalitabari' },
          { bn: 'শ্রীবরদী', en: 'Sreebardi' },
          { bn: 'ঝিনাইগাতী', en: 'Jhenaigati' }
        ]
      }
    ]
  }
];

// Helper to generate slug ID
function makeUpazilaId(distId, upzNameEn) {
  const cleanDist = distId.replace('DIST_', '');
  const cleanUpz = upzNameEn
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
  return `UPZ_${cleanDist}_${cleanUpz}`;
}

const divisions = [];
const districts = [];
const upazilas = [];
const usedUpazilaIds = new Set();

for (const group of rawData) {
  divisions.push(group.division);
  for (const dist of group.districts) {
    districts.push({
      id: dist.id,
      divisionId: group.division.id,
      nameBn: dist.nameBn,
      nameEn: dist.nameEn,
    });
    for (const upz of dist.upazilas) {
      let upzId = makeUpazilaId(dist.id, upz.en);
      if (usedUpazilaIds.has(upzId)) {
        upzId = `${upzId}_${upzilas.length + 1}`;
      }
      usedUpazilaIds.add(upzId);
      upazilas.push({
        id: upzId,
        districtId: dist.id,
        nameBn: upz.bn,
        nameEn: upz.en,
      });
    }
  }
}

const fileHeader = `/**
 * Bangladesh Administrative Locations Master Dataset
 * 
 * Complies with the official administrative division of the People's Republic of Bangladesh.
 * Sources:
 * - https://bangladesh.gov.bd/site/view/district-list/
 * - https://bangladesh.gov.bd/site/view/upazila-list/
 * 
 * Total Divisions: ${divisions.length}
 * Total Districts: ${districts.length}
 * Total Upazilas: ${upazilas.length}
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

export const divisions: Division[] = ${JSON.stringify(divisions, null, 2)};

export const districts: District[] = ${JSON.stringify(districts, null, 2)};

export const upazilas: Upazila[] = ${JSON.stringify(upazilas, null, 2)};

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
        hierarchyLabelBn: \`\${dist.nameBn}, \${div?.nameBn || ''}\`,
        hierarchyLabelEn: \`\${dist.nameEn}, \${div?.nameEn || ''}\`,
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
        hierarchyLabelBn: \`\${upz.nameBn}, \${dist?.nameBn || ''}, \${div?.nameBn || ''}\`,
        hierarchyLabelEn: \`\${upz.nameEn}, \${dist?.nameEn || ''}, \${div?.nameEn || ''}\`,
        divisionId: dist?.divisionId || '',
        districtId: upz.districtId,
        upazilaId: upz.id,
      });
      if (results.length >= limit) return results;
    }
  }

  return results;
}
`;

const outputPath = path.join(__dirname, '..', 'data', 'bangladesh-locations.ts');
fs.writeFileSync(outputPath, fileHeader, 'utf8');
console.log('Successfully generated ' + outputPath);
console.log('Divisions: ' + divisions.length);
console.log('Districts: ' + districts.length);
console.log('Upazilas: ' + upazilas.length);
