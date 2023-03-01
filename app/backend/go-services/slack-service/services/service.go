package services

import (
	// "context"
	// "log"
	// "time"
	// "backend/services/graph/model"
	// "go.mongodb.org/mongo-driver/bson"
	// "go.mongodb.org/mongo-driver/bson/primitive"
	// "go.mongodb.org/mongo-driver/mongo/options"
	"github.com/slack-go/slack"
) 

func (db *DB) Sendmessage(message string) string {
	api := slack.New("xoxb-4003045005252-4879278508099-j6b0skT0j0DiQ0EgZJb2mggK")

	channelID, timestamp, err := api.PostMessage(
		"C040Q8MLA5N",
		slack.MsgOptionText(message, false),
	)

	if err != nil {
		// fmt.Printf("%s\n", err)
		return "Error while sending message"
	}
	//fmt.Printf("Message successfully sent to channel %s at %s", channelID, timestamp)
    return "Message successfully sent to channel " + channelID + " at " + timestamp

}

