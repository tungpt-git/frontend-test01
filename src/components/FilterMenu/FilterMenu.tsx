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
import { clearFilter, updateFilter } from "../../store/actions/filter";
import { formatKB, milisec2Minutes } from "../../utils/helpers";
import {
  DURATION_MAX,
  DURATION_MIN,
  SIZE_MAX,
  SIZE_MIN,
} from "../../store/reducers/filter";
import { searchVideos } from "../../store/actions/videos";

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

  const { filter, query } = useSelector((store: IStore) => store);
  const dispatch = useDispatch();

  const {
    durationRange,
    category,
    broadCastDateFrom,
    broadCastDateTo,
    sizeRange,
    broadCastTime,
  } = filter;

  const [duration, setDuration] = React.useState<number[]>(durationRange);
  const [size, setSize] = React.useState<number[]>(sizeRange);

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
    setDuration(newValue as number[]);
  };

  const handleDurationCommited = (event: any, newValue: number | number[]) => {
    update("durationRange", newValue as number[]);
  };

  const handleSizeChange = (event: any, newValue: number | number[]) => {
    setSize(newValue as number[]);
  };

  const handleSizeCommited = (event: any, newValue: number | number[]) => {
    update("sizeRange", newValue as number[]);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    update("category", event.target.value as string[]);
  };

  const handleDateChange = (key: keyof IFilter, date: Date | null) => {
    update(key, date);
  };

  const onApply = (e: React.MouseEvent) => {
    dispatch(searchVideos(query, filter));
    props.onClose(e);
  };

  const onReset = (e: React.MouseEvent) => {
    dispatch(clearFilter());
    dispatch(searchVideos(query));
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
      {/* <Grid item>
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
      </Grid> */}
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
        <Typography variant="subtitle2">{copy.broadCastDate}</Typography>
        <KeyboardDatePicker
          inputVariant="outlined"
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-from"
          value={broadCastDateFrom}
          onChange={(d) => handleDateChange("broadCastDateFrom", d)}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
        <KeyboardDatePicker
          inputVariant="outlined"
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-to"
          value={broadCastDateTo}
          onChange={(d) => handleDateChange("broadCastDateTo", d)}
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
            value={duration}
            onChange={handleDurationChange}
            onChangeCommitted={handleDurationCommited}
            valueLabelDisplay="off"
            aria-labelledby="range-slider"
            marks={duration.map((value) => ({
              value,
              label: milisec2Minutes(value * 1000),
            }))}
          />
        </Grid>
      </Grid>
      {/* <Grid item>
        <Typography variant="subtitle2">{copy.size}</Typography>
        <Grid style={{ margin: "0 20px" }}>
          <Slider
            min={SIZE_MIN}
            max={SIZE_MAX}
            value={size}
            onChange={handleSizeChange}
            onChangeCommitted={handleSizeCommited}
            valueLabelDisplay="off"
            aria-labelledby="range-slider"
            marks={size.map((value) => ({ value, label: formatKB(value) }))}
          />
        </Grid>
      </Grid> */}
    </FilterMenuContainer>
  );
}
