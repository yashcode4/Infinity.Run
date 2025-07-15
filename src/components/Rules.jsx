import pi_mode from '../images/mode-images/pi_mode.png'
import netflix_mode from "../images/mode-images/netflix_mode.png";
import marvel_mode from "../images/mode-images/marvel_mode.png";
import dc_mode from "../images/mode-images/dc_mode.png";
import anime_mode from "../images/mode-images/anime_mode.png";

const Rules = () => {
  return (
    <>
      <div className="description container">
        <div className="box1">
          <h1>Rules</h1>
          <p>Player will jump when you press the correct input that matches the respective mode's input. There are a total of 10 modes in the game, each with its own corresponding input.</p>
        </div>
        <div className="box2">
          <img src={pi_mode} alt="NA" />
          <img src={netflix_mode} alt="NA" />
          <img src={marvel_mode} alt="NA" />
          <img src={dc_mode} alt="NA" />
          <img src={anime_mode} alt="NA" />
        </div>
      </div>
    </>
  )
}

export default Rules
