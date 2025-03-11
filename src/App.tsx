import styles from "./App.module.css";
import Alert from "./components/Alert/Alert";
import Form from "./components/Form/Form";
import Spiner from "./components/Spiner/Spiner";
import WeatherDetail from "./components/WeatherDetail/WeatherDetail";
import useWeather from "./hooks/useWeather";

function App() {
    const { fetchWeather, notFound, weather, loading, hasWeatherData } = useWeather();

    return (
        <>
            <h1 className={styles.title}>Buscador de clima</h1>

            <div className={styles.container}>
                <Form fetchWeather={fetchWeather} />
                {loading && (
                    <Spiner />
                )}
                {notFound && <Alert>Ciudad no encontrada</Alert>}
                {hasWeatherData && <WeatherDetail weather={weather} />}
            </div>
        </>
    );
}

export default App;
