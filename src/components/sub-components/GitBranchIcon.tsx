export default function GitBranchIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon git-branch-icon"
    >
      <circle cx="6" cy="3" r="2" />
      <circle cx="6" cy="15" r="2" />
      <circle cx="18" cy="21" r="2" />
      <path d="M6 5v8a4 4 0 0 0 4 4h4" />
      <path d="M18 19v-1a4 4 0 0 0-4-4H10" />
    </svg>
  );
}
