provider "aws" {
  region = "us-east-1"
}

# Misconfiguration: Security group allowing all inbound traffic from any source
resource "aws_security_group" "vulnerable_sg" {
  name        = "allow-all-inbound"
  description = "Allow all inbound traffic"

  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "vulnerable-sg"
  }
}
