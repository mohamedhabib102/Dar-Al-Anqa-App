'use client';


interface ToggleNavbar {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}


const ToggleNavbar: React.FC<ToggleNavbar> = ({ toggle, setToggle }) => {


  const handelToggle = () => {
    setToggle(!toggle)
  }

  return (
    <>
      <button onClick={handelToggle} className="relative w-10 h-5 cursor-pointer lg:hidden block">
        <span className={`absolute  transition-all left-0 h-[4.1px] rounded-sm   w-full bg-(--main-color)  top-0`}></span>
        <span className={`absolute  transition-all left-0 h-[4.1px] rounded-sm  bg-(--main-color)  top-2  ${toggle ? "w-full" : "w-[75%]"}`}></span>
        <span className={`absolute  transition-all left-0 h-[4.1px] rounded-sm  bg-(--main-color) top-4  ${toggle ? "w-full" : "w-[45%]"}`}></span>
      </button>
    </>
  );
}
export default ToggleNavbar;
