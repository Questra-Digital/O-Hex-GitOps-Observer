package main

import (
    "io/ioutil"
    "log"
    "net/http"
	"fmt"
	"bytes"
	"crypto/tls"
	"encoding/json"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
	"context"

)

type ArgoCDJSON struct {
    Metadata struct {
        ResourceVersion string `json:"resourceVersion"`
    } `json:"metadata"`
    Items []struct {
        Metadata struct {
            Name              string `json:"name"`
            Namespace         string `json:"namespace"`
            UID               string `json:"uid"`
            ResourceVersion   string `json:"resourceVersion"`
            Generation        int    `json:"generation"`
            CreationTimestamp string `json:"creationTimestamp"`
        } `json:"metadata"`
        Spec struct {
            Source struct {
                RepoURL      string `json:"repoURL"`
                Path         string `json:"path"`
                TargetRevision string `json:"targetRevision"`
            } `json:"source"`
            Destination struct {
                Server    string `json:"server"`
                Namespace string `json:"namespace"`
            } `json:"destination"`
            Project     string `json:"project"`
            SyncPolicy struct {
                Automated struct {
                    Prune    bool `json:"prune"`
                    SelfHeal bool `json:"selfHeal"`
                } `json:"automated"`
                SyncOptions []string `json:"syncOptions"`
            } `json:"syncPolicy"`
        } `json:"spec"`
        Status struct {
            Resources []struct {
                Version string `json:"version"`
                Kind    string `json:"kind"`
                Namespace string `json:"namespace"`
                Name    string `json:"name"`
                Status  string `json:"status"`
                Health  struct {
                    Status string `json:"status"`
                } `json:"health"`
            } `json:"resources"`
            Sync struct {
                Status string `json:"status"`
                ComparedTo struct {
                    Source struct {
                        RepoURL      string `json:"repoURL"`
                        Path         string `json:"path"`
                        TargetRevision string `json:"targetRevision"`
                    } `json:"source"`
                    Destination struct {
                        Server    string `json:"server"`
                        Namespace string `json:"namespace"`
                    } `json:"destination"`
                } `json:"comparedTo"`
                Revision string `json:"revision"`
            } `json:"sync"`
            Health struct {
                Status string `json:"status"`
            } `json:"health"`
            History []struct {
                Revision      string `json:"revision"`
                DeployedAt    string `json:"deployedAt"`
                ID            int    `json:"id"`
                Source        struct {
                    RepoURL      string `json:"repoURL"`
                    Path         string `json:"path"`
                    TargetRevision string `json:"targetRevision"`
                } `json:"source"`
                DeployStartedAt string `json:"deployStartedAt"`
            } `json:"history"`
        } `json:"status"`
    } `json:"items"`
}

