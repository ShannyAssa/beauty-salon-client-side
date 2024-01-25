const iconContext = require.context('../../resources/homePagePhotos/icons', false, /\.png$/);

const icons = iconContext.keys().map(iconContext);

export default icons;

