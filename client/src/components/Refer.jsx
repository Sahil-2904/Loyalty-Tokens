import React from 'react';
import ref from '../images/refer.jpg';
import Coin from '../images/Coin.svg';
import referal from '../referal';

function Refer() {
  const SendReferral = (e) => {
    e.preventDefault();
    const message = 'Hi there!! Mahim Gupta have invited you to DE - A blockchain based E-Commerce chain.Enjoy exciting offers and win rewards by completing challenges.\n\n*Referral Code: 775e1c62*\n\nHope to see you soon😊';
    let url = 'https://web.whatsapp.com/send?';
    url += `text=${encodeURI(message)}&app_absent=0`;
    window.open(url);
  };
  console.log(referal);
  return (
    <div className="flex gap-5">
      <div className="flex flex-col justify-center w-2/5 p-10 gap-5">
        <div className="flex p-5 justify-center">
          <h2 className="flex text-4xl">Refer a Friend</h2>
        </div>
        <div className="flex flex-col bg-base-100 shadow-xl rounded-3xl">
          <img className="flex" src={ref} alt="" />
          <button className="btn-info" onClick={SendReferral}>
            <p className="flex text-2xl p-3 justify-center gap-3">
              <img className="flex w-8 h-8" src={Coin} alt="" />
              Earn 50 Tokens
            </p>
          </button>
        </div>
      </div>
      {/* <div className='h-[20%] outline outline-1 flex flex-col justify-center mx-auto w-0'></div> */}
      <div className="flex flex-col p-10 gap-10 w-3/5">
        <div className="flex p-5 justify-center">
          <h2 className="flex text-4xl">Challenges</h2>
        </div>
        <div className="carousel carousel-center max-w p-4 space-x-32 bg-transparent rounded-box w-full">
          {
                        referal.map((re, index) => (
                          <div key={index} className="carousel-item w-1/4 flex justify-center ml-12">
                            <div className="card w-96 bg-base-100 shadow-xl">
                              <figure className="flex w-72 h-72 mx-auto">
                                <img src={re.img} className="rounded-box object-fill" />
                              </figure>
                              <div className="card-body">
                                <h2 className="flex text-2xl">{re.title}</h2>
                                <p className="flex text-lg flex-wrap items-center gap-2">
                                  <img className="flex w-5 h-5 flex-col justify-center" src={Coin} alt="" />
                                  <p className="flex">{re.tokenValue}</p>
                                </p>
                                <div className="card-actions justify-end" />
                              </div>
                            </div>
                          </div>
                        ))
                    }
        </div>
      </div>
    </div>
  );
}
export default Refer;
