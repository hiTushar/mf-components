import React, { useEffect, useRef, useState } from 'react';
import './Slider.css';
import { arrow, base, divider, doubleArrow, pointer, slant } from '../../assets/asset';

const Slider = () => {
  const data = ['asdfsfdfsdfsdfs 1', 'TENANT 2', 'TENANT 3', 'TENANT 4', 'TENANT 5', 'TENANT 6', 'TENANT 7', 'TENANT 8', 'TENANT 9', 'TENANT 10'];

  const [currentTab, setCurrentTab] = useState(9);
  const pointerRef = useRef(null);
  const tabsRef = useRef(null);

  useEffect(() => {
    let pointerLeft = pointerRef.current.getBoundingClientRect().left;
    let pointerWidth = pointerRef.current.getBoundingClientRect().width;
    let pointerCenter = pointerLeft + pointerWidth / 2;

    let tabsFirstChildLeft = tabsRef.current.firstChild.getBoundingClientRect().left;
    let tabsFirstChildWidth = tabsRef.current.firstChild.getBoundingClientRect().width - (50);
    let tabsFirstChildCenter = tabsFirstChildLeft + tabsFirstChildWidth / 2;

    let tabsFirstChild = tabsRef.current.firstChild;
    tabsFirstChild.style.marginLeft = `${pointerCenter - tabsFirstChildCenter}px`;

    let tabsRight = tabsRef.current.getBoundingClientRect().right;
    let tabsLastChildWidth = tabsRef.current.lastChild.getBoundingClientRect().width - (50);
    let tabsLastChildCenter = tabsRight + tabsLastChildWidth / 2;

    let tabsLastChild = tabsRef.current.lastChild;
    tabsLastChild.style.marginRight = `${tabsLastChildCenter - pointerCenter}px`;
  }, []);

  const scrollLeft = () => {
    if (currentTab !== 0) {
      setCurrentTab(currentTab - 1);
    }
    else {

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
      // tab.scrollIntoView({ behavior: 'smooth' });
      console.log(tabsRef.current.children);

      let pointerLeft = pointerRef.current.getBoundingClientRect().left;
      let pointerWidth = pointerRef.current.getBoundingClientRect().width;
      let pointerCenter = pointerLeft + pointerWidth / 2;

      let tabsChild = tabsRef.current.children[currentTab];
      let tabsChildLeft = tabsChild.getBoundingClientRect().left;
      let tabsChildWidth = tabsChild.getBoundingClientRect().width - 50;
      let tabsChildCenter = tabsChildLeft + tabsChildWidth / 2;

      tabsRef.current.scrollBy({ top: 0, left: tabsChildCenter - pointerCenter, behavior: 'smooth' });
    }
  }, [currentTab]);

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
