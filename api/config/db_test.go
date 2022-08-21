package config_test

import (
	"go-api/config"
	"testing"
)

func TestConfig(t *testing.T) {
	_, err := config.Connect()
	if err != nil {
		t.Error("Error connecting to the database")
	}

	t.Log("TestConfig PASSED")
}
