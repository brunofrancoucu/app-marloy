USE gestion_comercial;

WITH Alquileres AS (
    -- 1. Calculamos el costo fijo de las máquinas y la cantidad por cliente
    SELECT 
        id_cliente, 
        COUNT(id_maquina) AS cantidad_maquinas,
        SUM(costo_alquiler_mensual) AS total_alquiler
    FROM maquinas
    GROUP BY id_cliente
),
Consumos AS (
    -- 2. Calculamos el costo variable (insumos consumidos) por cliente
    SELECT 
        m.id_cliente, 
        SUM(rc.cantidad_usada * i.precio_unitario) AS total_consumos
    FROM maquinas m
    JOIN registro_consumo rc ON m.id_maquina = rc.id_maquina
    JOIN insumos i ON rc.id_insumo = i.id_insumo
    -- Descomenta la siguiente línea si solo quieres cobrar los consumos del mes pasado:
    -- WHERE YEAR(rc.fecha) = YEAR(CURRENT_DATE - INTERVAL 1 MONTH) AND MONTH(rc.fecha) = MONTH(CURRENT_DATE - INTERVAL 1 MONTH)
    GROUP BY m.id_cliente
)
-- 3. Unimos ambas partes de forma segura
SELECT 
    a.id_cliente, 
    a.cantidad_maquinas, 
    (a.total_alquiler + COALESCE(c.total_consumos, 0)) AS total_a_cobrar
FROM Alquileres a
LEFT JOIN Consumos c ON a.id_cliente = c.id_cliente
ORDER BY a.cantidad_maquinas DESC
LIMIT 5;