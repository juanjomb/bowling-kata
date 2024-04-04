SHELL=/bin/bash
.DEFAULT_GOAL := help


.PHONY: start
start: 
	@docker compose up 

