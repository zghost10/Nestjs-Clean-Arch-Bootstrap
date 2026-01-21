#!/bin/bash

# Script para subir os serviços locais (PostgreSQL, Loki, Prometheus, Grafana)
# A API deve ser executada manualmente

set -e

echo "🚀 Iniciando serviços locais..."
docker-compose -f local.yaml up -d

echo ""
echo "✅ Serviços iniciados com sucesso!"
echo ""
echo "📦 Serviços disponíveis:"
echo "   - PostgreSQL:  localhost:${DB_PORT:-5432}"
echo "   - Loki:        localhost:3100"
echo "   - Prometheus:  localhost:${PROMETHEUS_PORT:-9090}"
echo "   - Grafana:     localhost:${GRAFANA_PORT:-3001} (admin/admin)"
echo ""
echo "💡 Para iniciar a API manualmente:"
echo "   yarn start:dev"
echo ""
echo "📋 Para ver os logs:"
echo "   docker-compose -f local.yaml logs -f"
echo ""
echo "🛑 Para parar os serviços:"
echo "   docker-compose -f local.yaml down"
