from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import pandas as pd
import pickle

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins="http://localhost:5173",
    allow_credentials=True,
    allow_methods=["*"],    
    allow_headers=["*"],
)

class userData (BaseModel):
    age: int
    sex: str
    chestPainType: str
    restingBP: int
    cholesterol: int
    fastingBS: int
    restingECG: str
    maxHR: int
    exerciseAngina: str
    oldpeak: int
    st_slope: str


import pandas as pd
loaded = pickle.load(open("model.pkl", "rb"))
model = loaded["model"]
scaler = loaded['scaler']

def preprocess_input(data):
    columns = ['Age', 'RestingBP', 'Cholesterol', 'FastingBS', 'MaxHR', 'Oldpeak',
               'Sex_M', 'ChestPainType_ATA', 'ChestPainType_NAP',
               'RestingECG_Normal', 'RestingECG_ST', 'ExerciseAngina_Y',
               'ST_Slope_Flat', 'ST_Slope_Up']

    df = pd.DataFrame([[0]*len(columns)], columns=columns)

    df['Age'] = data.age
    df['RestingBP'] = data.restingBP
    df['Cholesterol'] = data.cholesterol
    df['FastingBS'] = data.fastingBS
    df['MaxHR'] = data.maxHR
    df['Oldpeak'] = data.oldpeak

    if data.sex == "M":
        df['Sex_M'] = 1

    if data.chestPainType == "ATA":
        df['ChestPainType_ATA'] = 1
    elif data.chestPainType == "NAP":
        df['ChestPainType_NAP'] = 1

    if data.restingECG == "Normal":
        df['RestingECG_Normal'] = 1
    elif data.restingECG == "ST":
        df['RestingECG_ST'] = 1

    if data.exerciseAngina == "Y":
        df['ExerciseAngina_Y'] = 1

    if data.st_slope == "Flat":
        df['ST_Slope_Flat'] = 1
    elif data.st_slope == "Up":
        df['ST_Slope_Up'] = 1

    col = ['Age', 'RestingBP', 'Cholesterol', 'MaxHR']
    df[col] = scaler.fit_transform(df[col])

    return df



@app.get("/")
def home_route(): 
    return "this is the home route of your server"

@app.post("/predictheartattack") 
def predict_heart_attack_probability(data: userData): 
    model_input = preprocess_input(data)
    prediction = model.predict(model_input)
    data = { "message": "1" if prediction == 1 else "0"}
    return JSONResponse(content=data, status_code=200)