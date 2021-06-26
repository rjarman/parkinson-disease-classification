import React from 'react';
import './Sidebar.scss';

export class Sidebar extends React.Component {
  render() {
    return (
      <>
        <div className="btn-menu" id="menuBtn">
          <svg
            width="27"
            height="30"
            viewBox="0 0 27 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0)">
              <path
                d="M0.9375 7.73438H25.3125C25.8303 7.73438 26.25 7.31467 26.25 6.79688V4.45312C26.25 3.93533 25.8303 3.51562 25.3125 3.51562H0.9375C0.419707 3.51562 0 3.93533 0 4.45312V6.79688C0 7.31467 0.419707 7.73438 0.9375 7.73438ZM0.9375 17.1094H25.3125C25.8303 17.1094 26.25 16.6897 26.25 16.1719V13.8281C26.25 13.3103 25.8303 12.8906 25.3125 12.8906H0.9375C0.419707 12.8906 0 13.3103 0 13.8281V16.1719C0 16.6897 0.419707 17.1094 0.9375 17.1094ZM0.9375 26.4844H25.3125C25.8303 26.4844 26.25 26.0647 26.25 25.5469V23.2031C26.25 22.6853 25.8303 22.2656 25.3125 22.2656H0.9375C0.419707 22.2656 0 22.6853 0 23.2031V25.5469C0 26.0647 0.419707 26.4844 0.9375 26.4844Z"
                fill="#626262"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="26.25" height="30" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <aside className="sidebar">
          <div className="sidebar__cover-img"></div>
          <ul className="sidebar__btns">
            <li className="sidebar__btn">
              <a href="#" id="aboutBtn">
                About
              </a>
            </li>
          </ul>
        </aside>
      </>
    );
  }
}
