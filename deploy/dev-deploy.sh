./deploy/ecs-deploy  --region $AWS_ECS_REGION --cluster $DEV_AWS_ECS_CLUSTER --service-name $DEV_AWS_ECS_SERVICE --image $DEV_AWS_ECR_URI:latest

sleep 20
exit 0