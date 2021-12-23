import React from 'react';
import { useRouteMatch } from 'react-router';
import YouTube from 'react-youtube';
import WrapperProject from '../WrapperProject';
const YoutubeView: React.FC<any> = (props: any) => {
  const { params } = useRouteMatch();
  const { projectId, videoId } = params as any;
  const opts = {
    height: '600',
    width: '1100',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  return (
    <div className="youtube-view">
      <WrapperProject>
        <YouTube
          videoId={videoId}
          opts={opts as any}
          className="ml-6"
          onReady={(event) => event.target.pauseVideo()}
        />
      </WrapperProject>
    </div>
  );
};
export default YoutubeView;
