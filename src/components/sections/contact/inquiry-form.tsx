"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { type SubmitEvent, useId, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useForm } from "react-hook-form";
import { Roll } from "@/components/reveal/roll";
import { Button } from "@/components/ui/button";
import { email } from "@/lib/site";
import { serif } from "@/lib/styles";
import { cn } from "@/lib/utils";
import { defaultValues, formSchema, type Values } from "./schema";
import { sendInquiry } from "./send-inquiry";
import { steps } from "./steps";

const focus = (element: HTMLElement | null) => element?.focus();

const panel = "light p-6 sm:p-10";

export const InquiryForm = () => {
  const formId = useId();
  const heading = useRef<HTMLHeadingElement>(null);
  const [current, setCurrent] = useState(steps[0]);
  const form = useForm<Values>({
    defaultValues,
    // Steps validate with trigger, so errors re-check once a field is left.
    mode: "onTouched",
    resolver: zodResolver(formSchema),
  });
  const { errors, isSubmitting, isSubmitSuccessful } = form.formState;
  const index = steps.indexOf(current);
  const previous = steps[index - 1];
  const next = steps[index + 1];

  // Render the new step first, so its heading exists to take focus.
  const goTo = (step: typeof current) => {
    flushSync(() => setCurrent(step));
    heading.current?.focus();
  };

  // A failed send keeps every answer, so retrying or emailing loses nothing.
  const send = async (values: Values) => {
    const { ok } = await sendInquiry(values);
    if (!ok) {
      form.setError("root", { message: "Your inquiry did not go through." });
    }
  };

  let label = "Send to the studio";
  if (isSubmitting) {
    label = "Sending";
  } else if (next) {
    label = "Continue";
  }

  const onSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const valid = await form.trigger(current.fields, { shouldFocus: true });
    if (!valid) {
      return;
    }
    if (next) {
      goTo(next);
    } else {
      await form.handleSubmit(send)();
    }
  };

  if (isSubmitSuccessful) {
    return (
      <div className={panel}>
        <h3
          className={cn(serif, "text-5xl leading-none outline-none")}
          ref={focus}
          tabIndex={-1}
        >
          Thank you, {form.getValues("name").split(" ")[0]}.
        </h3>
        <p className="mt-5 max-w-sm text-foreground/70 text-lg/relaxed">
          We will read this closely and reply within one working day with a few
          questions and times for a call.
        </p>
      </div>
    );
  }

  return (
    <div className={panel}>
      <div aria-hidden="true" className="flex gap-1.5">
        {steps.map((item, position) => (
          <span
            className={cn(
              "h-0.5 flex-1 bg-border transition-colors",
              position <= index && "bg-foreground",
            )}
            key={item.title}
          />
        ))}
      </div>
      <h3 className="mt-8 outline-none" ref={heading} tabIndex={-1}>
        <span className="block text-muted-foreground text-sm tabular-nums">
          Step {index + 1} of {steps.length}
        </span>
        <span className={cn(serif, "mt-3 block text-4xl leading-none")}>
          {current.title}
        </span>
      </h3>

      <form className="mt-8" id={formId} noValidate onSubmit={onSubmit}>
        <current.Fields control={form.control} />
      </form>

      {errors.root && (
        <p className="mt-8 text-destructive text-sm" role="alert">
          {errors.root.message} Try again, or write to{" "}
          <a className="font-medium underline" href={`mailto:${email}`}>
            {email}
          </a>
          .
        </p>
      )}

      <div className="mt-10 flex items-center gap-3">
        <p className="me-auto text-muted-foreground text-sm max-sm:hidden">
          {current.hint}
        </p>
        {previous && (
          <Button
            onClick={() => goTo(previous)}
            size="icon-lg"
            type="button"
            variant="outline"
          >
            <ArrowLeft />
            <span className="sr-only">Previous step</span>
          </Button>
        )}
        <Button
          className="max-sm:flex-1"
          disabled={isSubmitting}
          form={formId}
          size="lg"
          type="submit"
        >
          <Roll>{label}</Roll>
          <ArrowRight data-icon="inline-end" />
        </Button>
      </div>
      <p className="mt-6 text-muted-foreground text-sm">
        We only use these details to reply.{" "}
        <Link className="underline underline-offset-4" href="/privacy">
          Privacy policy
        </Link>
      </p>
    </div>
  );
};
