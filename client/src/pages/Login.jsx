import Navbar from "../components/Navbar";
import backgroundImage from "../utils/image.png";
import TeamForm from "../components/TeamForm";

function Login() {
    return (
        <div 
            className="w-full h-screen bg-cover bg-center flex flex-col items-center justify-start bg-neutral-800" 
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <Navbar />
            <div className="flex flex-col items-center justify-center mt-26 w-full"> 
                <h1 className="text-white text-6xl font-orbitron">Login</h1>
                <TeamForm/>

            </div>
        </div>
    );
}

export default Login;
