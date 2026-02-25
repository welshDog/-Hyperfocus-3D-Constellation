from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    gateway_upstream_url: str | None = None
    gateway_timeout_seconds: int = 5

    class Config:
        env_prefix = "HYPERFOCUS_"


settings = Settings()
