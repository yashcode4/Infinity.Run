import pi_img from "../images/mode-images/pi_img.png";
import netflix_img from "../images/mode-images/netflix_img.png";
import marvel_img from "../images/mode-images/marvel_img.png";
import dc_img from "../images/mode-images/dc_img.png";
import anime_img from "../images/mode-images/anime_img.png";

const Rules = () => {
  return (
    <>
      <div className="layout section">
        <h1>Rules</h1>
        <p>The player will jump when you press the correct value that matches the current mode's value. There are 11 modes in total, each with its own set of values. You can switch between modes by clicking the mode icon, which updates the value type accordingly.</p>

        <div className="img-group">
          <img src={pi_img} alt="pi_img" />
          <img src={netflix_img} alt="netflix_img" />
          <img src={marvel_img} alt="marvel_img" />
          <img src={dc_img} alt="dc_img" />
          <img src={anime_img} alt="anime_img" />
        </div>
      </div>

    </>
  )
}

export default Rules
