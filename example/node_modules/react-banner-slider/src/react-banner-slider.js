import React from 'react';
import './banner.less';
import cls from 'classnames';
import omit from 'omit.js';
import './iconfont.css';

/**
 * container
 */
class Banner extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      current: 0,
      moving: 0,
      autoPlayer: props.autoPlayer || false,
      direction: props.direction || false,
      duration: (parseInt(props.duration) && parseInt(props.duration) >= 500) ? parseInt(props.duration) : 2000,
      stopDuration: (parseInt(props.stopDuration) && parseInt(props.stopDuration) >= 500) ? parseInt(props.stopDuration) : 2000
    };
    this.autoPlayerInterval = null;
  }
  componentDidMount= ()=>{
    this.checkAutoPlay();
  }
  componentWillReceiveProps= (next)=>{
    let { autoPlayer, direction, duration, stopDuration } = next;
    if(!autoPlayer){
      this.clearAutoPlayer();
    }else{
      this.setState({
        autoPlayer: true,
        direction: direction ? true : false,
        duration: (parseInt(duration) &&  parseInt(duration)>= 500) ? parseInt(duration) : 2000,
        stopDuration: (parseInt(stopDuration) && parseInt(stopDuration) >= 500) ? parseInt(stopDuration) : 2000,
      }, this.checkAutoPlay)
    }
  }
  componentWillUnmount= ()=>{
    this.clearAutoPlayer()
  }
  checkAutoPlay= ()=>{
    let {autoPlayer, direction, duration} = this.state;
    if(autoPlayer){
      this.clearAutoPlayer();
      if (direction){
        this.autoPlayerInterval = setInterval(()=>{
          this.next(true);
        }, duration);
      } else {
        this.autoPlayerInterval = setInterval(()=>{
          this.pre(true);
        }, duration);
      }
    }
  }
  clearAutoPlayer= ()=>{
    this.autoPlayerInterval && clearInterval(this.autoPlayerInterval);
  }
  reSetAutoPlayer= ()=>{
    this.clearAutoPlayer();
    setTimeout(this.checkAutoPlay, this.state.stopDuration);
  }
  pre= (internal)=>{
    if(internal !== true){ this.reSetAutoPlayer() }
    let { current, moving } = this.state;
    // console.log('flag', moving);
    if(moving !== 0){ return; }
    if(--current >= 0){
      this.setState({current})
    } else {
      let children = this.ref && this.ref.children.length - 2
      if (children){
        this.setState({current: --children, pre: true})
      }
    }
  }
  next= (internal)=>{
    if(internal !== true){ this.reSetAutoPlayer() }
    let { current, moving } = this.state;
    if(moving !== 0){ return; }
    let children = this.ref && this.ref.children.length - 2;
    if(children){
      if(++current >= children){
        this.setState({current: 0, next: true})
      } else {
        this.setState({current: current})
      }
    }
  }
  change= (index)=>{
    let { current, moving } = this.state;
    if(moving !== 0){ return; }
    this.setState({current: index})
  }
  endMoving= ()=>{
    // console.log('执行end')
    let {moving} = this.state;
    if( ++moving === 2){
      this.setState({moving: 0, pre: false, next: false})
    } else {
      this.setState({moving})
    }
  }
  render(){
    let { children, className = '', style = {} } = this.props;
    let { current, moving, pre, next } = this.state;
    let _children = [];
    if (children){
      if (typeof children === 'object'){
        if (children.length){
          children.map((element, index)=>{
            if (typeof element === 'object' && typeof element.type === 'function' && element.type.name === 'BannerItem'){
              _children.push(
                <BannerItem pre={pre} next={next} endMoving={this.endMoving} {...element.props} uniqueIndex={_children.length} key={_children.length} current={current}/>
              );
            }
          });
        } else {
          // children是唯一的 但是object或者dom元素
          if (typeof children.type === 'function' && children.type.name === 'BannerItem'){
            _children.push(
              <BannerItem pre={pre} next={next} endMoving={this.endMoving} {...children.props} uniqueIndex={_children.length} key={_children.length} current={current}/>
            );
          }
        }
      }
    }
    let _circle = _children.map((item, index)=>{
      let _cls = cls({
        'circle': true,
        'circle-active': index === current
      })
      return <div className={_cls} key={index} onClick={()=>{this.change(index);}}></div>;
    });
    let divProps = omit(this.props, ['className', 'style', 'children', 'autoPlayer', 'duration', 'direction', 'stopDuration']);
    return <div className={`banner-wrapper ${className}`} style={style} {...divProps} ref={(ref)=>{this.ref = ref}}>
      {_children}
      <div className="slider-wrapper">
        <div className="slider slider-pre" onClick={this.pre}>
          <i className="icon iconfont icon-back"></i>
        </div>
        <div className="slider slider-next" onClick={this.next}>
          <i className="icon iconfont icon-more"></i>
        </div>
      </div>
      <div className="circle-wrapper">
        {_circle}
      </div>
    </div>;
  }
}

