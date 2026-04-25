export default function StarRating({ rating, reviews }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <svg key={star} width="13" height="13" viewBox="0 0 24 24"
          fill={star <= Math.round(rating) ? 'var(--accent)' : 'none'}
          stroke="var(--accent)" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
      {reviews && (
        <span style={{ fontSize: '0.75rem', color: 'var(--warm-gray)', marginLeft: '4px' }}>
          ({reviews})
        </span>
      )}
    </div>
  );
}
