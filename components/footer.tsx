import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import Container from "./container";
import { menuItems } from "@/data/menuItems";

export default function Footer() {
  return (
    <footer className="bg-[#111] text-white relative pt-20 pb-10 px-6 md:px-20">
      {/* Red curve */}
      <div className="bg-white w-full absolute h-4 top-0 left-0 z-0">
        <div className="absolute top-0 left-0 w-full h-4 bg-red-700 rounded-t-full z-0" />
      </div>

      <Container>
        <div className="relative z-10 flex flex-col md:flex-row md:justify-between gap-10">
          {/* Left Column */}
          <div className="max-w-md space-y-4">
            <h3 className="text-3xl font-bold">MIU’s E-Library System</h3>
            <p className="text-sm text-gray-100">
              The system will provide advanced features for secure digital book
              borrowing, including access control, detailed tracking, and a
              user-friendly interface.
            </p>

            <div className="space-y-4 mt-4 text-sm">
              <p className="flex items-center gap-2">
                <Phone size={16} />{" "}
                <a href="tel:+234 9103715381">+234 9103715381</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:support@miusecurelibrary.com">
                  support@miusecurelibrary.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={16} /> Km 21 Abuja-Keffi Expressway
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Quick Links</h4>
              <ul className="space-y-4 text-gray-100">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link className="hover:text-primary-red" href={item.url}>
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">User Resources</h4>
              <ul className="space-y-4 text-gray-100">
                <li>
                  <Link className="hover:text-primary-red" href="/dashboard">
                    User Dashboard
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-primary-red" href="/admin">
                    Admin Panel
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-5">Follow Us</h4>
              <div className="flex items-center gap-4 mt-2">
                <a
                  href="#"
                  className="p-2 border border-white rounded-full hover:bg-white hover:text-black transition"
                >
                  <Facebook size={16} />
                </a>
                <a
                  href="#"
                  className="p-2 border border-white rounded-full hover:bg-white hover:text-black transition"
                >
                  <Instagram size={16} />
                </a>
                <a
                  href="#"
                  className="p-2 border border-white rounded-full hover:bg-white hover:text-black transition"
                >
                  <Mail size={16} />
                </a>
                <a
                  href="#"
                  className="p-2 border border-white rounded-full hover:bg-white hover:text-black transition"
                >
                  <Youtube size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-10 border-gray-700" />
        <p className="text-center text-sm text-gray-400">
          © <span>{new Date().getFullYear()}</span> MIU’s E-Library System. All
          Rights Reserved.
        </p>
      </Container>
    </footer>
  );
}
