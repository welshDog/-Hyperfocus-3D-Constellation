import pytest
from httpx import AsyncClient

from app.main import app


@pytest.mark.asyncio
async def test_list_repositories():
    async with AsyncClient(app=app, base_url="http://test") as client:
        resp = await client.get("/api/v1/repositories")
    assert resp.status_code == 200
    data = resp.json()
    assert "items" in data
    assert len(data["items"]) > 0
