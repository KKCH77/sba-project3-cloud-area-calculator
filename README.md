# Cloud Area Calculator — SBA Project 3

This project is a simple distributed cloud web application for the Software Build Automation Tools Project 3 assignment.

## Functionality

The application calculates the area of three shapes:

- Rectangle
- Triangle
- Circle

The user enters values in the frontend. The frontend sends a `fetch` request to the Azure Function backend. The backend calculates the area and returns a JSON response.

## Architecture

- Frontend: HTML, CSS, JavaScript hosted on Azure Web App
- Backend: Python Azure Function V2 HTTP Trigger
- Repository: GitHub
- Automation: GitHub Actions CI/CD
- Communication: REST API with JSON
- Security configuration: CORS in Azure Function App

## Important file to edit

After creating the Azure Function, open `script.js` and replace:

```js
const API_BASE_URL = "https://YOUR-FUNCTION-APP.azurewebsites.net/api";
```

with your real Azure Function App URL.

Example:

```js
const API_BASE_URL = "https://sba-calculate-area.azurewebsites.net/api";
```

## Local run — frontend

```bash
pip install -r requirements.txt
python app.py
```

Open:

```text
http://127.0.0.1:5000
```

## Git commands

```bash
git init
git add .
git commit -m "Version 1: Initial cloud calculator application"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

## Final tag

```bash
git tag -a v1.0 -m "Final version"
git push origin v1.0
```

## Submission checklist

- Web App Overview screenshot from Azure
- Azure Function Overview screenshot from Azure
- GitHub Actions screenshot
- GitHub repository link
- Live Web App link
- Zipped VS Code project folder
