import Image from 'next/image';
import React from 'react';

// import { PartnerType } from '@components/courses/types'

export type PartnerType = {
  title: string;
  logo: string;
};

type PartnerInfosProps = {
  partnershipInfos: PartnerType[];
};

export const PartnerInfos = ({ partnershipInfos = [] }: PartnerInfosProps) => {
  if (!partnershipInfos?.length) {
    return null;
  }
  
  const partnerTitles = partnershipInfos
    .map((partner) => partner.title)
    .join(', ');

  return (
    <div className='flex items-center gap-1'>
      <ul className='flex -space-x-2 rtl:space-x-reverse'>
        {partnershipInfos.map((partner, index, array) => {
          const { title, logo } = partner;
          // Use z-index to make preceding elements visually partial overlap succeeding elements
          const zIndex = array.length - index;
          return (
            <li
              key={title}
              className='flex h-8 w-8 items-center justify-center rounded-full border border-neutral-100 bg-white'
              style={{ zIndex: zIndex }}
            >
              <Image
                src={logo}
                className='rounded-full'
                alt={title}
                width={24}
                height={24}
              />
            </li>
          );
        })}
      </ul>
      <span className='line-clamp-1 text-sm text-neutral-500'>
        {partnerTitles}
      </span>
    </div>
  );
};
