import useContentAsset from './useContentAsset';

function useContentVideo(props) {
  const {item: video, isLoading: isVideoLoading} = useContentAsset(props, 'video');
  const {item: poster, isLoading: isPosterLoading} = useContentAsset(props, 'poster');

  return {
    video,
    poster,
    isLoading: isVideoLoading || isPosterLoading,
  };
}

export default useContentVideo;