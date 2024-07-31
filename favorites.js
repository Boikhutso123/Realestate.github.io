document.addEventListener('DOMContentLoaded', function() {
    const favoritesList = document.getElementById('favorites-list');
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    function renderFavorites() {
        if (favoritesList) {
            favoritesList.innerHTML = '';
            favorites.forEach((property, index) => {
                const propertyBox = document.createElement('div');
                propertyBox.className = 'box';
                propertyBox.innerHTML = `
                    <img src="${property.image}" alt="${property.name}">
                    <div class="property-details">
                        <p><strong>${property.name}</strong></p>
                        <p>${property.address}</p>
                        <p>${property.price}</p>
                        <p>${property.description}</p>
                    </div>
                    <button onclick="removeFromFavorites(${index})">Remove</button>
                `;
                favoritesList.appendChild(propertyBox);
            });
        }
    }

    window.removeFromFavorites = function(index) {
        favorites.splice(index, 1);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        renderFavorites();
    };

    renderFavorites();
});

