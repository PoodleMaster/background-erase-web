import os
import shutil
import stat
import subprocess

cmd = 'pip install GitPython'
subprocess.call(cmd.split())
import git

# path set
toolpath = 'tool'
u2netpath = 'u2net'

# remove_readonly
def remove_readonly(func, path, excinfo):
    os.chmod(path, stat.S_IWRITE)
    func(path)

# path delete
if os.path.exists(toolpath):
    shutil.rmtree(toolpath, onerror=remove_readonly)

if os.path.exists(u2netpath):
    shutil.rmtree(u2netpath, onerror=remove_readonly)

# folder list
print('os.name = ', os.name)
if os.name == 'nt':
    cmd = 'dir .'
else:
    cmd = 'ls .'
subprocess.call(cmd.split(), shell=True)

# git clone
url = 'https://github.com/chentinghao/download_google_drive.git'
git.Repo.clone_from(url, toolpath)

# mkdir
cmd = 'mkdir u2net'
if os.name == 'nt':
    subprocess.call(cmd.split(), shell=True)
else:
    subprocess.call(cmd.split())

# download_gdrive.py
cmd = 'python tool/download_gdrive.py 1ao1ovG1Qtx4b7EoskHXmi2E9rp5CHLcZ u2net/u2net.pth'
subprocess.call(cmd.split())

