kubectl create -f ./.kubernetes/publish.yaml

kubectl delete rs express-rs
kubectl delete deployment express-db
kubectl delete pod express-db
kubectl delete rs express-db
kubectl delete service express-external-service
kubectl delete service express-mysql-database

# build image
docker compose -f docker-compose-prod.yml build
docker tag erlangga-deall-api-node erlanggagatum/erlangga-deall-api
docker push erlanggagatum/erlangga-deall-api
