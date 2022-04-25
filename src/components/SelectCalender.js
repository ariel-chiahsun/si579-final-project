import React, { useState, useContext } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Calendar } from "react-date-range";
import { DateRangePicker, DateRange } from "react-date-range";
import { Typography , Box} from "@mui/material";
import { DateRangeContext } from "../App";

const SelectCalender = () => {
//   const [dateRange, setDateRange] = useState([
//     {
//       startDate: new Date(),
//       endDate: null,
//       key: "selection",
//     },
//   ]);
  const [dateRange, setDateRange]  = useContext(DateRangeContext)
  console.log(dateRange[0]["startDate"]);
  console.log(dateRange[0]["endDate"]);
  return (
    <Box sx={{ "& > :not(style)": {  paddingTop: "2em" } }}>
      <Typography variant="body" component="div" sx={{ flexGrow: 1 }}>
        Duration
      </Typography>
      <DateRange
        editableDateInputs={true}
        onChange={(item) => setDateRange([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={dateRange}
      />
    </Box>
  );
};

export default SelectCalender;
