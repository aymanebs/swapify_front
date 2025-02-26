import { ArrowLeftRight, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";


export const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Linkedin, href: "#" },
  ];

  const quickLinks = [
    { text: "About Us", href: "#about" },
    { text: "Our Products", href: "#products" },
    { text: "Shipping & Delivery", href: "#shipping" },
    { text: "Quality Standards", href: "#quality" },
  ];

  return (
    <footer className="bg-white border-t border-sky-100">
      <div className="mx-auto max-w-screen-xl px-4 pb-6 pt-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 text-sky-600 transform hover:scale-105 transition-transform duration-300">
              <ArrowLeftRight className="h-8 w-8" />
              <span className="text-xl font-bold">Swapify</span>
            </div>

            <p className="mt-6 text-gray-600">
              Online community for items exchange.
            </p>

            <div className="mt-8 flex gap-6">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="text-gray-500 hover:text-sky-600 transition-all duration-300 transform hover:scale-110"
                >
                  <social.icon className="h-6 w-6" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-lg font-semibold text-gray-900 mb-6">Quick Links</p>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 hover:text-sky-600 transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <p className="text-lg font-semibold text-gray-900 mb-6">Contact Us</p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 group">
                <Mail className="h-5 w-5 text-sky-600 group-hover:scale-110 transition-transform duration-300" />
                <a 
                  href="mailto:contact@freshexports.com"
                  className="text-gray-600 hover:text-sky-600 transition-colors duration-300"
                >
                  contact@swapify.com
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone className="h-5 w-5 text-sky-600 group-hover:scale-110 transition-transform duration-300" />
                <a 
                  href="tel:+15551234567"
                  className="text-gray-600 hover:text-sky-600 transition-colors duration-300"
                >
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-start gap-3 group">
                <MapPin className="h-5 w-5 text-sky-600 mt-1 group-hover:scale-110 transition-transform duration-300" />
                <address className="text-gray-600 not-italic">
                  123 Export Avenue,<br />
                  Business District,<br />
                  London, UK
                </address>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-100 pt-6">
          <div className="text-center sm:flex sm:justify-between sm:text-left">
            <p className="text-sm text-gray-500">
              <Link href="/terms" className="hover:text-sky-600 transition-colors duration-300">
                Terms & Conditions
              </Link>
              <span className="mx-2">•</span>
              <Link href="/privacy" className="hover:text-sky-600 transition-colors duration-300">
                Privacy Policy
              </Link>
            </p>
            <p className="mt-4 text-sm text-gray-500 sm:mt-0">
              &copy; {new Date().getFullYear()} Swapify. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};