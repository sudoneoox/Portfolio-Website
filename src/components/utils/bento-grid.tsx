import React from 'react';
import "../../index.css"

interface BentoItem {
  id: number;
  image: string;
  title: string;
  description: string;
  link: string;
}

interface BentoGridProps {
  items: BentoItem[];
}

const BentoGrid: React.FC<BentoGridProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-4">
      {items.slice(0, 4).map((item, index) => (
        <div
          key={item.id}
          className={`relative bg-white rounded-lg shadow-md overflow-hidden ${
            index === 0 ? 'col-span-2 row-span-2' : ''
          }`}
        >
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" style={{height:'200px', width:'200px'}}/>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
            <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
            <p className="text-gray-300">{item.description}</p>
          </div>
          <a
            href={item.link}
            className="absolute top-0 left-0 right-0 bottom-0"
            aria-label={`Learn more about ${item.title}`}
          ></a>
        </div>
      ))}
    </div>
  );
};

export default BentoGrid;