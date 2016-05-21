module "app_api" {
  source = "../lib/api"
  api_name = "VoteEtVousAPI-${var.apex_environment}"
  apex_environment = "${var.apex_environment}"
  apex_function_graphql = "${var.apex_function_graphql}"
  tables_prefix = "VoteEtVous-${var.apex_environment}"
}
