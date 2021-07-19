# base
FROM continuumio/miniconda3

# init
RUN apt-get update
RUN apt-get install -y build-essential
RUN conda update pip

# install conda package
RUN conda install gcc_linux-64 gxx_linux-64

# install pip package
RUN pip install pymatting
RUN pip install Flask==2.0.1
RUN pip install torch==1.7.1+cpu --find-links https://download.pytorch.org/whl/torch_stable.html
RUN pip install torchvision==0.8.2+cpu --find-links https://download.pytorch.org/whl/torch_stable.html
RUN pip install rembg==1.0.27
RUN pip install gunicorn==20.1.0

COPY ./ ./bg
WORKDIR bg
EXPOSE 5000
CMD ["gunicorn", "--bind=0.0.0.0:5000", "server:app"]
