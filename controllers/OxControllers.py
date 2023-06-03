from controllers.utils.functions import GenResults
from flask import current_app, jsonify, make_response, request
from bson import ObjectId
from models.db import db
from controllers.utils import Cache

import datetime

collectionUser = db['usuarios']
collectionBoi = db['gados']

def getResults(idUser, idOx):
    findUser = collectionUser.find_one({'_id': ObjectId(idUser)})
    countOx = collectionBoi.count_documents({'idPecuarista': idUser})

    if findUser is not None:
        try:
            results = GenResults.genRandomResults()

            tempIdOx = f'A{countOx + 1}'

            saveResults = {
                'nTempIdOx': tempIdOx,
                'result': results['results'],
                'date': datetime.datetime.now().date().isoformat()
            }

            Cache.cache.set('tempData', saveResults)

            if idOx is None:
                collectionBoi.insert_one({
                    'numIdentificacao': tempIdOx,
                    'idPecuarista': idUser
                })

                return {
                    'nTempIdOx': tempIdOx,
                    'results': {
                        'percentage': results['results'],
                        'phase': results['currentPhase'],
                        'nextSymptons': results['symptonsPhase'],
                        'level': results['level'],
                        'details': results['details']
                    }
                }
            else:
                findOx = collectionBoi.find_one({'_id': ObjectId(idOx)})

                return {
                    'nIdOx': findOx['numIdentificacao'],
                    'nameOx': findOx['nomeGado'],
                    'results': {
                        'percentage': results['results'],
                        'phase': results['currentPhase'],
                        'nextSymptons': results['symptonsPhase']
                    }
                }
        except Exception as err:
            return {'message': str(err)}
    else:
        response = jsonify({'message': 'Não foi possível encontrar o usuário...'})
        response.status_code = 404
        response.headers['Content-Type'] = 'application/json'

        return response

def signupOx(id, idOx, tempId, name, profilePicture):
    collectionBoi = db['gados']

    try:
        imgBytes = profilePicture.read()

        cachedResults = Cache.cache.get('tempResults')

        newRecords = None

        newRecord = {
            'imageAnalyzed': {
                'img': (cachedResults['image']).tobytes(),
                'description': 'The lesion is circular with striking white borders.'
            },
            'results': cachedResults['results'],
            'date': cachedResults['date']
        }

        if idOx is None:
            records = []

            records.append(newRecord)

            collectionBoi.insert_one({
                'numIdentificacao': tempId,
                'nomeGado': name,
                'fotoPerfil': imgBytes,
                'status': 'Sem tratamento',
                'idPecuarista': id,
                'historico': records
            })
        else:
            findOx = collectionBoi.find_one({'_id': ObjectId(idOx)})

            newRecords = findOx['historico']

            newRecords.append(newRecord)

            collectionBoi.update_one({'_id': ObjectId(idOx)}, {'$set': {'historico': newRecords}})

        Cache.cache.delete('tempResults')
        
        return jsonify({'message': 'Success! Data saved successfully'}), 201
    except Exception as err:
        return jsonify({'message': str(err)})

def getOxInfo(idOx):
    collectionOx = db['gados']

    getOx = collectionOx.find_one({'_id': ObjectId(idOx)})

    if getOx is None:
        return jsonify({'mensagem': 'Não foi possível encontrar o gado selecionado'}, 400)
    
    return jsonify({
        'numId': getOx['numIdentificacao'],
        'nomeGado': getOx['nomeGado'],
        'fotoPerfil': getOx['fotoPerfil'],
        'status': getOx['status'],
        'historico': getOx['historico']
    })

def updateOx(idOx, data):
    collectionOx = db['gados']

    getOx = collectionOx.find_one({'_id': ObjectId(idOx)})

    if getOx is None:
        return jsonify({'mensagem': 'Não foi possível encontrar o gado selecionado'}, 400)
    
    collectionOx.update_one({'_id': ObjectId(idOx)}, {'$set': {'status': data.get('status')}})