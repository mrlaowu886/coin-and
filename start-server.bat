@echo off
setlocal
start "token-dashboard-server" /min powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0serve.ps1"
endlocal