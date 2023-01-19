package services

import (
	"context"
	"log"
	"time"
	"backend/services/graph/model"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
) 


// Get project by id 
func (db *DB) GetProject(id string) *model.Project {
	projectCollec := db.client.Database("ProjectDB").Collection("project")
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	_id, _ := primitive.ObjectIDFromHex(id)
	filter := bson.M{"_id": _id}
	var project model.Project
	err := projectCollec.FindOne(ctx, filter).Decode(&project)
	if err != nil {
		log.Fatal(err)
	}
	return &project
}

// get all projects by workspace id 
func (db *DB) GetProjectsByWorkspace(workspaceid string) []*model.Project {
	projectCollec := db.client.Database("ProjectDB").Collection("project")
	var projects []*model.Project

	workspaceidObj, _ := primitive.ObjectIDFromHex(workspaceid)
	filter := bson.M{"workspaceid": workspaceidObj}
	
	cur, err := projectCollec.Find(context.TODO(), filter)
	if err != nil {
	   return nil
	}
	
	for cur.Next(context.TODO()) {
	    var project model.Project
	    err := cur.Decode(&project)
	    if err != nil {
	        return nil
	    }
	    projects = append(projects, &project)
	}
	if err := cur.Err(); err != nil {
	    return nil
	}
	cur.Close(context.TODO())
	
	return projects
}


// get all projects 
func (db *DB) GetAllProjects() []*model.Project {
	projectCollec := db.client.Database("ProjectDB").Collection("project")
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()
	var projects []*model.Project
	cursor, err := projectCollec.Find(ctx, bson.D{})
	if err != nil {
		log.Fatal(err)
	}
	if err = cursor.All(context.TODO(), &projects); err != nil {
		panic(err)
	}
	return projects
}


// create a project 
func (db *DB) CreateProject(projectInfo model.CreateProjectInput) *model.Project {
	projectCollec := db.client.Database("ProjectDB").Collection("project")
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()
	workspaceId , _ := primitive.ObjectIDFromHex(projectInfo.Workspaceid)
	insert, err := projectCollec.InsertOne(ctx, bson.M{"name": projectInfo.Name, "description": projectInfo.Description, "workspaceid": workspaceId, "token": projectInfo.Token, "collaborators": projectInfo.Collaborators })

	if err != nil {
		log.Fatal(err)
	}

	insertedID := insert.InsertedID.(primitive.ObjectID).Hex()
	returnProject := model.Project{ID: insertedID, Name: projectInfo.Name, Description: projectInfo.Description, Workspaceid: projectInfo.Workspaceid, Token: projectInfo.Token, Collaborators: projectInfo.Collaborators }
	return &returnProject
}


// update a project 
func (db *DB) UpdateProject(projectId string, projectInfo model.UpdateProjectInput) *model.Project {
	projectCollec := db.client.Database("ProjectDB").Collection("project")
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	updateProjectInfo := bson.M{}

	if projectInfo.Name != nil {
		updateProjectInfo["name"] = projectInfo.Name
	}

	_id, _ := primitive.ObjectIDFromHex(projectId)
	filter := bson.M{"_id": _id}
	update := bson.M{"$set": updateProjectInfo}

	results := projectCollec.FindOneAndUpdate(ctx, filter, update, options.FindOneAndUpdate().SetReturnDocument(1))

	var project model.Project

	if err := results.Decode(&project); err != nil {
		log.Fatal(err)
	}

	return &project
}

// delete a project 
func (db *DB) DeleteProject(projectId string) *model.DeleteProjectResponse {
	projectCollec := db.client.Database("ProjectDB").Collection("project")
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	_id, _ := primitive.ObjectIDFromHex(projectId)
	filter := bson.M{"_id": _id}
	_, err := projectCollec.DeleteOne(ctx, filter)
	if err != nil {
		log.Fatal(err)
	}
	return &model.DeleteProjectResponse{DeletedProjectID: projectId}
}
