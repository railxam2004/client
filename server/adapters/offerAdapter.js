const cityCoordinates = {
  Paris: { latitude: 48.8566, longitude: 2.3522, zoom: 13 },
  Cologne: { latitude: 50.9375, longitude: 6.9603, zoom: 13 },
  Brussels: { latitude: 50.8503, longitude: 4.3517, zoom: 13 },
  Amsterdam: { latitude: 52.3676, longitude: 4.9041, zoom: 13 },
  Hamburg: { latitude: 53.5511, longitude: 9.9937, zoom: 13 },
  Dusseldorf: { latitude: 51.2277, longitude: 6.7735, zoom: 13 }
};

const getBaseUrl = () => `${process.env.HOST}:${process.env.PORT || 5000}`;

const adaptOfferToClient = (offer) => {
  const baseUrl = getBaseUrl();
  const cityLocation = cityCoordinates[offer.city];
  let previewImage = offer.previewImage;

  if (previewImage && !previewImage.startsWith('http')) {
    previewImage = `${baseUrl}${previewImage.startsWith('/') ? '' : '/'}${previewImage}`;
  }

  return {
    id: String(offer.id),
    title: offer.title,
    type: offer.type,
    price: offer.price,
    city: {
      name: offer.city,
      location: cityLocation
    },
    location: offer.latitude && offer.longitude ? {
      latitude: offer.latitude,
      longitude: offer.longitude
    } : { latitude: 0, longitude: 0 },
    isFavorite: offer.isFavorite,
    isPremium: offer.isPremium,
    rating: parseFloat(offer.rating),
    previewImage
  };
};
const adaptFullOfferToClient = (offer, author) => {
  const baseOffer = adaptOfferToClient(offer);
  const baseUrl = getBaseUrl();
  
  // Обработка аватарки автора
  let avatarUrl = author ? author.avatar : null;
  if (avatarUrl && !avatarUrl.startsWith('http')) {
      avatarUrl = `${baseUrl}${avatarUrl.startsWith('/') ? '' : '/'}${avatarUrl}`;
  }

  return {
      ...baseOffer,
      description: offer.description,
      bedrooms: offer.rooms,
      maxAdults: offer.guests,
      goods: offer.features,
      images: offer.photos ? offer.photos.map(photo => {
           return `${baseUrl}${photo.startsWith('/') ? '' : '/'}${photo}`;
      }) : [],
      host: {
          name: author ? (author.name || author.username) : 'Unknown',
          avatarUrl: avatarUrl,
          isPro: author ? (author.userType === 'pro') : false
      }
  };
};

export { adaptOfferToClient, adaptFullOfferToClient, getBaseUrl };
