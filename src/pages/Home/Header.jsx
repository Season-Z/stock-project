import React from 'react';
import TweenOne from 'rc-tween-one';
import { Menu, Button } from 'antd';
import styles from './nav.less';

const { Item, SubMenu } = Menu;

const isImg = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?/;
const getChildrenToRender = (item, i) => {
  let tag = item.name.indexOf('title') === 0 ? 'h1' : 'div';
  tag = item.href ? 'a' : tag;
  let children =
    typeof item.children === 'string' && item.children.match(isImg)
      ? React.createElement('img', { src: item.children, alt: 'img' })
      : item.children;
  if (item.name.indexOf('button') === 0 && typeof item.children === 'object') {
    children = React.createElement(Button, {
      ...item.children,
    });
  }
  return React.createElement(tag, { key: i.toString(), ...item }, children);
};

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneOpen: undefined,
    };
  }

  phoneClick = () => {
    const phoneOpen = !this.state.phoneOpen;
    this.setState({
      phoneOpen,
    });
  };

  render() {
    const { dataSource, isMobile, ...props } = this.props;
    const { phoneOpen } = this.state;
    const navData = dataSource.Menu.children;
    const navChildren = navData.map(item => {
      const { children: a, subItem, ...itemProps } = item;
      if (subItem) {
        return (
          <SubMenu
            key={item.name}
            {...itemProps}
            title={
              <div {...a} className={`${styles['header0-item-block']} ${styles['header0-item']}`}>
                {a.children.map(getChildrenToRender)}
              </div>
            }
            popupClassName={styles['header0-item-child']}
          >
            {subItem.map(($item, ii) => {
              const { children: childItem } = $item;
              const child = childItem.href ? (
                <a {...childItem}>{childItem.children.map(getChildrenToRender)}</a>
              ) : (
                <div {...childItem}>{childItem.children.map(getChildrenToRender)}</div>
              );
              return (
                <Item key={$item.name || ii.toString()} {...$item}>
                  {child}
                </Item>
              );
            })}
          </SubMenu>
        );
      }
      return (
        <Item key={item.name} {...itemProps}>
          <a {...a} className={`${styles['header0-item-block']} ${styles['header0-item']}`}>
            {a.children.map(getChildrenToRender)}
          </a>
        </Item>
      );
    });
    const moment = phoneOpen === undefined ? 300 : null;
    return (
      <TweenOne
        component="header"
        animation={{ opacity: 0, type: 'from' }}
        className={`${styles.header0} ${styles['home-page-wrapper']}`}
        {...props}
      >
        <div className={`${styles['home-page']} ${phoneOpen ? styles['open'] : ''}`}>
          <TweenOne
            animation={{ x: -30, type: 'from', ease: 'easeOutQuad' }}
            className={styles['header0-logo']}
          >
            <img width="100%" src={dataSource.logo.children} alt="img" />
          </TweenOne>
          {isMobile && (
            <div
              {...dataSource.mobileMenu}
              className={styles['header0-mobile-menu']}
              onClick={() => {
                this.phoneClick();
              }}
            >
              <em />
              <em />
              <em />
            </div>
          )}
          <TweenOne
            {...dataSource.Menu}
            className={styles['header0-menu']}
            animation={
              isMobile
                ? {
                    height: 0,
                    duration: 300,
                    onComplete: e => {
                      if (this.state.phoneOpen) {
                        e.target.style.height = 'auto';
                      }
                    },
                    ease: 'easeInOutQuad',
                  }
                : null
            }
            moment={moment}
            reverse={!!phoneOpen}
          >
            <Menu
              mode={isMobile ? 'inline' : 'horizontal'}
              theme="dark"
              style={{ lineHeight: '62px', height: '64px' }}
            >
              {navChildren}
            </Menu>
          </TweenOne>
        </div>
      </TweenOne>
    );
  }
}

export default Header;