/**
 * item
 */
class BannerItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      current: this.props.current,
      uniqueIndex: this.props.uniqueIndex,
      toLeftHidden: false,
      toLeftShow: false,
      toRightHidden: false,
      toRightShow: false,
      moving: false,
      show: this.props.current === this.props.uniqueIndex
    };
    this.clear = this.clear.bind(this);
  }
  clear(){
    setTimeout(()=>{
      this.setState({
        toLeftHidden: false,
        toLeftShow: false,
        toRightHidden: false,
        toRightShow: false,

        moving: false,
        show: this.state.willShow,
        willShow: false
      }, this.props.endMoving);
    }, 500);
  }
  toLeftMovingShow(){
    this.setState({
      toLeftHidden: false,
      toLeftShow: true,
      toRightHidden: false,
      toRightShow: false,
      moving: true
    }, this.clear);
  }
  toLeftMovingHidden(){
    this.setState({
      toLeftHidden: true,
      toLeftShow: false,
      toRightHidden: false,
      toRightShow: false,
      moving: true
    }, this.clear);
  }
  toRightMovingShow(){
    this.setState({
      toLeftHidden: false,
      toLeftShow: false,
      toRightHidden: false,
      toRightShow: true,
      moving: true
    }, this.clear);
  }
  toRightMovingHidden(){
    this.setState({
      toLeftHidden: false,
      toLeftShow: false,
      toRightHidden: true,
      toRightShow: false,
      moving: true
    }, this.clear);
  }
  componentWillReceiveProps(next){
    let {current, uniqueIndex} = this.state;
    if (next.current !== current){
      this.setState({current: next.current});
    } else {
      return;
    }
    // 下一次要显示出来
    if (next.current === uniqueIndex){
      if (next.pre){
        this.toRightMovingShow();
      } else if(next.next){
        this.toLeftMovingShow();
      } else {
        if (current < uniqueIndex){
          this.toLeftMovingShow();
        } else {
          this.toRightMovingShow();
        }
      }
      
      this.setState({willShow: true});
    }
    // 当前显示，即将要隐藏起来
    if (current === uniqueIndex){
      if (next.pre){
        this.toRightMovingHidden();
      } else if(next.next){
        this.toLeftMovingHidden();
      } else {
        if (next.current < uniqueIndex){
          this.toRightMovingHidden();
        } else {
          this.toLeftMovingHidden();
        }
      }
      
      this.setState({willShow: false});
    }
  }
  render(){
    let { backgroundSrc, className = '', style = {}, children } = this.props;
    let {toLeftHidden, toLeftShow, toRightHidden, toRightShow, show} = this.state;
    let localClassName = cls({
      'banner-item': true,
      'banner-item-visible': show,
      'banner-to-left-hidden': toLeftHidden,
      'banner-to-left-show': toLeftShow,
      'banner-to-right-hidden': toRightHidden,
      'banner-to-right-show': toRightShow,
      [className]: true
    });
    let divProps = omit(this.props, [ 'pre', 'next', 'endMoving', 'backgroundSrc', 'className', 'style', 'children', 'uniqueIndex', 'current']);
    return <div className={localClassName} style={Object.assign({}, style, { backgroundImage: `url(${backgroundSrc})`})} {...divProps}>
      {children}
    </div>;
  }
}

Banner.Item = BannerItem;
export default Banner;
