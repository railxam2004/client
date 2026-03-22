import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { HeaderUserNav } from '../components/header-user-nav/header-user-nav';
import { AuthorizationStatus } from '../const';
import { makeFakeUserData } from './mocks';

type AuthStatus = typeof AuthorizationStatus[keyof typeof AuthorizationStatus];

const fakeUser = makeFakeUserData();

function renderHeaderUserNav(
  authorizationStatus: AuthStatus = AuthorizationStatus.NoAuth,
  email?: string,
  favoriteOffersCount = 0
) {
  return render(
    <MemoryRouter>
      <HeaderUserNav
        authorizationStatus={authorizationStatus}
        email={email}
        favoriteOffersCount={favoriteOffersCount}
        onLogout={vi.fn()}
      />
    </MemoryRouter>
  );
}

describe('HeaderUserNav — аналог Header в проекте', () => {
  describe('неавторизованный пользователь', () => {
    it('отображает ссылку Sign in', () => {
      renderHeaderUserNav();

      expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    });

    it('не отображает Sign out', () => {
      renderHeaderUserNav();

      expect(screen.queryByText(/sign out/i)).not.toBeInTheDocument();
    });
  });

  describe('авторизованный пользователь', () => {
    it('отображает email пользователя', () => {
      renderHeaderUserNav(AuthorizationStatus.Auth, fakeUser.email, 2);

      expect(screen.getByText(fakeUser.email)).toBeInTheDocument();
    });

    it('отображает количество избранных предложений', () => {
      renderHeaderUserNav(AuthorizationStatus.Auth, fakeUser.email, 3);

      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('отображает кнопку Sign out', () => {
      renderHeaderUserNav(AuthorizationStatus.Auth, fakeUser.email, 1);

      expect(screen.getByText(/sign out/i)).toBeInTheDocument();
    });

    it('не отображает ссылку Sign in', () => {
      renderHeaderUserNav(AuthorizationStatus.Auth, fakeUser.email, 1);

      expect(screen.queryByText(/sign in/i)).not.toBeInTheDocument();
    });
  });

  describe('статус Unknown', () => {
    it('ведет себя как неавторизованный пользователь и показывает Sign in', () => {
      renderHeaderUserNav(AuthorizationStatus.Unknown);

      expect(screen.getByText(/sign in/i)).toBeInTheDocument();
      expect(screen.queryByText(/sign out/i)).not.toBeInTheDocument();
    });
  });
});