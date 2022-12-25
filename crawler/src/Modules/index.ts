import { generateXvideosScrappingResult } from './Xvideos/xvideos.helper';

export const videoExtractor = async () => {
  await generateXvideosScrappingResult('https://xvideos.com/');
};
