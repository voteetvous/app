data "aws_acm_certificate" "ssl_certificate" {
  provider = "aws.us-east-1"
  domain = "${var.domain_name}"
  statuses = ["ISSUED"]
}

resource "aws_cloudfront_distribution" "cloudfront_distribution" {
  retain_on_delete = true
  enabled = true

  aliases = ["${var.domain_name}"]

  origin {
    domain_name = "${aws_s3_bucket.WebsiteBucket.website_endpoint}"
    origin_id   = "websiteOrigin"

    custom_origin_config {
      http_port = 80
      https_port = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols = ["TLSv1.2"]
    }
  }

  origin {
    domain_name = "${var.api_host}"
    origin_id   = "api"
    origin_path = "/${var.apex_environment}"

    custom_origin_config {
      http_port = 80
      https_port = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols = ["TLSv1.2"]
    }
  }

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "websiteOrigin"

    forwarded_values {
      query_string = false

      cookies {
        forward = "all"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    compress               = true
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400

  }

  cache_behavior {
    allowed_methods = ["HEAD", "DELETE", "POST", "GET", "OPTIONS", "PUT", "PATCH"]
    cached_methods = ["HEAD", "GET", "OPTIONS"]
    target_origin_id = "api"
    path_pattern = "/graphql"

    forwarded_values {
      query_string = false

      cookies {
        forward = "all"
      }

      headers = [
        "Accept",
        "Content-Type",
        "Authorization",
        "CloudFront-Forwarded-Proto",
        "Date"
      ]
    }

    viewer_protocol_policy = "redirect-to-https"
    compress               = true
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn = "${data.aws_acm_certificate.ssl_certificate.arn}"
    ssl_support_method = "sni-only"
    minimum_protocol_version = "TLSv1"
  }
}
