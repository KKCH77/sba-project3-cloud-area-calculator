import json
import math
import azure.functions as func

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)


@app.route(route="CalculateArea", methods=["POST", "OPTIONS"])
def calculate_area(req: func.HttpRequest) -> func.HttpResponse:
    try:
        if req.method == "OPTIONS":
            return func.HttpResponse(status_code=204)

        data = req.get_json()
        shape = data.get("shape")

        if shape == "rectangle":
            width = float(data.get("width", 0))
            height = float(data.get("height", 0))
            area = width * height

        elif shape == "triangle":
            base = float(data.get("base", 0))
            height = float(data.get("height", 0))
            area = 0.5 * base * height

        elif shape == "circle":
            radius = float(data.get("radius", 0))
            area = math.pi * radius * radius

        else:
            return func.HttpResponse(
                json.dumps({"error": "Unsupported shape"}),
                status_code=400,
                mimetype="application/json"
            )

        if area < 0:
            return func.HttpResponse(
                json.dumps({"error": "Values must be positive"}),
                status_code=400,
                mimetype="application/json"
            )

        return func.HttpResponse(
            json.dumps({
                "shape": shape,
                "area": round(area, 2),
                "backend": "Azure Function Python V2"
            }),
            status_code=200,
            mimetype="application/json"
        )

    except Exception as exc:
        return func.HttpResponse(
            json.dumps({"error": str(exc)}),
            status_code=500,
            mimetype="application/json"
        )
