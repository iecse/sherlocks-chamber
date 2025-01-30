import iecse_logo from '/images/iecse_logo.png'
import sherlocks_logo from '/images/sherlocks_logo.png'

function Navbar() {
  return (
    <div className="flex items-center justify-between fixed top-0 left-1/2 z-40 transform -translate-x-1/2 w-full bg-[#CDF228] shadow-lg h-20">
      <img
        src={sherlocks_logo}
        alt="sherlocks_logo"
        className="ml-8"
      />
      <img
        src={iecse_logo}
        alt="iecse_logo"
        className="mr-8 mb-0 self-end"
      />
    </div>
  )
}

export default Navbar