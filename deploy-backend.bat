@echo off
start cmd /k "fly deploy -c fly.server.toml"
echo === Deploying Backend ===
pause