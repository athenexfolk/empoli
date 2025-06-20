@echo off
REM Start backend in a new window
start cmd /k "cd backend\dotnet-empoli && dotnet run -lp https"
REM Start Angular frontend in this window
start cmd /k "cd frontend\angular-empoli && ng serve"
