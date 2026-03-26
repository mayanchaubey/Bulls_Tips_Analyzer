"""
MarketMind AI — Upload Router
POST /api/upload-url — Generate S3 pre-signed URLs (MOCKED for MVP)
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
import hashlib
import time

router = APIRouter()


class FileUploadRequest(BaseModel):
    fileName: str
    fileType: str


class FileUploadResponse(BaseModel):
    uploadUrl: str
    fileUrl: str


@router.post("/upload-url", response_model=FileUploadResponse)
async def generate_upload_url(request: FileUploadRequest):
    """
    Generate pre-signed S3 upload URL (MOCKED for MVP).
    In production, this would use boto3 to generate real S3 URLs.
    For hackathon, we return fake URLs that frontend can use for UI testing.
    """
    if not request.fileName or not request.fileType:
        raise HTTPException(status_code=400, detail="fileName and fileType are required")
    
    # Validate file type
    allowed_types = [
        "application/pdf",
        "image/jpeg", 
        "image/png",
        "image/jpg",
        "text/csv",
        "application/vnd.ms-excel"
    ]
    
    if request.fileType not in allowed_types:
        raise HTTPException(
            status_code=400, 
            detail=f"File type {request.fileType} not allowed. Supported: PDF, JPEG, PNG, CSV"
        )
    
    # Generate fake but deterministic URLs
    file_hash = hashlib.md5(f"{request.fileName}{time.time()}".encode()).hexdigest()
    
    # Fake S3 bucket structure
    fake_upload_url = (
        f"https://marketmind-uploads.s3.ap-south-1.amazonaws.com/"
        f"temp/{file_hash}/{request.fileName}?X-Amz-Algorithm=AWS4-HMAC-SHA256"
    )
    
    fake_file_url = (
        f"https://marketmind-uploads.s3.ap-south-1.amazonaws.com/"
        f"uploads/{file_hash}/{request.fileName}"
    )
    
    return FileUploadResponse(
        uploadUrl=fake_upload_url,
        fileUrl=fake_file_url
    )