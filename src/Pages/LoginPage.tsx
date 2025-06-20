import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Services/api";

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post("/token/", {
                username,
                password
            });
            const data = await response.data;
            console.log(data);
            setError("");
            navigate("/home");
        } catch (error) {
            console.log(error);
            setError("Erreur lors de la connexion");
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Connexion</h2>
                <form className="space-y-5">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                            Adresse e-mail
                        </label>
                        <input
                            type="input"
                            id="username"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder="John doe"
                            autoComplete="username"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Votre mot de passe"
                            autoComplete="current-password"
                            required
                        />
                    </div>
                    {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                    <button
                        onClick={handleSubmit}
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow transition duration-200"
                    >
                        Se connecter
                    </button>
                </form>
                <div className="mt-6 text-center text-gray-500 text-sm">
                    Vous n'avez pas de compte ? <button onClick={() => navigate("/register")} className="text-blue-600 hover:underline">Inscrivez-vous</button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage