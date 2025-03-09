import React, { useState } from "react";
import { countries } from "../../data/countries";
import styles from "./Form.module.css";
import { SearchType } from "../../types";
import Alert from "../Alert/Alert";

type FormProps = {
    fetchWeather: (search: SearchType) => Promise<void>
}

export default function Form({fetchWeather} : FormProps) {


    const [search, setSearch] = useState<SearchType>({
        city: "",
        country: "",
    });

    const [alert, setAlert] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (Object.values(search).includes("")) {
            setAlert("Todos los campos son abligatorios");
            return;
        }

        setAlert('')
        fetchWeather(search)
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>

            {alert && <Alert>{alert}</Alert>}

            <div className={styles.field}>
                <label htmlFor="city">Ciudad</label>

                <input
                    onChange={handleChange}
                    value={search.city}
                    type="text"
                    id="city"
                    name="city"
                    placeholder="Ciudad"
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="country">País</label>

                <select
                    onChange={handleChange}
                    value={search.country}
                    name="country"
                    id="country"
                >
                    <option value="">-- Seleccione un País ---</option>
                    {countries.map((country) => (
                        <option key={country.code} value={country.code}>
                            {country.name}
                        </option>
                    ))}
                </select>
            </div>

            <input
                className={styles.submit}
                type="submit"
                value="Consultar Clima"
            />
        </form>
    );
}
