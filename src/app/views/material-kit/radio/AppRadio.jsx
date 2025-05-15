import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";

export default function TransportCompanies() {
    const [transportCompanies, setTransportCompanies] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para controlar o carregamento da página
    const [error, setError] = useState(null); // Estado para controlar erros
    const [loadingStatus, setLoadingStatus] = useState(null); // Estado para controlar o carregamento do status individual

    // Função para buscar as transportadoras da API
    const fetchTransportCompanies = async () => {
        try {
            const response = await axios.get("https://projeto-integrador-g2ah.onrender.com/transportadora/todas");
            setTransportCompanies(response.data);
        } catch (err) {
            console.error("Erro ao buscar transportadoras:", err);
            setError("Erro ao carregar transportadoras. Tente novamente mais tarde.");
        } finally {
            setLoading(false);
        }
    };

    // Função para alternar o status de uma transportadora
    const toggleActive = async (index) => {
        const updatedCompanies = [...transportCompanies];
        const company = updatedCompanies[index];
        const newStatus = !company.active;

        setLoadingStatus(index); // Ativar o ícone de carregamento para a transportadora específica

        try {
            // Atualizar o status na API
            await axios.patch(`https://projeto-integrador-g2ah.onrender.com/transportadora/update/${company.id}`, {
                active: newStatus,
            });

            // Atualizar o estado local
            updatedCompanies[index].active = newStatus;
            setTransportCompanies(updatedCompanies);
        } catch (err) {
            console.error("Erro ao atualizar status da transportadora:", err);
            alert("Erro ao atualizar o status. Tente novamente mais tarde.");
        } finally {
            setLoadingStatus(null); // Desativar o ícone de carregamento
        }
    };

    // useEffect para carregar os dados ao montar o componente
    useEffect(() => {
        fetchTransportCompanies();
    }, []);

    return (
        <div style={{ padding: "20px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
            <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>Transportadoras</h1>

            {loading ? (
                <div style={{ textAlign: "center", marginTop: "50px" }}>
                    <CircularProgress />
                    <p>Carregando transportadoras...</p>
                </div>
            ) : error ? (
                <div style={{ textAlign: "center", marginTop: "50px", color: "red" }}>
                    <p>{error}</p>
                </div>
            ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
                    {transportCompanies.map((company, index) => (
                        <div
                            key={company.id}
                            style={{
                                backgroundColor: "white",
                                borderRadius: "10px",
                                padding: "20px",
                                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                                borderRight: company.active ? "6px solid #28a745" : "6px solid #ccc",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                            }}
                        >
                            {/* Título e Toggle */}
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <h3 style={{ margin: 0, fontWeight: "bold", fontSize: "18px" }}>{company.nome}</h3>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <span style={{ marginRight: "10px", fontSize: "14px" }}>
                                        {company.active ? "Ativo" : "Inativo"}
                                    </span>
                                    <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                                        <input
                                            type="checkbox"
                                            checked={company.active}
                                            onChange={() => toggleActive(index)}
                                            style={{ display: "none" }}
                                        />
                                        <div
                                            style={{
                                                width: "40px",
                                                height: "20px",
                                                backgroundColor: company.active ? "#28a745" : "#ccc",
                                                borderRadius: "20px",
                                                position: "relative",
                                                transition: "background-color 0.3s",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            {loadingStatus === index ? (
                                                <CircularProgress size={16} style={{ color: "white" }} />
                                            ) : (
                                                <div
                                                    style={{
                                                        width: "16px",
                                                        height: "16px",
                                                        backgroundColor: "white",
                                                        borderRadius: "50%",
                                                        position: "absolute",
                                                        top: "2px",
                                                        left: company.active ? "22px" : "2px",
                                                        transition: "left 0.3s",
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}