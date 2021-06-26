import React from 'react';
import './MainContainer.scss';

export class MainContainer extends React.Component {
  render() {
    const acceptedType = '.png, .PNG, .jpg, .JPG, .JPEG, .jpeg';
    return (
      <div className="main-container">
        <div className="card-container">
          <div className="card-1">
            <label htmlFor="img-input">Please insert an image</label>
            <input type="file" id="img-input" accept={acceptedType} />
          </div>
          <div className="card-2">
            <label>Status</label>
            <div id="status-field">Sample Status</div>
          </div>
          <div className="card-3">
            <label>Results</label>
            <div id="result-field">Sample Results</div>
          </div>
        </div>
      </div>
    );
  }
}
