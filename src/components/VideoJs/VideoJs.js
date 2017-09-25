import React from 'react';
import videojsHls from 'videojs-contrib-hls';

export default class VideoPlayer extends React.Component {
  componentDidMount() {
    // instantiate video.js
    this.player = videojs(this.videoNode, this.props, () => {
      console.log('ready');
    });
    this.player.qualityselector({
      sources: [
        { format: 'highres', src: 'http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4', type: 'video/mp4' },
        { format: 'hd1080', src: 'http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4', type: 'video/mp4' },
        { format: 'hd720', src: 'http://www.sample-videos.com/video/mp4/480/big_buck_bunny_480p_1mb.mp4', type: 'video/mp4' },
        { format: 'large', src: '//vjs.zencdn.net/v/oceans.mp4', type: 'video/mp4' },
        { format: 'medium', src: 'http://www.sample-videos.com/video/mp4/480/big_buck_bunny_480p_1mb.mp4', type: 'video/mp4' },
        { format: 'small', src: 'http://www.sample-videos.com/video/mp4/480/big_buck_bunny_480p_1mb.mp4', type: 'video/mp4' },
        { format: 'auto', src: 'http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4', type: 'video/mp4' },
      ],
      formats: [
        { code: 'highres', name: 'High' },
        { code: 'hd1080', name: '1080p' },
        { code: 'hd720', name: '720p' },
        { code: 'large', name: '480p' },
        { code: 'medium', name: '360p' },
        { code: 'small', name: '240p' },
        { code: 'auto', name: 'Auto' },
      ],

      onFormatSelected: (format) => {
        console.log(format);
      },
    });
    this.player.ready(() => {
      this.hotkeys({
        volumeStep: 0.1,
        seekStep: 5,
      });
    });
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div data-vjs-player>
        <video ref={node => this.videoNode = node} className="video-js vjs-default-skin" controls />
      </div>
    );
  }
}
