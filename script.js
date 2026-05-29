// IMPORTANT:
// After you create the Azure Function, replace this value with your real Function App URL.
// Example: https://sba-calculate-area.azurewebsites.net/api
const API_BASE_URL = "https://kargo-area-api-d0cmeea3e4dtfzcv.swedencentral-01.azurewebsites.net/api";

const shapeSelect = document.getElementById("shape");
const inputsDiv = document.getElementById("inputs");
const resultDiv = document.getElementById("result");
const statusDiv = document.getElementById("status");
const calculateBtn = document.getElementById("calculateBtn");

function renderInputs() {
  const shape = shapeSelect.value;

  if (shape === "rectangle") {
    inputsDiv.innerHTML = `
      <label for="width">Width</label>
      <input id="width" type="number" min="0" step="0.01" placeholder="Enter width" />

      <label for="height">Height</label>
      <input id="height" type="number" min="0" step="0.01" placeholder="Enter height" />
    `;
  }

  if (shape === "triangle") {
    inputsDiv.innerHTML = `
      <label for="base">Base</label>
      <input id="base" type="number" min="0" step="0.01" placeholder="Enter base" />

      <label for="height">Height</label>
      <input id="height" type="number" min="0" step="0.01" placeholder="Enter height" />
    `;
  }

  if (shape === "circle") {
    inputsDiv.innerHTML = `
      <label for="radius">Radius</label>
      <input id="radius" type="number" min="0" step="0.01" placeholder="Enter radius" />
    `;
  }
}

function getPayload() {
  const shape = shapeSelect.value;

  if (shape === "rectangle") {
    return {
      shape,
      width: Number(document.getElementById("width").value),
      height: Number(document.getElementById("height").value)
    };
  }

  if (shape === "triangle") {
    return {
      shape,
      base: Number(document.getElementById("base").value),
      height: Number(document.getElementById("height").value)
    };
  }

  if (shape === "circle") {
    return {
      shape,
      radius: Number(document.getElementById("radius").value)
    };
  }
}

async function calculateArea() {
  const payload = getPayload();

  resultDiv.textContent = "Calculating...";
  statusDiv.textContent = "Sending request to Azure Function backend...";

  try {
    const response = await fetch(`${API_BASE_URL}/CalculateArea`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Backend error");
    }

    resultDiv.textContent = `Area: ${data.area}`;
    statusDiv.textContent = `Calculated by backend: ${data.backend}`;
  } catch (error) {
    resultDiv.textContent = "Could not calculate area.";
    statusDiv.textContent = `Error: ${error.message}. Check API_BASE_URL and CORS settings.`;
  }
}

shapeSelect.addEventListener("change", renderInputs);
calculateBtn.addEventListener("click", calculateArea);

renderInputs();
