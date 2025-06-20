import { useEffect, useState } from "react";
import api from "../Services/api";
import { useNavigate } from "react-router-dom";

interface Formation {
    id: number;
    created_at: string;
    updated_at: string;
    name: string;
    description: string;
}

const HomePage = () => {
    const [formations, setFormations] = useState<Formation[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFormations = async () => {
            try {
                const response = await api.get("/formations/");
                const data = await response.data;
                setFormations(data);
            } catch (e) {
                console.log(e);
            }
        };
        fetchFormations();
    }, []);


    const subscribeToNewFormation = async (userId: number, formationId: number) => {
        try {
            const response = await api.post("user-formations/", {
                user: userId,
                formation: formationId
            });
            console.log(response);
        } catch (error) {
            console.log(error);
            alert("Erreur lors de l'inscription");
        }
    };

    return (
        <div className="min-h-screen bg-blue-50 py-8 px-2">
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-4 sm:p-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-6 text-center">Formations</h1>
                <div className="space-y-4">
                    {formations.length === 0 ? (
                        <div className="text-center text-gray-500 py-8">Aucune formation disponible.</div>
                    ) : (
                        formations.map((formation) => (
                            <div
                                key={formation.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between border rounded-lg p-4 hover:shadow transition bg-blue-50/50">
                                <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-gray-800 text-lg truncate">{formation.name}</div>
                                    <div className="text-gray-600 text-sm truncate mb-1">{formation.description}</div>
                                    <div className="text-gray-400 text-xs">Créée le : {new Date(formation.created_at).toLocaleDateString()}</div>
                                </div>
                                <div className="mt-3 sm:mt-0 sm:ml-4 flex-shrink-0 space-x-2">
                                    <button
                                        onClick={subscribeToNewFormation.bind(null, 1, formation.id)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold w-full sm:w-auto">SUIVRE</button>
                                    <button
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold w-full sm:w-auto"
                                        onClick={() => navigate(`/formation/${formation.id}`)}                                >
                                        Voir plus
                                    </button>
                                    <button
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold w-full sm:w-auto"
                                        onClick={() => navigate(`/formation/user/${formation.id}`)}                                >
                                        Voir participants
                                    </button>
                                </div>

                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;