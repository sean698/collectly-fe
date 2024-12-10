import { useMst } from "hooks/useMst";

const Header = () => {
  const rootStore = useMst();
  console.log(rootStore);
  return (
    <p>Hello World</p>
  );
};

export default Header;
