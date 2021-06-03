# node-microservices-tickets-application
Made in a step by step tutorial by Stephen Grinder https://www.udemy.com/user/sgslo/

-> DEPENDENCIES
- docker
- docker-compose
- nodejs
- npm
- minikube
- skaffold
- kubectl

-> HOST FILE TWEAK
get your MINIKUBE_IP

minikube ip

sudo nano /etc/hosts

in the end of the file write
MINIKUBE_IP ticketing.dev

-> CREATE ENVIRONMENT VARIABLE KUBECTL
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=mysecret

-> ENABLE INGRESS NGNIX
minikube addons enable ingress

(error ingress controller admission)
kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission

KUBECT PORT FORWARDING
kubectl port-forward [POD_NAME] [LOCALHOST_PORT]:[POD_PORT]

TODO ->
Implement Database Transaction with Record Saving and Event Emitting