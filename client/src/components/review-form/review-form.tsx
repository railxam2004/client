import { useState, FormEvent, Fragment } from 'react';
import { useAppSelector } from '../../hooks';

type ReviewFormProps = {
  onAddReview: (reviewData: { comment: string; rating: number }) => void;
};

function ReviewForm({ onAddReview }: ReviewFormProps): JSX.Element {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const isSubmitInProgress = useAppSelector((state) => state.isReviewSubmitInProgress);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onAddReview({ comment, rating });
    setComment('');
    setRating(0);
  };

  return (
    <form className="reviews__form form" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((value) => (
          <Fragment key={value}>
            <input 
              className="form__rating-input visually-hidden" 
              name="rating" value={value} id={`${value}-stars`} 
              type="radio" checked={rating === value} 
              disabled={isSubmitInProgress}
              onChange={() => setRating(value)} 
            />
            <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label">
              <svg className="form__star-image" width="37" height="33"><use xlinkHref="#icon-star"></use></svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea 
        className="reviews__textarea form__textarea" id="review" name="review" 
        placeholder="Tell how was your stay" value={comment} 
        disabled={isSubmitInProgress}
        onChange={(evt) => setComment(evt.target.value)} 
      />
      <div className="reviews__button-wrapper">
        <button 
          className="reviews__submit form__submit button" type="submit" 
          disabled={comment.length < 50 || rating === 0 || isSubmitInProgress}
        >
          {isSubmitInProgress ? 'Sending...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

export { ReviewForm };