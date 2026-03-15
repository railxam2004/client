import { useEffect } from 'react';
import { Logo } from '../../components/logo/logo';
import { FavoriteCardList } from '../../components/favorite-card-list/favorite-card-list';
import { HeaderUserNav } from '../../components/header-user-nav/header-user-nav';
import { LoadingScreen } from '../../components/loading-screen/loading-screen';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFavoriteOffersAction, logoutAction } from '../../store/api-actions';

function FavoritesPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const favoriteOffers = useAppSelector((state) => state.favoriteOffers);
  const userData = useAppSelector((state) => state.userData);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isFavoritesDataLoading = useAppSelector((state) => state.isFavoritesDataLoading);

  useEffect(() => {
    dispatch(fetchFavoriteOffersAction());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  if (isFavoritesDataLoading) {
    return <LoadingScreen />;
  }

  const isFavoritesEmpty = favoriteOffers.length === 0;

  return (
    <div className={`page ${isFavoritesEmpty ? 'page--favorites-empty' : 'page--favorites'}`}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <nav className="header__nav">
              <HeaderUserNav
                authorizationStatus={authorizationStatus}
                email={userData?.email}
                favoriteOffersCount={favoriteOffers.length}
                onLogout={handleLogout}
              />
            </nav>
          </div>
        </div>
      </header>

      <main className={`page__main page__main--favorites${isFavoritesEmpty ? ' page__main--favorites-empty' : ''}`}>
        <div className="page__favorites-container container">
          <section className={`favorites${isFavoritesEmpty ? ' favorites--empty' : ''}`}>
            <h1 className="favorites__title">Saved listing</h1>

            {isFavoritesEmpty ? (
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
