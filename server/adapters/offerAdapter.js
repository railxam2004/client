const cityCoordinates = {
    Paris: { latitude: 48.8566, longitude: 2.3522, zoom: 13 },
    Cologne: { latitude: 50.9375, longitude: 6.9603, zoom: 13 },
    Brussels: { latitude: 50.8503, longitude: 4.3517, zoom: 13 },
    Amsterdam: { latitude: 52.3676, longitude: 4.9041, zoom: 13 },
    Hamburg: { latitude: 53.5511, longitude: 9.9937, zoom: 13 },
    Dusseldorf: { latitude: 51.2277, longitude: 6.7735, zoom: 13 }
};

const getBaseUrl = () => `${process.env.HOST}:${process.env.PORT || 5000}`;

const makeAbsoluteUrl = (path) => {
    if (!path) {
        return '';
    }

    if (path.startsWith('http')) {
        return path;
    }

    const baseUrl = getBaseUrl();
    return `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
};

export const adaptOfferToClient = (offer) => {
    const cityLocation = cityCoordinates[offer.city];

    return {
        id: String(offer.id),
        title: offer.title,
        type: offer.type,
        price: Number(offer.price),
        city: {
            name: offer.city,
            location: cityLocation,
        },
        location: {
            latitude: Number(offer.latitude),
            longitude: Number(offer.longitude),
            zoom: cityLocation.zoom,
        },
        isFavorite: Boolean(offer.isFavorite),
        isPremium: Boolean(offer.isPremium),
        rating: Number(offer.rating),
        previewImage: makeAbsoluteUrl(offer.previewImage),
    };
};

export const adaptFullOfferToClient = (offer, author) => {
    const cityLocation = cityCoordinates[offer.city];

    return {
        id: String(offer.id),
        title: offer.title,
        description: offer.description,
        type: offer.type,
        price: Number(offer.price),
        city: {
            name: offer.city,
            location: cityLocation,
        },
        location: {
            latitude: Number(offer.latitude),
            longitude: Number(offer.longitude),
            zoom: cityLocation.zoom,
        },
        isFavorite: Boolean(offer.isFavorite),
        isPremium: Boolean(offer.isPremium),
        rating: Number(offer.rating),
        bedrooms: Number(offer.rooms),
        goods: Array.isArray(offer.features) ? offer.features : [],
        host: {
            name: author.username,
            isPro: author.userType === 'pro',
            avatarUrl: makeAbsoluteUrl(author.avatar),
        },
        images: Array.isArray(offer.photos) ? offer.photos.map(makeAbsoluteUrl) : [],
        maxAdults: Number(offer.guests),
    };
};
