'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ApartmentDetails() {
  const params = useParams();
  const id = params.id;

  // For now, using static data
  const apartment = {
    id: id,
    unitName: "Luxury Apartment",
    unitNumber: "A123",
    project: "Downtown Towers",
    description: "A beautiful luxury apartment with modern amenities",
    price: 500000,
    imageUrl: "/images/Header.jpg"
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <Link 
          href="/"
          className="inline-block mb-6 text-blue-600 hover:text-blue-800"
        >
          ← Back to Listings
        </Link>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Image Section */}
          <div className="relative h-[400px]">
            <Image
              src={apartment.imageUrl}
              alt={apartment.unitName}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Details Section */}
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {apartment.unitName}
                </h1>
                <p className="text-xl text-gray-600">
                  Unit #{apartment.unitNumber}
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-blue-600">
                  ${apartment.price.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 py-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Project Details
              </h2>
              <p className="text-gray-700 mb-4">
                Project: {apartment.project}
              </p>
              <p className="text-gray-700">
                {apartment.description}
              </p>
            </div>

            {/* Contact Section */}
            <div className="border-t border-gray-200 py-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Interested in this property?
              </h2>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Contact Agent
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}