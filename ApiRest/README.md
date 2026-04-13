# CarService API

API REST para gestión de mantenimientos de vehículos.

## Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar .env con tus datos de MySQL
# (editar el archivo .env)

# 3. Crear la base de datos en MySQL Workbench
# Ejecutar el archivo database.sql

# 4. Iniciar el servidor
npm start

# O con recarga automática (desarrollo)
npm run dev
```

## Endpoints

### Modelos de vehículo
| Método | URL | Descripción |
|--------|-----|-------------|
| GET | /api/modelos | Listar todos los modelos |
| GET | /api/modelos/:id | Obtener un modelo |
| POST | /api/modelos | Crear modelo |
| PUT | /api/modelos/:id | Actualizar modelo |
| DELETE | /api/modelos/:id | Eliminar modelo |

### Mantenimiento de vehículos
| Método | URL | Descripción |
|--------|-----|-------------|
| GET | /api/mantenimiento | Listar todos los mantenimientos |
| GET | /api/mantenimiento/vehiculo/:id | Mantenimientos de un vehículo |
| GET | /api/mantenimiento/:id | Obtener un registro |
| POST | /api/mantenimiento | Crear registro |
| PUT | /api/mantenimiento/:id | Actualizar registro |
| DELETE | /api/mantenimiento/:id | Eliminar registro |

## Ejemplo - Crear un mantenimiento (POST)

```json
POST /api/mantenimiento
{
    "id_vehiculo": 1,
    "id_mantenimiento": 4,
    "fecha": "2026-04-12",
    "costo": 150000
}
```

## Tipos de mantenimiento (id_mantenimiento)
| ID | Tipo |
|----|------|
| 1 | SOAT + Complementario |
| 2 | Impuestos |
| 3 | Gasolina |
| 4 | Mantenimiento Preventivo |
| 5 | Mantenimiento Reparación |
| 6 | Lavada |
| 7 | Seguro Todo Riesgo |
