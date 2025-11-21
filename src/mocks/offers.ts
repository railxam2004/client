import { FullOffer } from '../types/offer';

export const offers: FullOffer[] = [
  {
    id: 'bbb06a0e-3f92-446d-9a68-cb64b5d38e2b',
    title: 'Wood and stone place',
    description: 'A new spacious villa, one floor. All commodities, jacuzzi and beautiful scenery. Ideal for families',
    type: 'apartment',
    price: 370,
    images: ['20.jpg', '17.jpg', '16.jpg', '15.jpg', '2.jpg', '7.jpg'],
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.86861,
      longitude: 2.342499,
      zoom: 16
    },
    goods: [
      'Heating', 'Wi-Fi', 'Fridge', 'Laptop friendly workspace', 'Air conditioning',
      'Washer', 'Towels', 'Dishwasher', 'Kitchen', 'Washing machine', 'Coffee machine'
    ],
    host: {
      isPro: true,
      name: 'Angelina',
      avatarUrl: 'avatar-angelina.jpg'
    },
    isPremium: false,
    isFavorite: true,
    rating: 4.9,
    bedrooms: 2,
    maxAdults: 3
  },

  {
    id: 'e1c1fc5b-af32-4b38-a3a0-012345678912',
    title: 'Modern apartment in Cologne',
    description: 'Modern cozy apartment in the heart of Cologne. Perfect for couples.',
    type: 'apartment',
    price: 120,
    images: ['apartment-01.jpg', 'apartment-02.jpg', 'apartment-03.jpg'],
    city: {
      name: 'Cologne',
      location: {
        latitude: 50.938361,
        longitude: 6.959974,
        zoom: 13
      }
    },
    location: {
      latitude: 50.950361,
      longitude: 6.990974,
      zoom: 16
    },
    goods: ['Wi-Fi', 'Heating', 'Kitchen', 'Coffee machine'],
    host: {
      isPro: false,
      name: 'Johann',
      avatarUrl: 'avatar-johann.jpg'
    },
    isPremium: true,
    isFavorite: false,
    rating: 4.2,
    bedrooms: 1,
    maxAdults: 2
  },

  {
    id: '3d6fccc3-923d-4804-b0e3-abcdef111222',
    title: 'Luxurious hotel room in Brussels',
    description: 'Spacious room in a premium hotel in Brussels. Great service.',
    type: 'hotel',
    price: 240,
    images: ['hotel-01.jpg', 'hotel-02.jpg'],
    city: {
      name: 'Brussels',
      location: {
        latitude: 50.846557,
        longitude: 4.351697,
        zoom: 13
      }
    },
    location: {
      latitude: 50.860557,
      longitude: 4.361697,
      zoom: 16
    },
    goods: ['Breakfast', 'Wi-Fi', 'Air conditioning', 'Towels'],
    host: {
      isPro: true,
      name: 'Marie',
      avatarUrl: 'avatar-marie.jpg'
    },
    isPremium: true,
    isFavorite: false,
    rating: 4.8,
    bedrooms: 1,
    maxAdults: 2
  },

  {
    id: 'ff92aa57-75bb-4e40-bc26-777888999000',
    title: 'Cozy house in Amsterdam',
    description: 'A cozy family house near the canal. Perfect for long stays.',
    type: 'house',
    price: 310,
    images: ['house-01.jpg'],
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    location: {
      latitude: 52.390955,
      longitude: 4.853096,
      zoom: 16
    },
    goods: ['Heating', 'Kitchen', 'Dishwasher', 'Washer', 'Wi-Fi'],
    host: {
      isPro: false,
      name: 'Tom',
      avatarUrl: 'avatar-tom.jpg'
    },
    isPremium: false,
    isFavorite: true,
    rating: 4.5,
    bedrooms: 3,
    maxAdults: 5
  }
];
