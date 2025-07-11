import { useEffect, useState } from "react";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [scroll, setScroll] = useState(false);

  const handleToggle = () => setShow(!show);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 5) {
        setScroll(true);
        setShow(false);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollClass = scroll ? "shadow-md bg-white py-4" : "py-4";
  const menuActive = show ? "left-0" : "-left-full";

  return (
    <div
      className={`navbar fixed w-full top-0 z-50 transition-all ${scrollClass}`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <img
            src="/brandred.png"
            alt="Logo"
            className="h-10 w-auto object-contain"
          />

          <ul className="hidden md:flex gap-6 font-medium text-black items-center">
            <li>
              <a href="/" className="hover:opacity-80">
                Home
              </a>
            </li>
            <li>
              <a href="/myproject" className="hover:opacity-80">
                MyProject
              </a>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="/contact"
            className="bg-gray-900 text-white font-bold px-5 py-2 rounded-md hover:bg-gray-700 transition-all"
          >
            Contact Me
          </a>

          <button onClick={handleToggle} className="md:hidden">
            <i className="ri-menu-3-line text-3xl text-black"></i>
          </button>
        </div>
      </div>

      <div
        className={`fixed ${menuActive} top-1/2 -translate-y-1/2 transition-all duration-300 md:hidden bg-white w-[260px] rounded-r-2xl shadow-md z-40 p-6 text-black font-bold`}
      >
        <ul className="flex flex-col gap-6 text-base">
          <li className="flex items-center gap-3" onClick={handleToggle}>
            <i className="ri-home-2-line text-2xl"></i>
            <a href="/">Home</a>
          </li>
          <li className="flex items-center gap-3" onClick={handleToggle}>
            <i className="ri-image-line text-2xl"></i>
            <a href="/myproject">MyProject</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
