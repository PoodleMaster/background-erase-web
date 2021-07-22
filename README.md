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
python get_u2net.py
```

### (A-1) Using Docker-compose
- Execution command

You can execute it until startup with one command.
```
sudo docker-compose up
```

- Execution example
```
Building web
[+] Building 4.4s (22/22) FINISHED
 => [internal] load build definition from Dockerfile                                                               0.0s
 => => transferring dockerfile: 1.03kB                                                                             0.0s
 => [internal] load .dockerignore                                                                                  0.0s
 => => transferring context: 2B                                                                                    0.0s
 => [internal] load metadata for docker.io/continuumio/miniconda3:latest                                           3.3s
 => [auth] continuumio/miniconda3:pull token for registry-1.docker.io                                              0.0s
 => [ 1/16] FROM docker.io/continuumio/miniconda3@sha256:1d17ca42494bf4d99030845e05376eb2d246b1ed5ee61afbbf2d1f8f  0.0s
 => [internal] load build context                                                                                  1.0s
 => => transferring context: 176.60MB                                                                              1.0s
 => CACHED [ 2/16] RUN apt-get update                                                                              0.0s
 => CACHED [ 3/16] RUN apt-get install -y build-essential                                                          0.0s
 => CACHED [ 4/16] RUN conda update pip                                                                            0.0s
 => CACHED [ 5/16] RUN conda install gcc_linux-64 gxx_linux-64                                                     0.0s
 => CACHED [ 6/16] RUN pip install pymatting                                                                       0.0s
 => CACHED [ 7/16] RUN pip install Flask==2.0.1                                                                    0.0s
 => CACHED [ 8/16] RUN pip install torch==1.7.1+cpu --find-links https://download.pytorch.org/whl/torch_stable.ht  0.0s
 => CACHED [ 9/16] RUN pip install torchvision==0.8.2+cpu --find-links https://download.pytorch.org/whl/torch_sta  0.0s
 => CACHED [10/16] RUN pip install rembg==1.0.27                                                                   0.0s
 => CACHED [11/16] RUN pip install gunicorn==20.1.0                                                                0.0s
 => CACHED [12/16] COPY u2net/u2net.pth /root/.u2net/                                                              0.0s
 => CACHED [13/16] WORKDIR /bg                                                                                     0.0s
 => CACHED [14/16] COPY server.py .                                                                                0.0s
 => CACHED [15/16] COPY static static/                                                                             0.0s
 => CACHED [16/16] COPY templates templates/                                                                       0.0s
 => exporting to image                                                                                             0.0s
 => => exporting layers                                                                                            0.0s
 => => writing image sha256:9a729e2d288a318a162bdba490bb3a9b8e1b117285ea3f41b6aaf7c89e5db132                       0.0s
 => => naming to docker.io/library/background-erase-web_web                                                        0.0s

Use 'docker scan' to run Snyk tests against images to find vulnerabilities and learn how to fix them
WARNING: Image for service web was built because it did not already exist. To rebuild this image you must use `docker-compose build` or `docker-compose up --build`.
Creating background-erase-web_web_1 ... done
Attaching to background-erase-web_web_1
web_1  | [2021-07-20 03:05:57 +0000] [1] [INFO] Starting gunicorn 20.1.0
web_1  | [2021-07-20 03:05:57 +0000] [1] [INFO] Listening at: http://0.0.0.0:5000 (1)
web_1  | [2021-07-20 03:05:57 +0000] [1] [INFO] Using worker: sync
web_1  | [2021-07-20 03:05:57 +0000] [8] [INFO] Booting worker with pid: 8
web_1  | [2021-07-20 03:06:47 +0000] [1] [CRITICAL] WORKER TIMEOUT (pid:8)
web_1  | [2021-07-20 03:06:47 +0000] [8] [INFO] Worker exiting (pid: 8)
web_1  | Failed to import ahead-of-time-compiled modules.
web_1  | This is expected on first import.
web_1  | Compiling modules and trying again.
web_1  | This might take a minute.
web_1  | Successfully imported ahead-of-time-compiled modules.
web_1  | [2021-07-20 03:06:47 +0000] [62] [INFO] Booting worker with pid: 62
```
👉http://localhost:5000/

### (A-2) Using Docker
- Execution command

After creating the docker image, create and run the container.
```
sudo docker build -t img_bge_local:1.0 .
sudo docker run -it --publish=5000:5000 --name="rembg" img_bge_local:1.5
```

- Execution example
```
[2021-07-20 02:17:41 +0000] [1] [INFO] Starting gunicorn 20.1.0
[2021-07-20 02:17:41 +0000] [1] [INFO] Listening at: http://0.0.0.0:5000 (1)
[2021-07-20 02:17:41 +0000] [1] [INFO] Using worker: sync
[2021-07-20 02:17:41 +0000] [8] [INFO] Booting worker with pid: 8
Failed to import ahead-of-time-compiled modules.
This is expected on first import.
Compiling modules and trying again.
This might take a minute.
Successfully imported ahead-of-time-compiled modules.
```
👉http://localhost:5000/

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
👉http://localhost:8000/

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
👉http://localhost:9000/

# ■AI image processing engine
rembg：https://github.com/danielgatis/rembg

# ■Contributing
Contributions, issues and feature requests are welcome.

# ■Author
Github: PoodleMaster

# ■License
Check the LICENSE file.
