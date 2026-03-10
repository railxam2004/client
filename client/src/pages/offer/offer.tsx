import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchOfferAction, postReviewAction } from '../../store/api-actions';
import PageNotFound from '../page-not-found/page-not-found';
import { Header } from '../../components/header/header';
import { ReviewForm } from '../../components/review-form/review-form';
import { ReviewsList } from '../../components/reviews-list/reviews-list';
import { Map } from '../../components/map/map';
import { NearbyPlacesList } from '../../components/nearby-places-list/nearby-places-list';
import { AuthorizationStatus } from '../../const';

function OfferPage(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  
  const offer = useAppSelector((state) => state.offer);
  const reviews = useAppSelector((state) => state.reviews);
  const nearbyOffers = useAppSelector((state) => state.nearby);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferAction(id));
    }
  }, [id, dispatch]);

  if (!offer && id) {
    return <PageNotFound />;
  }

  if (!offer) {
    return <div>Loading...</div>;
  }

  const pointsForMap = [...nearbyOffers, offer];

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offer.images.slice(0, 6).map((img) => (
                <div key={img} className="offer__image-wrapper">
                  <img className="offer__image" src={img} alt={offer.title} />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && <div className="offer__mark"><span>Premium</span></div>}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{offer.title}</h1>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${Math.round(offer.rating) * 20}%` }}></span>
                </div>
                <span className="offer__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{offer.type}</li>
                <li className="offer__feature offer__feature--bedrooms">{offer.bedrooms} Bedrooms</li>
                <li className="offer__feature offer__feature--adults">Max {offer.maxAdults} adults</li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&#47;&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offer.goods.map((good) => <li key={good} className="offer__inside-item">{good}</li>)}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">{offer.host.name}</span>
                  {offer.host.isPro && <span className="offer__user-status">Pro</span>}
                </div>
                <div className="offer__description"><p className="offer__text">{offer.description}</p></div>
              </div>
            </div>
          </div>
          <section className="offer__map map-container">
            <Map className="offer__map" city={offer.city} points={pointsForMap} selectedPoint={offer} />
          </section>
          <section className="offer__reviews reviews">
            <ReviewsList reviews={reviews} />
            {authorizationStatus === AuthorizationStatus.Auth && (
              <ReviewForm onAddReview={(data) => dispatch(postReviewAction({ offerId: offer.id, ...data }))} />
            )}
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <NearbyPlacesList offers={nearbyOffers} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;