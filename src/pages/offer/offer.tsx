import { useParams } from 'react-router-dom';
import { FullOffer } from '../../types/offer';
import PageNotFound from '../page-not-found/page-not-found';
import { Logo } from '../../components/logo/logo';
import { ReviewForm } from '../../components/review-form/review-form';

type OfferProps = {
  offers: FullOffer[];
};

function OfferPage({ offers }: OfferProps): JSX.Element {
  const params = useParams();
  const offer = offers.find((item) => item.id === params.id);

  if (!offer) {
    return <PageNotFound />;
  }

  return (
    <div className="page page--gray page--offer">
      <div className="page">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Logo />
              </div>

              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <a className="header__nav-link header__nav-link--profile" href="#">
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__user-name user__name">Myemail@gmail.com</span>
                      <span className="header__favorite-count">3</span>
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

        <main className="page__main page__main--offer">
          <section className="offer">

            {offer.isPremium ? (
              <div className="offer__mark">
                <span>Premium</span>
              </div>
            ) : null}

            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                {offer.images.map((item) => (
                  <div key={item} className="offer__image-wrapper">
                    <img className="offer__image" src={item} alt={offer.title} />
                  </div>
                ))}
              </div>
            </div>

            <div className="offer__container container">
              <div className="offer__wrapper">

                <div className="offer__name-wrapper">
                  <h1 className="offer__name">{offer.title}</h1>
                </div>

                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span style={{ width: `${offer.rating * 20}%` }}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">{offer.rating}</span>
                </div>

                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">
                    {offer.type}
                  </li>
                  <li className="offer__feature offer__feature--bedrooms">
                    {offer.bedrooms} Bedrooms
                  </li>
                  <li className="offer__feature offer__feature--adults">
                    Max {offer.maxAdults} adults
                  </li>
                </ul>

                <div className="offer__price">
                  <b className="offer__price-value">&euro;{offer.price}</b>
                  <span className="offer__price-text">&#47;&nbsp;night</span>
                </div>

                <div className="offer__inside">
                  <h2 className="offer__inside-title">What's inside</h2>
                  <ul className="offer__inside-list">
                    {offer.goods.map((good) => (
                      <li key={good} className="offer__inside-item">
                        {good}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>

                  <div className="offer__host-user user">
                    <div className="offer__avatar-wrapper user__avatar-wrapper">
                      <img
                        className="offer__avatar user__avatar"
                        src={offer.host.avatarUrl}
                        width="74"
                        height="74"
                        alt="Host avatar"
                      />
                    </div>
                    <span className="offer__user-name">{offer.host.name}</span>
                    {offer.host.isPro ? <span className="offer__user-status">Pro</span> : null}
                  </div>

                  <div className="offer__description">
                    <p className="offer__text">{offer.description}</p>
                  </div>
                </div>
              </div>
            </div>

            <section className="offer__map map"></section>

            {/* --- Reviews + Form --- */}
            <section className="offer__reviews reviews">
              <h2 className="reviews__title">Reviews · <span className="reviews__amount">1</span></h2>

              <ul className="reviews__list">
                {/* оставляем твои отзывы как есть */}
              </ul>

              <ReviewForm />
            </section>

          </section>
        </main>
      </div>
    </div>
  );
}

export default OfferPage;
