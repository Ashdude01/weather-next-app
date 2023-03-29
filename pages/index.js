import Head from "next/head";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../firebase";
import {doc, getDocs, deleteDoc, collection } from "firebase/firestore";

export default function Home({ip, setFav}) {
  const [city, setCity] = useState(null);
  const [cityData, setCityData] = useState(null);
  const [favlist, setFavlist] = useState(setFav);

  
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
        toast.error(error.message);
      });
    };
    
const deleteFav = async (id) =>{
  await deleteDoc(doc(db,'user', `${ip}`, "favourite", `${id}`)).then(toast.success('City deleted from favourites'));
  const docSnap = await getDocs(
    collection(db, "user", `${ip}`, "favourite")
  );
  setFavlist(docSnap.docs.map((doc) => doc.data()));
}
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
        
          <div className="favourite d-flex justify-content-center my-4 flex-wrap w-100">
            {favlist && favlist != null && favlist.map((doc, index)=>{
              return <div key={index} className="wbox py-2 px-3 bg-secondary-subtle rounded m-2">
                        <i className="bi bi-heart-fill bg-transparent fs-3 text-danger"></i>
                        <div className="bright">
                        <Link href={`/city?lat=${doc.city_lat}&lon=${doc.city_lon}`} className='text-decoration-none fs-5 fw-bold'>
                          {doc.city_name}, 
                            <span className="fs-6 fw-thin"> {doc.country}</span>
                            </Link>
                          <span className="">{doc.id}</span>
                        </div>
                        <div className="action ms-3 align-self-end">
                        <i onClick={()=>deleteFav(doc.id)} style={{cursor:"pointer"}} className="bi bi-trash3-fill text-black "></i>
                        </div>
                      </div>
            
            })}
          </div>
          <h2 className="mt-5 mb-3 fw-bold text-center">Search City</h2>
          <form onSubmit={searchCity} className="input-group searchBar bg-success-subtle mb-3">
            <input
              onChange={(e) => setCity(e.target.value)}
              type="search"
              placeholder="Search city" className="bg-success-subtle fs-5"
            />
            <span className="input-group-text p-0 bg-success-subtle" id="basic-addon2">
              <i onClick={searchCity} className="bi bi-search"></i>
            </span>
          </form>
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
        <ToastContainer
        position="bottom-right"
autoClose={1000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch("https://checkip.amazonaws.com/");
  const ip2 = await res.text();
  const ip = await JSON.parse(JSON.stringify(ip2));
  let setFav = null;
  const docSnap = await getDocs(
    collection(db, "user", `${ip}`, "favourite")
  );
  setFav = docSnap.docs.map((doc) => doc.data());
  return {
    props: {ip, setFav}, // will be passed to the page component as props
  };
}