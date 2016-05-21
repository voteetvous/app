data "aws_iam_policy_document" "WebsiteBucketPolicyDocument" {
  statement {
    actions = ["s3:GetObject"]

    principals {
      type = "AWS"
      identifiers = ["*"]
    }

    resources = [
      "${aws_s3_bucket.WebsiteBucket.arn}/*"
    ]
  }
}
