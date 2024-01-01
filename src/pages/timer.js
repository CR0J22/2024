import React from "react";
import { View, Text } from "react-native";
import CountDown from 'react-native-countdown-component';

export default function Timer() {



    const timeNow = new Date()
    const timeto2024 = new Date("2023-12-31T23:59:59");

    const seconts = (timeto2024 - timeNow) / 1000

    const frases = [
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

    }


    console.log(seconts)
    return (
        <View style={{ alignContent: 'center', justifyContent: 'center', flex: 1, alignItems: "center", backgroundColor: "#f2fff2" }}>
            
            
            <Frases />

            <CountDown
                until={seconts}
                timeToShow={['D', 'H', 'M', 'S']}
                timeLabels={{ d: 'Dias', h: 'Horas', m: 'Minutos', s: 'Segundos' }}
                onFinish={() => { alert('Bem Vind@ a 2024!!!😄') }}
                onPress={() => alert('Contagem Regressiva para 2024!')}
                size={30}
                digitStyle={{ backgroundColor: '#FFF', borderColor: "#00ff04", borderWidth: 1 }}
                digitTxtStyle={{ color: '#1CC625' }}
                timeLabelStyle={{ color: '#085909' }}
            />


            {seconts === 0 || seconts < 0 &&
                <Text style={{padding: 15, top:15, fontSize: 30, color:'#085909'}}>Feliz Ano Novo!!!🙂</Text>

            }

        </View>
    )
} 