# Indomptable

Marketing site for Indomptable, a digital transformation studio.
Next.js 16, React 19, Tailwind CSS 4, Base UI through shadcn components.

```bash
bun install
bun dev
```

`bun run lint`, `bun run typecheck` and `bun run build` must pass before a commit.

## Structure

```
src/
  app/                  layout, page, global styles, fonts
  assets/               images imported statically
  components/
    layout/             header, menu, footer
    sections/           one file or folder per page section
    reveal/             text and label animations, CSS driven
    ui/                 shadcn components, edited only to fix them
  lib/                  shared class strings, site data, cn()
```

The inquiry form does not send anything yet. Wire `sendInquiry` in
`src/components/sections/contact/inquiry-form.tsx` to a CRM or inbox.
