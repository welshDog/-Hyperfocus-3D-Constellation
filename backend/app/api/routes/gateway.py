import json
from pathlib import Path

import httpx
from fastapi import APIRouter, Header, HTTPException

from app.core.circuit_breaker import CircuitBreaker
from app.core.config import settings
from app.models.repository import GatewayResponse, Repository

router = APIRouter()
breaker = CircuitBreaker()
metrics = {"source": "static", "success": 0, "failure": 0}


def load_static_repos() -> list[Repository]:
    data_path = Path(__file__).resolve().parents[4] / "data" / "repos.json"
    items = json.loads(data_path.read_text())
    return [Repository(**item) for item in items]


@router.get("/api/v1/repositories", response_model=GatewayResponse)
async def list_repositories(
    page: int = 1,
    per_page: int = 50,
    x_gateway_variant: str | None = Header(default=None),
) -> GatewayResponse:
    if not breaker.allow():
        items = load_static_repos()
        metrics["source"] = "static"
        metrics["success"] += 1
        return GatewayResponse(items=items, page=1, perPage=len(items), total=len(items))

    if settings.gateway_upstream_url:
        try:
            async with httpx.AsyncClient(timeout=settings.gateway_timeout_seconds) as client:
                resp = await client.get(settings.gateway_upstream_url)
                resp.raise_for_status()
                data = resp.json()
                items = [Repository(**item) for item in data.get("items", data)]
                breaker.record_success()
                metrics["source"] = "upstream"
                metrics["success"] += 1
                return GatewayResponse(items=items, page=page, perPage=per_page, total=len(items))
        except Exception as exc:
            breaker.record_failure()
            metrics["failure"] += 1
            if settings.gateway_upstream_url:
                raise HTTPException(status_code=502, detail=str(exc)) from exc

    items = load_static_repos()
    metrics["source"] = "static"
    metrics["success"] += 1
    return GatewayResponse(items=items, page=1, perPage=len(items), total=len(items))


@router.get("/api/v1/monitoring/flip")
async def monitoring_flip() -> dict:
    return metrics
