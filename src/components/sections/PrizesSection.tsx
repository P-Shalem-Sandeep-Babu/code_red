import React, { memo } from 'react';
import { SectionTitle } from '../ui/SectionTitle';
import { ArcadeLeaderboard } from '../ui/ArcadeLeaderboard';

export const PrizesSection = memo(({ isUpsideDown }: { isUpsideDown: boolean }) => {
  return (
    <section id="prizes" className={`scroll-mt-20 py-16 md:py-24 border-y transition-colors duration-1000 ${
      isUpsideDown ? 'bg-red-950/5 border-red-900/10' : 'bg-gray-50 border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <SectionTitle isUpsideDown={isUpsideDown} subtitle={isUpsideDown ? "The highest scores win the ultimate reward" : "Compete for the top spot"}>
          REWARDS FOR SURVIVAL
        </SectionTitle>
        <div className="mt-16 max-w-4xl mx-auto">
          <ArcadeLeaderboard />
        </div>
      </div>
    </section>
  );
});
