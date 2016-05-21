variable "api_name" {}
variable "apex_environment" {}
variable "apex_function_graphql" {}
variable "tables_prefix" {}

output "api_host" {
  value = "${aws_api_gateway_rest_api.VoteEtVousAPI.id}.execute-api.eu-central-1.amazonaws.com"
}
