package services

import (
	"context"
	"log"
	"time"
	"backend/services/graph/model"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	// "go.mongodb.org/mongo-driver/mongo/options"
	"github.com/slack-go/slack"
) 

func (db *DB) SendMessage(userbottoken string, channelid string, message string) string {
	api := slack.New(userbottoken)

	channelID, timestamp, err := api.PostMessage(
		channelid, 
		slack.MsgOptionText(message, false),
	)

	if err != nil {
		// fmt.Printf("%s\n", err)
		return "Error while sending message"
	}
	//fmt.Printf("Message successfully sent to channel %s at %s", channelID, timestamp)
    return "Message successfully sent to channel " + channelID + " at " + timestamp

}

func (db *DB) CreateSlackCredentials(slackCredentialsInfo model.CreateSlackCredentialsInput) *model.SlackCredentials {
	slackCredentialsCollec := db.client.Database("ProjectDB").Collection("slack")
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	// Create an array of channel documents
	channels := make([]bson.M, len(slackCredentialsInfo.Channels))
	for i, channel := range slackCredentialsInfo.Channels {
		channels[i] = bson.M{
			"channelname": channel.Channelname,
			"channelid":   channel.Channelid,
		}
	}

	// Create a MongoDB document for the SlackCredentials object
	doc := bson.M{
		"username":     slackCredentialsInfo.Username,
		"botusertoken": slackCredentialsInfo.Botusertoken,
		"channels":     channels,
		"currentchannelid": slackCredentialsInfo.Currentchannelid,
	}

	// Insert the document into the collection
	insert, err := slackCredentialsCollec.InsertOne(ctx, doc)
	if err != nil {
		log.Fatal(err)
	}

	insertedID := insert.InsertedID.(primitive.ObjectID).Hex()

	// Create a SlackCredentials object with the inserted ID and return it
	returnSlackCredentials := model.SlackCredentials{
		ID:            insertedID,
		Username:      slackCredentialsInfo.Username,
		Botusertoken:  slackCredentialsInfo.Botusertoken,
		Currentchannelid: slackCredentialsInfo.Currentchannelid,
		
	}
	return &returnSlackCredentials
}

func (db *DB) UpdateSlackCredentials(id string, input model.UpdateSlackCredentialsInput) (*model.SlackCredentials, error) {
    slackCredentialsCollec := db.client.Database("ProjectDB").Collection("slack")
    ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
    defer cancel()

    // Create an array of channel documents
    channels := make([]bson.M, len(input.Channels))
    for i, channel := range input.Channels {
        channels[i] = bson.M{
            "channelname": channel.Channelname,
            "channelid":   channel.Channelid,
        }
    }

    // Create a MongoDB filter for the SlackCredentials object to update
    _id, _ := primitive.ObjectIDFromHex(id)
	filter := bson.M{"_id": _id}

    // Create a MongoDB update operation for the SlackCredentials object
    update := bson.M{
        "$set": bson.M{
            "username":          input.Username,
            "botusertoken":      input.Botusertoken,
            "channels":          channels,
            "currentchannelid":  input.Currentchannelid,
        },
    }

    // Execute the update operation
    _, err := slackCredentialsCollec.UpdateOne(ctx, filter, update)
    if err != nil {
        return nil, err
    }

    // Return the updated SlackCredentials object
    updatedSlackCredentials := &model.SlackCredentials{
        ID:                id,
        Username:          input.Username,
        Botusertoken:      input.Botusertoken,
        Currentchannelid:  input.Currentchannelid,
    }

    return updatedSlackCredentials, nil
}


func (db *DB) GetSlackCredentials(username string) *model.SlackCredentials {
	slackCredentialsCollec := db.client.Database("ProjectDB").Collection("slack")
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()
	filter := bson.M{"username": username}
	result := slackCredentialsCollec.FindOne(ctx, filter)

	if result.Err() != nil {
		log.Fatal(result.Err())
	}

	slackCredentials := model.SlackCredentials{}
	err := result.Decode(&slackCredentials)

	if err != nil {
		log.Fatal(err)
	}

	return &slackCredentials
}

