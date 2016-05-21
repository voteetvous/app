provider "aws" {
  region = "${var.aws_region}"
}

provider "aws" {
  alias = "us-east-1"
  region = "us-east-1"
}
