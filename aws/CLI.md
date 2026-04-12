### List EC2 instances (formatted)
aws ec2 describe-instances --output table \
  --query 'Reservations[].Instances[].[Tags[?Key==`Name`] | [0].Value, InstanceId, State.Name, LaunchTime]'

### Connect to EC2
aws ssm start-session --target i-0330077dedb5870dc

### Get EKS token
aws eks get-token --cluster-name=eks1-dev-usw2-g2
