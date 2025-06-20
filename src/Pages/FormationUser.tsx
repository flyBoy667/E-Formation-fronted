import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../Services/api";

interface UserType {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
}

interface FormationDetailType {
    id: number;
    created_at: string;
    updated_at: string;
    name: string;
    description: string;
    users: UserType[];
    courses: object[];
}

const FormationUser = () => {
    const { id } = useParams();
    const [data, setData] = useState<FormationDetailType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/formations/${id}/`);
                const data = await response.data;
                setData(data);
            } catch {
                setData(null);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-blue-700 font-bold">Chargement...</div>;
    }

    if (!data) {
        return <div className="min-h-screen flex items-center justify-center text-red-500 font-bold">Formation introuvable.</div>;
    }

    return (
        <div className="min-h-screen bg-blue-50 py-8 px-2">
            <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6 sm:p-10">
                <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-4">{data.name}</h1>
                <div className="text-gray-600 mb-4">{data.description}</div>
                <div className="text-gray-400 text-sm mb-6">Créée le : {new Date(data.created_at).toLocaleDateString()}</div>
                <div className="mb-4 text-blue-700 font-semibold">Utilisateurs inscrits : {data.users.length}</div>
                <div className="space-y-3">
                    {data.users.length === 0 ? (
                        <div className="text-gray-500 text-center">Aucun utilisateur inscrit.</div>
                    ) : (
                        data.users.map((user) => (
                            <div key={user.id} className="border rounded-lg p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between bg-blue-50/50">
                                <div>
                                    <div className="font-semibold text-gray-800">{user.first_name} {user.last_name}</div>
                                    <div className="text-gray-500 text-sm">@{user.username}</div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default FormationUser;