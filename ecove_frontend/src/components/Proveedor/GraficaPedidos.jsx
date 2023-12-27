import React from "react";
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from "recharts";
// import axios from 'axios';
const colors = ["#16a34a", "#f43f5e", "#7dd3fc"];

const GraficaPedidos = ({ data }) => {
  return (
    <div className="w-64 h-64 -m-10">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            dataKey="value"
            data={data}
            innerRadius={55}
            outerRadius={85}
            fill="#16a34a"
            label={({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
              // Calcula la posición del texto
              const RADIAN = Math.PI / 180;
              const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);

              // Retorna el número fijo que deseas mostrar
              return (
                <text
                  x={x}
                  y={y}
                  fill="#333"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {value}
                </text>
              );
            }}
            labelLine={false} // Esto quita el indicador (línea de conexión)
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficaPedidos;
