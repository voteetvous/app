resource "aws_s3_bucket" "WebsiteBucket" {
  bucket = "${var.bucket_name}"
  acl    = "public-read"

  versioning {
    enabled = true
  }

  website = {
    index_document = "index.html"
  }
}

resource "aws_s3_bucket_policy" "WebsiteBucketPolicy" {
  bucket = "${aws_s3_bucket.WebsiteBucket.bucket}"
  policy = "${data.aws_iam_policy_document.WebsiteBucketPolicyDocument.json}"
}
