# react-banner-slider
banner slider based on react for web platform

简单易用的基于react的轮播图。

example: 
```
import Banner from 'react-banner-slider';
<Banner className='111' style={{marginTop: 30}} duration={1} stopDuration={500} direction={true} autoPlayer={true}>
    <Banner.Item className='saqw' key={1} backgroundSrc={'./static/1.jpg'}>
      <div style={{position: 'absolute', top: '50%', left: '50%'}}>
        <h2>Title</h2>
        <span>Description</span>
      </div>
    </Banner.Item>
    <Banner.Item className="cnmdsjfhais" key={2} backgroundSrc={'./static/2.jpg'}>111</Banner.Item>
    <Banner.Item key={3} backgroundSrc={'./static/3.jpg'}>111</Banner.Item>
  </Banner>
```
