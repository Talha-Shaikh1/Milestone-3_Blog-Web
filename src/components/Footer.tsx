import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
        
        <div className="flex flex-col items-center md:items-start space-y-2">
          <Image
            width={40}
            height={40}
            src="/logo2.png"
            alt="Our Blog Logo"
            className="md:h-40 md:w-60 h-16 w-16"
          />
        </div>

        
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/about/" className="hover:text-teal-400">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-teal-400">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/categories/" className="hover:text-teal-400">
                Category
              </Link>
            </li>
            <li>
              <Link href="/author/" className="hover:text-teal-400">
                Author
              </Link>
            </li>
          </ul>
        </div>

        
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold text-white">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <Link href="#" className="hover:text-teal-400">
              <FaFacebookF size={20} />
            </Link>
            <Link href="#" className="hover:text-teal-400">
              <FaTwitter size={20} />
            </Link>
            <Link href="#" className="hover:text-teal-400">
              <FaInstagram size={20} />
            </Link>
            <Link href="#" className="hover:text-teal-400">
              <FaLinkedinIn size={20} />
            </Link>
          </div>
        </div>
      </div>

      
      <div className="border-t border-gray-700 mt-8 pt-4 text-center">
        <p>&copy; 2025 Our Blog. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
