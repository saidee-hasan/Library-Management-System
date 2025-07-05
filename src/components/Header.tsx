import libraryBg from "../assets/banner.jpg";

const Header = () => {
  return (
    <div
      className="relative text-white min-h-[250px] sm:min-h-[300px] md:min-h-[400px] flex items-center justify-center bg-cover bg-center bg-no-repeat rounded-sm shadow-md mb-12 font-primary opacity-90"
      style={{
        backgroundImage: `url(${libraryBg})`,
      }}
    >
      <div className="text-center px-4 max-w-4x">
        <h1 className="text-4xl sm:text-5xl font-bold mb-3">📚 Welcome to the Library</h1>
        <p className="text-lg sm:text-xl font-light">
          Discover, borrow, and manage books with ease. Your digital reading journey starts here.
        </p>
      </div>
    </div>
  );
};

export default Header;

