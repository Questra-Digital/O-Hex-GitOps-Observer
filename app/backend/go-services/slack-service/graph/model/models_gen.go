// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

type Channel struct {
	Channelname string `json:"channelname"`
	Channelid   string `json:"channelid"`
}

type ChannelInput struct {
	Channelname string `json:"channelname"`
	Channelid   string `json:"channelid"`
}

type CreateSlackCredentialsInput struct {
	Username     string          `json:"username"`
	Botusertoken string          `json:"botusertoken"`
	Channels     []*ChannelInput `json:"channels"`
}

type SlackCredentials struct {
	ID           string     `json:"_id"`
	Username     string     `json:"username"`
	Botusertoken string     `json:"botusertoken"`
	Channels     []*Channel `json:"channels"`
}
