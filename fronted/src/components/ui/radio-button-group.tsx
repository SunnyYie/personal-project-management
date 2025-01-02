import { RadioGroupProps } from "@radix-ui/react-radio-group";
import { RadioButton, RadioButtonProps } from "./radio-button";
import { RadioGroup } from "@/components/ui/radio-group";

export interface RadioButtonGroupProps extends RadioGroupProps {
  options: Omit<RadioButtonProps, "name">[];
  name: string;
}

export function RadioButtonGroup({
  options,
  className,
  name,
  ...props
}: RadioButtonGroupProps) {
  return (
    <RadioGroup className={className} {...props}>
      {options.map((option) => (
        <RadioButton key={option.value} name={name} {...option} />
      ))}
    </RadioGroup>
  );
}
