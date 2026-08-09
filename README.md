# Cafeteras Marloy

> La empresa “Cafés Marloy” planea implementar un sistema administrativo para gestionar
sus máquinas expendedoras de café distribuidas en distintos clientes, así como el control de
insumos, proveedores, técnicos y consumos. 
[<small>Consigna.pdf</small>](./Consigna.pdf)

## Development

```bash
# docker compose down -v
docker compose up -d --build
```
> Requires: `.env`, Docker, [Ubuntu Guide](https://docs.docker.com/engine/install/ubuntu/)

## Production

```bash
docker compose up -d --build
```
> Requires: `.env`, Docker, [Ubuntu Guide](https://docs.docker.com/engine/install/ubuntu/)


## Debugging

```bash
docker exec -it mysql-server bash   # Entrar a dcoker-compose
mysql -u root -p                    # mysql Shell (pwd: `root`)
```
Ejecutamos comandos SQL, `USE gestion_comercial;` (previamente)

# Frontend <small>(React + Vite)</small>
No utilizamos por el momento

### Comunicacion con la API:

1. Queries a rutas publicas [<small>Comandos CURL</small>](/frontend/README.md#endpoints-publicos)
2. Autenticar usuario, get token [<small>Comandos CURL</small>](/frontend/README.md#autenticacion)
3. Updates y rutas privadas [<small>Comandos CURL</small>](/frontend/README.md#endpoints-privados)

# Anexo

- [Memoria]()
- [Bitacora]()
- [Backend](/backend/README.md)
- [Frontend](/frontend/README.md)