import { useState, useRef, useEffect } from "react";

interface AutocompleteInput {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

export const AutocompleteInput = ({
                                    label,
                                    placeholder,
                                    value,
                                    onChange,
                                    options,
                                  }: AutocompleteInput) => {
  const [showOptions, setShowOptions] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange(val);
    if (val.trim() === "") {
      setFilteredOptions([]);
      setShowOptions(false);
    } else {
      const matches = options.filter(opt =>
        opt.toLowerCase().includes(val.toLowerCase())
      );
      setFilteredOptions(matches);
      setShowOptions(true);
    }
  };

  const handleSelect = (option: string) => {
    onChange(option);
    setShowOptions(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onFocus={() => value && setShowOptions(true)}
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {showOptions && filteredOptions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-md mt-1 shadow max-h-48 overflow-y-auto">
          {filteredOptions.map((opt, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(opt)}
              className="px-4 py-2 text-sm hover:bg-blue-100 cursor-pointer"
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};