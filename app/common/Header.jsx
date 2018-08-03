import React, { Component } from 'react';
import '../assets/css/common.pcss';
import config from '../../config';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: config.tabs
    };
  }

  clickTab(index) {
    this.setState({
      currentIndex: index
    });
  }

  render() {
    const { currentIndex } = this.props;
    const { tabs } = this.state;
    function TabItem(props) {
      const { item, index } = { item: props.item, index: props.index };
      if (currentIndex === index) {
        return (
          <li className="active">
            <a href={item.href}>
              {item.title}
            </a>
          </li>
        );
      }
      return (
        <li>
          <a href={item.href}>
            {item.title}
          </a>
        </li>
      );
    }
    return (
      <div className="top">
        <div className="content">
          <i className="logo" />
          <ul className="nav">
            {
              tabs.map((tab, index) => {
                return (
                  <TabItem index={index} item={tab} key={tab.id} />
                );
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}

Header.defaultProps = {
  currentIndex: 0
}

Header.propTypes = {
  currentIndex: PropTypes.number
}

export default Header;
