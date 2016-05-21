resource "aws_dynamodb_table" "electionsTable" {
  name = "${var.tables_prefix}-elections"
  read_capacity = 1
  write_capacity = 1
  hash_key = "id"
  range_key = "name"

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "name"
    type = "S"
  }

  attribute {
    name = "is_current"
    type = "S"
  }

  global_secondary_index {
    name = "is_current-index"
    hash_key = "is_current"
    write_capacity = 1
    read_capacity = 1
    projection_type = "ALL"
  }
}

resource "aws_dynamodb_table" "candidatesTable" {
  name = "${var.tables_prefix}-candidates"
  read_capacity = 1
  write_capacity = 1
  hash_key = "id"

  attribute {
    name = "election_id"
    type = "S"
  }

  attribute {
    name = "id"
    type = "S"
  }

  global_secondary_index {
    name = "by_election_id-index"
    hash_key = "election_id"
    range_key = "id"
    write_capacity = 1
    read_capacity = 1
    projection_type = "ALL"
  }
}

resource "aws_dynamodb_table" "sessionsTable" {
  name = "${var.tables_prefix}-sessions"
  read_capacity = 1
  write_capacity = 1
  hash_key = "id"

  attribute {
    name = "id"
    type = "S"
  }
}

resource "aws_dynamodb_table" "questionsTable" {
  name = "${var.tables_prefix}-questions"
  read_capacity = 1
  write_capacity = 1
  hash_key = "id"

  attribute {
    name = "election_id"
    type = "S"
  }

  attribute {
    name = "id"
    type = "S"
  }

  global_secondary_index {
    name = "by_election_id-index"
    hash_key = "election_id"
    range_key = "id"
    write_capacity = 1
    read_capacity = 1
    projection_type = "ALL"
  }
}

resource "aws_dynamodb_table" "candidateResponsesTable" {
  name = "${var.tables_prefix}-candidate-responses"
  read_capacity = 1
  write_capacity = 1
  hash_key = "id"

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "election_id"
    type = "S"
  }

  global_secondary_index {
    name = "by_election_id-index"
    hash_key = "election_id"
    range_key = "id"
    write_capacity = 1
    read_capacity = 1
    projection_type = "ALL"
  }
}

resource "aws_dynamodb_table" "sessionResponsesTable" {
  name = "${var.tables_prefix}-session-responses"
  read_capacity = 1
  write_capacity = 1
  hash_key = "id"

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "session_id"
    type = "S"
  }

  global_secondary_index {
    name = "by_session_id-index"
    hash_key = "session_id"
    range_key = "id"
    write_capacity = 1
    read_capacity = 1
    projection_type = "ALL"
  }
}

resource "aws_iam_role" "GraphQLLambdaRole" {
  name = "voteetvous_function_graphql_role"
  path = "/"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "sts:AssumeRole"
      ],
      "Effect": "Allow",
      "Principal": {
        "Service": [
          "lambda.amazonaws.com"
        ]
      }
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "GraphQLLambdaRolePolicy" {
    name = "test_policy"
    role = "${aws_iam_role.GraphQLLambdaRole.id}"
    policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "*"
      ],
      "Resource": [
        "arn:aws:dynamodb:eu-central-1:*:table/*",
        "arn:aws:dynamodb:eu-central-1:*:table/${var.tables_prefix}-elections/*",
        "arn:aws:dynamodb:eu-central-1:*:table/${var.tables_prefix}-candidates",
        "arn:aws:dynamodb:eu-central-1:*:table/${var.tables_prefix}-candidates/*",
        "arn:aws:dynamodb:eu-central-1:*:table/${var.tables_prefix}-sessions",
        "arn:aws:dynamodb:eu-central-1:*:table/${var.tables_prefix}-sessions/*",
        "arn:aws:dynamodb:eu-central-1:*:table/${var.tables_prefix}-questions",
        "arn:aws:dynamodb:eu-central-1:*:table/${var.tables_prefix}-questions/*",
        "arn:aws:dynamodb:eu-central-1:*:table/${var.tables_prefix}-candidate-responses",
        "arn:aws:dynamodb:eu-central-1:*:table/${var.tables_prefix}-candidate-responses/*",
        "arn:aws:dynamodb:eu-central-1:*:table/${var.tables_prefix}-session-responses",
        "arn:aws:dynamodb:eu-central-1:*:table/${var.tables_prefix}-session-responses/*"
      ]
    }
  ]
}
EOF
}
