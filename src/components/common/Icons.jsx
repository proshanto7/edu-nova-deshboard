function IconBase({ children, className = "h-4 w-4" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export const PlusIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="M12 5v14M5 12h14" />
  </IconBase>
);

export const PencilIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
  </IconBase>
);

export const TrashIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="M3 6h18" />
    <path d="M8 6V4h8v2" />
    <path d="M19 6l-1 14H6L5 6" />
  </IconBase>
);

export const SearchIcon = ({ className }) => (
  <IconBase className={className}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" />
  </IconBase>
);

export const CloseIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="M6 6l12 12M18 6L6 18" />
  </IconBase>
);

export const FolderIcon = ({ className = "h-6 w-6" }) => (
  <IconBase className={className}>
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
  </IconBase>
);