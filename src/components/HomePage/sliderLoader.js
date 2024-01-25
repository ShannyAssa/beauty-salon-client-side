const sliderPhotoContext = require.context('../../resources/homePagePhotos/slider', false, /\.(webp|jpe?g)$/);

const sliderPhotos = sliderPhotoContext.keys().map(sliderPhotoContext);

export default sliderPhotos;
