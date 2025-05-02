'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { apartmentService } from './services/apartmentService';
import { Apartment } from './models/apartment';

export default function Home() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState('');

  useEffect(() => {
    loadApartments();
  }, []);

  const loadApartments = async () => {
    try {
      setLoading(true);
      const response = await apartmentService.getApartments();
      if (response.success && response.data) {
        setApartments(response.data);
        setError(null);
      } else {
        setError(response.message || 'No apartments found');
        setApartments([]);
      }
    } catch (err) {
      setError('Failed to load apartments');
      console.error('Error loading apartments:', err);
      setApartments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      let response;
      if (searchQuery && selectedProject) {
        response = await apartmentService.filterApartments({
          project: selectedProject,
          unitNumber: searchQuery
        });
      } else if (searchQuery) {
        response = await apartmentService.searchApartments(searchQuery);
      } else if (selectedProject) {
        response = await apartmentService.filterApartments({
          project: selectedProject
        });
      } else {
        response = await apartmentService.getApartments();
      }

      if (response.success && response.data) {
        setApartments(response.data);
        setError(null);
      } else {
        setError(response.message || 'No apartments found');
        setApartments([]);
      }
    } catch (err) {
      setError('Failed to search apartments');
      console.error('Error searching apartments:', err);
      setApartments([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-black">
        <Image
          src="/images/Header.jpg"
          alt="Luxury Apartment"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 p-4">
          <h1 className="text-5xl font-bold mb-4 text-center">
            Find Your Perfect Apartment
          </h1>
          <p className="text-xl mb-8 text-center max-w-2xl">
            Browse through our collection of premium apartments in prime locations
          </p>

          {/* Search Bar */}
          <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-2">
            <div className="flex flex-col md:flex-row gap-2">
              <input
                type="text"
                placeholder="Search by unit name or number..."
                className="flex-1 p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <select
                className="p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white"
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
              >
                <option value="">All Projects</option>
                <option value="Downtown Heights">Downtown Heights</option>
                <option value="Marina Residences">Marina Residences</option>
                <option value="City Center Plaza">City Center Plaza</option>
              </select>
              <button
                className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Listings Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Available Apartments</h2>
          <Link
            href="/apartments/add"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Apartment
          </Link>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {apartments.map((apartment) => (
              <article key={apartment.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-64">
                  <Image
                    src={apartment.imageUrl}
                    alt={apartment.unitName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{apartment.unitName}</h3>
                    <p className="text-blue-600 font-bold">{apartment.price}</p>
                  </div>
                  <p className="text-gray-600 mb-2">Unit #{apartment.unitNumber}</p>
                  <p className="text-gray-700 mb-4">Project: {apartment.project}</p>
                  <Link
                    href={`/apartments/${apartment.id}`}
                    className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
