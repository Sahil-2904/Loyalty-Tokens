import React, { useState } from 'react';
import s1 from '../images/C1.png';
import s2 from '../images/C2.png';

function Carousel() {
  const [first, setFirst] = useState(true);

  return (
    <div className="carousel w-full min-h-screen">
      {
            first ? (
              <div id="slide1" className="carousel-item relative w-full">
                <img src={s1} className="w-full" />
                {/* <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide2" className="btn btn-circle">❮</a>
                  <a href="#slide2" className="btn btn-circle">❯</a>
                </div> */}
              </div>
            ) : (
              <div id="slide2" className="carousel-item relative w-full">
                <img src={s2} className="w-full" />
                {/* <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide1" className="btn btn-circle">❮</a>
                  <a href="#slide1" className="btn btn-circle">❯</a>
                </div> */}
              </div>
            )
          }
    </div>
  );
}
export default Carousel;

{ /* <div className="hero" style={{backgroundImage: `url(${slide})`,height:"95vh"}}>
  <div className=""></div>
  <div className="">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
      <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
      <button className="btn btn-primary">Get Started</button>
    </div>
  </div>
</div> */ }
