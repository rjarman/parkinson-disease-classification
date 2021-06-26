import React from 'react';
import './About.scss';
import * as github from '../../assets/images/github.svg';
import * as gitkraken from '../../assets/images/gitkraken.svg';
import * as linkedin from '../../assets/images/linkedin.svg';
import * as facebook from '../../assets/images/facebook.svg';
import * as twitter from '../../assets/images/twitter.svg';
import { links } from '../libs/Config';

export class About extends React.Component {
  render() {
    return (
      <div className="about-container">
        <div className="about-logo__container">
          <div className="about-logo"></div>
        </div>
        <p className="about-heading">Parkinson</p>
        <p className="about-caption">(Precautions For Victims)</p>
        <p className="about-version">v{links.version} Beta</p>
        <div className="hr-item"></div>
        <div className="about-description">
          This is an implementation(for android as .apk) of early identification
          of Parkinson's disease from hand-drawn images with inception_v3 and
          densenet121 as feature descriptors and various classification
          algorithms to separate them as healthy or affected.
        </div>
        <div>
          <div className="about-social__heading">Follow me on social media</div>
          <div className="about-social__links">
            <img src={github.default} alt="github_logo" />
            <img src={gitkraken.default} alt="gitkraken_logo" />
            <img src={linkedin.default} alt="linkedin_logo" />
            <img src={facebook.default} alt="facebook_logo" />
            <img src={twitter.default} alt="twitter_logo" />
          </div>
        </div>
      </div>
    );
  }
}
