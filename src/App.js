import React, { useState, useEffect, useCallback, useRef } from 'react';
import './App.css';
import { sliderData } from "./slide-data";

function App() {

  const [currentSlide, setCurrentSlide] = useState(0);

  const slideLength = sliderData.length;
  const auto = false;
  let intervalTime = 5000;

 const nextSlide = useCallback(() => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);

    console.log("next");
  },[currentSlide, slideLength]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
    console.log("prev");
  },[currentSlide, slideLength]);


  function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    useEffect(() => {
      savedCallback.current = callback;
    });
  
    useEffect(() => {
      function tick() {
        savedCallback.current();//callback
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }
  useInterval(()=>{
    if (currentSlide === sliderData.length - 1) {
      setCurrentSlide(0);
    } else {
      nextSlide();
    }
  },  auto ? intervalTime : null)


  return (
    <div className="slider">
      <div className="arrow prev" onClick={prevSlide} >prevSlide</div>
      <div className="arrow next" onClick={nextSlide}>nextSlide</div>
      {sliderData.map((slide, index) => {
        return (
          <div
            className={index === currentSlide ? "slide current" : "slide"}
            key={index}
          >
            <div>
                <div className="content">
                  <h2>{slide.heading}</h2>
                  <p>{slide.desc}</p>
                  <div className={slide.image}></div>
                  <button className="--btn --btn-primary">Get Started</button>
                </div>
              </div>
          </div>
        );
      })}
    </div>
  );


}

export default App;
