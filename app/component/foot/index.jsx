import React, { Component } from 'react';
import Header from '../../common/Header';
import '../../assets/css/base.pcss';
import '../../assets/css/foot.pcss';
import config from '../../../config';
import img1 from '../../assets/img/foot/artist-1.png';
import img2 from '../../assets/img/foot/artist-2.png';
import img3 from '../../assets/img/foot/artist-3.png';

class Index extends Component {
  render() {
    const currentIndex = 1;

    function GetImg(props){
      const item = props.item;
      if (parseInt(props.index) % 3 == 0) {
        return <img src={img1} alt={item.title} />
      }else if (parseInt(props.index) % 3 == 1) {
        return <img src={img2} alt={item.title} />
      }else {
        return <img src={img3} alt={item.title} />
      }
    }
    return (
      <div className="cont">
        <div className="mask">
          <Header currentIndex={currentIndex} />
          <div className="foot clearfix">
            <div className="wrap">
              <ul>
                {
                  config.footList.map((item, index) => {
                    return (
                      <li className="item" key={item.id}>
                        <GetImg index={index} item={item} />
                        <p className="title">
                          {item.title}
                        </p>
                        <p className="desc">
                          {item.desc}
                        </p>
                      </li>
                    );
                  })
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
