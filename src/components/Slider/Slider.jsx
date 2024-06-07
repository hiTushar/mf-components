import React, { useEffect, useState } from 'react';
import './Slider.css';
import { arrow, base, divider, doubleArrow, pointer, slant } from '../../assets/asset';

const Slider = () => {
  const data = ['TENANT 1', 'TENANT 2', 'TENANT 3', 'TENANT 4', 'TENANT 5', 'TENANT 6', 'TENANT 7', 'TENANT 8', 'TENANT 9', 'TENANT 10'];

  const [currentTab, setCurrentTab] = useState(0);

  const scrollLeft = () => {
    if (currentTab !== 0) {
      setCurrentTab(currentTab - 1);
    }
  }

  const scrollRight = () => {
    if (currentTab !== data.length - 1) {
      setCurrentTab(currentTab + 1);
    }
  }

  useEffect(() => {
    const tab = document.querySelector(`.ss-item:nth-child(${currentTab + 1})`);
    if (tab) {
      tab.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentTab]);

  return (
    <div className='ss-slider'>
      <div className='ss-base'>
        <img src={base} alt='base' />
      </div>
      <div className='ss-pointer'>
        <img src={pointer} alt='pointer' />
      </div>
      <div className='ss-tabs'>
        {data.map((item, index) => (
          <div key={index} className={`ss-item ${currentTab === index ? 'active' : ''}`} onClick={() => setCurrentTab(index)}>
            {item}
            {/* {
              index !== data.length - 1 && (
                <div className='ss-divider'>
                  <img src={divider} alt='divider' />
                </div>
              )
            } */}
          </div>
        ))}
      </div>
      <div className={`ss-double-arrow left ${currentTab === 0 ? 'disabled' : ''}`} onClick={scrollLeft}>
        <div>
          <img src={arrow} alt='arrow' />
        </div>
        <div>
          <img src={arrow} alt='arrow' />
        </div>
      </div>
      <div className={`ss-double-arrow right ${currentTab === data.length - 1 ? 'disabled' : ''}`} onClick={scrollRight}>
        <div>
          <img src={arrow} alt='arrow' />
        </div>
        <div>
          <img src={arrow} alt='arrow' />
        </div>
      </div>
      <div className='ss-slant left'>
        <img src={slant} alt='slant' />
      </div>
      <div className='ss-slant right'>
        <img src={slant} alt='slant' />
      </div>
    </div>
  )
}

export default Slider
