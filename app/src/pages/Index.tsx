import React from 'react';
import ReactDOM from 'react-dom';
import './styles.scss';

class Index extends React.Component {
  render() {
    return <>Hello from Parkinson App!</>;
  }
}

const container = document.getElementById('root');
ReactDOM.render(<Index />, container);
