@echo off
title JioTV Desktop Application
color 0C
cls
echo ========================================================
echo                 JIOTV DESKTOP APPLICATION               
echo ========================================================
echo.
echo Starting JioTV Desktop Engine...
cd /d "%~dp0"

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not found in your PATH!
    echo Please install Node.js from https://nodejs.org
    echo.
    pause
    exit /b 1
)

node desktop-runner.js
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] JioTV Desktop failed to run.
    pause
)
