const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <section className="flex h-[5vh] w-full items-center justify-center border-t-2 border-slate-700 bg-slate-100">
      <footer>
        <p className="text-sm md:text-base">
          © {currentYear} All rights reserved. Privacy Policy{" "}
        </p>
      </footer>
    </section>
  );
};

export default Footer;
