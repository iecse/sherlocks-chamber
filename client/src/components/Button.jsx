
function Button({ children }) {
    return (
        <button
            className="bg-[#CDF228] hover:bg-black duration-400 text-black hover:text-white w-32 rounded font-semibold py-2 px-4 focus:outline-none focus:shadow-outline"
            type="submit"
        >
            {children}
        </button>
    )
}

export default Button

// export default function Button({ children, onClick, className = "", ...props }) {
//     return (
//         <button
//             onClick={onClick}
//             className={`bg-lime-500 text-black text-sm font-semibold tracking-wide py-2 px-6 rounded-lg hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-400 ${className}`}
//             {...props}
//         >
//             {children}
//         </button>
//     );
// }