func printArgoCDJSON(ArgoCD ArgoCDJSON) {
    fmt.Printf("Metadata ResourceVersion: %s\n", ArgoCD.Metadata.ResourceVersion)

	for i, item := range ArgoCD.Items {
        fmt.Printf("\nItem %d:\n", i)
        fmt.Printf("Metadata:\n")
        fmt.Printf("\tName: %s\n", item.Metadata.Name)
        fmt.Printf("\tNamespace: %s\n", item.Metadata.Namespace)
        fmt.Printf("\tUID: %s\n", item.Metadata.UID)
        fmt.Printf("\tResource Version: %s\n", item.Metadata.ResourceVersion)
        fmt.Printf("\tGeneration: %d\n", item.Metadata.Generation)
        fmt.Printf("\tCreation Timestamp: %s\n", item.Metadata.CreationTimestamp)

        fmt.Printf("Spec:\n")
        fmt.Printf("\tSource:\n")
        fmt.Printf("\t\tRepo URL: %s\n", item.Spec.Source.RepoURL)
        fmt.Printf("\t\tPath: %s\n", item.Spec.Source.Path)
        fmt.Printf("\t\tTarget Revision: %s\n", item.Spec.Source.TargetRevision)
        fmt.Printf("\tDestination:\n")
        fmt.Printf("\t\tServer: %s\n", item.Spec.Destination.Server)
        fmt.Printf("\t\tNamespace: %s\n", item.Spec.Destination.Namespace)
        fmt.Printf("\tProject: %s\n", item.Spec.Project)
        fmt.Printf("\tSync Policy:\n")
        fmt.Printf("\t\tAutomated:\n")
        fmt.Printf("\t\t\tPrune: %v\n", item.Spec.SyncPolicy.Automated.Prune)
        fmt.Printf("\t\t\tSelf Heal: %v\n", item.Spec.SyncPolicy.Automated.SelfHeal)
        fmt.Printf("\t\tSync Options: %v\n", item.Spec.SyncPolicy.SyncOptions)

        fmt.Printf("Status:\n")
        fmt.Printf("\tResources:\n")
        for j, resource := range item.Status.Resources {
            fmt.Printf("\t\tResource %d:\n", j)
            fmt.Printf("\t\t\tVersion: %s\n", resource.Version)
            fmt.Printf("\t\t\tKind: %s\n", resource.Kind)
            fmt.Printf("\t\t\tNamespace: %s\n", resource.Namespace)
            fmt.Printf("\t\t\tName: %s\n", resource.Name)
            fmt.Printf("\t\t\tStatus: %s\n", resource.Status)
		}
    }
}
	
	
	

func main() {
	// connect to local mongoDB
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI("mongodb://localhost:27017"))
        if err != nil {
                panic(err)
        }
	if err := client.Ping(context.TODO(), readpref.Primary()); err != nil {
			panic(err)
	}
//--------------------------------- for ARGO CD ----------------------------------
    url := "https://localhost:8080/api/v1/applications"
	token := "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcmdvY2QiLCJzdWIiOiJhZG1pbjpsb2dpbiIsImV4cCI6MTY3NjA5MTQyOCwibmJmIjoxNjc2MDA1MDI4LCJpYXQiOjE2NzYwMDUwMjgsImp0aSI6IjA2YTNiMjU3LWY3MmUtNDNlNS1hMjI0LWEwYWRiZDA3ZmVkYyJ9.P5rNINuFyt2yC2LjMqC6qtv_N_pSsENMhoPJDE9OyHw"
	bearer := "Bearer " + token

    req, err := http.NewRequest("GET", url, bytes.NewBuffer(nil))
    req.Header.Set("Authorization", bearer)
    req.Header.Add("Accept", "application/json")

	tr := &http.Transport{
        TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
    }
    client1 := &http.Client{Transport: tr}
  
  
    client1.CheckRedirect = func(req *http.Request, via []*http.Request) error {
        for key, val := range via[0].Header {
            req.Header[key] = val
        }
        return err
    }
    resp, err := client1.Do(req)
    if err != nil {
        log.Println("Error on response.\n[ERRO] -", err)
    } else {
        defer resp.Body.Close()
        data, _ := ioutil.ReadAll(resp.Body)
        fmt.Println(string(data))   // print the data from API
	
		var ArgoCDJSON1 ArgoCDJSON
		err = bson.Unmarshal(data,&ArgoCDJSON1)
		if err != nil {
		panic(err)
		} else{
			printArgoCDJSON(ArgoCDJSON1) // print the data in structured form
		}

 

//------------------------------------------ Store in database
		usersCollection := client.Database("ArgoCD-DB").Collection("Data-from-api")
		_, err = usersCollection.InsertOne(context.TODO(), bson.D{data})
        // "ResourceVersion": ArgoCDJSON1.Metadata.ResourceVersion,
        // "ResourceVersion": ArgoCDJSON1.Metadata.ResourceVersion,
        // "ResourceVersion": ArgoCDJSON1.Metadata.ResourceVersion

		if err != nil {
			fmt.Println(err)
			return
		}
	}	

}
