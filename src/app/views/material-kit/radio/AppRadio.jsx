import React, { useState } from "react";

const transportData = [
    { name: "Sedex", logo: "https://logodownload.org/wp-content/uploads/2017/03/sedex-logo.png", rating: 3, active: true },
    { name: "PAC", logo: "https://logodownload.org/wp-content/uploads/2017/03/pac-correios-logo.png", rating: 5, active: true },
    { name: "PAC Mini", logo: "https://logodownload.org/wp-content/uploads/2014/05/correios-logo-5-1.png", rating: 4.9, active: false },
    { name: "Loggi", logo: "https://logodownload.org/wp-content/uploads/2019/07/loggi-logo.png", rating: 4.5, active: true },
    { name: "JadLog", logo: "https://logodownload.org/wp-content/uploads/2019/02/jadlog-logo.png", rating: 4.2, active: true },
];

export default function TransportCompanies() {
    const [transportCompanies, setTransportCompanies] = useState(transportData);

    const toggleActive = (index) => {
        const updatedCompanies = [...transportCompanies];
        updatedCompanies[index].active = !updatedCompanies[index].active;
        setTransportCompanies(updatedCompanies);
    };

    return (
        <div style={{ padding: "20px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
                {transportCompanies.map((company, index) => (
                    <div
                        key={index}
                        style={{
                            backgroundColor: "white",
                            borderRadius: "10px",
                            padding: "20px",
                            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                            borderRight: "6px solid #28a745",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                        }}
                    >
                        {/* Título e Toggle */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <h3 style={{ margin: 0, fontWeight: "bold", fontSize: "18px" }}>{company.name}</h3>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <span style={{ marginRight: "10px", fontSize: "14px" }}>
                                    {company.active ? "Ativo" : "Ativar"}
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
                                        }}
                                    >
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
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Logo e selo */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "15px" }}>
                            <img
                                src={company.logo}
                                alt={`${company.name} logo`}
                                style={{ maxHeight: "60px", objectFit: "contain" }}
                            />
                        </div>

                        {/* Avaliação e Detalhes */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px" }}>
                            <div style={{ display: "flex", alignItems: "center", color: "#ffc107" }}>
                                <span style={{ fontSize: "20px", marginRight: "5px" }}>★</span>
                                <span>{company.rating}</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", color: "#6c757d", fontSize: "16px" }}>
                                <span style={{ fontSize: "20px", marginRight: "5px" }}>👁</span>
                                <span>Detalhes</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
