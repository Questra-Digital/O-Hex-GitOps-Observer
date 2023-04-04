package main

import (
	"bytes"
	"crypto/tls"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"context"
	"encoding/json"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"

)

func main() {

	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI("mongodb://localhost:27017"))

	if err != nil {
		panic(err)
	}
	if err := client.Ping(context.TODO(), readpref.Primary()); err != nil {
		panic(err)
	}
	//--------------------------------- for ARGO CD ----------------------------------
	url := "https://localhost:8080/api/v1/applications"
	token := "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcmdvY2QiLCJzdWIiOiJhZG1pbjpsb2dpbiIsImV4cCI6MTY3ODUzOTIzMSwibmJmIjoxNjc4NDUyODMxLCJpYXQiOjE2Nzg0NTI4MzEsImp0aSI6ImQwZjhhY2FkLWVjNTgtNDFlMi04NjdmLWM5ZDBiMDUwNjc5YyJ9.3vZoXnWdQxmhbPo5OuwC36XNHBus7G8v9FJAbdkDGUU"
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
		var results map[string]interface{}
		err = json.Unmarshal(data, &results)
		if err != nil {
			panic(err)
		} 

		//------------------------------------------ Store in database
		usersCollection := client.Database("ArgoCD-DB").Collection("Data-from-api")
		_, err = usersCollection.InsertOne(context.TODO(), results)

		if err != nil {
			fmt.Println(err)
			return
		}
	}

}
