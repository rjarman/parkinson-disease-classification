import React from 'react';
import ReactDOM from 'react-dom';
import { About } from './components/About';
import { Backdrop } from './components/Backdrop';
import { Sidebar } from './components/Sidebar';
import { IndexEvents } from './libs/IndexEvents';
import './styles.scss';

class Index extends React.Component {
  componentDidMount() {
    new IndexEvents();
  }

  render() {
    return (
      <>
        <Backdrop />
        <Sidebar />
        <About />
      </>
    );
  }
}

const container = document.getElementById('root');
ReactDOM.render(<Index />, container);
