from pydantic import BaseModel, HttpUrl, Field


class Repository(BaseModel):
    name: str
    category: str
    description: str
    language: str
    stars: int = Field(ge=0)
    updated: str
    status: str
    githubUrl: HttpUrl


class GatewayResponse(BaseModel):
    items: list[Repository]
    page: int = Field(ge=1)
    perPage: int = Field(ge=1, le=1000)
    total: int = Field(ge=0)
