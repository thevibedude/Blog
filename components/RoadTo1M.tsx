'use client';

import React from 'react';
import { siteConfig } from '@/lib/siteConfig';

const milestones = [
  { count: 100,       label: "first signal"      },
  { count: 1000,      label: "real traction"      },
  { count: 5000,      label: "community forming"  },
  { count: 10000,     label: "10k club"           },
  { count: 25000,     label: "known builder"      },
  { count: 50000,     label: "movement"           },
  { count: 100000,    label: "100k"               },
  { count: 250000,    label: "quarter million"    },
  { count: 500000,    label: "half a million"     },
  { count: 1000000,   label: "the mission"        },
];

type MilestoneState = 'reached' | 'next' | 'locked';

function getMilestoneState(milestoneCount: number, followerCount: number): MilestoneState {
  if (followerCount >= milestoneCount) return 'reached';
  const nextMilestone = milestones.find(m => m.count > followerCount);
  if (nextMilestone?.count === milestoneCount) return 'next';
  return 'locked';
}

export function RoadTo1M() {
  const followerCount = siteConfig.followerCount || 0;
  const targetCount = 1000000;
  const progressPercent = ((followerCount / targetCount) * 100).toFixed(4);

  return (
    <section className="home-section px-6 sm:px-12 max-w-7xl mx-auto">
      <div className="section-divider">
        <span className="divider-label">[thevibedude@localhost ~]</span>
      </div>

      <p className="section-label">// the mission</p>
      <h2 style={{ fontSize: '2rem', marginBottom: '0px' }}>Road to 1M</h2>
      <p className="road-subtext">
        building in public. every follower counts. this is the scoreboard.
      </p>

      {/* CURRENT COUNT DISPLAY */}
      <div className="current-count-block">
        <span className="count-label">current_followers</span>
        <span className="count-value">{followerCount.toLocaleString('en-US')}</span>
        <span className="count-cursor">_</span>
      </div>

      {/* PROGRESS BAR ABOVE THE TIMELINE */}
      <div className="road-progress-container">
        <div className="road-progress-labels">
          <span>0</span>
          <span>1,000,000</span>
        </div>
        <div className="road-progress-track">
          <div
            className="road-progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="road-progress-pct">
          {progressPercent}% of the way
        </p>
      </div>

      {/* MILESTONE TRACK - VERTICAL TIMELINE */}
      <div className="road-timeline relative">
        <div className="road-timeline-line" />
        <div 
          className="road-timeline-line-fill" 
          style={{ height: `${progressPercent}%` }} 
        />
        
        <div className="flex flex-col gap-6 lg:gap-8">
          {milestones.map((milestone) => {
            const state = getMilestoneState(milestone.count, followerCount);
            return (
              <div key={milestone.count} className={`road-milestone-row ${state}`}>
                <div className="road-milestone-dot" />
                <div className="flex flex-1 items-center justify-between ml-6 sm:ml-8 translate-y-[-2px]">
                  <div className="flex items-baseline gap-4">
                    <span className="road-milestone-count">{milestone.count.toLocaleString('en-US')}</span>
                    <span className="road-milestone-label hidden sm:inline-block">{milestone.label}</span>
                  </div>
                  {state === 'reached' && (
                    <span className="ms-badge reached">✓ reached</span>
                  )}
                  {state === 'next' && (
                    <span className="ms-badge next">▸ next target</span>
                  )}
                </div>
                {/* On mobile devices, push the label under the count */}
                <div className="sm:hidden ml-6 w-full -mt-2 mb-2">
                  <span className="road-milestone-label block" style={{ marginTop: '4px' }}>{milestone.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* LAUNCH DAY NOTE */}
      <div className="launch-note">
        <span className="launch-prompt">$ </span>
        echo &quot;day one. the counter starts now.&quot;
      </div>
    </section>
  );
}
