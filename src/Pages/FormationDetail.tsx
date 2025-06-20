import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../Services/api";

interface FormationDetailType {
    id: number;
    created_at: string;
    updated_at: string;
    name: string;
    description: string;
    users: object[];
    courses: object[];
}

const FormationDetail = () => {
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
                <div className="flex flex-col sm:flex-row sm:space-x-8 space-y-2 sm:space-y-0 mb-6">
                    <div className="bg-blue-100 rounded-lg px-4 py-2 text-blue-700 font-semibold text-center">
                        Utilisateurs inscrits : {data.users.length}
                    </div>
                    <div className="bg-blue-100 rounded-lg px-4 py-2 text-blue-700 font-semibold text-center">
                        Nombre de cours : {data.courses.length}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormationDetail;