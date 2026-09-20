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

export const ChevronDownIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="M6 9l6 6 6-6" />
  </IconBase>
);

export const UsersIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </IconBase>
);

export const BookIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </IconBase>
);

export const ImageIcon = ({ className }) => (
  <IconBase className={className}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path d="M21 15l-5-5L5 21" />
  </IconBase>
);

export const ArrowLeftIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </IconBase>
);

export const ClockIcon = ({ className }) => (
  <IconBase className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </IconBase>
);

export const LockIcon = ({ className }) => (
  <IconBase className={className}>
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </IconBase>
);

export const PlayIcon = ({ className }) => (
  <IconBase className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M10 8l6 4-6 4V8z" />
  </IconBase>
);

export const EyeIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </IconBase>
);

export const EyeOffIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <path d="M1 1l22 22" />
  </IconBase>
);
