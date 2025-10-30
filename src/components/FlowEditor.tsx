export function FlowEditor({ sprintComplete }: { sprintComplete: boolean }) {
  return (
    <textarea placeholder="Don't stop typing!" disabled={sprintComplete} />
  );
}
