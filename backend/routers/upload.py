import boto3
import os
from fastapi import APIRouter

router = APIRouter()

s3 = boto3.client(
    "s3",
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    region_name=os.getenv("AWS_REGION"),
)

@router.post("/upload-url")
def get_upload_url(fileName: str, fileType: str):
    bucket = os.getenv("AWS_BUCKET_NAME")

    key = f"uploads/{fileName}"

    upload_url = s3.generate_presigned_url(
        "put_object",
        Params={
            "Bucket": bucket,
            "Key": key,
            "ContentType": fileType,
        },
        ExpiresIn=3600,
    )

    file_url = f"https://{bucket}.s3.amazonaws.com/{key}"

    return {
        "uploadUrl": upload_url,
        "fileUrl": file_url,
    }
