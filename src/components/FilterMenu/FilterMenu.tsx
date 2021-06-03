import React from "react";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Typography,
  withStyles,
} from "@material-ui/core";
import strings from "../../utils/strings";
import { KeyboardDatePicker } from "@material-ui/pickers";

type Props = any;

const FilterMenuContainer = withStyles((theme) => ({
  root: {
    width: 400,
    margin: 0,
  },
}))(Grid);

const BROAD_CASTS = [
  { label: "13h", value: "13h" },
  { label: "19h", value: "19h" },
  { label: "Khác", value: "other" },
];

const CATEGORIES = [
  { label: "Thời sự", value: "TS" },
  { label: "Radio 4 Teen", value: "R4T" },
  { label: "Thế giới mạng", value: "TGM" },
  { label: "Sóng trẻ", value: "ST" },
  { label: "Tôi yêu Hà Nội", value: "TYHN" },
];

export default function FilterMenu(props: Props) {
  const { filterMenu: copy } = strings;
  const [broadcastTime, setBroadcastTime] = React.useState<any>(
    BROAD_CASTS.reduce((acc, curr) => {
      return {
        ...acc,
        [curr.value]: false,
      };
    }, {})
  );

  const [durationRange, setDurationRange] = React.useState<number[]>([0, 100]);
  const [category, setCategory] = React.useState<any>();
  const [uploadedDate, setUploadedDate] = React.useState<Date | null>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBroadcastTime((state: any) => ({
      ...state,
      [event.target.name]: event.target.checked,
    }));
  };

  const handleDurationChange = (event: any, newValue: number | number[]) => {
    setDurationRange(newValue as number[]);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setCategory(event.target.value as string);
  };

  const handleDateChange = (date: Date | null) => {
    setUploadedDate(date);
  };

  return (
    <FilterMenuContainer container spacing={3} direction="column">
      <Grid item>
        <Typography>{copy.broadcastTime}</Typography>
        <Grid>
          {BROAD_CASTS.map((b) => (
            <FormControlLabel
              control={
                <Checkbox
                  name={b.value}
                  onChange={handleChange}
                  checked={broadcastTime[b.value]}
                />
              }
              label={b.label}
            />
          ))}
        </Grid>
      </Grid>
      <Grid item>
        <Typography>{copy.duration}</Typography>
        <Grid style={{ margin: "0 7px" }}>
          <Slider
            value={durationRange}
            onChange={handleDurationChange}
            valueLabelDisplay="off"
            aria-labelledby="range-slider"
            marks={durationRange.map((value) => ({ value, label: value }))}
          />
        </Grid>
      </Grid>
      <Grid item>
        <Typography>{copy.category}</Typography>
        <Select fullWidth value={category} onChange={handleCategoryChange}>
          {CATEGORIES.map((item) => (
            <MenuItem value={item.value}>{item.label}</MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item>
        <Typography>{copy.mc}</Typography>
      </Grid>
      <Grid item>
        <Typography>{copy.size}</Typography>
      </Grid>
      <Grid item>
        <Typography>{copy.uploadedDate}</Typography>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          value={uploadedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </Grid>
    </FilterMenuContainer>
  );
}
