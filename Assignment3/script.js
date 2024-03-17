document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const cafeTableBody = document.getElementById("cafeTableBody");
    let cafesData = [];
    let placesData = [];

    // Fetch cafes and places data simultaneously
    Promise.all([
        fetch('https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/cafes.json')
            .then(response => response.json()),
        fetch('https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/places.json')
            .then(response => response.json())
    ])
    .then(data => {
        cafesData = data[0].error === false && Array.isArray(data[0].cafes) ? data[0].cafes : [];
        placesData = data[1].error === false && Array.isArray(data[1].places) ? data[1].places : [];
        displayCafes(cafesData, placesData);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

    // Display cafes in table
    function displayCafes(cafes, places) {
        cafeTableBody.innerHTML = "";
        cafes.forEach(cafe => {
            const place = places.find(place => place.id === cafe.location_id);
            const location = place ? `${place.locality}` : '-';
            const postalCode = place ? `${place.postal_code}` : '-';
            const row = document.createElement("tr");
            row.innerHTML = `<td>${cafe.name}</td><td>${location}</td><td>${postalCode}</td><td>${place ? place.street_no : '-'}</td><td>${place ? place.lat : '-'}</td><td>${place ? place.long : '-'}</td>`;
            cafeTableBody.appendChild(row);
        });
    }

    // Filter cafes based on search input
    searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const filteredCafes = cafesData.filter(cafe =>
            cafe.name.toLowerCase().includes(searchTerm)
        );
        displayCafes(filteredCafes, placesData);
    });
});
