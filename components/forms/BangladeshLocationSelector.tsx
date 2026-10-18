'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  ChevronDown,
  Search,
  Check,
  AlertCircle,
  X,
  MapPin,
  Building2,
  Navigation,
} from 'lucide-react';
import {
  Division,
  District,
  Upazila,
  getDivisions,
  getDistrictsByDivision,
  getUpazilasByDistrict,
  getDivisionById,
  getDistrictById,
  getUpazilaById,
  validateLocationHierarchy,
} from '@/data/bangladesh-locations';

export type BangladeshLocationSelectorProps = {
  divisionId?: string;
  districtId?: string;
  upazilaId?: string;
  onDivisionChange?: (id: string) => void;
  onDistrictChange?: (id: string) => void;
  onUpazilaChange?: (id: string) => void;
  onLocationChange?: (location: {
    divisionId: string;
    districtId: string;
    upazilaId: string;
    division?: Division;
    district?: District;
    upazila?: Upazila;
  }) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  layout?: 'grid' | 'stack' | 'inline';
  showLabels?: boolean;
  showHelperText?: boolean;
  divisionLabel?: string;
  districtLabel?: string;
  upazilaLabel?: string;
  idPrefix?: string;
  errorMessages?: {
    division?: string;
    district?: string;
    upazila?: string;
  };
};

interface DropdownItem {
  id: string;
  nameBn: string;
  nameEn: string;
}

