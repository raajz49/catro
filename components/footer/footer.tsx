import React from "react";
import { Facebook, Twitter, Instagram, Youtube, Languages } from "lucide-react"; // Social media icons and language icon

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-800 text-slate-200 py-6 px-4 md:px-8 lg:px-12 w-full rounded-t-lg shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        {/* Left Section: Copyright and Legal Links */}
        <div className="flex flex-col md:flex-row items-center text-center md:text-left space-y-2 md:space-y-0 md:space-x-6">
          <p className="text-sm">
            © {currentYear} Chatspark. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start space-x-4 text-sm">
            <a
              href="/privacy"
              className="text-slate-400 hover:text-slate-100 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-slate-400 hover:text-slate-100 transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="/community"
              className="text-slate-400 hover:text-slate-100 transition-colors"
            >
              Community Guidelines
            </a>
            <a
              href="/safety"
              className="text-slate-400 hover:text-slate-100 transition-colors"
            >
              Safety
            </a>
          </div>
        </div>

        {/* Right Section: Social Media and Language Selector */}
        <div className="flex items-center space-x-6">
          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <a
              href="https://facebook.com/ometv"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-slate-400 hover:text-slate-100 transition-colors"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://twitter.com/ometv"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-slate-400 hover:text-slate-100 transition-colors"
            >
              <Twitter size={20} />
            </a>
            <a
              href="https://instagram.com/ometv"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-slate-400 hover:text-slate-100 transition-colors"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://youtube.com/ometv"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Youtube"
              className="text-slate-400 hover:text-slate-100 transition-colors"
            >
              <Youtube size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
