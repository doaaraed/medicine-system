build:
	docker build -t zmedicine-system .

run:
	docker run --name zmedicine -p 5000:5000 --env-file .env zmedicine-system

stop:
	docker stop zmedicine || true
	docker rm zmedicine || true
