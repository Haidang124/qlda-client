import React from 'react';
import YouTube from 'react-youtube';
import WrapperProject from '../WrapperProject';
const YoutubeView: React.FC<any> = (props: any) => {
  const opts = {
    height: '800',
    width: '1500',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  return (
    <div className="youtube-view">
      <WrapperProject>
        <YouTube
          videoId="ooGDTbaFK34"
          opts={opts as any}
          onReady={(event) => event.target.pauseVideo()}
        />
      </WrapperProject>
    </div>
  );
};
export default YoutubeView;
