variable "aws_region" {}
variable "apex_environment" {}

variable "apex_function_graphql" {}

variable "project_name" {
  default = "voteetvous"
}

variable "domain_names" {
  type = "map"

  default = {
    dev = "app-dev.vote-et-vous.fr"
  }
}
