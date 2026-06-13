@echo off
start cmd /k "fly deploy -c fly.client.toml"
echo === Deploying Frontend ===
pause