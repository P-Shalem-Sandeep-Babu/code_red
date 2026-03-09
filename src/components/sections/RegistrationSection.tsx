import React, { memo } from 'react';
import { RegistrationForm } from '../ui/RegistrationForm';

export const RegistrationSection = memo(({ isUpsideDown }: { isUpsideDown: boolean }) => {
  return (
    <section className={`py-16 md:py-24 px-6 md:px-8 transition-colors duration-1000 ${isUpsideDown ? 'bg-void-black' : 'bg-gray-100'}`}>
      <div className="max-w-7xl mx-auto text-center">
        <h2 className={`text-4xl md:text-6xl font-display mb-12 ${isUpsideDown ? 'text-neon-red' : 'text-gray-900'}`}>
          {isUpsideDown ? 'SECURE CLEARANCE' : 'EVENT REGISTRATION'}
        </h2>
        <RegistrationForm isUpsideDown={isUpsideDown} />
      </div>
    </section>
  );
});
