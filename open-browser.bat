@echo off
setlocal
call "%~dp0start-server.bat"
start "" "http://127.0.0.1:8765/index.html"
endlocal