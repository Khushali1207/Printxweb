import React from 'react';

const MarqueeBanner = () => {
  const items = [
    "Printing, simplified.⚡",
    "Secure. Fast. 24/7."
  ];

  const ItemList = ({ className }) => (
    <div className={`marquee-content ${className}`}>
      {[...Array(8)].map((_, i) => (
        <React.Fragment key={i}>
          {items.map((item, j) => (
            <div className="marquee-item" key={`${i}-${j}`}>
              <span>{item}</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="marquee-star">
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="marquee-container">
      <div className="marquee-ribbon ribbon-2">
        <ItemList className="reverse" />
      </div>
      <div className="marquee-ribbon ribbon-1">
        <ItemList className="" />
      </div>
    </div>
  );
};

export default MarqueeBanner;
