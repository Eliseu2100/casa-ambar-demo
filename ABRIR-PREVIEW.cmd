@echo off
rem Abre o site de demonstracao da Casa Ambar em http://localhost:3100
cd /d "%~dp0"
if not exist ".next\BUILD_ID" call npm run build
start "" http://localhost:3100
call npm run start
