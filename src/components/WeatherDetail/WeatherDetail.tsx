import { formatTemperature } from '../../helpers'
import { Weather } from '../../hooks/useWeather'
import styles from './WeatherDetail.module.css'

type WeatherDetailProps = {
    weather: Weather
}

export default function WeatherDetail({ weather } : WeatherDetailProps) {
  return (
      <div className={styles.container}>
          <h2>Clima en {weather.name}</h2>
          <p className={styles.current}>{formatTemperature(weather.main.temp)}&deg;C</p>

          <div className={styles.temperatures}>
            <p>Min: <span>{formatTemperature(weather.main.temp_min)}&deg;C</span></p>
            <p>Max: <span>{formatTemperature(weather.main.temp_max)}&deg;C</span></p>
          </div>
      </div>
  );
}
