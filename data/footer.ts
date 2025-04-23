import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";

export const footerDetails = {
  sitename: "MIU’s E-Library System",
  sitedesc:
    " The system will provide advanced features for secure digital book borrowing, including access control, detailed tracking, and a user-friendly interface.",
  phone: "",
  email: "",
  address: "",
  quicklinks: {
    title: "Quick Links",
    links: [
      {
        name: "Home",
        url: "/home",
      },
      {
        name: "About",
        url: "/about",
      },
      {
        name: "Features",
        url: "/features",
      },
      {
        name: "How It Works",
        url: "/search",
      },
      {
        name: "Frequently Asked Questions",
        url: "/faqs",
      },
      {
        name: "Contact Us",
        url: "/contact",
      },
    ],
  },
  useresources: {
    title: "User Resources",
    links: [
      {
        name: "User Dashboard",
        url: "/dashboard",
      },
      {
        name: "Admin Panel",
        url: "/admin",
      },
    ],

    followUs: {
      title: "Follow Us",
      links: [
        {
          icon: Facebook,
          url: "#",
        },
        {
          icon: Instagram,
          url: "#",
        },
        {
          icon: Mail,
          url: "#",
        },
        {
          icon: Youtube,
          url: "#",
        }
      ],
    },
  },
};
