import { useId } from "react";
import { type Control, Controller } from "react-hook-form";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Values } from "./schema";

interface Option {
  value: string;
  title: string;
  description?: string;
}

interface ChoiceFieldProps {
  control: Control<Values>;
  name: "need" | "timing";
  legend: string;
  options: Option[];
  className?: string;
}

export const ChoiceField = ({
  control,
  name,
  legend,
  options,
  className,
}: ChoiceFieldProps) => {
  const id = useId();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FieldSet data-invalid={fieldState.invalid}>
          <FieldLegend variant="label">{legend}</FieldLegend>
          <RadioGroup
            aria-invalid={fieldState.invalid}
            className={className}
            name={field.name}
            // A pick is a full answer, so it re-checks the error right away.
            onValueChange={(value) => {
              field.onChange(value);
              field.onBlur();
            }}
            value={field.value}
          >
            {options.map((option) => (
              <FieldLabel
                className="has-data-checked:border-violet-400 has-data-checked:bg-violet-400/15"
                htmlFor={`${id}-${option.value}`}
                key={option.value}
              >
                <Field
                  className="p-4"
                  data-invalid={fieldState.invalid}
                  orientation="horizontal"
                >
                  <FieldContent>
                    <FieldTitle>{option.title}</FieldTitle>
                    {option.description && (
                      <FieldDescription>{option.description}</FieldDescription>
                    )}
                  </FieldContent>
                  <RadioGroupItem
                    aria-invalid={fieldState.invalid}
                    id={`${id}-${option.value}`}
                    value={option.value}
                  />
                </Field>
              </FieldLabel>
            ))}
          </RadioGroup>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </FieldSet>
      )}
    />
  );
};
