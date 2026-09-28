import { Box } from '@mui/material';
import loaderGif from '@/assets/loaders/loader.gif';
import { loadingScreenSx } from './loadingScreen.style';

/** Full-area loading indicator shown while a lazy-loaded route chunk fetches. */
export default function LoadingScreen() {
  return (
    <Box sx={loadingScreenSx.container}>
      <Box component="img" src={loaderGif} alt="Loading" sx={loadingScreenSx.image} />
    </Box>
  );
}
