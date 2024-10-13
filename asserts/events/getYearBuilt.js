const yearInput = document.querySelector('#year_built');

const loadYears = () => {
    const years = [];
    for (let year = 2000; year <= 2024; year++) {
        years.push(year);
    }

    const datalist = document.createElement('datalist');
    datalist.id = 'years-list';

    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        datalist.appendChild(option);
    });

    document.body.appendChild(datalist);
    yearInput.setAttribute('list', 'years-list');
};

// Call the function to load the years
loadYears();
Array.from({ length: 2024 - 2000 + 1 }, (_, i) => 2000 + i);
