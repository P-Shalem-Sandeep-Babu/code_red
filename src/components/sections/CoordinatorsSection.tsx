import React, { memo } from 'react';
import { SectionTitle } from '../ui/SectionTitle';
import { CoordinatorCard } from '../ui/CoordinatorCard';

export const CoordinatorsSection = memo(({ isUpsideDown }: { isUpsideDown: boolean }) => {
  return (
    <section id="team" className={`scroll-mt-20 py-16 md:py-24 px-6 md:px-8 max-w-7xl mx-auto transition-colors duration-1000 ${isUpsideDown ? 'bg-void-black' : 'bg-white'}`}>
      <SectionTitle isUpsideDown={isUpsideDown} subtitle="Friends don't lie, and they'll help you through">THE GATEKEEPERS</SectionTitle>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-20">
        <div>
          <h3 className={`text-2xl font-display mb-8 border-b pb-2 tracking-widest uppercase transition-colors duration-1000 ${
            isUpsideDown ? 'text-hawkins-red border-red-900/30' : 'text-electric-blue border-blue-900/10'
          }`}>FACULTY COORDINATORS</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <CoordinatorCard name="Dr. G. Kalyani" phone="90004 14256" role="Overall" isUpsideDown={isUpsideDown} />
            <CoordinatorCard name="Dr. U. Rakesh" phone="95508 08096" role="Overall" isUpsideDown={isUpsideDown} />
            <CoordinatorCard name="Mrs. Spandana" phone="88976 11266" role="Event Lead" isUpsideDown={isUpsideDown} />
            <CoordinatorCard name="Ms. Raveena" phone="92982 50764" role="Event Lead" isUpsideDown={isUpsideDown} />
          </div>
        </div>
        <div>
          <h3 className={`text-2xl font-display mb-8 border-b pb-2 tracking-widest uppercase transition-colors duration-1000 ${
            isUpsideDown ? 'text-hawkins-red border-red-900/30' : 'text-electric-blue border-blue-900/10'
          }`}>STUDENT COORDINATORS</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <CoordinatorCard name="Mr. Sai Lochan" phone="96768 30744" role="Overall" isUpsideDown={isUpsideDown} />
            <CoordinatorCard name="B. Sam Benedict" phone="79939 73214" role="Overall" isUpsideDown={isUpsideDown} />
            <CoordinatorCard name="D Alekhya Ashwini" phone="89190 97668" role="Lead" isUpsideDown={isUpsideDown} />
            <CoordinatorCard name="M. Lakshmi Manogna" phone="74165 20371" role="Lead" isUpsideDown={isUpsideDown} />
          </div>
        </div>
      </div>
    </section>
  );
});