interface SearchableSelectProps {
  id: string;
  label: string;
  placeholder: string;
  items: DropdownItem[];
  selectedId: string;
  onSelect: (id: string) => void;
  disabled?: boolean;
  disabledHelperText?: string;
  required?: boolean;
  errorMessage?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

function SearchableSelect({
  id,
  label,
  placeholder,
  items,
  selectedId,
  onSelect,
  disabled = false,
  disabledHelperText,
  required = false,
  errorMessage,
  icon: Icon = MapPin,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedItem = useMemo(() => {
    return items.find((item) => item.id === selectedId);
  }, [items, selectedId]);

  // Filter items by Bangla and English names
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;
    const q = searchQuery.trim().toLowerCase();
    return items.filter(
      (item) =>
        item.nameBn.includes(searchQuery.trim()) ||
        item.nameEn.toLowerCase().includes(q)
    );
  }, [items, searchQuery]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Focus search input on open
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    } else {
      setSearchQuery('');
    }
  }, [isOpen]);

  const handleSelect = (itemId: string) => {
    onSelect(itemId);
    setIsOpen(false);
    setSearchQuery('');
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect('');
  };

  return (
    <div className="relative flex flex-col w-full" ref={dropdownRef}>
      {label && (
        <label htmlFor={id} className="mb-1 block text-[11px] font-bold text-slate-700">
          {label} {required && <span className="text-rose-600">*</span>}
        </label>
      )}

      {/* Main trigger button */}
      <button
        type="button"
        id={id}
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`relative flex h-9 w-full items-center justify-between rounded-lg border px-3 text-left text-xs transition outline-none ${
          disabled
            ? 'cursor-not-allowed border-slate-200 bg-slate-100/70 text-slate-400'
            : isOpen
            ? 'border-[#006A4E] bg-white ring-2 ring-emerald-100 shadow-xs'
            : errorMessage
            ? 'border-rose-300 bg-white hover:border-rose-400'
            : 'border-slate-200 bg-white hover:border-slate-300'
        }`}
      >
        <div className="flex items-center gap-2 truncate pr-2">
          <Icon className={`h-3.5 w-3.5 shrink-0 ${disabled ? 'text-slate-300' : 'text-[#006A4E]'}`} />
          {selectedItem ? (
            <span className="truncate font-semibold text-slate-900">
              {selectedItem.nameBn}{' '}
              <span className="font-normal text-slate-400 text-[10.5px]">({selectedItem.nameEn})</span>
            </span>
          ) : (
            <span className="truncate text-slate-400">{placeholder}</span>
          )}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {selectedItem && !disabled && (
            <span
              onClick={handleClear}
              title="মুছে ফেলুন"
              className="rounded p-0.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
            >
              <X className="h-3 w-3" />
            </span>
          )}
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform duration-200 ${
              disabled ? 'text-slate-300' : 'text-slate-500'
            } ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      {/* Disabled helper note */}
      {disabled && disabledHelperText && (
        <span className="mt-1 text-[10px] text-slate-400 italic">
          {disabledHelperText}
        </span>
      )}

      {/* Error message */}
      {!disabled && errorMessage && (
        <span className="mt-1 flex items-center gap-1 text-[10px] font-medium text-rose-600">
          <AlertCircle className="h-3 w-3" />
          {errorMessage}
        </span>
      )}

      {/* Dropdown Popover */}
      {isOpen && !disabled && (
        <div className="absolute left-0 top-[102%] z-50 w-full min-w-[220px] rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl animate-in fade-in zoom-in-95 duration-100">
          {/* Search Input */}
          <div className="relative mb-1.5">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="বাংলা বা ইংরেজিতে খুঁজুন..."
              className="h-8 w-full rounded-md border border-slate-200 bg-slate-50 pl-8 pr-7 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#006A4E] focus:bg-white"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* Listbox */}
          <div className="max-h-56 overflow-y-auto space-y-0.5 text-xs">
            {filteredItems.length === 0 ? (
              <div className="px-3 py-4 text-center text-slate-400 text-[11px]">
                কোনো ফলাফল পাওয়া যায়নি
              </div>
            ) : (
              filteredItems.map((item) => {
                const isSelected = item.id === selectedId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelect(item.id)}
                    className={`flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-left transition ${
                      isSelected
                        ? 'bg-emerald-50 text-[#006A4E] font-bold'
                        : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900'
                    }`}
                  >
                    <span className="truncate">
                      <span>{item.nameBn}</span>{' '}
                      <span className="text-[10px] text-slate-400 font-normal">
                        ({item.nameEn})
                      </span>
                    </span>
                    {isSelected && <Check className="h-3.5 w-3.5 text-[#006A4E] shrink-0 ml-1.5" />}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function BangladeshLocationSelector({
  divisionId: controlledDivisionId,
  districtId: controlledDistrictId,
  upazilaId: controlledUpazilaId,
  onDivisionChange,
  onDistrictChange,
  onUpazilaChange,
  onLocationChange,
  required = false,
  disabled = false,
  className = '',
  layout = 'grid',
  showLabels = true,
  showHelperText = true,
  divisionLabel = 'বিভাগ',
  districtLabel = 'জেলা',
  upazilaLabel = 'উপজেলা',
  idPrefix = 'bangladesh-loc',
  errorMessages,
}: BangladeshLocationSelectorProps) {
  // Internal state for uncontrolled / semi-controlled usages
  const [internalDivisionId, setInternalDivisionId] = useState(controlledDivisionId || '');
  const [internalDistrictId, setInternalDistrictId] = useState(controlledDistrictId || '');
  const [internalUpazilaId, setInternalUpazilaId] = useState(controlledUpazilaId || '');


  const activeDivisionId = controlledDivisionId !== undefined ? controlledDivisionId : internalDivisionId;
  const activeDistrictId = controlledDistrictId !== undefined ? controlledDistrictId : internalDistrictId;
  const activeUpazilaId = controlledUpazilaId !== undefined ? controlledUpazilaId : internalUpazilaId;

  // Divisions list (all 8)
  const divisions = useMemo(() => getDivisions(), []);

  // Districts filtered by selected division
  const districts = useMemo(() => {
    if (!activeDivisionId) return [];
    return getDistrictsByDivision(activeDivisionId);
  }, [activeDivisionId]);

  // Upazilas filtered by selected district
  const upazilas = useMemo(() => {
    if (!activeDistrictId) return [];
    return getUpazilasByDistrict(activeDistrictId);
  }, [activeDistrictId]);

  // Handlers following strict cascading rules
  const handleDivisionChange = (newDivisionId: string) => {
    setInternalDivisionId(newDivisionId);
    setInternalDistrictId('');
    setInternalUpazilaId('');

    onDivisionChange?.(newDivisionId);
    onDistrictChange?.('');
    onUpazilaChange?.('');

    onLocationChange?.({
      divisionId: newDivisionId,
      districtId: '',
      upazilaId: '',
      division: getDivisionById(newDivisionId),
      district: undefined,
      upazila: undefined,
    });
  };

  const handleDistrictChange = (newDistrictId: string) => {
    setInternalDistrictId(newDistrictId);
    setInternalUpazilaId('');

    onDistrictChange?.(newDistrictId);
    onUpazilaChange?.('');

    onLocationChange?.({
      divisionId: activeDivisionId,
      districtId: newDistrictId,
      upazilaId: '',
      division: getDivisionById(activeDivisionId),
      district: getDistrictById(newDistrictId),
      upazila: undefined,
    });
  };

  const handleUpazilaChange = (newUpazilaId: string) => {
    setInternalUpazilaId(newUpazilaId);

    onUpazilaChange?.(newUpazilaId);

    onLocationChange?.({
      divisionId: activeDivisionId,
      districtId: activeDistrictId,
      upazilaId: newUpazilaId,
      division: getDivisionById(activeDivisionId),
      district: getDistrictById(activeDistrictId),
      upazila: getUpazilaById(newUpazilaId),
    });
  };

  // Layout styling
  const layoutClass =
    layout === 'grid'
      ? 'grid grid-cols-1 sm:grid-cols-3 gap-3'
      : layout === 'inline'
      ? 'flex flex-wrap sm:flex-nowrap gap-3'
      : 'flex flex-col space-y-3';

  return (
    <div className={`w-full ${className}`}>
      <div className={layoutClass}>
        {/* 1. Division Dropdown */}
        <SearchableSelect
          id={`${idPrefix}-division`}
          label={showLabels ? divisionLabel : ''}
          placeholder="বিভাগ নির্বাচন করুন"
          items={divisions}
          selectedId={activeDivisionId}
          onSelect={handleDivisionChange}
          disabled={disabled}
          required={required}
          errorMessage={errorMessages?.division}
          icon={Building2}
        />

        {/* 2. District Dropdown */}
        <SearchableSelect
          id={`${idPrefix}-district`}
          label={showLabels ? districtLabel : ''}
          placeholder="জেলা নির্বাচন করুন"
          items={districts}
          selectedId={activeDistrictId}
          onSelect={handleDistrictChange}
          disabled={disabled || !activeDivisionId}
          disabledHelperText={showHelperText && !activeDivisionId ? 'প্রথমে বিভাগ নির্বাচন করুন' : undefined}
          required={required}
          errorMessage={errorMessages?.district}
          icon={MapPin}
        />

        {/* 3. Upazila Dropdown */}
        <SearchableSelect
          id={`${idPrefix}-upazila`}
          label={showLabels ? upazilaLabel : ''}
          placeholder="উপজেলা নির্বাচন করুন"
          items={upazilas}
          selectedId={activeUpazilaId}
          onSelect={handleUpazilaChange}
          disabled={disabled || !activeDistrictId}
          disabledHelperText={showHelperText && !activeDistrictId ? 'প্রথমে জেলা নির্বাচন করুন' : undefined}
          required={required}
          errorMessage={errorMessages?.upazila}
          icon={Navigation}
        />
      </div>
    </div>
  );
}

export default BangladeshLocationSelector;
