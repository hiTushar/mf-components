import React, { useEffect, useRef, useState } from 'react';
import './Slider.css';
import { arrow, base, divider, pointer, slant } from '../../assets/asset';

const Slider = () => {
  const data = ['tenant 1', 'TENANT 2', 'TENANT 3', 'TENANT 4', 'TENANT 5', 'TENANT 6', 'TENANT 7', 'TENANT 8', 'TENANT 9', 'TENANT 10'];
  const lastTabIndex = data.length - 1;

  const [currentTab, setCurrentTab] = useState(0);
  const pointerRef = useRef(null);
  const tabsRef = useRef(null);

  useEffect(() => {
    console.log('give margin');
    debugger;
    let tabsLeftOffset = tabsRef.current.getBoundingClientRect().left;

    let { left: pointerLeft, width: pointerWidth } = pointerRef.current.getBoundingClientRect();
    let pointerCenterOffset = pointerLeft + pointerWidth / 2;

    let pointerTabOffset = pointerCenterOffset - tabsLeftOffset;

    console.log({ pointerCenterOffset, tabsLeftOffset });

    let tabsFirstChild = tabsRef.current.children[0];
    tabsFirstChild.style.marginLeft = `${pointerTabOffset}px`;

    let tabsLastChild = tabsRef.current.children[lastTabIndex];
    tabsLastChild.style.marginRight = `${pointerTabOffset}px`;
  }, []);

  useEffect(() => {
    console.log('scrollBy');
    debugger;
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
    if (currentTab !== lastTabIndex) {
      setCurrentTab(currentTab + 1);
    }
  }

  const wheelScroll = e => {
    let scrollVal = parseInt(e.deltaY / 50);

    if (scrollVal > 0) 
      scrollRight();
    else scrollLeft();
  }

  return (
    <div className='ss-slider'>
      <div className='ss-base'>
        <img src={base} alt='base' />
      </div>
      <div className='ss-glow-1'></div>
      <div className='ss-glow-2'></div>
      <div className='ss-glow-3'></div>
      <div className='ss-glow-4'></div>
      <div className='ss-pointer' ref={pointerRef}>
        <img src={pointer} alt='pointer' />
      </div>
      <div className='ss-tabs' ref={tabsRef} onWheel={wheelScroll}>
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
        <img className={'ss-arrow-img'} src={arrow} alt='arrow' />
        <img className={'ss-arrow-img'} src={arrow} alt='arrow' />
      </div>
      <div className={`ss-double-arrow right ${currentTab === data.length - 1 ? 'disabled' : ''}`} onClick={scrollRight}>
        <img className={'ss-arrow-img'} src={arrow} alt='arrow' />
        <img className={'ss-arrow-img'} src={arrow} alt='arrow' />
      </div>
      <div className='ss-slant left'>
        <img className='ss-slant-img' src={slant} alt='slant' />
      </div>
      <div className='ss-slant right'>
        <img className='ss-slant-img' src={slant} alt='slant' />
      </div>
    </div>
  )
}

export default Slider
