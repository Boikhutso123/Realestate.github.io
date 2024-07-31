document.addEventListener('DOMContentLoaded', function() {
    const propertyList = document.getElementById('property-list');
    const propertyDetailsList = document.getElementById('propertyDetailsList');
    const propertyForm = document.getElementById('propertyForm');
    const formTitle = document.getElementById('form-title');
    const propertyNameInput = document.getElementById('propertyName');
    const propertyImageInput = document.getElementById('propertyImage');
    const propertyAddressInput = document.getElementById('propertyAddress');
    const propertyPriceInput = document.getElementById('propertyPrice');
    const propertyDescriptionInput = document.getElementById('propertyDescription');
    const propertyExtraInfoInput = document.getElementById('propertyExtraInfo');
    const message = document.getElementById('message');

    const editForm = document.getElementById('editForm');
    const editPropertyNameInput = document.getElementById('editPropertyName');
    const editPropertyImageInput = document.getElementById('editPropertyImage');
    const editPropertyAddressInput = document.getElementById('editPropertyAddress');
    const editPropertyPriceInput = document.getElementById('editPropertyPrice');
    const editPropertyDescriptionInput = document.getElementById('editPropertyDescription');
    const editPropertyExtraInfoInput = document.getElementById('editPropertyExtraInfo');

    let properties = JSON.parse(localStorage.getItem('properties')) || [];
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    let editIndex = null;

    function renderProperties() {
        if (propertyList) {
            propertyList.innerHTML = '';
            properties.forEach((property, index) => {
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
                    <div class="buttons">
                        <button onclick="deleteProperty(${index})">Delete</button>
                        <button class="edit-btn" onclick="editProperty(${index})">Edit</button>
                        <button class="favorite-btn" onclick="addToFavorites(${index})">
                            <span class="material-symbols-outlined">favorite</span>
                        </button>
                    </div>
                `;
                propertyList.appendChild(propertyBox);
            });
        }
    }

    function renderPropertyDetails() {
        if (propertyDetailsList) {
            propertyDetailsList.innerHTML = '';
            properties.forEach((property) => {
                const propertyBox = document.createElement('div');
                propertyBox.className = 'property-box';
                propertyBox.innerHTML = `
                    <img src="${property.image}" alt="${property.name}">
                    <div class="property-details">
                        <p><strong>${property.name}</strong></p>
                        <p>${property.address}</p>
                        <p>${property.price}</p>
                        <p>${property.description}</p>
                        <p>${property.extraInfo}</p>
                    </div>
                `;
                propertyDetailsList.appendChild(propertyBox);
            });
        }
    }

    window.deleteProperty = function(index) {
        properties.splice(index, 1);
        localStorage.setItem('properties', JSON.stringify(properties));
        renderProperties();
        renderPropertyDetails();
    };

    window.editProperty = function(index) {
        editIndex = index;
        const property = properties[index];
        editPropertyNameInput.value = property.name;
        editPropertyImageInput.value = property.image;
        editPropertyAddressInput.value = property.address;
        editPropertyPriceInput.value = property.price;
        editPropertyDescriptionInput.value = property.description;
        editPropertyExtraInfoInput.value = property.extraInfo;
        editForm.style.display = 'block';
    };

    window.saveEdit = function() {
        const name = editPropertyNameInput.value;
        const image = editPropertyImageInput.value;
        const address = editPropertyAddressInput.value;
        const price = editPropertyPriceInput.value;
        const description = editPropertyDescriptionInput.value;
        const extraInfo = editPropertyExtraInfoInput.value;

        if (!name || !image || !address || !price || !description || !extraInfo) {
            alert('Please provide all property details.');
            return;
        }

        properties[editIndex] = { name, image, address, price, description, extraInfo };
        localStorage.setItem('properties', JSON.stringify(properties));
        renderProperties();
        renderPropertyDetails();
        editForm.style.display = 'none';
    };

    if (propertyForm) {
        propertyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = propertyNameInput.value;
            const image = propertyImageInput.value;
            const address = propertyAddressInput.value;
            const price = propertyPriceInput.value;
            const description = propertyDescriptionInput.value;
            const extraInfo = propertyExtraInfoInput.value;

            if (!name || !image || !address || !price || !description || !extraInfo) {
                message.textContent = 'Please provide all property details.';
                return;
            }

            properties.push({ name, image, address, price, description, extraInfo });
            localStorage.setItem('properties', JSON.stringify(properties));
            renderProperties();
            renderPropertyDetails();
            propertyForm.reset();
            message.textContent = 'Property added successfully!';
        });
    }

    window.addToFavorites = function(index) {
        const property = properties[index];
        if (!favorites.some(fav => fav.name === property.name)) {
            favorites.push(property);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            alert('Added to favorites!');
        } else {
            alert('Already in favorites!');
        }
    };

    renderProperties();
    renderPropertyDetails();
});
