from fastapi import FastAPI

from app.api.routes.gateway import router as gateway_router

app = FastAPI(title="Hyperfocus Gateway", version="1.0.0")
app.include_router(gateway_router)

