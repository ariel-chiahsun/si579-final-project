import React from "react";
import { useEffect, useState } from "react";
import { storage } from "../firebase";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  listAll,
} from "firebase/storage";
import { Add, TextFieldsOutlined } from "@mui/icons-material";
import { Fab, Input, Button, Typography, Box, TextField } from "@mui/material";

import SelectCalender from "./SelectCalender";
import { useNavigate } from "react-router-dom";
import { setDate } from "date-fns";

const PhotoForm = (props) => {
  console.log("photoForm props", props);
  const { setData, setCountry, setHighlights , country, data} = props;
  console.log('photoForm country', country)
  const navigate = useNavigate();
  // const [country, setCountry] = useState("");
  // const [highlights, setHighlights] = useState("");

  // const { setData } = props;
  const [imgUrl, setImgUrl] = useState([]);
  const [progress, setProgress] = useState(0);
  const [files, setFiles] = useState(null);
  const [urls, setUrls] = useState([]);

  const handleOnchange = (e) => {
    setFiles([...e.target.files]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!country || !highlights || !files) return;
    // // 1) keep track of text fields

    // console.log(country, highlights);

    // 2)upload photos to firebase storage
    if (!files) return;
    setData([])
    const promises = [];
    files.map((file) => {
      const sotrageRef = ref(storage, `files/${country}/${file.name}`);
      const uploadTask = uploadBytesResumable(sotrageRef, file);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(prog);
        },
        (error) => console.log(error),
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURLs) => {
            console.log("downloadURLs:", downloadURLs);
            setImgUrl((prevState) => [...prevState, downloadURLs]);
            console.log("File available at", downloadURLs);
          });
        }
      );
    });

    Promise.all(promises).then((err) => console.log(err));
  };

  // List All Files
  const listItem = () => {
    const listRef = ref(storage, `files/${country}/`);
    listAll(listRef)
      .then((res) => {
        res.items.forEach((item) => {
          getDownloadURL(ref(storage, `files/${country}/${item.name}`)).then((url) => {
            console.log(url);
            setData((arr) => [...arr, url]);
          });
        });
      })
      .then( ()=>{
        navigate("/gallery");
      }
        
        )
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Box sx={{ ml: 20, mr: 20, mt: 10 }}>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Destination
      </Typography>
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1, width: "60ch" } }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="country"
          label="Country"
          variant="standard"
          margin="normal"
          required
          onChange={(e) => setCountry(e.target.value)}
        />

        <SelectCalender />
        <TextField
          id="highlights"
          label="Highlights"
          variant="outlined"
          multiline
          rows={4}
          placeholder="Share your experience"
          fullWidth
          margin="normal"
          required
          onChange={(e) => setHighlights(e.target.value)}
        />
      </Box>

      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, mt: 10, mb: 2 }}
      >
        Upload Images
      </Typography>
      <Box>
        <form onSubmit={handleSubmit} className="form">
          <Input
            type="file"
            inputProps={{ multiple: true }}
            onChange={handleOnchange}
          />
          <Button type="submit" variant="outlined" size="small">
            Upload
          </Button>

          {/* <button onClick={listItem}>Submit</button> */}
        </form>
        <Typography variant="body" component="div" sx={{ flexGrow: 1, mt: 2 }}>
          {!imgUrl.length && (
            <div className="outerbar">
              <div className="innerbar" style={{ width: `${progress}%` }}>
                {progress}%
              </div>
            </div>
          )}
        </Typography>
      </Box>

      <Button
        type="submit"
        variant="contained"
        size="large"
        color="primary"
        onClick={listItem}
        sx={{ flexGrow: 1, mt: 10 }}
      >
        Post
      </Button>
    </Box>
  );
};

export default PhotoForm;
