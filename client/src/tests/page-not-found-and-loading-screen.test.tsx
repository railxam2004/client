import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LoadingScreen } from '../components/loading-screen/loading-screen';
import PageNotFound from '../pages/page-not-found/page-not-found';
import { AppRoute } from '../const';

describe('LoadingScreen', () => {
  it('отображает текст загрузки', () => {
    render(<LoadingScreen />);

    expect(screen.getByText('Loading ...')).toBeInTheDocument();
  });
});

describe('PageNotFound', () => {
  const renderPage = () => render(
    <MemoryRouter>
      <PageNotFound />
    </MemoryRouter>
  );

  it('отображает заголовок PAGE NOT FOUND', () => {
    renderPage();

    expect(screen.getByRole('heading', { name: 'PAGE NOT FOUND' })).toBeInTheDocument();
  });

  it('ссылка на главную страницу присутствует', () => {
    renderPage();

    expect(screen.getByRole('link', { name: /перейдите на главную страницу/i })).toBeInTheDocument();
  });

  it('ссылка ведет на "/"', () => {
    renderPage();
    const link = screen.getByRole('link', { name: /главную/i });

    expect(link).toHaveAttribute('href', AppRoute.Main);
  });
});