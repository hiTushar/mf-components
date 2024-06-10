import React, { useEffect, useRef, useState } from 'react';
import './Slider.css';
import { arrow, base, divider, doubleArrow, pointer, slant } from '../../assets/asset';

const Slider = () => {
  const data = ['tenant 1', 'TENANT 2', 'TENANT 3', 'TENANT 4', 'TENANT 5', 'TENANT 6', 'TENANT 7', 'TENANT 8', 'TENANT 9', 'TENANT 10'];
  const lastTabIndex = data.length - 1;

  const [currentTab, setCurrentTab] = useState(0);
  const pointerRef = useRef(null);
  const tabsRef = useRef(null);

  useEffect(() => {
    let tabsLeftOffset = tabsRef.current.getBoundingClientRect().left;

    let { left: pointerLeft, width: pointerWidth } = pointerRef.current.getBoundingClientRect();
    let pointerCenterOffset = pointerLeft + pointerWidth / 2;

    let pointerTabOffset = pointerCenterOffset - tabsLeftOffset;

    let tabsFirstChild = tabsRef.current.children[0];
    tabsFirstChild.style.marginLeft = `${pointerTabOffset}px`;

    let tabsLastChild = tabsRef.current.children[lastTabIndex];
    tabsLastChild.style.marginRight = `${pointerTabOffset}px`;
  }, []);

  useEffect(() => {
    const tab = document.querySelector(`.ss-item:nth-child(${currentTab + 1})`);
    if (tab) {
      let { left: pointerLeft, width: pointerWidth } = pointerRef.current.getBoundingClientRect();
      let pointerCenterOffset = pointerLeft + pointerWidth / 2;

      let tabsChild = tabsRef.current.children[currentTab];
      let { left: tabsChildLeft, width: tabsChildWidth } = tabsChild.getBoundingClientRect();
      let tabsChildCenter = tabsChildLeft + (tabsChildWidth - (currentTab === lastTabIndex ? 0 : 37)) / 2;

      tabsRef.current.scrollBy({ top: 0, left: tabsChildCenter - pointerCenterOffset, behavior: 'smooth' });
    }
  }, [currentTab]);

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

  return (
    <div className='ss-slider'>
      <div className='ss-base'>
        <img src={base} alt='base' />
      </div>
      <div className='ss-pointer' ref={pointerRef}>
        <img src={pointer} alt='pointer' />
      </div>
      <div className='ss-tabs' ref={tabsRef}>
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
