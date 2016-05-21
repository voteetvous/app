data "aws_caller_identity" "current" { }


resource "aws_api_gateway_rest_api" "VoteEtVousAPI" {
  name = "${var.api_name}"
}

resource "aws_api_gateway_resource" "VoteEtVousGraphQLResource" {
  rest_api_id = "${aws_api_gateway_rest_api.VoteEtVousAPI.id}"
  parent_id = "${aws_api_gateway_rest_api.VoteEtVousAPI.root_resource_id}"
  path_part = "graphql"
}

resource "aws_api_gateway_method" "GraphQLGET" {
  rest_api_id = "${aws_api_gateway_rest_api.VoteEtVousAPI.id}"
  resource_id = "${aws_api_gateway_resource.VoteEtVousGraphQLResource.id}"
  http_method = "GET"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "GraphQLGETIntegration" {
  rest_api_id = "${aws_api_gateway_rest_api.VoteEtVousAPI.id}"
  resource_id = "${aws_api_gateway_resource.VoteEtVousGraphQLResource.id}"
  http_method = "${aws_api_gateway_method.GraphQLGET.http_method}"
  type = "AWS_PROXY"
  integration_http_method = "POST"
  uri = "arn:aws:apigateway:eu-central-1:lambda:path/2015-03-31/functions/${var.apex_function_graphql}/invocations"
}

resource "aws_api_gateway_method" "GraphQLPOST" {
  rest_api_id = "${aws_api_gateway_rest_api.VoteEtVousAPI.id}"
  resource_id = "${aws_api_gateway_resource.VoteEtVousGraphQLResource.id}"
  http_method = "POST"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "GraphQLPOSTIntegration" {
  rest_api_id = "${aws_api_gateway_rest_api.VoteEtVousAPI.id}"
  resource_id = "${aws_api_gateway_resource.VoteEtVousGraphQLResource.id}"
  http_method = "${aws_api_gateway_method.GraphQLPOST.http_method}"
  type = "AWS_PROXY"
  integration_http_method = "POST"
  uri = "arn:aws:apigateway:eu-central-1:lambda:path/2015-03-31/functions/${var.apex_function_graphql}/invocations"
}

resource "aws_lambda_permission" "apigw_lambda" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = "${var.apex_function_graphql}"
  principal     = "apigateway.amazonaws.com"
}

resource "aws_api_gateway_deployment" "VoteEtVousAPI" {
  depends_on = [
    "aws_api_gateway_method.GraphQLGET",
    "aws_api_gateway_method.GraphQLPOST",
  ]
  rest_api_id = "${aws_api_gateway_rest_api.VoteEtVousAPI.id}"

  stage_name = "${var.apex_environment}"
  description = "Deployment"
}
