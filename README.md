# background-erase-web
- Recognizes the object in the photo and erases the background.
- Only png can be selected.

# ■Requirements
- python 3.8+
- Linux is required when using gunicorn. (Currently gunicorn does not support windows. In case of win10, Gunicorn can also be operated by using Docker or WSL2.)

# ■Install
```
git clone https://github.com/PoodleMaster/background-erase-web
cd background-erase-web
```

# ■Server startup
It can be started by the following four methods, A-1, A-2, B-1, and B-2.

## (A) When using Docker
Please execute "get_u2net.py" in advance to get "u2net.pth".
Even if you don't copy .u2net into docker, it will be automatically acquired when rembg is running.
However, it is very large at 168MB, so it is recommended to download it in advance.
```
pip install GitPython
python get_u2net.py
```

### (A-1) Using Docker-compose
- Execution command

You can execute it until startup with one command.
```
docker-compose up
```
http://localhost:5000/

### (A-2) Using Docker
- Execution command

After creating the docker image, create and run the container.
```
docker build -t minicon3:1.5 .
docker run -it --publish=5000:5000 --name="rembg" minicon3:1.5
```
http://localhost:5000/

## (B) Without Docker
Install the python library.
```
conda create -n rembg38 python=3.8
conda activate rembg38
conda install gcc_linux-64 gxx_linux-64
pip install -r requirements.txt
```

### (B-1) Using Gunicorn
- Execution command

Start the server using the HTTP server (gunicorn) command.
```
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

## (B-2) Using Flask
- Execution command

Even if you don't have an HTTP server (gunicorn), you can run it with Flask's simple HTTP server function.
```
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
