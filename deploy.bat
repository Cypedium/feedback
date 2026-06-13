@echo off
echo === Deploying Backend ===
start cmd /k "fly deploy -c fly.server.toml"

echo === Deploying Frontend ===
start cmd /k "fly deploy -c fly.client.toml"

echo === Deploy started in two separate terminals ===
pause
