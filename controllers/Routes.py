from controllers import filterControllers, OxControllers, userControllers
from controllers.utils.functions import ValInputs
from controllers.utils.security import Authentication
from flask import Blueprint, jsonify, request, json
from PIL import Image

import base64
import io
import numpy as np

routes = Blueprint('routes', __name__)

@routes.route('/signupUser', methods=["POST"])
def signUpUser():
    data = request.get_json()

    userData = {
        'name': data.get('name'),
        'email': data.get('email'),
        'password': data.get('password')
    }

    errors = []

    nameValidate = ValInputs.validateName(userData['name'])
    if not nameValidate['status']:
        errors.append(nameValidate['mensagem'])
    
    emailValidate = ValInputs.validateEmail(userData['email'])
    if not emailValidate['status']:
        errors.append(emailValidate['mensagem'])
    
    passwordValidate = ValInputs.validatePassword(userData['password'])
    if not passwordValidate['status']:
        errors.append(passwordValidate['mensagem'])

    if errors:
        return jsonify({'mensagens': errors}), 400

    return userControllers.signupUser(userData['name'], userData['email'], userData['password'])

@routes.route('/loginUser', methods=["POST"])
def logInUser():
    data = request.get_json()

    loginUsuario = {
        'email': data.get('email'),
        'senha': data.get('password')
    }

    return userControllers.loginUser(loginUsuario['email'], loginUsuario['senha'])

@routes.route('/updateUser/<id>', methods=['GET', 'PUT'])
def updateUser(id):
    if request.method == 'GET':
        return userControllers.displayUserData(id)
    if request.method == 'PUT':
        data = request.get_json()

        userData = {
            'name': data.get('name'),
            'email': data.get('email'),
            'password': data.get('password')
        }

        return userControllers.updateUser(id, userData['name'], userData['email'], userData['password'])

@routes.route('/listarPositivos/<idUser>', methods=["GET"])
def getPositiveCases(idUser):
    return filterControllers.getPositiveCases(idUser)

@routes.route('/listarGados/<idUser>', methods=["GET"])
def getAllCases(idUser):
    return filterControllers.getAllCases(idUser)

@routes.route('/menu', methods=["GET"])
def getMenuData(userToken):
    return filterControllers.getMenuData(userToken['id'])

@routes.route('/getResults/<idUser>', methods=["GET"])
def getResults(idUser):
    return OxControllers.getResults(idUser, None)

@routes.route('/getResults/<idUser>/<idOx>', methods=["GET"])
def getUpdatedResults(idUser, idOx):
    return OxControllers.getResults(idUser, idOx)

@routes.route('/signupCow/<idUser>', methods=['GET', 'POST'])
def signupCow(idUser):
    if request.method == 'GET':
        return OxControllers.getCow()
    if request.method == 'POST':

        cowData = {
            'nameCow': request.form['cowName'],
            'image': request.files['picInput']
        }

        return OxControllers.signupCow(idUser, None, cowData['image'], cowData['nameCow'])

@routes.route('/signupCow/<idUser>/<idCow>', methods=['GET', 'POST'])
def signupExistingCow(idUser, idCow):
    if request.method == 'GET':
        return OxControllers.getCow()
    if request.method == 'POST':

        cowData = {
            'nTempId': request.form['tempIdCow'],
            'nameCow': request.form['name'],
            'image': request.files['image']
        }

        return OxControllers.signupCow(idUser, idCow, cowData['image'], cowData['nTempId'], cowData['nameCow'])

@routes.route('/updateOx/<idGado>', methods=["GET", "POST"])
@Authentication.RequireAuth
def updateOx(idGado, data):
    if request.method == 'GET':
        return OxControllers.getOxInfo(idGado)
    if request.method == 'POST':
        return OxControllers.updateOx(idGado, data)
    
@routes.route('/rotateImage', methods=['POST'])
def rotateImage():
    data = request.get_json()

    imageB64 = data['image']

    imgBytes = base64.b64decode(imageB64)

    imgPil = Image.open(io.BytesIO(imgBytes))

    imgArray = np.array(imgPil)

    rotatedImage = OxControllers.rotateImage(imgArray)

    rotatedImageB64 = base64.b64encode(rotatedImage).decode('utf-8')

    responseData = {
        'imgRotated': rotatedImageB64
    }

    return json.dumps(responseData), 200, {'Content-Type': 'application/json'}