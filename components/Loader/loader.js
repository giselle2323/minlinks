export default function Loader() {
  return (
    <div className="flex w-full h-full  items-center justify-items-center ">
      <svg
        version="1.1"
        id="L3"
        xmlns="http://www.w3.org/2000/svg"
        xlinkHref="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 100 100"
        enableBackground="new 0 0 0 0"
        xmlSpace="preserve"
      >
        <circle
          fill="none"
          stroke="#17CB49"
          strokeWidth="4"
          cx="50"
          cy="50"
          r="44"
          style="opacity:0.5;"
        />
        <circle
          fill="#17CB49"
          stroke="#e74c3c"
          strokeWidth="3"
          cx="8"
          cy="54"
          r="6"
        >
          <animateTransform
            attributeName="transform"
            dur="2s"
            type="rotate"
            from="0 50 48"
            to="360 50 52"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
}
