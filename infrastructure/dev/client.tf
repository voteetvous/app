module "app_client" {
  source = "../lib/client"
  domain_name = "${var.domain_names[var.apex_environment]}"
  bucket_name = "${var.domain_names[var.apex_environment]}"
  api_host = "${module.app_api.api_host}"
  apex_environment = "${var.apex_environment}"
}
