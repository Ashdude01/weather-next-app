import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import Link from "next/link";

const Slug = () => {
  const router = useRouter();
  const { lat, lon } = router.query;
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&cnt=5&appid=${process.env.NEXT_PUBLIC_API_KEY}`;

  useEffect(() => {
      axios
        .get(url)
        .then(function (response) {
          // handle success
          setData(response.data);
        })
        .catch(function (error) {
          // handle error
          setError(error);
        });
    // setData(json);
    console.log(data);
  }, [0]);

  const searchCity = () => {
    router.push("/");
  };

  return (
    <>
      <Head>
        <title> Weather Today Forecast</title>
        <meta
          name="description"
          content="Get detailed forecast of weather today"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="bg-secondary-subtle bg-gradient">
        <div className="container">
          {error && error != null && (
            <div className="error py-5">
            <div className="alert alert-danger" role="alert">
              <h4 className="alert-heading">Error Occured!</h4>
              <p>{error.message}</p>
              <hr />
              <p className="mb-0">
                Contact us via{" "}
                <Link className="text-decoration-none" href="/contact">
                  this link
                </Link>
              </p>
            </div>
            </div>
          )}
          {data && data != null && data != undefined && (
            <div className="response">
              <div className="weather pt-5">
                <div className="left">
                  <div className="">
                    <div className="top">
                      <div className="name">
                        <p className="badge bg-warning fw-bold">
                          {new Date(data.list[0].dt * 1000)
                            .toUTCString()
                            .slice(0, 11)}
                        </p>
                        <h1 className="fw-bold">
                          {data.city.name} {"  "}
                          <span className="country badge rounded-pill bg-danger fs-6">
                            {data.city.country}
                          </span>
                        </h1>

                        <p className="text-success">
                          Feels like:{" "}
                          <b>
                            {Math.floor(data.list[0].main.feels_like) +
                              "°celcius"}
                          </b>
                        </p>
                      </div>
                      <div className="nameRight pe-4">
                        {/* <i
                        onClick={() => router.push("/")}
                        className="bi bi-search fw-bold bg-primary"
                      ></i> */}
                        {/* <i
                        onClick={() =>
                          addFavourate(
                            data.city.id,
                            data.city.name,
                            data.city.coord.lat,
                            data.city.coord.lon
                          )
                        }
                        className={"bi bi-heart" + fill + "fw-bold text-danger"}
                      ></i> */}
                      </div>
                    </div>
                    <div className="wDetails my-5">
                      <div className="wbox">
                        <i className="bi bi-droplet-half"></i>
                        <div className="bright">
                          <span>Humidity</span>
                          <p className="value my-0 fw-bold fs-4">
                            {data.list[0].main.humidity}
                            <span className="fs-6">%</span>
                          </p>
                        </div>
                      </div>
                      <div className="wbox">
                        <i className="bi bi-wind"></i>
                        <div className="bright">
                          <span>Wind</span>
                          <p className="value my-0 fw-bold fs-4">
                            {data.list[0].wind.speed}
                            <span className="fs-6">m/s</span>
                          </p>
                        </div>
                      </div>
                      <div className="wbox">
                        <i className="bi bi-clouds-fill"></i>
                        <div className="bright">
                          <span>Clouds</span>
                          <p className="value my-0 fw-bold fs-4">
                            {data.list[0].clouds.all}
                            <span className="fs-6">%</span>
                          </p>
                        </div>
                      </div>
                      <div className="wbox">
                        <i className="bi bi-emoji-sunglasses-fill"></i>
                        <div className="bright">
                          <span>Visibility</span>
                          <p className="value my-0 fw-bold fs-4">
                            {data.list[0].visibility/1000}
                            <span className="fs-6">km</span>
                          </p>
                        </div>
                      </div>
                      <div className="wbox">
                        <i className="bi bi-umbrella-fill"></i>
                        <div className="bright">
                          <span>Precipitation</span>
                          <p className="value my-0 fw-bold fs-4">
                            {(data.list[0].pop / 1) * 100}
                            <span className="fs-6">%</span>
                          </p>
                        </div>
                      </div>
                      <div className="wbox">
                        <i className="bi bi-speedometer"></i>
                        <div className="bright">
                          <span>Pressure</span>
                          <p className="value my-0 fw-bold fs-4">
                            {data.list[0].main.pressure}
                            <span className="fs-6">hpa</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="right text-center bg-success-subtle bg-gradient">
                  <span
                    style={{ width: "fit-content" }}
                    className="badge rounded-pill bg-primary"
                  >
                    <i class="bi bi-arrow-clockwise"></i> {new Date(data.list[0].dt * 1000).toLocaleTimeString(
                      "en-IN",
                      { hour: "numeric", minute: "numeric", hour12: true }
                    )}
                  </span>
                  {data.list[0].weather.map((climate) => {
                    return (
                      <>
                        <img
                          src={
                            "https://openweathermap.org/img/wn/" +
                            climate.icon +
                            "@4x.png"
                          }
                          alt="weather forecast"
                        />
                        <p className="weatherDesc fw-bold">
                          {climate.main}, <span>{climate.description}</span>
                        </p>
                      </>
                    );
                  })}

                  <p className="temp fw-bold text-danger">
                    {Math.floor(data.list[0].main.temp) + "°c"}
                  </p>
                  <p className="tempd">
                    <span>
                      <i className="bi bi-caret-down-fill text-primary"></i>
                      {Math.floor(data.list[0].main.temp_min)}°c
                    </span>
                    <span>
                      <i className="bi bi-caret-up-fill text-danger"></i>
                      {Math.floor(data.list[0].main.temp_max)}°c
                    </span>
                  </p>
                </div>
              </div>
              {/* Sunrise & Sunset */}
              <div className="sundiv mb-5">
                {/* <h5 className="fw-bold">Sunrise & Sunset</h5> */}
                <div className="sun">
                  <div className="sunbox">
                    <i className="bi bi-sunrise-fill text-warning"></i>
                    <div className="bright">
                      <span>Sunrise</span>
                      <p className="value fw-bold fs-4">
                        {new Date(
                          data.city.sunrise * 1000
                        ).toLocaleTimeString("en-IN", {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="sunbox">
                    <i className="bi bi-sunset-fill text-warning"></i>
                    <div className="bright">
                      <span>Sunset</span>
                      <p className="value my-0 fw-bold fs-4">
                        {new Date(
                          data.city.sunset * 1000
                        ).toLocaleTimeString("en-IN", {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Today Forecast */}
              <div className="forecast">
                {/* <h5 className="fw-bold my-3">Forecast</h5> */}
                <ul
                  className="nav nav-pills mb-3"
                  id="pills-tab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="today-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#today"
                      type="button"
                      role="tab"
                      aria-controls="today"
                      aria-selected="true"
                    >
                      Today
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="pills-contact-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-contact"
                      type="button"
                      role="tab"
                      aria-controls="pills-contact"
                      aria-selected="false"
                    >
                      Next 3-Hours
                    </button>
                  </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="today"
                    role="tabpanel"
                    aria-labelledby="today-tab"
                    tabIndex="0"
                  >
                    <div className="mainDiv text-dark">
                      <div className="centerDiv">
                        <div className="mycarousel-item bg-success-subtle">
                          <i className="bi bi-sunrise-fill text-primary"></i>
                          <span
                            style={{ width: "fit-content" }}
                            className="badge rounded-pill bg-primary text-light"
                          >
                            Morning
                          </span>
                          <p>{Math.floor(data.list[0].main.temp)-6}°c</p>
                        </div>
                        <div className="mycarousel-item bg-success-subtle">
                          <i className="bi bi-brightness-high-fill text-warning"></i>
                          <span
                            style={{ width: "fit-content" }}
                            className="badge rounded-pill bg-warning text-light"
                          >
                            Afternoon
                          </span>
                          <p>{Math.floor(data.list[0].main.temp)+2}°c</p>
                        </div>
                        <div className="mycarousel-item bg-success-subtle">
                          <i className="bi bi-sunset-fill text-danger"></i>
                          <span
                            style={{ width: "fit-content" }}
                            className="badge rounded-pill bg-danger text-light"
                          >
                            Evening
                          </span>
                          <p>{Math.floor(data.list[0].main.temp)-3}°c</p>
                        </div>
                        <div className="mycarousel-item bg-success-subtle">
                          <i className="bi bi-moon-stars-fill"></i>
                          <span
                            style={{ width: "fit-content" }}
                            className="badge rounded-pill bg-dark text-light"
                          >
                            Night
                          </span>
                          <p>{Math.floor(data.list[0].main.temp)-8}°c</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-contact"
                    role="tabpanel"
                    aria-labelledby="pills-contact-tab"
                    tabIndex="0"
                  >
                    <div className="tableDiv">
                      <div className="tablebox">
                        <table className="table table-hover">
                          <tbody>
                            {data.list &&
                              data.list != null &&
                              data.list.map((item, index) => {
                                return (
                                  <tr key={index} className="">
                                    <td>
                                      <div className="wbox">
                                        <div className="bright">
                                          <span>{new Date(item.dt * 1000)
                                              .toUTCString()
                                              .slice(5, 11)}</span>
                                          <p className="fw-bold">
                                            {new Date(item.dt * 1000)
                                              .toLocaleTimeString("en-IN", {
                                                hour: "numeric",
                                                minute: "numeric",
                                                hour12: true,
                                              })}
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                    {/* <td>
                                      <div className="wbox">
                                        <i className="bi bi-sunrise-fill text-warning bg-transparent fs-2"></i>
                                        <div className="bright">
                                          <span>Sunrise</span>
                                          <p className="fw-bold">
                                            {new Date(
                                              data.city.sunrise * 1000
                                            ).toLocaleTimeString("en-IN", {
                                              hour: "numeric",
                                              minute: "numeric",
                                              hour12: true,
                                            })}
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="wbox">
                                        <i className="bi bi-sunset-fill text-warning bg-transparent fs-2"></i>
                                        <div className="bright">
                                          <span>Sunset</span>
                                          <p className="fw-bold">
                                            {new Date(
                                              data.city.sunset * 1000
                                            ).toLocaleTimeString("en-IN", {
                                              hour: "numeric",
                                              minute: "numeric",
                                              hour12: true,
                                            })}
                                          </p>
                                        </div>
                                      </div>
                                    </td> */}
                                    <td>
                                      <div className="wbox">
                                        <div className="bright">
                                          <span>Temprature</span>
                                          <p>
                                            <span className="fw-bold fs-5 text-danger">
                                              {Math.floor(item.main.temp_max)}°c
                                            </span>{" "}
                                            <span className="text-primary">
                                              {Math.floor(item.main.temp_min)}°c
                                            </span>
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <img
                                        src={
                                          "https://openweathermap.org/img/wn/" +
                                          item.weather[0].icon +
                                          "@2x.png"
                                        }
                                        alt="10 day weather forecast"
                                      />
                                    </td>
                                    <td>
                                      <div className="wbox">
                                        <div className="bright">
                                          <span>Precipitation</span>
                                          <p className="value my-0 fw-bold fs-4">
                                            {(data.list[0].pop / 1) * 100}
                                            <span className="fs-6">%</span>
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="wbox">
                                        {/* <i className="bi bi-wind bg-secondary"></i> */}
                                        <div className="bright">
                                          <span>Wind</span>
                                          <p className="value my-0 fw-bold fs-4">
                                            {data.list[0].wind.speed}
                                            <span className="fs-6">m/s</span>
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="wbox">
                                        {/* <i className="bi bi-droplet-half bg-primary"></i> */}
                                        <div className="bright">
                                          <span>Humidity</span>
                                          <p className="value my-0 fw-bold fs-4">
                                            {data.list[0].main.humidity}
                                            <span className="fs-6">%</span>
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="wbox">
                                        {/* <i className="bi bi-droplet-half bg-primary"></i> */}
                                        <div className="bright">
                                          <span>Visibility</span>
                                          <p className="value my-0 fw-bold fs-4">
                                            {data.list[0].visibility/1000}
                                            <span className="fs-6">km</span>
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Slug;
