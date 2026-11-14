/**
 * A button label that rolls down on hover or keyboard focus while its copy
 * drops in from above. Only the copy is hidden from assistive tech, so the
 * button keeps its real text as its name.
 */
export const Roll = ({ children }: { children: string }) => (
  <span className="roll">
    <span className="roll-label">{children}</span>
    <span aria-hidden="true" className="roll-label roll-copy">
      {children}
    </span>
  </span>
);
