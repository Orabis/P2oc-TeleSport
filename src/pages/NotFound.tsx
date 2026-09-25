import {Link} from "react-router-dom";

export function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-8 gap-4">
            <h1 className="text-5xl font-bold">Page Non Trouvé </h1>
            <Link to="/" className="text-xl text-gray-400 hover:text-white hover:underline mb-12">Retour à la page d'accueil</Link>
        </div>
    )
}