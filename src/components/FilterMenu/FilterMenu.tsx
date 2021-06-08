import React from "react";
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  Slider as S,
  Typography,
  withStyles,
} from "@material-ui/core";
import strings from "../../utils/strings";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { useDispatch, useSelector } from "react-redux";
import { IFilter, IStore } from "../../utils/types";
import { updateFilter } from "../../store/actions/filter";
import { milisec2Minutes } from "../../utils/helpers";
import { DURATION_MAX, DURATION_MIN } from "../../store/reducers/filter";

const Slider = withStyles(() => ({
  root: {
    height: 4,
  },
  thumb: {
    width: 12,
    height: 12,
    marginTop: -4,
  },
  track: {
    height: 4,
  },
}))(S);

type Props = {
  onClose(event: React.KeyboardEvent | React.MouseEvent): void;
};

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

  const filter = useSelector((store: IStore) => store.filter);
  const dispatch = useDispatch();

  const { durationRange, category, uploadedDate, sizeRange, broadCastTime } =
    filter;

  const update = (key: keyof IFilter, value: any) => {
    dispatch(updateFilter({ [key]: value }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    update(
      "broadCastTime",
      checked
        ? [...broadCastTime, name]
        : broadCastTime.filter((i) => i !== name)
    );
  };

  const handleDurationChange = (event: any, newValue: number | number[]) => {
    update("durationRange", newValue as number[]);
  };

  const handleSizeChange = (event: any, newValue: number | number[]) => {
    update("sizeRange", newValue as number[]);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    update("category", event.target.value as string[]);
  };

  const handleDateChange = (date: Date | null) => {
    update("uploadedDate", date);
  };

  const onApply = (e: React.MouseEvent) => {
    props.onClose(e);
  };

  const onReset = (e: React.MouseEvent) => {
    props.onClose(e);
  };

  return (
    <FilterMenuContainer container spacing={3} direction="column">
      <Grid container item justify="space-between">
        <Button color="primary" variant="contained" onClick={onApply}>
          {copy.apply}
        </Button>
        <Button color="secondary" variant="contained" onClick={onReset}>
          {copy.reset}
        </Button>
      </Grid>
      <Grid item>
        <Typography variant="subtitle2">{copy.broadcastTime}</Typography>
        <Grid>
          {BROAD_CASTS.map((b) => (
            <FormControlLabel
              key={b.value}
              control={
                <Checkbox
                  color="primary"
                  name={b.value}
                  onChange={handleChange}
                  checked={broadCastTime.includes(b.value)}
                />
              }
              label={b.label}
            />
          ))}
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="subtitle2">{copy.category}</Typography>
        <Select
          variant="outlined"
          multiple
          multiline
          fullWidth
          value={category}
          onChange={handleCategoryChange}
          style={{ width: "350px" }}
        >
          {CATEGORIES.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item>
        <Typography variant="subtitle2">{copy.uploadedDate}</Typography>
        <KeyboardDatePicker
          inputVariant="outlined"
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
      <Grid item>
        <Typography variant="subtitle2">{copy.duration}</Typography>
        <Grid style={{ margin: "0 20px" }}>
          <Slider
            min={DURATION_MIN}
            max={DURATION_MAX}
            value={durationRange}
            onChange={handleDurationChange}
            valueLabelDisplay="off"
            aria-labelledby="range-slider"
            marks={durationRange.map((value) => ({
              value,
              label: milisec2Minutes(value * 1000),
            }))}
          />
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="subtitle2">{copy.size}</Typography>
        <Grid style={{ margin: "0 20px" }}>
          <Slider
            value={sizeRange}
            onChange={handleSizeChange}
            valueLabelDisplay="off"
            aria-labelledby="range-slider"
            marks={sizeRange.map((value) => ({ value, label: value }))}
          />
        </Grid>
      </Grid>
    </FilterMenuContainer>
  );
}
