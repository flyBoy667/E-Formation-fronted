import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Services/api";

const RegisterPage: React.FC = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        username: ""
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post("/users/", { ...user });
            const data = await response.data;
            console.log(data);
            setError("");
            navigate("/home");
        } catch (error) {
            console.log(error);
            setError("Erreur lors de l'inscription");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Inscription</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Nom complet
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={user.name}
                            onChange={handleChange}
                            placeholder="Votre nom complet"
                            autoComplete="name"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Adresse e-mail
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={user.email}
                            onChange={handleChange}
                            placeholder="exemple@email.com"
                            autoComplete="email"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <input
                            type="input"
                            id="username"
                            name="username"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={user.username}
                            onChange={handleChange}
                            placeholder="Confirmez le mot de passe"
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
                            name="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={user.password}
                            onChange={handleChange}
                            placeholder="Votre mot de passe"
                            autoComplete="new-password"
                            required
                        />
                    </div>
                   
                    {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow transition duration-200"
                    >
                        S'inscrire
                    </button>
                </form>
                <div className="mt-6 text-center text-gray-500 text-sm">
                    Vous avez déjà un compte ? <button onClick={() => navigate('/')} className="text-blue-600 hover:underline">Connectez-vous</button>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;