@echo off
setlocal
call "%~dp0start-server.bat"
set "CHROME=C:\Program Files\Google\Chrome\Application\chrome.exe"
if not exist "%CHROME%" set "CHROME=C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
if not exist "%CHROME%" (
  echo Google Chrome was not found.
  pause
  exit /b 1
)
start "" "%CHROME%" "http://127.0.0.1:8765/index.html"
endlocal