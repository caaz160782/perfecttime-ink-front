import NextLink from "next/link";

const Header = () => {
  return (
    <div>
      <ul>
        <li>
          <NextLink href="/">
            <a>LOGO</a>
          </NextLink>
        </li>
        <li>
          <NextLink href="/servicios">
            <a>servicios</a>
          </NextLink>
        </li>
        <li>
          <NextLink href="/galeria">
            <a>galeria</a>
          </NextLink>
        </li>
        <li>
          <NextLink href="/contacto">
            <a>contacto</a>
          </NextLink>
        </li>
      </ul>
    </div>
  );
};
export default Header;
