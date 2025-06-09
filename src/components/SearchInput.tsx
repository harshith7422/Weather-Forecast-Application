import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

interface SearchInputProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mb-8">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <MapPin size={20} className="text-gray-400" />
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter city name..."
          className="w-full pl-12 pr-16 py-4 bg-white/90 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-gray-700 placeholder-gray-500 text-lg transition-all duration-200"
          disabled={isLoading}
        />
        
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="absolute inset-y-0 right-0 pr-4 flex items-center"
        >
          <div className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white p-2 rounded-xl transition-colors duration-200 disabled:cursor-not-allowed">
            <Search size={20} />
          </div>
        </button>
      </div>
    </form>
  );
};

export default SearchInput;