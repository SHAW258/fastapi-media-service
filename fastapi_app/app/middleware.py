import time
import logging
from fastapi import FastAPI, Request, Response, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException

# Setup Logger
logger = logging.getLogger("fastapi_app.middleware")
logging.basicConfig(level=logging.INFO)

def setup_middlewares(app: FastAPI):
    """
    Setup production-grade middlewares for seamless frontend <-> backend communication.
    Supports React, Next.js, React Native, Mobile Apps (ExoPlayer), Vue, Angular, etc.
    """

    # 1. Full CORS Middleware (Allows cross-origin requests from web & mobile frontends)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # Allows all origins for development & API access
        allow_credentials=True,
        allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allow_headers=[
            "Authorization",
            "Content-Type",
            "Accept",
            "Origin",
            "User-Agent",
            "DNT",
            "Cache-Control",
            "X-Mx-ReqToken",
            "Keep-Alive",
            "X-Requested-With",
            "If-Modified-Since",
            "X-CSRF-Token",
        ],
        expose_headers=["X-Process-Time", "Authorization"],
    )

    # 2. Performance Tracking & Security Headers Middleware
    @app.middleware("http")
    async def add_process_time_and_security_headers(request: Request, call_next):
        start_time = time.time()
        
        # Handle OPTIONS preflight requests smoothly
        if request.method == "OPTIONS":
            response = Response(status_code=status.HTTP_204_NO_CONTENT)
            response.headers["Access-Control-Allow-Origin"] = "*"
            response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, PATCH, OPTIONS"
            response.headers["Access-Control-Allow-Headers"] = "*"
            return response

        try:
            response = await call_next(request)
        except Exception as exc:
            logger.error(f"Unhandled Server Error on {request.method} {request.url.path}: {exc}")
            response = JSONResponse(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                content={"success": False, "message": "Internal server error occurred", "detail": str(exc)}
            )

        process_time = (time.time() - start_time) * 1000
        formatted_process_time = f"{process_time:.2f}ms"
        
        # Attach response headers for frontend performance monitoring & security
        response.headers["X-Process-Time"] = formatted_process_time
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"

        logger.info(f"{request.method} {request.url.path} -> {response.status_code} [{formatted_process_time}]")
        return response

    # 3. Global Exception Handler for HTTP Exceptions (Returns clean JSON for frontend)
    @app.exception_handler(StarletteHTTPException)
    async def http_exception_handler(request: Request, exc: StarletteHTTPException):
        return JSONResponse(
            status_code=exc.status_code,
            content={
                "success": False,
                "message": exc.detail if isinstance(exc.detail, str) else "Request error",
                "statusCode": exc.status_code
            }
        )

    # 4. Global Validation Error Handler (Formats Pydantic validation errors nicely for frontend forms)
    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(request: Request, exc: RequestValidationError):
        errors = []
        for error in exc.errors():
            loc = " -> ".join([str(e) for e in error["loc"]])
            errors.append(f"{loc}: {error['msg']}")
            
        return JSONResponse(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            content={
                "success": False,
                "message": "Validation failed for incoming request data",
                "errors": errors
            }
        )
