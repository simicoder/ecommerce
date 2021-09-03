import { useProduct } from 'context/ProductContext';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    item: {
      width: '80%',
      margin: theme.spacing(2),
    },
  }),
);

interface Props {
  children: React.ReactElement;
  open: boolean;
  value: number;
}

function ValueLabelComponent(props: Props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

export const Preferences = () => {
  const {
    price,
    minPrice,
    maxPrice,
    handleChangePrice,
    searchQuery,
    handleChangeSearchQuery,
    handleSelectCategories,
    productsCategories,
    selectedCategory,
  } = useProduct();

  const classes = useStyles();

  return (
    <Grid justifyContent="center" container>
      <Grid xs={12} md={3} item justifyContent="center" container>
        <Input
          className={classes.item}
          value={searchQuery}
          onChange={handleChangeSearchQuery}
          placeholder="Search"
        />
      </Grid>
      <Grid xs={12} md={3} item justifyContent="center" container>
        <FormControl className={classes.item}>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCategory}
            onChange={handleSelectCategories}
          >
            {productsCategories.map((category) => (
              <MenuItem value={category}>{category}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid xs={10} md={3} item justifyContent="center" container>
        <Typography gutterBottom>Max Price: ${price}</Typography>

        <Slider
          value={price}
          step={1}
          min={minPrice}
          max={maxPrice}
          onChange={handleChangePrice}
          ValueLabelComponent={ValueLabelComponent}
          aria-label="custom thumb label"
        />
      </Grid>
    </Grid>
  );
};
