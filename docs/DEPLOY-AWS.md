# How to Deploy AWS

## Step 1 : Install Terraform and AWS credential

1) [Install Terraform](https://learn.hashicorp.com/terraform/getting-started/install.html) (require terraform v0.11)
```
https://releases.hashicorp.com/terraform/0.11.14/terraform_0.11.14_linux_amd64.zip
```

2) [Create credentials](https://www.terraform.io/docs/configuration/providers.html) file: ~/.aws/credentials
```
# cat ~/.aws/credentials
[default]
aws_access_key_id = XXXX
aws_secret_access_key = XXXX
region=ap-northeast-1
```

## Step 2: Clone source from github
```
git clone https://github.com/vitalifyjp/terraform_ecs.git
```

## Step 3: Edit your preferences

#### Edit your preferences

Edit `dev/variables.tf` file to customize application preferences like region, cluster name, ecr repo preferences.

```hcl
# Customize your AWS Region
variable "aws_region" {
  description = "AWS Region for the VPC"
  default     = "ap-northeast-1"
}

# Customize the Cluster Name
variable "cluster_name" {
  description = "ECS Cluster Name"
  default     = "dev-app"
}

# Customize your ECR Registry Name
variable "app_repository_name" {
  description = "ECR Repository Name"
  default     = "dev-app"
}

###### APPLICATION OPTIONS  ######
variable "container_name" {
  description = "Container app name"
  default     = "dev-app"
}
```

#### Edit Service Metrics

```hcl
# Number of containers
variable "desired_tasks" {
  description = "Number of containers desired to run app task"
  default     = 1
}

# Desired CPU
variable "desired_task_cpu" {
  description = "Desired CPU to run your tasks"
  default     = "512"
}

# Desired Memory
variable "desired_task_memory" {
  description = "Desired memory to run your tasks"
  default     = "1024"
}
```

Same for /stg or /prd

## Step 4: Terraform 

* Initialize Terraform 

```bash
cd dev
terraform init
```

* Plan our modifications

```bash
terraform plan
```

* Apply the changes on AWS

```bash
terraform apply
```
## Step 5: Setup CircleCI env vars From terrraform outputs:

1) Terrraform ouput:

- Cluster name will be: {$cluster-name}-cluster
- Service name will be: {$cluster-name}-service
- ECR URI: Copy from terraform apply output

2) Go to: https://circleci.com/gh/ORGANIZATION/YOUR-CIRCLECI-PROJ/edit#env-vars

Add below Environment Variables:
```
AWS_ACCESS_KEY_ID=XXXX
AWS_SECRET_ACCESS_KEY=XXXX
AWS_ECS_REGION=YOUR-REGION
DEV_AWS_ECS_CLUSTER={$cluster-name}-cluster
DEV_AWS_ECS_SERVICE={$cluster-name}-service
DEV_AWS_ECR_URI=COPY-FROM-terraform-apply-output
```
