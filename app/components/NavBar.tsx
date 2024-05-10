import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  // NavbarItem,
} from "@nextui-org/navbar";
// import { Link } from "@nextui-org/react";

const NavBar = () => {
  return (
    <Navbar
      position="static"
      maxWidth="full"
      height={"4rem"}
      className=" flex "
    >
      <NavbarBrand>
        <span className="text-4xl  font-dynaPuff text-[#f7c00ae8]">
          UrlShortner 123
        </span>
      </NavbarBrand>
      {/* <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent> */}
      <NavbarContent
        className="hidden sm:flex gap-4"
        justify="end"
      ></NavbarContent>
    </Navbar>
  );
};

export default NavBar;
