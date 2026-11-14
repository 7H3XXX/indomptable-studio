import { useId } from "react";
import { type Control, Controller } from "react-hook-form";
import { Field, FieldTitle } from "@/components/ui/field";
import { Slider } from "@/components/ui/slider";
import { budgetRange, type Values } from "./schema";

const format = {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 0,
} satisfies Intl.NumberFormatOptions;

const currency = new Intl.NumberFormat("en-US", format);

const price = (value: number) =>
  value === budgetRange.max
    ? `${currency.format(value)}+`
    : currency.format(value);

export const BudgetField = ({ control }: { control: Control<Values> }) => {
  const id = useId();

  return (
    <Controller
      control={control}
      name="budget"
      render={({ field }) => (
        <Field>
          <div className="flex items-end justify-between gap-4">
            <FieldTitle id={id}>Budget</FieldTitle>
            <output
              aria-hidden="true"
              className="font-serif text-4xl tabular-nums leading-none"
            >
              {price(field.value[0])}
              <span className="px-2 text-muted-foreground">to</span>
              {price(field.value[1])}
            </output>
          </div>
          <Slider
            aria-labelledby={id}
            className="mt-4"
            format={format}
            locale="en-US"
            max={budgetRange.max}
            min={budgetRange.min}
            minStepsBetweenValues={2}
            name={field.name}
            onValueChange={field.onChange}
            step={budgetRange.step}
            value={field.value}
          />
          <div
            aria-hidden="true"
            className="flex justify-between text-muted-foreground text-xs tabular-nums"
          >
            <span>{price(budgetRange.min)}</span>
            <span>{price(budgetRange.max)}</span>
          </div>
        </Field>
      )}
    />
  );
};
