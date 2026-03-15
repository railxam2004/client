import { Link } from 'react-router-dom';
import { Logo } from '../../components/logo/logo';
import { FavoriteCardList } from '../../components/favorite-card-list/favorite-card-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute } from '../../const';
import { logoutAction } from '../../store/api-actions';

function FavoritesPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const offersList = useAppSelector((state) => state.offers);
  const userData = useAppSelector((state) => state.userData);
  const favoriteOffers = offersList.filter((offer) => offer.isFavorite);

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <div className="page page--favorites">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                  <span className="header__user-name user__name">{userData?.email}</span>
                  <Link
                    to={AppRoute.Favorites}
                    className="header__nav-link header__nav-link--profile"
                  >
                    <span className="header__favorite-count">{favoriteOffers.length}</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <button className="header__nav-link" type="button" onClick={handleLogout}>
                    <span className="header__signout">Sign out</span>
                  </button>
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
              <ul className="favorites__list">
                <FavoriteCardList offersList={favoriteOffers} />
              </ul>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default FavoritesPage;
