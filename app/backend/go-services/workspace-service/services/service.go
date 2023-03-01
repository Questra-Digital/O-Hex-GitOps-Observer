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

func (db *DB) GetWorkspace(id string) *model.Workspace {
	jobCollec := db.client.Database("ProjectDB").Collection("workspace")
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	_id, _ := primitive.ObjectIDFromHex(id)
	filter := bson.M{"_id": _id}
	var workspace model.Workspace
	err := jobCollec.FindOne(ctx, filter).Decode(&workspace)
	if err != nil {
		log.Fatal(err)
	}
	return &workspace
}

func (db *DB) GetWorkspacesByUsername(username string) []*model.Workspace {
	workspaceCollec := db.client.Database("ProjectDB").Collection("workspace")
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()
	filter := bson.M{"username": username}
    
	cursor, err := workspaceCollec.Find(ctx, filter)
    if err != nil {
		return nil
    }
    defer cursor.Close(ctx)

    var workspaces []*model.Workspace
    for cursor.Next(ctx) {
		var workspace model.Workspace
        err := cursor.Decode(&workspace)
        if err != nil {
            return nil
        }
    workspaces = append(workspaces, &workspace)
}

if err := cursor.Err(); err != nil {
    return nil
}

return workspaces

}

func (db *DB) GetAllWorkspaces() []*model.Workspace {
	workspaceCollec := db.client.Database("ProjectDB").Collection("workspace")
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()
	var workspaces []*model.Workspace
	cursor, err := workspaceCollec.Find(ctx, bson.D{})
	if err != nil {
		log.Fatal(err)
	}

	if err = cursor.All(context.TODO(), &workspaces); err != nil {
		panic(err)
	}

	return workspaces
}

func (db *DB) CreateWorkspace(workspaceInfo model.CreateWorkspaceInput) *model.Workspace {
	workspaceCollec := db.client.Database("ProjectDB").Collection("workspace")
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()
	insert, err := workspaceCollec.InsertOne(ctx, bson.M{"name": workspaceInfo.Name, "username": workspaceInfo.Username})

	if err != nil {
		log.Fatal(err)
	}

	insertedID := insert.InsertedID.(primitive.ObjectID).Hex()
	returnWorkspace := model.Workspace{ID: insertedID, Name: workspaceInfo.Name, Username: workspaceInfo.Username }
	return &returnWorkspace
}

func (db *DB) UpdateWorkspace(workspaceId string, workspaceInfo model.UpdateWorkspaceInput) *model.Workspace {
	workspaceCollec := db.client.Database("ProjectDB").Collection("workspace")
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	updateWorkspaceInfo := bson.M{}

	if workspaceInfo.Name != nil {
		updateWorkspaceInfo["name"] = workspaceInfo.Name
	}

	_id, _ := primitive.ObjectIDFromHex(workspaceId)
	filter := bson.M{"_id": _id}
	update := bson.M{"$set": updateWorkspaceInfo}

	results := workspaceCollec.FindOneAndUpdate(ctx, filter, update, options.FindOneAndUpdate().SetReturnDocument(1))

	var workspace model.Workspace

	if err := results.Decode(&workspace); err != nil {
		log.Fatal(err)
	}

	return &workspace
}

func (db *DB) DeleteWorkspace(workspaceId string) *model.DeleteWorkspaceResponse {
	workspaceCollec := db.client.Database("ProjectDB").Collection("workspace")
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	_id, _ := primitive.ObjectIDFromHex(workspaceId)
	filter := bson.M{"_id": _id}
	_, err := workspaceCollec.DeleteOne(ctx, filter)
	if err != nil {
		log.Fatal(err)
	}
	return &model.DeleteWorkspaceResponse{DeletedWorkspaceID: workspaceId}
}
