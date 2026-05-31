#!/bin/bash

ROOT="$(cd "$(dirname "$0")" && pwd)"

# Cleanup: mata ambos os servidores ao sair
cleanup() {
  echo ""
  echo "Encerrando servidores..."
  kill "$BACKEND_PID" "$FRONTEND_PID" 2>/dev/null
  wait "$BACKEND_PID" "$FRONTEND_PID" 2>/dev/null
  exit 0
}
trap cleanup INT TERM

# Backend
source "$ROOT/venv/bin/activate"
cd "$ROOT/myalbum"
uvicorn main:app --reload --host 0.0.0.0 &
BACKEND_PID=$!

# Frontend
cd "$ROOT/myalbum/frontend_myalbum"
npm run dev &
FRONTEND_PID=$!

#Rode o servidor aqui
echo "Backend rodando  → http://localhost:8000"
echo "Frontend rodando → http://localhost:3000"
echo "Pressione Ctrl+C para encerrar os dois."

wait
