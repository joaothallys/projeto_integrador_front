import React from "react";

export default function Analytics() {
  return (
    <div style={{ padding: '2rem', backgroundColor: '#f7f9fc', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1976D2', marginBottom: '2rem' }}>
        Carteira Financeira
      </h1>

      <div style={{ backgroundColor: '#ffffff', borderRadius: '1rem', boxShadow: '0 0 15px rgba(0,0,0,0.05)', padding: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1976D2', marginBottom: '1rem', borderBottom: '1px solid #ddd', paddingBottom: '0.5rem' }}>
          Resumo
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <div style={{ backgroundColor: '#e3f2fd', borderLeft: '4px solid #1976D2', padding: '1rem', borderRadius: '0.5rem' }}>
            <p style={{ fontSize: '0.9rem', color: '#555' }}>Saldo Total</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#c62828' }}>R$ -25,00</p>
          </div>
          <div style={{ backgroundColor: '#e3f2fd', borderLeft: '4px solid #1976D2', padding: '1rem', borderRadius: '0.5rem' }}>
            <p style={{ fontSize: '0.9rem', color: '#555' }}>Limite Disponível</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2e7d32' }}>R$ 10,00</p>
          </div>
          <div style={{ backgroundColor: '#e3f2fd', borderLeft: '4px solid #1976D2', padding: '1rem', borderRadius: '0.5rem' }}>
            <p style={{ fontSize: '0.9rem', color: '#555' }}>Saldo Utilizado</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1976D2' }}>R$ 35,00</p>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: '#ffffff', borderRadius: '1rem', boxShadow: '0 0 15px rgba(0,0,0,0.05)', padding: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1976D2', marginBottom: '1rem', borderBottom: '1px solid #ddd', paddingBottom: '0.5rem' }}>
          Transações Recentes
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ color: '#666', fontSize: '0.9rem', borderBottom: '1px solid #ccc' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Data</th>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Descrição</th>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Tipo</th>
              <th style={{ padding: '0.75rem', textAlign: 'right' }}>Valor (R$)</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '0.75rem' }}>21/05/2025</td>
              <td style={{ padding: '0.75rem' }}>Pagamento de serviço</td>
              <td style={{ padding: '0.75rem' }}>Débito</td>
              <td style={{ padding: '0.75rem', textAlign: 'right', color: '#c62828' }}>- R$ 60,00</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '0.75rem' }}>18/05/2025</td>
              <td style={{ padding: '0.75rem' }}>Crédito por faturamento</td>
              <td style={{ padding: '0.75rem' }}>Crédito</td>
              <td style={{ padding: '0.75rem', textAlign: 'right', color: '#2e7d32' }}>+ R$ 35,00</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem' }}>15/05/2025</td>
              <td style={{ padding: '0.75rem' }}>Retirada de saldo</td>
              <td style={{ padding: '0.75rem' }}>Débito</td>
              <td style={{ padding: '0.75rem', textAlign: 'right', color: '#c62828' }}>- R$ 25,00</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ backgroundColor: '#ffffff', borderRadius: '1rem', boxShadow: '0 0 15px rgba(0,0,0,0.05)', padding: '1.5rem' }}>
        <div style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1976D2', marginBottom: '1rem', borderBottom: '1px solid #ddd', paddingBottom: '0.5rem' }}>
          Faturamento
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <div style={{ backgroundColor: '#e3f2fd', borderLeft: '4px solid #1976D2', padding: '1rem', borderRadius: '0.5rem' }}>
            <h3 style={{ color: '#1976D2', fontSize: '1rem' }}>Transporte Last Mile</h3>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>R$ 1.250,00</p>
            <p style={{ fontSize: '0.85rem', color: '#777' }}>62,5% do faturamento</p>
          </div>
          <div style={{ backgroundColor: '#e3f2fd', borderLeft: '4px solid #1976D2', padding: '1rem', borderRadius: '0.5rem' }}>
            <h3 style={{ color: '#1976D2', fontSize: '1rem' }}>Serviços</h3>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>R$ 750,00</p>
            <p style={{ fontSize: '0.85rem', color: '#777' }}>37,5% do faturamento</p>
          </div>
        </div>
      </div>
    </div>
  );
}