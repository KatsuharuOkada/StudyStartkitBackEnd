./deploy/ecs-deploy  --region $AWS_ECS_REGION --cluster $STG_AWS_ECS_CLUSTER --service-name $STG_AWS_ECS_SERVICE --image $STG_AWS_ECR_URI:latest

sleep 20
exit 0