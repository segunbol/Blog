const Footer = () => {
  return (
    <>
      <div className=" w-full bg-gray-900 lg:px-[200px] md:px-[100px] flex md:flex-row flex-col space-y-6 md:space-y-0 xs:items-center items-start md:justify-between text-sm md:text-md py-8 ">
        <div className="flex flex-col text-white xs:items-center">
          <p>Featured Blogs</p>
          <p>Most viewed</p>
          <p>Readers Choice</p>
        </div>

        <div className="flex flex-col text-white xs:items-center">
          <p>Forum</p>
          <p>Support</p>
          <p>Recent Posts</p>
        </div>

        <div className="flex flex-col text-white xs:items-center">
          <p>Privacy Policy</p>
          <p>About Us</p>
          <p>Terms & Conditions</p>
          <p>Terms of Service</p>
        </div>
      </div>
      <p className="py-2 pb-6 text-center text-white bg-black text-sm">
        All rights reserved @Blog Market 2023
      </p>
    </>
  );
};

export default Footer;
