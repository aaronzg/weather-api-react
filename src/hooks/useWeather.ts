import axios from "axios";
import { SearchType } from "../types";
import {object, string, number, parse, InferOutput} from 'valibot'
import { useMemo, useState } from "react";

// Type Asertion Guards

// function isWeatherResponse (weather : unknown ) : weather is Weather {
//     return (
//         Boolean(weather) &&
//         typeof weather === 'object' &&
//         typeof (weather as Weather).name === 'string' &&
//         typeof (weather as Weather).main.temp === 'number' &&
//         typeof (weather as Weather).main.temp_min === 'number' &&
//         typeof (weather as Weather).main.temp_max === 'number'
//     )
// }

// Zod

// const Weather = z.object({
//     name: z.string(),
//     main: z.object({
//         temp: z.number(),
//         temp_max: z.number(),
//         temp_min: z.number()
//     })
// })

// type Weather = z.infer<typeof Weather>

// Valibot

const WeatherSchema = object({
    name: string(),
    main: object({
        temp: number(),
        temp_max: number(),
        temp_min: number(),
    })
})

const initialState = {
    name: "",
    main: {
        temp: 0,
        temp_max: 0,
        temp_min: 0,
    },
}

export type Weather = InferOutput<typeof WeatherSchema>


const useWeather = () => {

    const [weather, setWeather] = useState<Weather>(initialState)
    const [notFound, setNotFound] = useState(false)
    const [loading, setLoading] = useState(false)

    const fetchWeather = async (search: SearchType) => {
        const appId = import.meta.env.VITE_API_KEY;
        setWeather(initialState)
        setLoading(true)

        try {
            const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`;
            
            const data = await axios(geoURL);
            
            if(!data.data[0]) {
                console.log('Ciudad nose')
                setNotFound(true)
                return
            }

            const {lat, lon} = data.data[0]

            const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;
            
            const {data: weatherResult} = await axios(weatherURL)

            // Casteando el type

            // console.log(weatherResult)

            // const { data: weatherResult } = await axios(weatherURL);
            // const result = isWeatherResponse(weatherResult) 

            // if(result) {
            //     console.log(weatherResult.main)
            // }

            // Zod

            // const result = Weather.safeParse(weatherURL)

            // if(result.success) {
            //     console.log(result.data.main.temp)
            // }

            // Valibot
            const result = parse(WeatherSchema, weatherResult)

            if(result) {
                setWeather(result)
                setNotFound(false)
            }
            
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    };

    const hasWeatherData = useMemo(() => weather.name ,[weather])

    return {
        fetchWeather,
        weather,
        hasWeatherData, 
        loading,
        notFound
    };
};

export default useWeather;
