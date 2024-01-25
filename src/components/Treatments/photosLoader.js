const treatmentPhotoContext = require.context('../../../public/treatmentsPhotos', false, /\.(png|jpg|jpeg|webp)$/);

const treatmentPhotos = {};

treatmentPhotoContext.keys().forEach(key => {
  const fileName = key.replace(/^.*[\\/]/, ''); // Extract file name from the full path
  treatmentPhotos[fileName] = treatmentPhotoContext(key);
});

export default treatmentPhotos;
