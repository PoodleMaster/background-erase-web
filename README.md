# background-erase-web
- Recognizes the object in the photo and erases the background.
- Only png can be selected.

# ■Requirements
- python 3.8+
- Linux is required when using gunicorn. (Currently gunicorn does not support windows.)

# ■Install
```
git clone https://github.com/PoodleMaster/background-erase-web
cd background-erase-web
```

# ■Server startup
## with Docker-compose
- Execution command
You can execute it until startup with one command.
```
docker-compose up
```
http://localhost:5000/

## with Docker
- Execution command
After creating the docker image, create and run the container.
```
docker build -t minicon3:1.5 .
docker run -it --publish=5000:5000 --name="rembg" minicon3:1.5
```
http://localhost:5000/

## with Gunicorn
- Execution command
Start using the HTTP server (gunicorn) command.
```
pip install -r requirements.txt
gunicorn --bind=localhost:8000 server:app
```

- Execution example
```
[2021-07-16 14:00:02 +0900] [845] [INFO] Starting gunicorn 20.1.0
[2021-07-16 14:00:02 +0900] [845] [INFO] Listening at: http://127.0.0.1:8000 (845)
[2021-07-16 14:00:02 +0900] [845] [INFO] Using worker: sync
[2021-07-16 14:00:02 +0900] [847] [INFO] Booting worker with pid: 847
```
http://localhost:8000/

## without Gunicorn (Start the server with Flask functionality)
- Execution command
Even if you don't have an HTTP server (gunicorn), you can run it with Flask's simple HTTP server function.
```
pip install -r requirements.txt
python server.py
```

- Execution example
``` 
 * Serving Flask app 'server' (lazy loading)
 * Environment: production
   WARNING: This is a development server. Do not use it in a production deployment.
   Use a production WSGI server instead.
 * Debug mode: off
 * Running on http://127.0.0.1:9000/ (Press CTRL+C to quit)
 ```
http://localhost:9000/

# ■AI image processing engine
rembg：https://github.com/danielgatis/rembg

# ■Contributing
Contributions, issues and feature requests are welcome.

# ■Author
Github: PoodleMaster

# ■License
Check the LICENSE file.
