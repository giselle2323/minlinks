import Link from "next/link";
export default function Custom404() {
  return (
    <div className="text-center py-60 lg:py-36 bg-black-brand-01 min-h-screen">
      <h1 className="text-7xl md:text-9xl font-bold text-white py-2">
        500
      </h1>
      <h2 className="md:text-4xl text-2xl lg:text-5xl font-bold text-gray-800 py-2">
        Internal Server Error
      </h2>
      <p className="text-md text-gray-600 py-2 px-12 lg:px-96">
        Sorry! An erro occured, please try again or contact support @yakubuaminat94@gmail.com
      </p>
      <div className="text-md text-white flex justify-center cursor-pointer">
        <Link href="/">
          <a className="hover:underline"> Go back</a>
        </Link>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-arrow-narrow-right"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#4338CA"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="5" y1="12" x2="19" y2="12" />
            <line x1="15" y1="16" x2="19" y2="12" />
            <line x1="15" y1="8" x2="19" y2="12" />
          </svg>
        </div>
      </div>
    </div>
  );
}
