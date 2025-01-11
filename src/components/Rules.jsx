import React from 'react'
import pi from '../images/symbol-images/pi-symbol-icon.png'
import root2 from '../images/symbol-images/root2-symbol-icon.png'
import root3 from '../images/symbol-images/root3-symbol-icon.png'
import esymbol from '../images/symbol-images/e-symbol-icon.png'
import ranNum from '../images/symbol-images/ran-num.png'
import ranLet from '../images/symbol-images/ran-let.png'
import ranLetNum from '../images/symbol-images/ran-let-num.png'
import ranSpecChar from '../images/symbol-images/ran-special-char.png'

const Rules = () => {
  return (
    <>
      <div className="description container">
        <div className="box1">
          <h1>Rules</h1>
          <p>Player will jump when you press the correct key that matches the respective symbol's keys. There are a total of 12 symbols in the game, each with its own corresponding keys.</p>
        </div>
        <div className="box2">
        <img src={pi} alt="NA" />
        <img src={root2} alt="NA" />
        <img src={root3} alt="NA" />
        <img src={esymbol} alt="NA" />
        <img src={ranNum} alt="NA" />
        <img src={ranLet} alt="NA" />
        <img src={ranLetNum} alt="NA" />
        <img src={ranSpecChar} alt="NA" />
        </div>
      </div>
    </>
  )
}

export default Rules
