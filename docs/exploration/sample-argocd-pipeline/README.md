
# Create a ArgoCD pipeline

You will use Kubernetes cluster for production but here I'm using Minikube instead of cluster in order to practice the ArgoCD pipeline.




# 1) Install MiniKube on Linux.

What you’ll need:

-> 2 CPUs or more

-> 2GB of free RAM

-> 20GB of free disk space

-> Make sure docker is installed 

(In case docker is not installed then install it by performing step 1,2 and 3 from the below link).

 - [How to Install Docker on Ubuntu 22.04 / 20.04 LTS](https://www.linuxtechi.com/install-use-docker-on-ubuntu/)


## Installation


```bash
  curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
```
```bash
  sudo install minikube-linux-amd64 /usr/local/bin/minikube
```

## Start the Minikube Cluster
Then start the minikube cluster by using below command: 
```bash
  minikube start --driver=docker
```
It will take about 30-45 min when you start it for the first time. Therefore, do some other stuff and don't be a tech nerd. 


![Pic showing Minikube has been started](https://www.linuxtechi.com/wp-content/uploads/2021/06/Start-Minikube-Ubuntu-22-04-1024x366.png?ezimgfmt=ng:webp/ngcb22)

# 2) Install ArgoCD in k8s (Minikube)

```bash
  kubectl create namespace argocd
```
```bash
  kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```
# 3) Access ArgoCD UI

```bash
kubectl get svc -n argocd
```

```bash
kubectl port-forward svc/argocd-server 8080:443 -n argocd
```
### You will see the following output:

Forwarding from 127.0.0.1:8080 -> 8080

Forwarding from [::1]:8080 -> 8080

### When you type this 127.0.0.1:8080 to browser it will show you the ArgoCD UI Dashboard.

![argo cd ui login](https://redhat-scholars.github.io/argocd-tutorial/argocd-tutorial/_images/argocd-login.png)

### Username= admin
### password=?

You can get the password using following command:
```bash
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d; echo
````

# 4) Deploy application and Sync it with GITLAb

All the code is present in 'dev' folder. Application.yaml is use to create the link btw gitlab (where application code and kubernetes manifest files are present) and Minikube Cluster (application is deployed and running).

Just run below command to start monitoring the health and sync status of your application.

```bash
kubectl apply -f application.yaml
```
Click below to see result:

[Click me ](https://drive.google.com/file/d/1Qj2IOiuUrIQrCGE7Krm9960kBi5stFLi/view?usp=sharing)

# BYE