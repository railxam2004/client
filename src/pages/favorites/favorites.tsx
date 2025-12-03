// src/pages/favorites/favorites.tsx
import { Logo } from '../../components/logo/logo';
import { FavoriteCardList } from '../../components/favorite-card-list/favorite-card-list';
import { useAppSelector } from '../../hooks';

function FavoritesPage(): JSX.Element {
  // Получаем все предложения из Redux
  const offersList = useAppSelector((state) => state.offers);
  
  // Фильтруем только избранные
  const favoriteOffers = offersList.filter((offer) => offer.isFavorite);

  return (
    <div className="page page--favorites">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            {/* Добавьте навигацию для consistency */}
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">Myemail@gmail.com</span>
                    <span className="header__favorite-count">{favoriteOffers.length}</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            
            {favoriteOffers.length === 0 ? (
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">
                  Save properties to narrow down search or plan your future trips.
                </p>
              </div>
            ) : (
              <FavoriteCardList offersList={favoriteOffers} />
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default FavoritesPage;