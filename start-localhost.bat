@echo off
setlocal
cd /d "%~dp0"

set PORT=8080
set URL=http://localhost:%PORT%/index.html

where py >nul 2>nul
if %errorlevel%==0 (
  py --version >nul 2>nul
  if %errorlevel%==0 (
    goto :RUN_PY
  )
)

where python >nul 2>nul
if %errorlevel%==0 (
  python --version >nul 2>nul
  if %errorlevel%==0 (
    goto :RUN_PYTHON
  )
)

goto :FALLBACK

:RUN_PY
echo Starting local server with py on port %PORT%...
start "" "%URL%"
py -m http.server %PORT% --bind 127.0.0.1
if %errorlevel%==0 goto :eof
echo py server exited unexpectedly.
goto :FALLBACK

:RUN_PYTHON
echo Starting local server with python on port %PORT%...
start "" "%URL%"
python -m http.server %PORT% --bind 127.0.0.1
if %errorlevel%==0 goto :eof
echo python server exited unexpectedly.

:FALLBACK
echo Falling back to built-in PowerShell static server...
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0start-localhost.ps1" -Port %PORT%
