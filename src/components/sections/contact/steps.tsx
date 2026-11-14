import { type ComponentProps, type ReactNode, useId } from "react";
import { type Control, Controller } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BudgetField } from "./budget-field";
import { ChoiceField } from "./choice-field";
import type { Values } from "./schema";

interface StepProps {
  control: Control<Values>;
}

const needs = [
  {
    value: "ai",
    title: "AI and automation",
    description: "Agents, workflows, integrations",
  },
  {
    value: "web",
    title: "Website or commerce",
    description: "Marketing site, store, marketplace",
  },
  {
    value: "platform",
    title: "Platform or data",
    description: "Internal tools, portals, dashboards",
  },
  {
    value: "transformation",
    title: "Full transformation",
    description: "Strategy, stack and execution",
  },
];

const timings = [
  { value: "now", title: "This quarter" },
  { value: "next", title: "Next quarter" },
  { value: "exploring", title: "Still scoping" },
];

type TextFieldProps = StepProps &
  ComponentProps<typeof Input> & {
    name: "name" | "email" | "company";
    label: string;
  };

const TextField = ({ control, name, label, ...props }: TextFieldProps) => {
  const id = useId();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={id}>{label}</FieldLabel>
          <Input
            {...field}
            {...props}
            aria-describedby={fieldState.invalid ? `${id}-error` : undefined}
            aria-invalid={fieldState.invalid}
            className="h-12 text-base"
            id={id}
          />
          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} id={`${id}-error`} />
          )}
        </Field>
      )}
    />
  );
};

const ContactStep = ({ control }: StepProps) => (
  <FieldGroup>
    <TextField
      autoComplete="name"
      control={control}
      label="Your name"
      name="name"
    />
    <div className="grid gap-6 sm:grid-cols-2 sm:gap-4">
      <TextField
        autoComplete="email"
        control={control}
        label="Work email"
        name="email"
        type="email"
      />
      <TextField
        autoComplete="organization"
        control={control}
        label="Company"
        name="company"
      />
    </div>
  </FieldGroup>
);

const NeedStep = ({ control }: StepProps) => (
  <ChoiceField
    className="sm:grid-cols-2"
    control={control}
    legend="What you need"
    name="need"
    options={needs}
  />
);

const BudgetStep = ({ control }: StepProps) => (
  <FieldGroup>
    <BudgetField control={control} />
    <ChoiceField
      className="sm:grid-cols-3"
      control={control}
      legend="Start"
      name="timing"
      options={timings}
    />
  </FieldGroup>
);

const DetailsStep = ({ control }: StepProps) => {
  const id = useId();

  return (
    <Controller
      control={control}
      name="details"
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={id}>
            Where it hurts today
            <span className="font-normal text-muted-foreground">
              (optional)
            </span>
          </FieldLabel>
          <Textarea
            {...field}
            aria-describedby={fieldState.invalid ? `${id}-error` : undefined}
            aria-invalid={fieldState.invalid}
            className="min-h-36 text-base"
            id={id}
            placeholder="Orders still come in by email and get typed into three different tools by hand."
          />
          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} id={`${id}-error`} />
          )}
        </Field>
      )}
    />
  );
};

interface Step {
  title: string;
  hint: string;
  fields: (keyof Values)[];
  Fields: (props: StepProps) => ReactNode;
}

export const steps: [Step, ...Step[]] = [
  {
    title: "Who are we talking to?",
    hint: "Four short steps",
    fields: ["name", "email", "company"],
    Fields: ContactStep,
  },
  {
    title: "Where should we start?",
    hint: "Pick the closest, we refine it together",
    fields: ["need"],
    Fields: NeedStep,
  },
  {
    title: "Budget and timing",
    hint: "A rough range is enough",
    fields: ["budget", "timing"],
    Fields: BudgetStep,
  },
  {
    title: "Tell us what is in the way",
    hint: "Read by people, not a sales bot",
    fields: ["details"],
    Fields: DetailsStep,
  },
];
