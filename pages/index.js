import Head from "next/head";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [city, setCity] = useState(null);
  const [cityData, setCityData] = useState(null);
  // const [error, setError] = useState(null);

  const searchCity = (e) => {
    e.preventDefault();
    let getCityUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.NEXT_PUBLIC_API_KEY}`;
    axios
      .get(getCityUrl)
      .then(function (response) {
        // handle success
        setCityData(response.data);
      })
      .catch(function (error) {
        // handle error
        // setError(error);
        toast.error(error.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      });
    };
    

  return (
    <>
      <Head>
        <title>Weather App</title>
        <meta
          name="description"
          content="Weather App Developed by VermaTimes"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="container">
        
        <div className="text-center">
          <h1 className="my-5 fw-bold">Search City</h1>
          <form onSubmit={searchCity} className="input-group searchBar bg-success-subtle mb-3">
            <input
              onChange={(e) => setCity(e.target.value)}
              type="search"
              placeholder="Search city" className="bg-success-subtle fs-4"
            />
            <span className="input-group-text p-0 bg-success-subtle" id="basic-addon2">
              <i onClick={searchCity} className="bi bi-search"></i>
            </span>
          </form>
        </div>
        {cityData && cityData != null && (
          <ol className="list-group list-group-numbered">
            {cityData.map((city, index) => {
              return (
                <Link
                  className="text-decoration-none"
                  href={
                    "/city?lat=" +
                    city.lat.toFixed(2) +
                    "&lon=" +
                    city.lon.toFixed(2)
                  }
                  key={index}
                >
                  <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                    <div className="ms-2 me-auto">
                      <div className="fw-bold fs-4">
                        {city.name}{" "}
                        <span className="fs-6 fw-normal">{city.state}</span>
                      </div>
                      <span className="badge bg-primary">
                        Lat: {city.lat.toFixed(2)}
                      </span>{" "}
                      <span className="badge bg-danger">
                        Long: {city.lon.toFixed(2)}
                      </span>
                    </div>
                    <span className="badge bg-success rounded-pill fs-6">
                      {city.country}
                    </span>
                  </li>
                </Link>
              );
            })}
          </ol>
        )}
        <ToastContainer />
      </main>
    </>
  );
}
