./deploy/ecs-deploy  --region $AWS_ECS_REGION --cluster $PRD_AWS_ECS_CLUSTER --service-name $PRD_AWS_ECS_SERVICE --image $PRD_AWS_ECR_URI:latest

sleep 20
exit 0