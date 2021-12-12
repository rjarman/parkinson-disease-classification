import React from 'react';
import './Sidebar.scss';
import * as logo from '../../assets/images/logo_final.png';

export class Sidebar extends React.Component {
  reset() {
    (document.getElementById('img-input') as HTMLInputElement).value = '';
    var ele: any = document.getElementsByName('img-type');
    for (var i = 0; i < ele.length; i++) ele[i].checked = false;
    this.setState({
      parsedData: [],
      result: '',
      images: [],
    });
  }

  render() {
    return (
      <>
        <div className="btn-menu" id="menuBtn">
          <div className="header-bg"></div>
          <span>Andro-PD</span>
          <svg
            onClick={this.reset.bind(this)}
            id="refreshBtn"
            width="20"
            height="20"
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="sync-alt"
            className="svg-inline--fa fa-sync-alt fa-w-16"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="white"
              d="M370.72 133.28C339.458 104.008 298.888 87.962 255.848 88c-77.458.068-144.328 53.178-162.791 126.85-1.344 5.363-6.122 9.15-11.651 9.15H24.103c-7.498 0-13.194-6.807-11.807-14.176C33.933 94.924 134.813 8 256 8c66.448 0 126.791 26.136 171.315 68.685L463.03 40.97C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.749zM32 296h134.059c21.382 0 32.09 25.851 16.971 40.971l-41.75 41.75c31.262 29.273 71.835 45.319 114.876 45.28 77.418-.07 144.315-53.144 162.787-126.849 1.344-5.363 6.122-9.15 11.651-9.15h57.304c7.498 0 13.194 6.807 11.807 14.176C478.067 417.076 377.187 504 256 504c-66.448 0-126.791-26.136-171.315-68.685L48.97 471.03C33.851 486.149 8 475.441 8 454.059V320c0-13.255 10.745-24 24-24z"
            ></path>
          </svg>
          {/* <svg
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
          </svg> */}
        </div>
        {/* <aside className="sidebar">
          <div className="sidebar__cover-img"></div>
          <ul className="sidebar__btns">
            <li className="sidebar__btn">
              <a href="#" id="aboutBtn">
                About
              </a>
            </li>
          </ul>
        </aside> */}
      </>
    );
  }
}
