import { useContext } from "react";
import { ThemeContext } from "contexts/theme-context";


const ThemeButton = (props) => {
  const { theme } = useContext(ThemeContext);
  // console.log("ThemeButton", theme);
  return (
    <button
      {...props}
     
    />
  );
};

export { ThemeButton };
