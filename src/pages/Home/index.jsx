import React, { Fragment } from 'react';
import QueueAnim from 'rc-queue-anim';
import TweenOne, { TweenOneGroup } from 'rc-tween-one';
import { Icon, Pagination } from 'antd';
import Header from './Header';
import { Nav00DataSource, imagesList } from './dataSource';
import styles from './index.less';

export default class PicDetailsDemo extends React.Component {
  state = {
    picOpen: {},
    wrapperHeight: 0,
  };

  componentDidMount() {
    const col = imagesList.length / 6;
    const wrapperHeight = col * 96 + col * 16;
    this.setState({
      wrapperHeight,
    });
  }

  onImgClick = (e, i) => {
    const { picOpen } = this.state;
    Object.keys(picOpen).forEach(key => {
      if (key !== i && picOpen[key]) {
        picOpen[key] = false;
      }
    });
    picOpen[i] = true;
    this.setState({
      picOpen,
    });
  };

  onClose = (e, i) => {
    const { picOpen } = this.state;
    picOpen[i] = false;
    this.setState({
      picOpen,
    });
  };

  onTweenEnd = i => {
    const { picOpen } = this.state;
    delete picOpen[i];
    this.setState({
      picOpen,
    });
  };

  getDelay = e => {
    const i = e.index + (imagesList.length % 6);
    return (i % 6) * 100 + Math.floor(i / 6) * 100 + 200;
  };

  getLiChildren = () => {
    const imgWidth = 130;
    const imgHeight = 96;
    const imgBoxWidth = 150;
    const imgBoxHeight = 116;
    return imagesList.map((item, i) => {
      const { image, title, content } = item;
      const isEnter = typeof this.state.picOpen[i] === 'boolean';
      const isOpen = this.state.picOpen[i];

      const left = isEnter ? 0 : imgBoxWidth * (i % 6);
      const imgLeft = isEnter ? imgBoxWidth * (i % 6) : 0;
      const isRight = Math.floor((i % 6) / 2);
      const isTop = Math.floor(i / 6);
      let top = isTop ? (isTop - 1) * imgBoxHeight : 0;
      top = isEnter ? top : imgBoxHeight * isTop;
      let imgTop = isTop ? imgBoxHeight : 0;
      imgTop = isEnter ? imgTop : 0;

      const liStyle = isEnter ? { width: '100%', height: 323, zIndex: 1 } : null;
      const liAnimation = isOpen
        ? { boxShadow: '0 2px 8px rgba(140, 140, 140, .35)' }
        : { boxShadow: '0 0px 0px rgba(140, 140, 140, 0)' };
      let aAnimation = isEnter
        ? {
            delay: 400,
            ease: 'easeInOutCubic',
            width: imgWidth,
            height: imgHeight,
            onComplete: this.onTweenEnd.bind(this, i),
            left: imgBoxWidth * (i % 6),
            top: isTop ? imgBoxHeight : 0,
          }
        : null;
      aAnimation = isOpen
        ? {
            ease: 'easeInOutCubic',
            left: isRight ? imgBoxWidth * 3 - 10 : 0,
            width: '50%',
            height: 323,
            top: 0,
          }
        : aAnimation;

      // 位置 js 控制；
      return (
        <TweenOne
          key={i}
          style={{
            left,
            top,
            ...liStyle,
          }}
          component="li"
          className={isOpen ? 'open' : ''}
          animation={liAnimation}
        >
          <TweenOne
            component="a"
            onClick={e => this.onImgClick(e, i)}
            style={{
              left: imgLeft,
              top: imgTop,
            }}
            animation={aAnimation}
          >
            <img src={image} width="100%" height="100%" />
          </TweenOne>
          <TweenOneGroup
            enter={[
              {
                opacity: 0,
                duration: 0,
                type: 'from',
                delay: 400,
              },
              { ease: 'easeOutCubic', type: 'from', left: isRight ? '50%' : '0%' },
            ]}
            leave={{ ease: 'easeInOutCubic', left: isRight ? '50%' : '0%' }}
            component=""
          >
            {isOpen && (
              <div
                className={styles[`pic-details-demo-text-wrapper`]}
                key="text"
                style={{
                  left: isRight ? '0%' : '50%',
                }}
              >
                <h1>{title}</h1>
                <Icon type="cross" onClick={e => this.onClose(e, i)} />
                <em />
                <p>{content}</p>
              </div>
            )}
          </TweenOneGroup>
        </TweenOne>
      );
    });
  };

  render() {
    const { wrapperHeight } = this.state;
    return (
      <Fragment>
        <Header id="Nav0_0" key="Nav0_0" dataSource={Nav00DataSource} />

        <div className={styles['pic-details-demo']}>
          <QueueAnim type="bottom" className={styles[`pic-details-demo-title`]}>
            <h1 key="h1">产品列表</h1>
            <p key="p">库存管理</p>
          </QueueAnim>
          <QueueAnim
            delay={this.getDelay}
            component="ul"
            className={styles[`pic-details-demo-image-wrapper`]}
            style={{ minHeight: wrapperHeight + 'px' }}
            interval={0}
            type="bottom"
          >
            {this.getLiChildren()}
          </QueueAnim>
          <div style={{ width: '880px', margin: '20px auto 0', textAlign: 'right' }}>
            <Pagination defaultCurrent={1} total={50} />
          </div>
        </div>
      </Fragment>
    );
  }
}
