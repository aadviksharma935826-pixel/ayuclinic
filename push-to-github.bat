@echo off
setlocal
echo ===================================================
echo        AYUCLINIC AI - GitHub Upload Helper
echo ===================================================
echo.
set "PATH=%PATH%;C:\Users\jaish\.gemini\antigravity\bin\git\cmd;C:\Program Files\nodejs"

echo Current Git status:
git status
echo.
echo Please enter your GitHub Repository URL.
echo Example: https://github.com/YOUR_USERNAME/ayuclinic-ai.git
echo.
set /p REPO_URL="Enter GitHub Repo URL: "

if "%REPO_URL%"=="" (
    echo.
    echo No URL entered. Aborted.
    pause
    exit /b
)

echo.
echo Setting remote origin to: %REPO_URL%
git remote remove origin 2>nul
git remote add origin %REPO_URL%
git branch -M main

echo.
echo Pushing project files to GitHub main branch...
git push -u origin main

echo.
if %ERRORLEVEL% EQU 0 (
    echo ===================================================
    echo  SUCCESS! Project successfully uploaded to GitHub!
    echo ===================================================
) else (
    echo.
    echo Push encountered an issue. If you need to force push or sign in, check the terminal prompt.
)

echo.
pause
