import { Search, PlayCircle, FileText, ShoppingCart } from "lucide-react";

// Location & Contact
export const LOCATION_CONTACT_DATA = {
  header: {
    eyebrow: "Get In Touch",
    title: "Visit or Contact Us",
    description:
      "Have questions about our courses? Reach out to our team or visit our campus — we're happy to help you find the right learning path.",
  },
  location: {
    map: {
      title: "Campus Location",
      query: "Sylhet, Bangladesh",
    },
    openingHours: {
      title: "Office Hours",
      days: "Sunday – Thursday",
      time: "9:00 AM – 6:00 PM",
    },
    address: {
      title: "Address",
      line1: "House 12, Road 5, Uposhohor",
      line2: "Sylhet, Bangladesh",
    },
  },
  form: {
    name: {
      label: "Full Name",
      placeholder: "Your name",
    },
    email: {
      label: "Email Address",
      placeholder: "you@example.com",
    },
    phone: {
      label: "Phone Number",
      placeholder: "+880 1XXX-XXXXXX",
    },
    course: {
      label: "Course of Interest",
      defaultValue: "development",
      options: [
        { value: "development", label: "Web Development" },
        { value: "business", label: "Business" },
        { value: "design", label: "Design" },
        { value: "marketing", label: "Marketing" },
        { value: "personal-development", label: "Personal Development" },
        { value: "other", label: "Other / Not Sure" },
      ],
    },
    message: {
      label: "Message",
      placeholder: "Tell us a bit about what you're looking for...",
    },
    button: "Send Message",
    successMessage: "Thanks! We'll get back to you within 24 hours.",
  },
};

// Tech Stack data
const HtmlIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M1.5 0h21l-1.91 21.56L12 24l-8.59-2.44L1.5 0Zm16.2 4.38H6.3l.28 2.63h8.26l-.28 2.78H6.86l.28 2.63h7.14l-.47 4.24-1.81.51-1.82-.51-.12-1.2H7.43l.23 3.18L12 19.47l4.34-1.23.6-7.01.06-.01.7-6.84Z" />
  </svg>
);

const CssIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M1.5 0h21l-1.91 21.56L12 24l-8.59-2.44L1.5 0Zm17.08 4.38H5.42l.28 2.63h10l-.28 2.78H5.98l.28 2.63h8.86l-.25 2.58-2.87.82-2.88-.82-.18-1.74H6.35l.36 4.17L12 19.47l5.29-1.5.72-7.98.07-.01.5-5.6Z" />
  </svg>
);

const AndroidIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.44 5.559q-1.015 1.748-2.028 3.498-.055-.023-.111-.043a12.1 12.1 0 0 0-8.68.033C7.537 8.897 5.868 6.026 5.6 5.56a1 1 0 0 0-.141-.19 1.104 1.104 0 0 0-1.768 1.298c1.947 3.37-.096-.216 1.948 3.36.017.03-.495.263-1.393 1.017C2.9 12.176.452 14.772 0 18.99h24a11.7 11.7 0 0 0-.746-3.068 12.1 12.1 0 0 0-2.74-4.184 12 12 0 0 0-2.131-1.687c.66-1.122 1.312-2.256 1.965-3.385a1.11 1.11 0 0 0-.008-1.12 1.1 1.1 0 0 0-.852-.532c-.522-.054-.939.313-1.049.545Zm-.04 8.46c.395.593.324 1.331-.156 1.65-.48.32-1.188.1-1.582-.493s-.324-1.33.156-1.65c.473-.316 1.182-.11 1.582.494Zm-11.193-.492c.48.32.55 1.058.156 1.65-.394.593-1.103.815-1.584.495-.48-.32-.55-1.058-.156-1.65.4-.603 1.109-.811 1.584-.495Z" />
  </svg>
);

const PhotoshopIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M0 .3v23.4h24V.3H0Zm1 1h22v21.4H1V1.3Zm4.8 4.48c0-.067.14-.116.224-.116.644-.033 1.588-.05 2.578-.05 2.772 0 3.85 1.52 3.85 3.466 0 2.54-1.842 3.63-4.102 3.63-.38 0-.51-.017-.775-.017v3.842c0 .083-.033.116-.115.116H5.916c-.083 0-.115-.03-.115-.113V5.78Zm1.775 5.312c.23.016.412.016.81.016 1.17 0 2.27-.412 2.27-1.996 0-1.27-.786-1.914-2.122-1.914-.396 0-.775.016-.957.033v3.864Zm8.607-1.188c-.792 0-1.056.396-1.056.726 0 .363.18.61 1.237 1.155 1.568.76 2.062 1.485 2.062 2.557 0 1.6-1.22 2.46-2.87 2.46-.876 0-1.62-.183-2.05-.43-.065-.033-.08-.082-.08-.165V14.74c0-.1.048-.133.114-.084.624.413 1.352.594 2.012.594.792 0 1.122-.33 1.122-.776 0-.363-.23-.677-1.237-1.205-1.42-.68-2.014-1.37-2.014-2.527 0-1.287 1.006-2.36 2.755-2.36.86 0 1.464.132 1.794.28.082.05.1.132.1.198v1.37c0 .083-.05.133-.15.1-.444-.264-1.1-.43-1.743-.43Z" />
  </svg>
);

const JqueryIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M4.51 4.21c-.73 1.02-1.12 2.23-1.12 3.55 0 3.55 3.02 6.22 6.86 6.22 1.99 0 3.84-.73 5.15-2.04-1.02.39-2.09.58-3.21.58-4.18 0-7.68-3.06-7.68-7 0-.44 0-.87.1-1.31l-.1.0Zm-1.74 3.01c-.73 1.02-1.12 2.23-1.12 3.55C1.65 14.32 4.67 17 8.51 17c1.99 0 3.84-.73 5.15-2.04-1.02.39-2.09.58-3.21.58-4.18 0-7.68-3.06-7.68-7 0-.44 0-.87.1-1.31l-.1-.01Z" />
  </svg>
);

const RubyIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.19 3.11 22 6.95l-1.09 6.04-6.04 7.01-6.84-.66-4.94-4.72-.99-6.3 2.76-4.1 6.16-1.31 7.17.2ZM7.44 5.2l3.03-.91 2.08 2.32-2.98 2.95L7.44 5.2Zm5.58 1.7 3.64-.96 2.11 2.09-3.57 1.53-2.18-2.66Zm-2.85 3.7 3.14-2.06 2.23 2.79-3.28 2.87-2.09-3.6Zm-.99.76 1.75 3.06-3.12-.38-1.75-2.83 3.12.15Zm4.17 3.55 3.14-2.59-.7 3.38-2.92 3.29-1.02-2.45 1.5-1.63Z" />
  </svg>
);

export const TECH_STACK_DATA = [
  {
    icon: HtmlIcon,
    label: "HTML",
    color: "#ff5733",
  },
  {
    icon: CssIcon,
    label: "CSS",
    color: "#2196f3",
  },
  {
    icon: AndroidIcon,
    label: "Android",
    color: "#8bc34a",
  },
  {
    icon: PhotoshopIcon,
    label: "Photoshop",
    color: "#31a8ff",
  },
  {
    icon: JqueryIcon,
    label: "jQuery",
    color: "#f0a731",
  },
  {
    icon: RubyIcon,
    label: "Ruby",
    color: "#e91e3f",
  },
];

// Footer data

const SOCIAL_ICONS = {
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.58v1.9h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M18.9 2H21l-6.4 7.3L22 22h-6.1l-5-6.6L4.6 22H2.5l6.9-7.9L2 2h6.2l4.5 6L18.9 2Zm-2.1 18h1.7L7.3 4H5.5l11.3 16Z" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M21.6 7.2s-.2-1.5-.8-2.1c-.8-.8-1.6-.8-2-.9C15.9 4 12 4 12 4s-3.9 0-6.8.2c-.4.1-1.2.1-2 .9-.6.6-.8 2.1-.8 2.1S2.2 9 2.2 10.7v1.6c0 1.8.2 3.5.2 3.5s.2 1.5.8 2.1c.8.8 1.8.8 2.3.9 1.6.2 6.5.2 6.5.2s3.9 0 6.8-.2c.4-.1 1.2-.1 2-.9.6-.6.8-2.1.8-2.1s.2-1.7.2-3.5v-1.6c0-1.7-.2-3.5-.2-3.5ZM9.9 14.6V8.8l5.4 2.9-5.4 2.9Z" />
    </svg>
  ),
  instagram: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="h-4 w-4"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
    </svg>
  ),
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Explore Us", href: "/explore" },
  { label: "Menu", href: "/menu" },
  { label: "Gallery", href: "/gallery" },
  { label: "Reviews", href: "/reviews" },
];

export const EVENT_LINKS = [
  { label: "Sustainability", href: "/sustainability" },
  { label: "About Us", href: "/about-us" },
  { label: "Farm Sam", href: "/farm-sam" },
  { label: "Contact", href: "/contact" },
];

export const SOCIAL_LINKS = [
  {
    icon: SOCIAL_ICONS.facebook,
    href: "https://facebook.com",
    label: "Facebook",
  },
  { icon: SOCIAL_ICONS.twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: SOCIAL_ICONS.youtube, href: "https://youtube.com", label: "Youtube" },
  {
    icon: SOCIAL_ICONS.instagram,
    href: "https://instagram.com",
    label: "Instagram",
  },
];

// Process DATA

export const PROCESS_DATA = [
  {
    step: "Step 01",
    title: "Search for your course",
    description:
      "Nemo enim ipsam voluptatem quia voluptas sit atur aut odit aut fugit, sed quia consequuntur magni res.",
    icon: Search,
  },
  {
    step: "Step 02",
    title: "Take a Sample Lesson",
    description:
      "Nemo enim ipsam voluptatem quia voluptas sit atur aut odit aut fugit, sed quia consequuntur magni res.",
    icon: PlayCircle,
  },
  {
    step: "Step 03",
    title: "Preview the Syllabus",
    description:
      "Nemo enim ipsam voluptatem quia voluptas sit atur aut odit aut fugit, sed quia consequuntur magni res.",
    icon: FileText,
  },
  {
    step: "Step 04",
    title: "Purchase the Course",
    description:
      "Nemo enim ipsam voluptatem quia voluptas sit atur aut odit aut fugit, sed quia consequuntur magni res.",
    icon: ShoppingCart,
  },
];
