#!/usr/bin/env bash
set -euo pipefail

echo "== Mundos Virtuales (Astro) — instalación =="
echo

if ! command -v node >/dev/null 2>&1; then
  echo "ERROR: Node.js no está instalado. Instala Node.js 18+ y reintenta."
  exit 1
fi

NODE_VER=$(node -v || true)
echo "Node: $NODE_VER"

echo
echo "Instalando dependencias..."
npm install

echo
echo "Listo ✅"
echo "Para iniciar el servidor de desarrollo:"
echo "  npm run dev"
echo
echo "Luego abre: http://localhost:4321"
