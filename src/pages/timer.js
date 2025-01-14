import React, { useState } from "react";
import { View, Text } from "react-native";
import CountDown from 'react-native-countdown-component';

export default function Timer() {


    
    const [timeNow, setTimeNow] = useState(new Date())
    const timeto2025 = new Date("2024-12-31T23:59:59");
    
    
    const seconts = (timeto2025 - timeNow) / 1000
    const days = seconts / 86400
    const actualyDay = 366 - days.toFixed(0)

/*     const frases = [
        "Uma nova era se aproxima",
        "Dessa vez vai dar tudo certo",
        "Cumpra suas metas"
    ]

    function Frases(){

        for (i = 0; i < frases.length; i++) {
            return(
                <Text style={{fontSize: 20, color:'#085909', bottom: 25}}>{frases[i]}</Text>
            )           
        } 

    } */

    return (
        <View style={{ alignContent: 'center', justifyContent: 'center', flex: 1, alignItems: "center", backgroundColor: "#f2fff2" }}>
            
            
           
            <Text style={{fontSize: 30, bottom: 30,color:'#085909'}}>Dia</Text>
            <Text style={{fontSize: 35, bottom: 30,color:'#085909'}}>{actualyDay} / 366</Text>

            <Text style={{fontSize: 25, bottom: 5,color:'#085909'}}>Faltam:</Text>
            <CountDown
                until={seconts}
                timeToShow={['D', 'H', 'M', 'S']}
                timeLabels={{ d: 'Dias', h: 'Horas', m: 'Minutos', s: 'Segundos' }}                
                size={30}
                digitStyle={{ backgroundColor: '#FFFFFF', borderColor: "#00ff04", borderWidth: 1 }}
                digitTxtStyle={{ color: '#1CC625' }}
                timeLabelStyle={{ color: '#085909' }}
            />
            {seconts > 0 &&
                <Text style={{padding: 15, top:10, fontSize: 25, color:'#085909'}}>Para 2025</Text>

            }

            {seconts < 0 &&
                <Text style={{padding: 15, top:15, fontSize: 30, color:'#085909'}}>Feliz Ano Novo!!!🙂</Text>

            }

        </View>
    )
} 