const cityInput = document.querySelector('#city');

const loadCities = () => {
    const cities = [
        'Quito', 'Guayaquil', 'Cuenca', 'Santo Domingo', 'Machala',
        'Durán', 'Manta', 'Portoviejo', 'Loja', 'Ambato', 'Riobamba',
        'Esmeraldas', 'Quevedo', 'Milagro', 'Ibarra', 'Latacunga',
        'Babahoyo', 'Tulcán', 'Azogues', 'Otavalo'
    ];

    const datalist = document.createElement('datalist');
    datalist.id = 'cities-list';

    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        datalist.appendChild(option);
    });

    document.body.appendChild(datalist);
    cityInput.setAttribute('list', 'cities-list');
}