import React from 'react';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import '../../assets/css/base.pcss';
import '../../assets/css/index.pcss';
import bgSrc from '../../assets/img/home/bg.jpg';

class Index extends React.Component {
  render() {
    return (
      <div className="cont">
        <div className="mask">
          <img src={bgSrc} alt="bg" className="bg" />
          <div className="index">
            <Header />
            <div className="wrap clearfix">
              <h1>SHA REN YOU SHA FU</h1>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
