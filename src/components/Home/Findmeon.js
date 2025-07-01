import React from "react";
import {
  AiFillGithub,
  AiOutlineFacebook,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function FindMeOn() {
  return (
    <div className="home-about-social">
      <p>
        Feel free to <span className="purple">connect </span>with me
      </p>

      <div className="home-about-social-links">
        <ul>
          <li className="social-icons">
            <a
              href="https://github.com/tobolovskaya"
              target="_blank"
              rel="noreferrer"
              className="icon-colour home-social-icons"
              aria-label="GitHub"
            >
              <AiFillGithub />
            </a>
          </li>

          <li className="social-icons">
            <a
              href="https://www.facebook.com/tobolovskaya"
              target="_blank"
              rel="noreferrer"
              className="icon-colour home-social-icons"
              aria-label="Facebook"
            >
              <AiOutlineFacebook />
            </a>
          </li>

          <li className="social-icons">
            <a
              href="https://www.linkedin.com/in/yevheniia-tobolovska/"
              target="_blank"
              rel="noreferrer"
              className="icon-colour home-social-icons"
              aria-label="LinkedIn"
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
              aria-label="Instagram"
            >
              <AiFillInstagram />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default FindMeOn;
