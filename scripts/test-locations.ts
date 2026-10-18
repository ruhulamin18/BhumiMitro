import {
  divisions,
  districts,
  upazilas,
  getDivisions,
  getDistrictsByDivision,
  getUpazilasByDistrict,
  getDivisionById,
  getDistrictById,
  getUpazilaById,
  validateLocationHierarchy,
  searchLocations,
} from '../data/bangladesh-locations.ts';

console.log('--- RUNNING BANGLADESH ADMINISTRATIVE LOCATION TESTS ---\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition: boolean, message: string) {
  totalTests++;
  if (condition) {
    console.log(`✅ [PASS] ${message}`);
    passedTests++;
  } else {
    console.error(`❌ [FAIL] ${message}`);
  }
}

// Test 1: All eight divisions and 64 districts exist in the dataset.
assert(divisions.length === 8, `All 8 divisions exist (found: ${divisions.length})`);
assert(districts.length === 64, `All 64 districts exist (found: ${districts.length})`);
assert(upazilas.length >= 490, `Comprehensive upazilas exist (found: ${upazilas.length})`);

// Test 2: Every district has a valid division ID and every upazila has a valid district ID.
const divisionIdSet = new Set(divisions.map((d) => d.id));
const invalidDistricts = districts.filter((d) => !divisionIdSet.has(d.divisionId));
assert(
  invalidDistricts.length === 0,
  `Every district has a valid divisionId (invalid count: ${invalidDistricts.length})`
);

const districtIdSet = new Set(districts.map((d) => d.id));
const invalidUpazilas = upazilas.filter((u) => !districtIdSet.has(u.districtId));
assert(
  invalidUpazilas.length === 0,
  `Every upazila has a valid districtId (invalid count: ${invalidUpazilas.length})`
);

// Test 3: Selecting ঢাকা বিভাগ shows only Dhaka Division districts.
const dhakaDistricts = getDistrictsByDivision('DIV_DHAKA');
const allAreDhaka = dhakaDistricts.every((d) => d.divisionId === 'DIV_DHAKA');
assert(
  dhakaDistricts.length === 13 && allAreDhaka,
  `Dhaka division returns exactly 13 districts (found: ${dhakaDistricts.length})`
);

// Test 4: Selecting ঢাকা জেলা shows only Dhaka District upazilas.
const dhakaUpazilas = getUpazilasByDistrict('DIST_DHAKA');
const allAreDhakaDist = dhakaUpazilas.every((u) => u.districtId === 'DIST_DHAKA');
const hasSavar = dhakaUpazilas.some((u) => u.nameBn === 'সাভার');
const hasDhamrai = dhakaUpazilas.some((u) => u.nameBn === 'ধামরাই');
assert(
  dhakaUpazilas.length === 5 && allAreDhakaDist && hasSavar && hasDhamrai,
  `Dhaka district returns 5 expected upazilas (including Savar, Dhamrai)`
);

// Test 5: Selecting রাজশাহী বিভাগ shows only Rajshahi Division districts.
const rajshahiDistricts = getDistrictsByDivision('DIV_RAJSHAHI');
const allAreRajshahi = rajshahiDistricts.every((d) => d.divisionId === 'DIV_RAJSHAHI');
assert(
  rajshahiDistricts.length === 8 && allAreRajshahi,
  `Rajshahi division returns 8 districts (found: ${rajshahiDistricts.length})`
);

// Test 6: Selecting পাবনা জেলা shows only Pabna District upazilas.
const pabnaUpazilas = getUpazilasByDistrict('DIST_PABNA');
const hasIshwardi = pabnaUpazilas.some((u) => u.nameBn === 'ঈশ্বরদী');
const hasPabnaSadar = pabnaUpazilas.some((u) => u.nameBn === 'পাবনা সদর');
assert(
  pabnaUpazilas.length === 9 && hasIshwardi && hasPabnaSadar,
  `Pabna district returns 9 upazilas (including Ishwardi & Pabna Sadar)`
);

// Test 7: Search works with Bangla and English names.
const searchSavarBn = searchLocations('সাভার');
assert(
  searchSavarBn.some((r) => r.nameBn === 'সাভার'),
  `Search finds "সাভার" by Bangla name`
);

const searchSavarEn = searchLocations('Savar');
assert(
  searchSavarEn.some((r) => r.nameEn.toLowerCase() === 'savar'),
  `Search finds "Savar" by English name`
);

const searchRajshahi = searchLocations('Rajshahi');
assert(
  searchRajshahi.length > 0,
  `Search finds Rajshahi by English name`
);

// Test 8: Invalid parent-child combinations are rejected.
const validCheck = validateLocationHierarchy('DIV_DHAKA', 'DIST_DHAKA', 'UPZ_DHAKA_SAVAR');
assert(validCheck.isValid === true, `Valid hierarchy (Dhaka -> Dhaka -> Savar) is accepted`);

const invalidDistrictCheck = validateLocationHierarchy('DIV_RAJSHAHI', 'DIST_DHAKA', undefined);
assert(
  invalidDistrictCheck.isValid === false,
  `Invalid hierarchy (Rajshahi Div -> Dhaka Dist) is rejected with error: "${invalidDistrictCheck.error}"`
);

const invalidUpazilaCheck = validateLocationHierarchy('DIV_DHAKA', 'DIST_DHAKA', 'UPZ_PABNA_ISHWARDI');
assert(
  invalidUpazilaCheck.isValid === false,
  `Invalid hierarchy (Dhaka Dist -> Ishwardi Upazila) is rejected with error: "${invalidUpazilaCheck.error}"`
);

console.log(`\n--- TEST RESULTS: ${passedTests} / ${totalTests} TESTS PASSED ---`);
if (passedTests === totalTests) {
  process.exit(0);
} else {
  process.exit(1);
}
