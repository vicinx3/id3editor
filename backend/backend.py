from flask import Flask, request, jsonify
import mutagen
import os
from alias import *
app = Flask(__name__)
import requests

@app.route('/', methods = ['POST'])
def uploadFiles():
    for uploaded_file in request.files.getlist('song'):
        uploaded_file.save("./uploadedSongs/" + str(uploaded_file.filename))
    songInformation = []
    for song in os.listdir('./uploadedSongs/'):
        songObj = mutagen.File('./uploadedSongs/' + str(song))
        retSongObj = {}
        for tag in songObj.tags:
            if (tag in releventInfo):
                retSongObj[tag] = songObj.tags[tag][0]
        songInformation.append(retSongObj)
    return jsonify(songInformation)

@app.route('/auth')
def auth():
    res = requests.post('https://accounts.spotify.com/api/token', headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    }, data={
        'grant_type': 'client_credentials',
    }, auth = ("7f57928079e04dcf9b9f198edd4ed0e6", "3619818282774bd1b86b96bf39ced4d5"))
    res_data = res.json()
    access_token = res_data.get('access_token')
    return access_token

app.run(debug=True)