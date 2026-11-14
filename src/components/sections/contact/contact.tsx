import { RiseText } from "@/components/reveal/rise-text";
import { email } from "@/lib/site";
import { container, eyebrow, heading, section } from "@/lib/styles";
import { cn } from "@/lib/utils";
import { InquiryForm } from "./inquiry-form";

export const Contact = () => (
  <section className="scroll-mt-24" id="contact">
    <div
      className={cn(
        container,
        section,
        "grid gap-16 border-t lg:grid-cols-12 lg:gap-8",
      )}
    >
      <div className="self-start lg:col-span-5">
        <p className={eyebrow}>Book a call</p>
        <RiseText
          className={cn(heading, "mt-6")}
          text={[
            "Tell us about your",
            { text: "project.", em: true, className: "text-primary" },
          ]}
        />
        <p
          className="mt-8 max-w-md text-foreground/70 text-lg/relaxed"
          data-reveal="unblur"
        >
          A few details now save a whole meeting later. We come back with
          questions worth answering and a time to talk.
        </p>
        <div className="mt-12 border-t pt-8">
          <p className="text-muted-foreground text-sm">Prefer email</p>
          <a
            className="mt-2 inline-block text-2xl underline decoration-foreground/30 underline-offset-8 transition-colors hover:decoration-violet-400"
            href={`mailto:${email}`}
          >
            {email}
          </a>
        </div>
      </div>
      <div className="lg:col-span-6 lg:col-start-7">
        <InquiryForm />
      </div>
    </div>
  </section>
);
