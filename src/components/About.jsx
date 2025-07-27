import linkedin_icon from "../images/social-icons/linkedin_icon.png";
import insta_icon from "../images/social-icons/insta_icon.png";

const About = () => {
  return (
    <>
      <div className="description container">
        <div className="box1">
          <h1>About</h1>
          <p>Play the game, Unleash the possibilities!!!</p>
        </div>
        <div className="box2">
          <p>Infinity.Run</p>
        </div>
        <div className="social-icons">
          <span>Follow me on: </span>
          <a href="https://www.linkedin.com/in/yash-kumar-yk/" target="_blank" rel="noopener noreferrer">
            <img src={linkedin_icon} alt="LinkedIn" className="icon" />
          </a>
          <a href="https://www.instagram.com/infinitydotrun" target="_blank" rel="noopener noreferrer">
            <img src={insta_icon} alt="Instagram" className="icon" />
          </a>
        </div>
      </div>
    </>
  )
}

export default About