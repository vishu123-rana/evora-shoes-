import React from 'react';
import { Instagram, ArrowUpRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { INITIAL_PRODUCTS } from '../data/products';
import { ShoeImage } from './ShoeImage';

export const InstagramGallery: React.FC = () => {
  const { products, viewProductDetails } = useStore();

  const galleryConfigs = [
    {
      id: 'ig-1',
      productId: 'evo-01',
      handle: '@aarav.runs',
      tag: 'Morning 10k in EVORA Urban Runner'
    },
    {
      id: 'ig-2',
      productId: 'evo-02',
      handle: '@dev.skates',
      tag: 'StreetFlex chalk gum on campus'
    },
    {
      id: 'ig-3',
      productId: 'evo-03',
      handle: '@rohan_v',
      tag: 'Classic Court with tailored linen'
    },
    {
      id: 'ig-4',
      productId: 'evo-13',
      handle: '@pooja_momlife',
      tag: 'Little champ in Kids Sprint'
    },
    {
      id: 'ig-5',
      productId: 'evo-06',
      handle: '@sundaram_walks',
      tag: 'Sunrise stroll in Daily Comfort'
    },
    {
      id: 'ig-6',
      productId: 'evo-04',
      handle: '@ananya_travels',
      tag: 'AirWalk all-day airport stride'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#5FAF78] flex items-center gap-1.5">
              <Instagram className="w-3.5 h-3.5 text-[#111111]" />
              <span>Community in Motion</span>
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-black text-[#111111] tracking-tight mt-1">
              #StepIntoEVORA
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Tag @EVORAShoes to be featured in our international seasonal gallery.
            </p>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold uppercase tracking-wider text-[#183C2B] hover:text-[#5FAF78] flex items-center gap-1.5 group self-start sm:self-auto"
          >
            <span>Follow @EVORAShoes</span>
            <ArrowUpRight className="w-4 h-4 text-[#5FAF78]" />
          </a>
        </div>

        {/* 6 Grid items */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {galleryConfigs.map((item) => {
            const shoe = products.find(p => p.id === item.productId) || 
                         INITIAL_PRODUCTS.find(p => p.id === item.productId) || 
                         INITIAL_PRODUCTS[0];

            return (
              <div
                key={item.id}
                onClick={() => viewProductDetails(shoe)}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-[#F4F5F7] cursor-pointer shadow-2xs border border-gray-200 hover:border-gray-400"
              >
                <ShoeImage
                  src={shoe.image}
                  alt={`${shoe.name} - ${item.tag}`}
                  category={shoe.category}
                  colorHex={shoe.colors[0]?.hex}
                  className="w-full h-full"
                />

                {/* Hover overlay with creator handle & shoe tag */}
                <div className="absolute inset-0 bg-[#183C2B]/85 opacity-0 group-hover:opacity-100 flex flex-col justify-end p-3 text-white">
                  <span className="text-[10px] text-[#A8D5BA] font-mono font-medium">{item.handle}</span>
                  <p className="text-xs font-bold line-clamp-1">{shoe.name}</p>
                  <span className="text-[9px] text-[#DFF3E4] font-semibold mt-1">Shop Style →</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
