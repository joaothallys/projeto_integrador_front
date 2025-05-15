import axios from "axios";

const API_BASE_URL = "https://projeto-integrador-g2ah.onrender.com";

export const getAllCotacoes = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/cotacoes/historico`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar as cotações:", error);
        throw error;
    }
};

export const getActiveTransportCompanies = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/transportadora/ativas`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar as transportadoras ativas:", error);
        throw error;
    }
};

export const getJadLogQuote = async (payload) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/cotacoes/jadlog`, payload);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar cotação da JadLog:", error);
        throw error;
    }
};

export const getCorreioMiniQuote = async (payload) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/cotacoes/correio/mini`, payload);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar cotação do Correio Mini:", error);
        throw error;
    }
};

export const getCorreioSedexQuote = async (payload) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/cotacoes/correio/sedex`, payload);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar cotação do Correio Sedex:", error);
        throw error;
    }
};

export const getCorreioPacQuote = async (payload) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/cotacoes/correio/pac`, payload);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar cotação do Correio Pac:", error);
        throw error;
    }
};