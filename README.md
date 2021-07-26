# background-erase-web
- Recognizes the object in the photo and erases the background.
- Only png can be selected.

# ■Requirements
- python 3.8+
- Linux is required when using gunicorn. (Currently gunicorn does not support windows. In case of win10, Gunicorn can also be operated by using Docker or WSL2.)

# ■Install
- Apprication Git Clone
```
git clone https://github.com/PoodleMaster/background-erase-web
cd background-erase-web
```

- Python environment creation
```
conda create -n bge38 python=3.8
conda activate bge38
```

# ■Local Server startup
How to start when Localhost is used as a server.

## (A) When using Docker
Execute (A-3)-a when using docker-compose, and (A-3)-b when not using docker-compose.

### (A-1). Docker File Setting
Set up Docker File.
```
cp Dockerfile.heroku Dockerfile
```

### (A-2) "u2net.pth" Get
Please execute "get_u2net.py" in advance to get "u2net.pth".
Even if you don't copy .u2net into docker, it will be automatically acquired when rembg is running.
However, it is very large at 168MB, so it is recommended to download it in advance.
```
python get_u2net.py
```

### (A-3)-a Using Docker-compose
- Execution command

You can execute it until startup with one command.
```
sudo docker-compose up
```

- Execution example
```
Creating network "background-erase-web_default" with the default driver
Building web
[+] Building 4.9s (25/25) FINISHED
 => [internal] load build definition from Dockerfile                                                               0.0s
 => => transferring dockerfile: 1.26kB                                                                             0.0s
 => [internal] load .dockerignore                                                                                  0.0s
 => => transferring context: 2B                                                                                    0.0s
 => [internal] load metadata for docker.io/continuumio/miniconda3:latest                                           3.6s
 => [auth] continuumio/miniconda3:pull token for registry-1.docker.io                                              0.0s
 => [internal] load build context                                                                                  1.1s
 => => transferring context: 176.60MB                                                                              1.1s
 => [ 1/19] FROM docker.io/continuumio/miniconda3@sha256:1d17ca42494bf4d99030845e05376eb2d246b1ed5ee61afbbf2d1f8f  0.0s
 => CACHED [ 2/19] RUN apt-get update                                                                              0.0s
 => CACHED [ 3/19] RUN apt-get install -y build-essential                                                          0.0s
 => CACHED [ 4/19] RUN conda update pip                                                                            0.0s
 => CACHED [ 5/19] RUN conda install gcc_linux-64 gxx_linux-64                                                     0.0s
 => CACHED [ 6/19] RUN pip install --upgrade pymatting                                                             0.0s
 => CACHED [ 7/19] RUN python3 -c "import pymatting"                                                               0.0s
 => CACHED [ 8/19] RUN pip install Flask==2.0.1                                                                    0.0s
 => CACHED [ 9/19] RUN pip install torch==1.7.1+cpu --find-links https://download.pytorch.org/whl/torch_stable.ht  0.0s
 => CACHED [10/19] RUN pip install torchvision==0.8.2+cpu --find-links https://download.pytorch.org/whl/torch_sta  0.0s
 => CACHED [11/19] RUN pip install rembg==1.0.27                                                                   0.0s
 => CACHED [12/19] RUN pip install gunicorn==20.1.0                                                                0.0s
 => CACHED [13/19] COPY u2net/u2net.pth /root/.u2net/                                                              0.0s
 => CACHED [14/19] WORKDIR /bg                                                                                     0.0s
 => CACHED [15/19] COPY server.py .                                                                                0.0s
 => CACHED [16/19] COPY static static/                                                                             0.0s
 => CACHED [17/19] COPY templates templates/                                                                       0.0s
 => CACHED [18/19] RUN git clone https://github.com/pymatting/pymatting                                            0.0s
 => CACHED [19/19] RUN python pymatting/pymatting_aot/cc.py                                                        0.0s
 => exporting to image                                                                                             0.0s
 => => exporting layers                                                                                            0.0s
 => => writing image sha256:8b70ab4a82cff22233b1aade7ce4bb234314830cb3bf26e1ccca651c651095a5                       0.0s
 => => naming to docker.io/library/background-erase-web_web                                                        0.0s

Use 'docker scan' to run Snyk tests against images to find vulnerabilities and learn how to fix them
WARNING: Image for service web was built because it did not already exist. To rebuild this image you must use `docker-compose build` or `docker-compose up --build`.
Creating background-erase-web_web_1 ... done
Attaching to background-erase-web_web_1
web_1  | [2021-07-22 10:01:54 +0000] [1] [INFO] Starting gunicorn 20.1.0
web_1  | [2021-07-22 10:01:54 +0000] [1] [INFO] Listening at: http://0.0.0.0:5000 (1)
web_1  | [2021-07-22 10:01:54 +0000] [1] [INFO] Using worker: sync
web_1  | [2021-07-22 10:01:54 +0000] [8] [INFO] Booting worker with pid: 8
```
👉http://localhost:5000/

