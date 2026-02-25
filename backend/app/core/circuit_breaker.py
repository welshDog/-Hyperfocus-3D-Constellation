from dataclasses import dataclass
from time import time


@dataclass
class CircuitBreakerState:
    failures: int = 0
    open_until: float = 0.0


class CircuitBreaker:
    def __init__(self, failure_threshold: int = 3, open_seconds: int = 30) -> None:
        self.failure_threshold = failure_threshold
        self.open_seconds = open_seconds
        self.state = CircuitBreakerState()

    def allow(self) -> bool:
        return time() >= self.state.open_until

    def record_success(self) -> None:
        self.state.failures = 0
        self.state.open_until = 0.0

    def record_failure(self) -> None:
        self.state.failures += 1
        if self.state.failures >= self.failure_threshold:
            self.state.open_until = time() + self.open_seconds
