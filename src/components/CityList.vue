<template>
    <div v-for="city in savedCities" :key="city.id">
        <CityCard :city="city" @click="goToCityView(city)"/>
    </div>
    <p v-if="savedCities.length === 0">
        No locations added. To start tracking a location, search in the field above.
    </p>

</template>

<script setup>
    import { ref } from 'vue';
    import axios from "axios";
    import { useRouter } from "vue-router";
    import CityCard from "./CityCard.vue";


    const savedCities = ref([]);
    const getCities = async () => {
        if (localStorage.getItem('savedCities')){
            savedCities.value = JSON.parse(localStorage.getItem('savedCities'));
            //this is where the rquest should be made to the open weather api 
            const request = []; //where the request will be stored
            savedCities.value.forEach((city) => {
                if (city.coords && city.coords.lat && city.coords.long) {
                    request.push(axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.long}&appid=9b95d9eefaa257d2924b4207a5d29cea&units=imperial`));
                }
            });
            const weatherData = await Promise.all(request);
            
            //Flicker Display
            await new Promise((res) => setTimeout(res, 1000));
            //used to match up the data thats in the saved cities array with the data that is returned from the api
            weatherData.forEach((value, index) =>{
                savedCities.value[index].weather = value.data;
            });
        }
    }
    await getCities();

    const router = useRouter();
    const goToCityView = (city) => {
    router.push({
        name: "cityView",
        params: { state: city.state, city: city.city },
        query: { id: city.id, lat: city.coords.lat, long: city.coords.long,},
    });
    };
</script>
