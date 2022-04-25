
import React, { useEffect, useState } from "react";
import { storage } from "./firebase";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  listAll,
} from "firebase/storage";
import { Add, TextFieldsOutlined } from "@mui/icons-material";
import { Fab, Input, Button } from "@mui/material";
import { async } from "@firebase/util";
import PhotoForm from "./components/PhotoForm";
import { Navbar } from "./components/Navbar";
import ImagesList from "./components/ImagesList";
import { Routes, Route } from "react-router-dom";
import Gallery from "./components/Gallery";
import { da, hi } from "date-fns/locale";

export const DateRangeContext = React.createContext();

function App() {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const [country, setCountry] = useState("");
  const [highlights, setHighlights] = useState("");

  const [data, setData] = useState([]);


  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Gallery/>}/>
        <Route path="/gallery" element={<ImagesList country={country} highlights={highlights} dateRange={dateRange} data={data} />} />
        <Route
          path="/create"
          element={
            <DateRangeContext.Provider value={[dateRange, setDateRange]}>
              <PhotoForm setData={setData} setCountry={setCountry} setHighlights={setHighlights} country={country} data={data}/>
            </DateRangeContext.Provider>
          }
        />
        
      </Routes>

      
    </>
  );
}
export default App;
