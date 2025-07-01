import {
  AiFillGithub,
  AiOutlineFacebook,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function FindMeOn() {
    return (
    <div className="home-about-social">
        <h1>FIND ME ON</h1>
        <p>
          Feel free to <span className="purple">connect </span>with me
        </p>
        <ul className="home-about-social-links">
          <li className="social-icons">
            <a
              href="https://github.com/tobolovskaya"
              target="_blank"
              rel="noreferrer"
              className="icon-colour  home-social-icons"
            >
              <AiFillGithub />
            </a>
          </li>
          <li className="social-icons">
            <a
              href="https://www.facebook.com/tobolovskaya"
              target="_blank"
              rel="noreferrer"
              className="icon-colour  home-social-icons"
            >
              <AiOutlineFacebook />
            </a>
          </li>
          <li className="social-icons">
            <a
              href="https://www.linkedin.com/in/yevheniia-tobolovska/"
              target="_blank"
              rel="noreferrer"
              className="icon-colour  home-social-icons"
            >
              <FaLinkedinIn />
            </a>
          </li>
          <li className="social-icons">
            <a
              href="https://www.instagram.com/tobolovska_yevheniia"
              target="_blank"
              rel="noreferrer"
              className="icon-colour home-social-icons"
            >
              <AiFillInstagram />
            </a>
          </li>
            </ul>
    </div>
    );
}

export default FindMeOn;