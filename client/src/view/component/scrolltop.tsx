export default function ScrollTop() {
  return (
    <button
      onClick={() => {
        window.scrollTo(0, 0);
      }}
      className="bg-secondary h-12 w-12 rounded-full flex justify-center items-center drop-shadow-lg fixed right-2 bottom-4 lg:right-[20.4%]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 stroke-onSecondary"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4.5 15.75 7.5-7.5 7.5 7.5"
        />
      </svg>
    </button>
  );
}
