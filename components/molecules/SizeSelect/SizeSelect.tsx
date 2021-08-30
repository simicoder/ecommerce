import { memo, useEffect } from 'react';
import { ProductSizes } from 'lib/utils/consts';
import { useProduct } from 'context/ProductContext';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

type SizeSelectProps = {
  readonly name?: string;
  readonly onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SizeSelect = memo<SizeSelectProps>(({ onChange }) => {
  const { activeProductSize, setActiveProductSize } = useProduct();

  useEffect(() => {
    return () => {
      setActiveProductSize('S');
    };
  }, []);
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Sizes</FormLabel>
      <RadioGroup
        aria-label="gender"
        name="gender1"
        value={ProductSizes[0].label}
        onChange={onChange}
      >
        {ProductSizes.map((size) => {
          return (
            <div>
              <FormControlLabel
                value={size.label}
                checked={activeProductSize === size.label}
                control={<Radio />}
                label={size.label}
              />
            </div>
          );
        })}
      </RadioGroup>
    </FormControl>
  );
});

SizeSelect.displayName = 'SizeSelect';
