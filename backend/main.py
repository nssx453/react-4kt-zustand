from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI(title="react34-27 API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Dog(BaseModel):
    id: int
    name: str
    description: str
    image_url: str 

DOGS: List[Dog] = [
    Dog(id=1, name="Шпиц", description="Пушистый комок позитива. Уверен, что он самый главный в доме.", image_url="https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN31fImu8qFnFgNjQDc5MjxSY2Chiw2FS3RqwF_VcqcvB6JQ7YDoHiqZGfBhWq7ukFX6PgORUs52sBQsOdcGtJKrGhw&expires=1795644273700"),
    Dog(id=2, name="Борзая", description="Аристократ среди собак. Приплюснутая собака на траве.", image_url="https://i.pinimg.com/736x/65/ff/de/65ffdebdd37ee348ab2ffef098958ec8.jpg"),
    Dog(id=3, name="Такса", description="Собака с низкой посадкой и высоким самомнением. Отличный компаньон.", image_url="https://i.pinimg.com/736x/2b/78/86/2b7886a33af1338a64abe99369647083.jpg"),
    Dog(id=4, name="Левретка", description="Самая маленькая из борзых пород. Плохо переносит одиночество", image_url="https://i.pinimg.com/736x/dd/94/e1/dd94e1113f6542295dc2e6f14411cd8a.jpg"),
    Dog(id=5, name="Китайская хохлатая", description="Несмотря на название, происхождение породы до конца не выяснено. Есть версии, что её корни уходят в Африку или Мексику, " \
    "а в Китае этих собак миниатюризировали и считали символом благосостояния.", image_url="https://i.pinimg.com/736x/e3/32/10/e3321031af0b285bea9aec020738243f.jpg"),
]

@app.get("/dogs", response_model=List[Dog])
def get_dogs() -> List[Dog]:
    return DOGS