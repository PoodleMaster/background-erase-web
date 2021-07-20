import os
import shutil
import glob
import git
import subprocess

# path set
toolpath = 'tool'
u2netpath = 'u2net'

# path delete
if os.path.exists(toolpath):
    shutil.rmtree(toolpath)

if os.path.exists(u2netpath):
    shutil.rmtree(u2netpath)

# folder list
if os.name == 'nt':
    cmd = 'dir'
else:
    cmd = 'ls'
subprocess.call(cmd.split())

# git clone
url = 'https://github.com/chentinghao/download_google_drive.git'
git.Repo.clone_from(url, toolpath)

# mkdir
cmd = 'mkdir u2net'
subprocess.call(cmd.split())

# download_gdrive.py
cmd = 'python tool/download_gdrive.py 1ao1ovG1Qtx4b7EoskHXmi2E9rp5CHLcZ u2net/u2net.pth'
subprocess.call(cmd.split())
