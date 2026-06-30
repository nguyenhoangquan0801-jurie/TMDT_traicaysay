@echo off
title NongLam Food - Dev Servers

echo ============================================
echo  Starting NongLam Food Development Servers
echo ============================================
echo.

echo [1/2] Starting Spring Boot backend (port 8080)...
start "Backend - Spring Boot" cmd /k "cd /d %~dp0backend && mvnw.cmd spring-boot:run"

echo [2/2] Starting React frontend (port 3000)...
start "Frontend - React" cmd /k "cd /d %~dp0frontend && npm start"

echo.
echo Both servers are starting in separate windows.
echo  - Backend:  http://localhost:8080
echo  - Frontend: http://localhost:3000
echo.
echo Close the opened terminal windows to stop the servers.
