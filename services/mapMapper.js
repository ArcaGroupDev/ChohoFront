const cities = [ 
    {
        name: "Provincia de Cartagena", 
        value: "Cartagena"
    },
    {
        name: "Cartagena de Indias", 
        value: "Cartagena"
    },
    {
        name: "Bogotá", 
        value: "Bogota"
    },
];

export default{
    mapCities(city){
        const cityName = cities.filter((item, k) => item.name.trim() === city.trim())
        console.log(cityName);
        return cityName;
    }
}
