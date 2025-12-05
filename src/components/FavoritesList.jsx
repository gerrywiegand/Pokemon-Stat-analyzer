function FavoritesList({ favorites, onSelect }) {
  if (favorites.length === 0) return null;

  return (
    <div className="favorites-bar">
      <h2>Favorites</h2>

      <div className="favorites-container">
        {favorites.map((fav) => (
          <button
            key={fav.id}
            className="favorite-pill"
            onClick={() => onSelect(fav.id)}
          >
            <img src={fav.sprite} alt={fav.name} />
            <span>{fav.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default FavoritesList;
