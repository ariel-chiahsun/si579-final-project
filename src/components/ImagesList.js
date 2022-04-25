import React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import { Typography } from "@mui/material";

const ImagesList = (props) => {
  console.log('gallery props', props)
  const {country, highlights, dateRange, data} = props
  console.log(dateRange[0]['startDate'])
  const startDate = new Date(dateRange[0]['startDate']);
  const endDate = new Date(dateRange[0]['endDate']);
  console.log('startDate', startDate)
  const options = {year: 'numeric', month: 'long', day: 'numeric' };
  console.log('startDate', startDate.toLocaleDateString('en-US', options));
  console.log('endDate', endDate.toLocaleDateString('en-US', options));
  const start= startDate.toLocaleDateString('en-US', options)
  const end=endDate.toLocaleDateString('en-US', options)
  console.log('highlights', highlights)
  console.log('image urls', data)

  const photo = data.map((imgUrl) => (
  
    <img
      src={imgUrl}
      style={{ width: "20rem" }}
      alt="uploadphoto"
      loading="lazy"
    />
  ));

  return (
    <Box sx={{ ml: 30, mr: 30, mt: 10 }}>
      <Box sx={{ height: 800, overflowY: "scroll"}}>
      <Typography variant="h4" sx={{mt:5}}>
        {country}
      </Typography>
      <Typography variant="h5"sx={{mt:5}}>
        From {start} to {end}
      </Typography>
      <Typography vairant="body" sx={{mt:2}}>
        {highlights}
      </Typography>
      <ImageList variant="masonry" cols={3} gap={40} sx={{mt:5}}>
      {photo}
      </ImageList>
    </Box>

    </Box>
    
  );
};

export default ImagesList;
