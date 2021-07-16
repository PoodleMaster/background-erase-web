# background-erase-web
- Recognizes the object in the photo and erases the background.
- Only png can be selected.

# ■Requirements
- python 3.8+
``` :python
pip install -r require.txt
```

# ■Server startup
- local server
``` :python
python server.py
```

- local server with gunicorn
``` :python
gunicorn server:app
```

# ■AI image processing engine
rembg：https://github.com/danielgatis/rembg

# ■Contributing
Contributions, issues and feature requests are welcome.

# ■Author
Github: PoodleMaster

# ■License
Check the LICENSE file.