### (A-3)-b Using Docker
- Execution command

After creating the docker image, create and run the container.
```
sudo docker build -t img_bge_local:1.0 .
sudo docker run -it --publish=5000:5000 --name="con_bge_local" img_bge_local:1.0
```

- Execution example
```
[+] Building 3.0s (24/24) FINISHED
 => [internal] load build definition from Dockerfile                                                               0.0s
 => => transferring dockerfile: 1.26kB                                                                             0.0s
 => [internal] load .dockerignore                                                                                  0.0s
 => => transferring context: 2B                                                                                    0.0s
 => [internal] load metadata for docker.io/continuumio/miniconda3:latest                                           1.8s
 => [internal] load build context                                                                                  1.0s
 => => transferring context: 176.60MB                                                                              1.0s
 => [ 1/19] FROM docker.io/continuumio/miniconda3@sha256:1d17ca42494bf4d99030845e05376eb2d246b1ed5ee61afbbf2d1f8f  0.0s
 => CACHED [ 2/19] RUN apt-get update                                                                              0.0s
 => CACHED [ 3/19] RUN apt-get install -y build-essential                                                          0.0s
 => CACHED [ 4/19] RUN conda update pip                                                                            0.0s
 => CACHED [ 5/19] RUN conda install gcc_linux-64 gxx_linux-64                                                     0.0s
 => CACHED [ 6/19] RUN pip install --upgrade pymatting                                                             0.0s
 => CACHED [ 7/19] RUN python3 -c "import pymatting"                                                               0.0s
 => CACHED [ 8/19] RUN pip install Flask==2.0.1                                                                    0.0s
 => CACHED [ 9/19] RUN pip install torch==1.7.1+cpu --find-links https://download.pytorch.org/whl/torch_stable.ht  0.0s
 => CACHED [10/19] RUN pip install torchvision==0.8.2+cpu --find-links https://download.pytorch.org/whl/torch_sta  0.0s
 => CACHED [11/19] RUN pip install rembg==1.0.27                                                                   0.0s
 => CACHED [12/19] RUN pip install gunicorn==20.1.0                                                                0.0s
 => CACHED [13/19] COPY u2net/u2net.pth /root/.u2net/                                                              0.0s
 => CACHED [14/19] WORKDIR /bg                                                                                     0.0s
 => CACHED [15/19] COPY server.py .                                                                                0.0s
 => CACHED [16/19] COPY static static/                                                                             0.0s
 => CACHED [17/19] COPY templates templates/                                                                       0.0s
 => CACHED [18/19] RUN git clone https://github.com/pymatting/pymatting                                            0.0s
 => CACHED [19/19] RUN python pymatting/pymatting_aot/cc.py                                                        0.0s
 => exporting to image                                                                                             0.0s
 => => exporting layers                                                                                            0.0s
 => => writing image sha256:8b70ab4a82cff22233b1aade7ce4bb234314830cb3bf26e1ccca651c651095a5                       0.0s
 => => naming to docker.io/library/img_bge_local:1.0                                                               0.0s
```
```
[2021-07-22 10:06:11 +0000] [1] [INFO] Starting gunicorn 20.1.0
[2021-07-22 10:06:11 +0000] [1] [INFO] Listening at: http://0.0.0.0:5000 (1)
[2021-07-22 10:06:11 +0000] [1] [INFO] Using worker: sync
[2021-07-22 10:06:11 +0000] [9] [INFO] Booting worker with pid: 9
```
👉http://localhost:5000/

## (B) Without Docker
Execute (B-2)-a when using Gunicorn, and (B-2)-b when using Flask.

### (B-1) Install the python library.
```
conda install gcc_linux-64 gxx_linux-64
pip install -r requirements.txt
```

### (B-2)-a Using Gunicorn
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

## (B-2)-b Using Flask
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

# ■Deploy to Heroku
Deploy to Heroku using the docker file.

## (1). Docker File Setting
Set up Docker File.
```
cp Dockerfile.heroku Dockerfile
```

## (2) "u2net.pth" Get
Download large weight file in advance. Used when creating a Docker image.
```
python get_u2net.py
```

## (3) Deploy using Heroku CLI ([Heroku CLI Install](https://devcenter.heroku.com/articles/heroku-cli))
Deploy using the Heroku command.
```
sudo heroku container:login
sudo heroku create bge-web
sudo heroku container:push web -a bge-web
sudo heroku container:release web -a bge-web
```

## (4) Heroku Log
How to browse Heroku Log.
```
sudo heroku logs --tail -a bge-web
```

# ■AI image processing engine
rembg：https://github.com/danielgatis/rembg

# ■Contributing
Contributions, issues and feature requests are welcome.

# ■Author
Github: PoodleMaster

# ■License
Check the LICENSE file.
