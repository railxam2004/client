import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { CitiesCard } from '../components/cities-card/cities-card';
import { makeFakeOffer } from './mocks';

function renderCitiesCard(isPremium = false) {
  const offer = {
    ...makeFakeOffer(),
    isPremium,
  };

  render(
    <MemoryRouter>
      <CitiesCard
        id={offer.id}
        title={offer.title}
        type={offer.type}
        price={offer.price}
        isPremium={offer.isPremium}
        previewImage={offer.previewImage}
        rating={offer.rating}
      />
    </MemoryRouter>
  );

  return offer;
}

describe('CitiesCard', () => {
  it('отображает заголовок объявления на карточке', () => {
    const offer = renderCitiesCard();

    expect(screen.getByText(offer.title)).toBeInTheDocument();
  });

  it('отображает цену объявления', () => {
    const offer = renderCitiesCard();

    expect(screen.getByText(`€${offer.price}`)).toBeInTheDocument();
  });

  it('показывает метку Premium, когда isPremium = true', () => {
    renderCitiesCard(true);

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('не показывает метку Premium, когда isPremium = false', () => {
    renderCitiesCard(false);

    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
  });

  it('ссылка на страницу объявления содержит id в href (/offer/id)', () => {
    const offer = renderCitiesCard();
    const link = screen.getByRole('link', { name: offer.title });

    expect(link).toHaveAttribute('href', `/offer/${offer.id}`);
  });
});