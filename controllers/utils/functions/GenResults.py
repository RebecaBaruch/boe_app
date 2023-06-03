import random

def genRandomResults():
    randomNum = random.randint(25, 100)

    sicknessPhase = None
    symptonsPhase = None
    infectionLevel = None

    detailResult = f"O animal apresenta {randomNum}% de chance de estar infectado."

    if randomNum > 50:
        infectionLevel = "É provável que esteja na fase ativa de infecção."
        sicknessPhase = "O animal se encontra na fase ativa de infecção. A fase ativa é caracterizada pela presença de lesões cutâneas típicas da doença, como áreas circulares de perda de pelos, descamação e crostas."
        symptonsPhase = "As complicações comuns nessa fase incluem coceira intensa, irritação da pele e possível disseminação da infecção para outros animais em contato próximo."
    if randomNum == 50:
        infectionLevel = "É provável que esteja na fase inicial."
        sicknessPhase = "O animal pode se encontrar na fase inicial. Na fase inicial, podem não haver lesões visíveis, mas o fungo pode estar presente na pele."
        symptonsPhase = "As complicações comuns nessa fase incluem coceira intesa e irritação da pele."
    if randomNum < 50:
        infectionLevel = "É provável que não esteja infectado."
        sicknessPhase = "O animal pode se encontrar na fase inicial ou não estar infectado. Na fase inicial, podem não haver lesões visíveis, mas o fungo pode estar presente na pele."
        symptonsPhase = "Caso não esteja infectado, não apresenta complicações."
    
    return {
        'results': randomNum,
        'details': detailResult,
        'level': infectionLevel,
        'currentPhase': sicknessPhase,
        'symptonsPhase': symptonsPhase
    }