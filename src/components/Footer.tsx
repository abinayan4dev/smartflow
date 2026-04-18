import { Link } from "react-router-dom";
import { WHATSAPP_LINK, CONTACT_EMAIL } from "../lib/constants";

export default function Footer() {
  return (
    <footer className="bg-black py-12 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-2xl font-bold tracking-tighter text-white flex items-center gap-2 mb-4">
              <span className="bg-blue-600 text-white px-2 py-1 rounded-md text-xl">SF</span>
              <span>Smartflow</span>
            </Link>
            <p className="text-gray-400 max-w-sm">
              We build high-performance websites and automation systems for local businesses.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-blue-400 transition-colors">Services</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-blue-400 transition-colors">About</Link></li>
              <li><Link to="/mechatronics" className="text-gray-400 hover:text-blue-400 transition-colors">Mechatronics</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                  WhatsApp Us
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-gray-400 hover:text-blue-400 transition-colors">
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Smartflow. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
