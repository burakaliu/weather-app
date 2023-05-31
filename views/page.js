//get city form submission
try {
    const cityInput = document.getElementById('cityInput');
    const form = document.getElementById('weatherForm');

    cityInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            form.submit();
        }
    });
} catch (error) {
    console.log(error);
}