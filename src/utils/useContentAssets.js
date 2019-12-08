import useContentAsset from './useContentAsset';

function useContentAssets(props) {
  const assets = props.asset || [];

  return assets.map(asset => useContentAsset({asset}));
}

export default useContentAssets;