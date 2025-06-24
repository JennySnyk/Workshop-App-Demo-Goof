provider "aws" {
  region = "us-east-1"
}

# Misconfiguration: S3 bucket with public read access
resource "aws_s3_bucket" "vulnerable_bucket" {
  bucket = "workshop-app-demo-goof-public-bucket"
  acl    = "public-read"

  tags = {
    Name        = "Vulnerable Bucket"
    Environment = "Demo"
  }
}
